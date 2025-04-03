import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionsOwnershipService {
  constructor(private readonly transactionsRepo: TransactionRepository) {}
  async validate(userId: string, transactionId: string) {
    const bankAccount = await this.transactionsRepo.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
    if (!bankAccount) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
