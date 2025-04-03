import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  findMany(findMany: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findMany);
  }

  findFirst(findFirst: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirst);
  }

  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto);
  }

  delete(deleteDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteDto);
  }
}
