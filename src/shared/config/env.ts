import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class EnvConfig {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;
}

const dbUrl = process.env.DB_HOST ?? '';

export const env: EnvConfig = plainToInstance(EnvConfig, {
  DB_HOST: dbUrl,
});

const errors = validateSync(env);

if (errors.length > 0) {
  console.error('Environment variables validations error:', errors);
  console.error(JSON.stringify(errors, null, 2));
  throw new Error(`Please check your .env file or environment variables.`);
}
