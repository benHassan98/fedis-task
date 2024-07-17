import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    create(@Body("user") userDto: UserDto): Promise<User>{
        return this.userService.create(userDto);
    }

    @Get()
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: ObjectId): Promise<User>{
        return this.userService.findById(id);
    }

    @Put()
    updateOne(@Body("user") userDto: UserDto): Promise<boolean>{
        return this.userService.updateOne(userDto);
    }

    @Delete(":id")
    deleteById(@Param("id") id: ObjectId): Promise<User>{
        return this.userService.deleteById(id);
    }


}
