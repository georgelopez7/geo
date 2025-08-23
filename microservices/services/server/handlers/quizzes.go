package handlers

import (
	"geo-microservices/services/server/config"
	"geo-microservices/services/server/pkg/openrouter"

	"strings"

	"github.com/gin-gonic/gin"
)

func CreateQuizHandler(c *gin.Context) {
	type CreateQuizPayload struct {
		Prompt string `json:"prompt"`
	}

	// PARSE PAYLOAD
	var payload CreateQuizPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": "invalid payload"})
		return
	}

	// CREATE LLM MESSAGES
	prompt := payload.Prompt
	llmMessages := []openrouter.LLMMessage{
		{
			Role:    "system",
			Content: config.SYSTEM_PROMPT,
		},
		{
			Role:    "user",
			Content: strings.Replace(config.USER_PROMPT, "{{ PROMPT }}", prompt, 1),
		},
	}

	// SEND PROMPT TO OPENROUTER
	response, err := openrouter.SendPromptToLLM(config.LLM_MODEL, llmMessages, false)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	// PARSE RESPONSE
	llmResponse := response.Choices[0].Message.Content
	c.JSON(200, gin.H{"response": llmResponse})
}
