// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: 'id_usuario' | 'correo' | 'tipo_usuario' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // @CurrentUser('id_usuario') o @CurrentUser('correo')
    if (data) {
      return user[data];
    }

    // @CurrentUser() → objeto completo
    return user;
  },
);
