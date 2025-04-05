import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../dto/update-transaction.dto';
import { TransactionRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../../bank-accounts/services/validate-bank-account-ownership/validate-bank-account-ownership.service';
import { ValidateCategoriesOwnershipService } from '../../../categories/services/validate-categories-ownership/validate-categories-ownership.service';
import { ValidateTransactionsOwnershipService } from '../validate-transactions-ownership/validate-transactions-ownership.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validadeCategoryOwnershipService: ValidateCategoriesOwnershipService,
    private readonly validateTransactionsOwnershipService: ValidateTransactionsOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { categoryId, bankAccountId, description, amount, date, type } =
      createTransactionDto;
    await this.validateCategoryOwnership({
      userId,
      categoryId,
      bankAccountId,
    });

    return this.transactionRepository.create({
      data: {
        userId,
        categoryId,
        bankAccountId,
        description,
        amount,
        date,
        type,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    const { month, year, bankAccountId, type } = filters;
    return this.transactionRepository.findMany({
      where: {
        userId,
        bankAccountId: bankAccountId,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1)),
        },
        type: type,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { categoryId, bankAccountId, description, amount, date, type } =
      updateTransactionDto;
    await this.validateCategoryOwnership({
      userId,
      categoryId,
      bankAccountId,
      transactionId,
    });
    return this.transactionRepository.update({
      where: {
        id: transactionId,
      },
      data: {
        categoryId,
        bankAccountId,
        description,
        amount,
        date,
        type,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionsOwnershipService.validate(
      userId,
      transactionId,
    );
    return this.transactionRepository.delete({
      where: {
        id: transactionId,
      },
    });
  }

  private async validateCategoryOwnership({
    userId,
    categoryId,
    bankAccountId,
    transactionId,
  }: {
    userId: string;
    categoryId?: string;
    bankAccountId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionsOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validadeCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
