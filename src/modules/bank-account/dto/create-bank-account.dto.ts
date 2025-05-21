import { BankAccountType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;

  @IsNotEmpty()
  @IsString()
  type: BankAccountType;

  @IsNotEmpty()
  @IsString()
  color: string;
}
