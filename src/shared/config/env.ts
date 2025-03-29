import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dbUrl: string;
}
export const env: Env = plainToInstance(Env, {
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  console.error('⚠️  Environment variables validation error:');
  console.error(JSON.stringify(errors, null, 2));
  throw new Error(`Please check your .env file or environment variables.`);
}
