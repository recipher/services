import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Key = createParamDecorator((_, ctx: ExecutionContext ) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user && request.user.key;
});