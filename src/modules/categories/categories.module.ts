import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoriesOwnershipService } from './services/validate-categories-ownership/validate-categories-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoriesOwnershipService],
  exports: [ValidateCategoriesOwnershipService],
})
export class CategoriesModule {}
