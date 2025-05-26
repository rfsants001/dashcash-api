import { INestApplication, ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export function applySecurityConfig(app: INestApplication) {
  app.use(helmet());

  app.enableCors({
    origin: '*', //⚠️ Adjust this to your needs, '*' allows all origins
    credentials: true,
  });

  const limit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

  app.use(limit);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
}
