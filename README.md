## Prerequisites
Before starting the project, ensure you have the following prerequisites installed:

- Node.js v20
- TypeScript
- Docker

## Getting Started
- Run the Docker Compose file using the following command:
	```bash
	docker-compose up -d
	```
	These commands are necessary to generate and apply database migrations, ensuring that the database schema is up-to-date with the latest changes.

- Install dependencies
	```bash
	npm install
	```

- To run tests, run the following command:
	```bash
	npm run test
	```

- To run test of axios-proxy:
	```bash
 	npm run test-axios-proxy
	```

- Start the project by in development mode:
	```bash
	npm run start:dev
	```
  
- Start the project by in production mode:
	```bash
	npm run start
	```