import { Prisma, Transaction } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../prisma/prisma.service';

export class TransactionRepository extends BaseRepository<
  Transaction,
  Prisma.TransactionCreateInput,
  Prisma.TransactionUpdateInput
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, prisma.transaction);
  }

  async createRaw(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    return this.create(data);
  }

  async updateRaw(
    where: Prisma.TransactionWhereUniqueInput,
    data: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    return this.update(where, data);
  }

  async findManyRaw(params: Prisma.TransactionFindManyArgs): Promise<any> {
    return this.findMany(params);
  }

  async deleteRaw(
    where: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction> {
    return this.delete(where);
  }
}
