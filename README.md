# Event Management API

This is an Event Management API built with the [Nest](https://github.com/nestjs/nest) framework. I choose this framework cause I come from Laravel and the Module File Structure. I prefer this structure for scalablity. I could have used Hono or Elysia or Laravel (PHP Goated!!), but NestJS seemed like the right fit. I setup docker set it up and vist the /api endpoint to access the Swagger Docs. 

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
