import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(
        private roleService: RoleService
    ) {}

    @Get()
    @HasPermission('roles')
    async all() {
        return this.roleService.all(['permissions']);
    }

    @Post()
    @HasPermission('roles')
    async create(
        @Body('name') name: string,
        @Body('permissions') ids: number[],
    ) {
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({id}))
        });
    }

    @Get(':id')
    @HasPermission('roles')
    async get(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.roleService.findOne({id}, ['permissions']);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string,
        @Body('permissions') ids: number[],
    ) {
        await this.roleService.update(id, {name});

        const role = await this.roleService.findOne(id);

        return this.roleService.create({
            ...role,
            permissions: ids.map(id => ({id}))
        })
    }

    @Delete(':id')
    @HasPermission('roles')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.roleService.delete(id);
    }
}
