import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { BankAccountRepository } from './repository/bank-account.repository';
import { CategoryRepository } from './repository/category.repository';
import { TransactionRepository } from './repository/transaction.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    BankAccountRepository,
    CategoryRepository,
    TransactionRepository,
  ],
  exports: [
    UserRepository,
    BankAccountRepository,
    CategoryRepository,
    TransactionRepository,
  ],
})
export class DatabaseModule {}
