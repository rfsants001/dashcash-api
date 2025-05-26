import { INestApplication } from '@nestjs/common';
import { applySecurityConfig } from './security.config';
import { applyLoggerConfig } from './logger.config';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

export function applyGlobalConfig(app: INestApplication) {
  applySecurityConfig(app);

  applyLoggerConfig(app);

  app.useGlobalInterceptors(new LogginInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
}
