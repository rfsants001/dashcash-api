import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repository/bank-account.repository';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership/validate-bank-account-ownership.service';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly bankAccountRepo: BankAccountRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    try {
      return this.bankAccountRepo.create({
        name,
        initialBalance,
        color,
        type,
        user: { connect: { id: userId } },
      });
    } catch (error) {
      console.error(
        '[BankAccountService][create] Error creating bank account:',
        error,
      );
      throw new InternalServerErrorException('Failed to create bank account');
    }
  }

  findAll(userId: string) {
    try {
      return this.bankAccountRepo.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(
        `[BankAccount][find] Failed to find bank accounts for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to find transactions');
    }
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { name, initialBalance, color, type } = updateBankAccountDto;

    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      const bankAccount = await this.bankAccountRepo.update({
        where: {
          id: bankAccountId,
        },
        data: {
          name,
          initialBalance,
          color,
          type,
        },
      });

      return bankAccount;
    } catch (error) {
      console.error(
        `[BankAccount][update] Failed to update bank account=${bankAccountId} for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to update bank account');
    }
  }

  async remove(userId: string, bankAccountId: string) {
    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      return {
        message: 'BankAccount removed successfully',
        bankAccountId,
      };
    } catch (error) {
      console.error(
        `[BankAccount][remove] Failed to remove bank account for userId=${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove bank account');
    }
  }
}
