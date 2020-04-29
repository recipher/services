import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Session = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.user && request.user[data] : request.user;
});