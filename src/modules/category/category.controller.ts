import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ActiveUserId } from 'src/shared/decorators/active-user-id/active-user-id.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoryService.findAll(userId);
  }
}
