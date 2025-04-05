import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountRepo: BankAccountsRepository) {}
  async validate(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountRepo.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
