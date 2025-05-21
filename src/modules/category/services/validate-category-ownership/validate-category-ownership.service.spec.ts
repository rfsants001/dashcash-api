import { Test, TestingModule } from '@nestjs/testing';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

describe('ValidateCategoryOwnershipService', () => {
  let service: ValidateCategoryOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateCategoryOwnershipService],
    }).compile();

    service = module.get<ValidateCategoryOwnershipService>(ValidateCategoryOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
