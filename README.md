# Event Management API

A RESTful API for managing events, built with NestJS, TypeORM, and PostgreSQL.

## Features

- Event management (CRUD operations)
- User authentication and authorization
- Swagger API documentation

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Bun](https://bun.sh/) (for local development)

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd event-management-api
   ```

2. Start the application using the Docker helper script:

   ```bash
   ./docker.sh up
   ```

3. Access the API documentation at [http://localhost:3000/api](http://localhost:3000/api)

4. To stop the containers:
   ```bash
   ./docker.sh down
   ```

### Available Docker Commands

- `./docker.sh up` - Start containers in detached mode
- `./docker.sh upf` - Start containers in foreground (see logs)
- `./docker.sh down` - Stop and remove containers
- `./docker.sh rebuild` - Rebuild and restart containers
- `./docker.sh logs` - View logs for all containers
- `./docker.sh logs-app` - View logs for the app container
- `./docker.sh logs-db` - View logs for the database container
- `./docker.sh ps` - Check container status

### Local Development (Without Docker)

1. Copy the `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the PostgreSQL database using Docker:

   ```bash
   docker-compose up -d db
   ```

4. Start the development server:

   ```bash
   bun run start:dev
   ```

5. Access the API documentation at [http://localhost:3000/api](http://localhost:3000/api)

## Project Structure

- `src/` - Application source code
  - `auth/` - Authentication module
  - `users/` - User management module
  - `events/` - Event management module
  - `config/` - Configuration files
- `test/` - Test files
- `docker.sh` - Docker helper script
- `Dockerfile` - Docker configuration for the application
- `docker-compose.yml` - Docker Compose configuration

## Environment Variables

All environment variables are documented in the `.env.example` file. Copy this file to `.env` for local development.

## API Documentation

The API documentation is available at `/api` when the application is running. It is generated using Swagger.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Docker](#docker)
- [API Documentation](#api-documentation)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running the App

You can run the app in different modes:

**Development**

```bash
npm run start
```

**Watch mode**

```bash
npm run start:dev
```

**Production mode**

```bash
npm run start:prod
```

## Testing

To run the tests, use the following commands:

**Unit tests**

```bash
npm run test
```

**E2E tests**

```bash
npm run test:e2e
```

**Test coverage**

```bash
npm run test:cov
```

## Docker

You can run the application using Docker. Make sure you have Docker and Docker Compose installed.

To build and run the containers, use:

```bash
docker-compose up --build
```

This will start the application on port `3000` and the PostgreSQL database on port `5433`.

## API Documentation

The API documentation is available via Swagger. Once the application is running, you can access it at:

[http://localhost:3000/api](http://localhost:3000/api)
