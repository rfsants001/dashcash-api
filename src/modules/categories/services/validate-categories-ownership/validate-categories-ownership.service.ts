import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoriesOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}
  async validate(userId: string, categoryId: string) {
    const category = await this.categoriesRepo.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
