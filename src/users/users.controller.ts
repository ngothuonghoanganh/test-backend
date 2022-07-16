import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post("/register")
    create(@Body() user: Users) {
        return this.service.createUser(user);
    }

    @Post("/login")
    login(@Body() user: Users) {
        return this.service.login(user);
    }

    @Put("/reset-password")
    resetPassword(@Body() user: Users) {
        return this.service.resetPassword(user);
    }

    @Put("/:id")
    update(@Body() user: Users, @Param() id: number) {
        return this.service.updateUser(id, user);
    }
}
