import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth-guard.guard';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [DatabaseModule, AuthModule, BankAccountModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
