/**
 * Base repository class for handling database operations.
 *
 */
import { PrismaService } from '../prisma/prisma.service';

export abstract class BaseRepository<TModel, TCreateInput, TUpdateInput> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: {
      create(args: { data: TCreateInput }): Promise<TModel>;
      findUnique(args: { where: any }): Promise<TModel | null>;
      findMany(args?: any): Promise<TModel[]>;
      update(args: { where: any; data: TUpdateInput }): Promise<TModel>;
      delete(args: { where: any }): Promise<TModel>;
    },
  ) {}

  create(data: TCreateInput): Promise<TModel> {
    return this.model.create({ data });
  }

  createMany(data: TCreateInput[]): Promise<TModel[]> {
    return Promise.all(data.map((item) => this.create(item)));
  }

  findUnique(where: any): Promise<TModel | null> {
    return this.model.findUnique({ where });
  }

  findMany(args?: any): Promise<TModel[]> {
    return this.model.findMany(args);
  }

  update(where: any, data: TUpdateInput): Promise<TModel> {
    return this.model.update({ where, data });
  }

  delete(where: any): Promise<TModel> {
    return this.model.delete({ where });
  }
}
