import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id/active-user-id.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(userId, createTransactionDto);
  }

  @Get()
  findAllById(@ActiveUserId() userId: string) {
    return this.transactionService.findAllById(userId);
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(
      userId,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionService.remove(userId, transactionId);
  }
}
