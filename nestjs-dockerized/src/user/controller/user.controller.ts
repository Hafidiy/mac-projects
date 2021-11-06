import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    add(@Body() user: IUser): Promise<IUser> {
        return this.userService.add(user);
    }

    @Get()
    findAll(): Promise<IUser[]> {
        return this.userService.findAll();
    }
}
