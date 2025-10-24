import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_URL,'cisc474-ind-frontend.vjgcs.workers.dev','https://f25-cisc474-sistalways.onrender.com','http://localhost:3000', 'http://localhost:3001',process.env.VITE_BACKEND_URL],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    credentials: true
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

void bootstrap();
