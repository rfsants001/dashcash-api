import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ValidateTransactionOwnershipService } from './service/validate-transaction-ownership/validate-transaction-ownership.service';
import { CategoryModule } from '../category/category.module';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  imports: [CategoryModule, BankAccountModule],
  controllers: [TransactionController],
  providers: [TransactionService, ValidateTransactionOwnershipService],
  exports: [ValidateTransactionOwnershipService],
})
export class TransactionModule {}
