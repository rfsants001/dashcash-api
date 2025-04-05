import { Test, TestingModule } from '@nestjs/testing';
import { ValidateCategoriesOwnershipService } from './validate-categories-ownership.service';

describe('ValidateCategoriesOwnershipService', () => {
  let service: ValidateCategoriesOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateCategoriesOwnershipService],
    }).compile();

    service = module.get<ValidateCategoriesOwnershipService>(ValidateCategoriesOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
