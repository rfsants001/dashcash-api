import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
