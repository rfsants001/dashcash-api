import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership/validate-bank-account-ownership.service';

@Module({
  controllers: [BankAccountController],
  providers: [BankAccountService, ValidateBankAccountOwnershipService],
  exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountModule {}
