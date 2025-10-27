import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read env vars correctly
  const frontendUrl = process.env.FRONTEND_URL || 'https://cisc474-ind-frontend.vjgcs.workers.dev';
  const backendUrl = process.env.VITE_BACKEND_URL || 'https://f25-cisc474-sistalways.onrender.com';

  app.enableCors({
    origin: [
      frontendUrl,
      'http://localhost:3000',
      'http://localhost:3001',
      backendUrl,
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = 3000;
  await app.listen(port);
}

void bootstrap();

