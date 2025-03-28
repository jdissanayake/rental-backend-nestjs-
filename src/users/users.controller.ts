import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService:UsersService
    ){};

    @Post()
    createUser(@Body() user:UserEntity){
        return this.userService.createUser(user);
    }

    @Get()
    getUsers(){
        return this.userService.getUser();
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userData: Partial<UserEntity>) {
        const updatedUser = await this.userService.updateUser(id, userData);
        return { message: `User with ID ${id} updated successfully`, updatedUser };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: `User with ID ${id} deleted successfully` };
    }
}
