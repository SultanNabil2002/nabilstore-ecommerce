/* eslint-disable prettier/prettier */
// src/common/decorators/get-user.decorator.ts

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Custom decorator to extract user from request

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
});