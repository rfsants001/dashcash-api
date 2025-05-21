import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { BankAccountRepository } from './repository/bank-account.repository';
import { CategoryRepository } from './repository/category.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    BankAccountRepository,
    CategoryRepository,
  ],
  exports: [UserRepository, BankAccountRepository, CategoryRepository],
})
export class DatabaseModule {}
