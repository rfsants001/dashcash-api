import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repository/category.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async validate(userId: string, categoryId: string) {
    const category = await this.categoryRepo.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException(
        'Category not found or does not belong to the user',
      );
    }
  }
}
