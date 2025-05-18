import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class EnvConfig {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export const env: EnvConfig = plainToInstance(EnvConfig, {
  DB_HOST: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  console.error('Environment variables validations error:', errors);
  console.error(JSON.stringify(errors, null, 2));
  throw new Error(`Please check your .env file or environment variables.`);
}
