import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from 'src/shared/database/repository/transaction.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async validate(userId: string, transactionId: string) {
    const transaction = await this.transactionRepo.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) {
      throw new NotFoundException(
        'Transaction not found or does not belong to the user',
      );
    }

    return transaction;
  }
}
