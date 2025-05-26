import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogginInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { method, uurl } = req;
    const now = Date.now();

    this.logger.log(
      `Incoming request: ${method} ${uurl}`,
      LogginInterceptor.name,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Request processed: ${method} ${uurl} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
