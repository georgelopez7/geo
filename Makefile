start-app:
	cd clients && npm run start

start-server:
	cd microservices && docker-compose up --build