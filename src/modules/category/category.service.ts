import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  findAll(userId: string) {
    return this.categoryRepo.findMany({
      where: {
        userId,
      },
    });
  }
}
