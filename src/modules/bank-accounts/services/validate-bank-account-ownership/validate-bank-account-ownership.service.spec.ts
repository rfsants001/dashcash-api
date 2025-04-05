import { Test, TestingModule } from '@nestjs/testing';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

describe('ValidateBankAccountOwnershipService', () => {
  let service: ValidateBankAccountOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateBankAccountOwnershipService],
    }).compile();

    service = module.get<ValidateBankAccountOwnershipService>(ValidateBankAccountOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
