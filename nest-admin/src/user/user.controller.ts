import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Get()
    @HasPermission('users')
    all(
        @Query('page') page = 1 
    ) {
        return this.userService.paginate(page, ['role']);
    }

    @Post()
    @HasPermission('users')
    async create(
        @Body() body: UserCreateDto
    ) {
        const {role_id, ...data} = body;

        const password = await bcrypt.hash('1234', 12);
        const role = {id: role_id};

        return this.userService.create({
            ...data,
            password,
            role,
        });
    }

    @Get(':id')
    @HasPermission('users')
    async get(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.userService.findOne({id}, ['role']);
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto,
    ) {
        const id = await this.authService.userId(request);
        
        await this.userService.update(id, body);

        return this.userService.findOne({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if(password !== password_confirm){
            throw new BadRequestException('Passwords do not match!')
        }

        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password, 12);
        
        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne({id});
    }

    @Put(':id')
    @HasPermission('users')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UserUpdateDto,
    ) {
        const {role_id, ...data} = body;
        const role = {id: role_id};
        
        await this.userService.update(id, {
            ...data,
            role,
        });

        return this.userService.findOne({id});
    }

    @Delete(':id')
    @HasPermission('users')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.userService.delete(id);
    }
}
