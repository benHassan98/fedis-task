import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserSchema } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { ObjectId } from 'mongoose';
import { ZodValidationPipe } from './pipes/zodPipe';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    @UsePipes(new ZodValidationPipe(UserSchema))
    create(@Body() userDto: UserDto): Promise<User>{
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
    @UsePipes(new ZodValidationPipe(UserSchema))
    updateOne(@Body("user") userDto: UserDto): Promise<boolean>{
        return this.userService.updateOne(userDto);
    }

    @Delete(":id")
    deleteById(@Param("id") id: ObjectId): Promise<User>{
        return this.userService.deleteById(id);
    }


}
