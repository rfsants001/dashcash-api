import { PartialType } from '@nestjs/mapped-types';
import { SigninDto } from './signin.dto.';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto extends PartialType(SigninDto) {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
