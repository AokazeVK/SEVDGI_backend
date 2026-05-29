import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { AUDIT_ACTION_KEY } from '../decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const action = this.reflector.getAllAndOverride<string>(AUDIT_ACTION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!action) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const method = request.method;
    const path = request.originalUrl ?? request.url;
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'];

    return next.handle().pipe(
      tap(async (response) => {
        await this.prisma.auditLog.create({
          data: {
            userId: user?.id,
            action,
            module: this.getModuleFromPath(path),
            entity: undefined,
            entityId: this.getEntityId(request, response),
            method,
            path,
            ipAddress,
            userAgent,
            newData: this.safeJson(response),
          },
        });
      }),
    );
  }

  private getModuleFromPath(path: string): string | undefined {
    const parts = path.split('/').filter(Boolean);

    // /api/medicines => medicines
    if (parts[0] === 'api') {
      return parts[1];
    }

    return parts[0];
  }

  private getEntityId(request: any, response: any): string | undefined {
    return request.params?.id ?? response?.id ?? response?.data?.id;
  }

  private safeJson(value: unknown) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      return undefined;
    }
  }
}
