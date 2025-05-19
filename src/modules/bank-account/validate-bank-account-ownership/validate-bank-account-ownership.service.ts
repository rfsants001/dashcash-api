import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepository } from 'src/shared/database/repository/bank-account.repository';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccontRepo: BankAccountRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccontRepo.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException(
        'Bank account not found or does not belong to the user',
      );
    }
  }
}
