import { Test, TestingModule } from '@nestjs/testing';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

describe('ValidateTransactionOwnershipService', () => {
  let service: ValidateTransactionOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateTransactionOwnershipService],
    }).compile();

    service = module.get<ValidateTransactionOwnershipService>(ValidateTransactionOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
