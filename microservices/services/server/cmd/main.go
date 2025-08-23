package main

import (
	"geo-microservices/services/server/handlers"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// ENDPOINTS
	router.POST("/api/v1/quizzes", handlers.CreateQuizHandler)

	// PORT
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// RUN SERVER
	router.Run(":" + port)
}
