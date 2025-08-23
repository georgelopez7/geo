package openrouter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// FUNCTION TO SEND PROMPT TO OPENROUTER
func SendPromptToLLM(model string, messages []LLMMessage, jsonMode bool) (OpenrouterResponse, error) {
	// ENDPOINT AND API KEY
	endpoint := "https://openrouter.ai/api/v1/chat/completions"
	apiKey := os.Getenv("OPENROUTER_API_KEY")

	// PREPARE REQUEST BODY
	var llmResponseFormat *LLMResponseFormat
	if jsonMode {
		llmResponseFormat = &LLMResponseFormat{Type: "json_object"} // ADD JSON_MODE TO REQUEST
	}

	reqBody := OpenrouterRequestBody{
		Model:          model,
		Messages:       messages,
		ResponseFormat: llmResponseFormat,
	}

	// MARSHAL REQUEST BODY
	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return OpenrouterResponse{}, fmt.Errorf("failed to marshal request body: %w", err)
	}

	// CREATE POST REQUEST
	req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(jsonData))
	if err != nil {
		return OpenrouterResponse{}, fmt.Errorf("failed to create POST request: %w", err)
	}

	// HEADERS
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	// SEND POST REQUEST WITH TIMEOUT
	client := &http.Client{
		Timeout: 30 * time.Second, // SET 30-SECOND TIMEOUT FOR THE ENTIRE REQUEST
	}

	resp, err := client.Do(req)
	if err != nil {
		if os.IsTimeout(err) {
			return OpenrouterResponse{}, fmt.Errorf("request timed out after 60 seconds: %w", err)
		}
		return OpenrouterResponse{}, fmt.Errorf("failed to send POST request: %w", err)
	}
	defer resp.Body.Close()

	// CHECK RESPONSE STATUS CODE
	if resp.StatusCode != http.StatusOK {
		// PARSE & PRINT RAW RESPONSE
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			return OpenrouterResponse{}, fmt.Errorf("failed to read response body: %w", err)
		}
		fmt.Println("Openrouter Error Response: " + string(bodyBytes))
		return OpenrouterResponse{}, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	// PARSE RESPONSE
	var response OpenrouterResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return OpenrouterResponse{}, fmt.Errorf("failed to decode response: %w", err)
	}

	return response, nil
}
