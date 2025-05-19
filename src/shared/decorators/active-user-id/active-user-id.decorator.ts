import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContextHost): string => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return userId;
  },
);
