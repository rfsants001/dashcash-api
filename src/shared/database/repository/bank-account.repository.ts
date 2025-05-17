import { BankAccount, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseRepository } from './base.repository';

export class BankAccountRepository extends BaseRepository<
  BankAccount,
  Prisma.BankAccountCreateInput,
  Prisma.BankAccountUpdateInput
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, prisma.bankAccount);
  }

  async createRaw(data: Prisma.BankAccountCreateInput): Promise<BankAccount> {
    return this.create(data);
  }

  async updateRaw(
    where: Prisma.BankAccountWhereUniqueInput,
    data: Prisma.BankAccountUpdateInput,
  ): Promise<BankAccount> {
    return this.update(where, data);
  }

  async findManyRaw(params: Prisma.BankAccountFindManyArgs): Promise<any> {
    return this.findMany(params);
  }

  async deleteRaw(
    where: Prisma.BankAccountWhereUniqueInput,
  ): Promise<BankAccount> {
    return this.delete(where);
  }
}
