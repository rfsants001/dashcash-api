import { Category, Prisma } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../prisma/prisma.service';

export class CategoryRepository extends BaseRepository<
  Category,
  Prisma.CategoryCreateInput,
  Prisma.CategoryUpdateInput
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, prisma.category);
  }

  async createRaw(data: Prisma.CategoryCreateInput[]): Promise<Category[]> {
    return this.createMany(data);
  }

  async updateRaw(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.update(where, data);
  }

  async findManyRaw(where: Prisma.CategoryWhereInput): Promise<Category[]> {
    return this.findMany({ where });
  }
}
