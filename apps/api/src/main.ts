import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read env vars correctly
  const frontendUrl = process.env.FRONTEND_URL || 'https://cisc474-ind-frontend.vjgcs.workers.dev';
  const backendUrl = process.env.VITE_BACKEND_URL || 'https://f25-cisc474-sistalways.onrender.com';

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.VITE_BACKEND_URL ,
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

void bootstrap();

