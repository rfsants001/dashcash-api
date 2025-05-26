import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async findAll(userId: string) {
    try {
      return await this.categoryRepo.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error('[CategoryService][find] Error in findAll:', error);
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }
}
