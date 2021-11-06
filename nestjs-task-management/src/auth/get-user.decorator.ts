import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, req: ExecutionContext): User => {
    const user = req.switchToHttp().getRequest().user;
    return user;
});