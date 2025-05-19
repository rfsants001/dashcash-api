import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  create(createDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createDto);
  }

  findMany(findMany: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findMany);
  }

  findFirst(findFirst: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirst);
  }

  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDto);
  }

  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDto);
  }
}
