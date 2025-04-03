import { Test, TestingModule } from '@nestjs/testing';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';

describe('ValidateTransactionsOwnershipService', () => {
  let service: ValidateTransactionsOwnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateTransactionsOwnershipService],
    }).compile();

    service = module.get<ValidateTransactionsOwnershipService>(ValidateTransactionsOwnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
