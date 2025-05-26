import { INestApplication, Logger } from '@nestjs/common';

export function applyLoggerConfig(app: INestApplication) {
  const logger = new Logger('LoggerConfig');

  logger.log('✅ Logger configuration applied');

  const server = app.getHttpServer();
  const address = server.address();

  const port =
    typeof address === 'object' && address?.port
      ? address.port
      : (process.env.PORT ?? 3000);

  logger.log(`🚀 Application running on port ${port}`);
}
