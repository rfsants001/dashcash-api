import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBankAccountDto } from '../../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from '../validate-bank-account-ownership/validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { color, initialBalance, name, type } = createBankAccountDto;
    return this.bankAccountRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountRepo.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            type: true,
            amount: true,
          },
        },
      },
    });

    return bankAccounts.map((bankAccount) => ({
      ...bankAccount,
      currentBalance: bankAccount.transactions.reduce(
        (acc, transaction) =>
          transaction.type === 'INCOME'
            ? acc + transaction.amount
            : acc - transaction.amount,
        bankAccount.initialBalance,
      ),
    }));
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      const { color, initialBalance, name, type } = updateBankAccountDto;
      return this.bankAccountRepo.update({
        where: {
          id: bankAccountId,
        },
        data: {
          color,
          initialBalance,
          name,
          type,
        },
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async remove(userId: string, bankAccountId: string) {
    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      await this.bankAccountRepo.delete({
        where: {
          id: bankAccountId,
        },
      });
      return null;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
