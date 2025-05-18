import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseRepository } from './base.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, prisma.user);
  }

  async createRaw(data: Prisma.UserCreateInput): Promise<User> {
    return this.create(data);
  }

  async updateRaw(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.update(where, data);
  }

  async deleteRaw(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.delete(where);
  }

  async findByEmail(email: string): Promise<any> {
    return this.findUnique({ email });
  }
}
