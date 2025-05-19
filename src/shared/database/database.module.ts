import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { BankAccountRepository } from './repository/bank-account.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, BankAccountRepository],
  exports: [UserRepository, BankAccountRepository],
})
export class DatabaseModule {}
