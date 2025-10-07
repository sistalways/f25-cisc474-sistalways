import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['process.env.FRONTEND_URL','sistalways-g5gqi7wh3-girish-sistas-projects.vercel.app','https://f25-cisc474-sistalways.onrender.com','http://localhost:3000', 'http://localhost:30001'],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    Credentials: true
  });
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  await app.listen(port, host);
}

void bootstrap();
