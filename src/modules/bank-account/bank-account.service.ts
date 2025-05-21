import { Injectable } from '@nestjs/common';
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

    return this.bankAccountRepo.create({
      name,
      initialBalance,
      color,
      type,
      user: { connect: { id: userId } },
    });
  }

  findAll(userId: string) {
    return this.bankAccountRepo.findMany({
      where: {
        userId,
      },
    });
  }

  update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { name, initialBalance, color, type } = updateBankAccountDto;

    try {
      void this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      return this.bankAccountRepo.update({
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
    } catch (error) {
      console.error('Error validating bank account ownership:', error);
      throw new Error('Bank account not found or not owned by user');
    }
  }

  remove(userId: string, bankAccountId: string) {
    try {
      void this.validateBankAccountOwnershipService.validate(
        userId,
        bankAccountId,
      );

      return this.bankAccountRepo.delete({
        where: {
          id: bankAccountId,
        },
      });
    } catch (error) {
      console.error('Error validating bank account ownership:', error);
      throw new Error('Bank account not found or not owned by user');
    }
  }
}
