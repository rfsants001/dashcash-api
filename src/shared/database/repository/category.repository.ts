import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }
}
