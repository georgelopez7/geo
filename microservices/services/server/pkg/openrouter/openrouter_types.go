package openrouter

type LLMMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type LLMResponseFormat struct {
	Type string `json:"type"`
}

type OpenrouterRequestBody struct {
	Model          string             `json:"model"`
	Messages       []LLMMessage       `json:"messages"`
	ResponseFormat *LLMResponseFormat `json:"response_format,omitempty"`
}

type OpenrouterResponse struct {
	Provider string `json:"provider"`
	Model    string `json:"model"`
	Created  int    `json:"created"`
	Choices  []struct {
		FinishReason string `json:"finish_reason"`
		Index        int    `json:"index"`
		Message      struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"message"`
	}
}

type LLMInfo struct {
	Provider string `json:"provider" validate:"required"`
	Model    string `json:"model" validate:"required"`
}

type OpenrouterCreditsResponse struct {
	Data struct {
		TotalCredits float64 `json:"total_credits"`
		TotalUsage   float64 `json:"total_usage"`
	} `json:"data"`
}
