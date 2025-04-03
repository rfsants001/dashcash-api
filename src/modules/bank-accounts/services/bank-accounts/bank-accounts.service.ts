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

  findAllByUserId(userId: string) {
    return this.bankAccountRepo.findFirst({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    banckAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        banckAccountId,
      );

      const { color, initialBalance, name, type } = updateBankAccountDto;
      return this.bankAccountRepo.update({
        where: {
          id: banckAccountId,
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

  async remove(userId: string, banckAccountId: string) {
    try {
      await this.validateBankAccountOwnershipService.validate(
        userId,
        banckAccountId,
      );

      await this.bankAccountRepo.delete({
        where: {
          id: banckAccountId,
        },
      });
      return null;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
