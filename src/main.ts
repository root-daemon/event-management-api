import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Event Management API')
    .setDescription(
      `
      API documentation for managing events and authentication.
      
      ## Authentication
      This API uses JWT Bearer token authentication.
      
      ### Registration and Login Flow:
      1. Register a new user via POST /auth/register
      2. Login via POST /auth/login to receive a JWT token
      3. Use the token in the Authorization header as 'Bearer [token]' for protected endpoints
      
      ### Protected Routes:
      - All routes except /auth/register and /auth/login require authentication
      - Authenticated users can access their profile at GET /users/profile
    `,
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication operations (register, login)')
    .addTag('users', 'User operations (profile, account management)')
    .addTag('events', 'Event management operations')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name is used in @ApiBearerAuth() decorator
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Get port from environment variable or use 3000 as default
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
