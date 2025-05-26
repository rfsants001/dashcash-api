import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ValidateBankAccountOwnershipService } from '../bank-account/validate-bank-account-ownership/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../category/services/validate-category-ownership/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './service/validate-transaction-ownership/validate-transaction-ownership.service';
import { TransactionRepository } from 'src/shared/database/repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly bankAccountValidate: ValidateBankAccountOwnershipService,
    private readonly categoryValidate: ValidateCategoryOwnershipService,
    private readonly transactionValidate: ValidateTransactionOwnershipService,
  ) {}

  create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, description, value, type, date } =
      createTransactionDto;

    try {
      void this.validateOwnership(userId, bankAccountId, categoryId);

      return this.transactionRepo.create({
        data: {
          userId,
          bankAccountId,
          categoryId,
          description,
          value,
          type,
          date,
        },
      });
    } catch (error) {
      console.error(
        `[TransactionService][create] Failed to create transaction`,
        error,
      );
      throw new InternalServerErrorException('Failed to create transaction');
    }
  }

  findAllById(userId: string) {
    try {
      return this.transactionRepo.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(
        `[TransactionService][find] Failed to find transactions for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to find transactions');
    }
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, description, value, type, date } =
      updateTransactionDto;

    try {
      await this.validateOwnership(
        userId,
        bankAccountId,
        categoryId,
        transactionId,
      );

      const transaction = await this.transactionRepo.update({
        where: {
          id: transactionId,
          userId,
        },
        data: {
          bankAccountId,
          categoryId,
          description,
          value,
          type,
          date,
        },
      });

      return transaction;
    } catch (error) {
      console.error(
        `[TransactionService][update] Failed to update transactionId=${transactionId} for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to update transaction');
    }
  }

  async remove(userId: string, transactionId: string) {
    try {
      await this.transactionValidate.validate(userId, transactionId);

      await this.transactionRepo.delete({
        where: {
          id: transactionId,
          userId,
        },
      });

      return {
        message: 'Transaction removed successfully',
        transactionId,
      };
    } catch (error) {
      console.error(
        `[TransactionService][remove] Failed to remove transaction for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove transaction');
    }
  }

  private async validateOwnership(
    userId: string,
    bankAccountId?: string,
    categoryId?: string,
    transactionId?: string,
  ) {
    await Promise.all([
      bankAccountId && this.bankAccountValidate.validate(userId, bankAccountId),
      categoryId && this.categoryValidate.validate(userId, categoryId),
      transactionId && this.transactionValidate.validate(userId, transactionId),
    ]);
  }
}
