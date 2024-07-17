import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserSchema } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { ZodValidationPipe } from './pipes/zodPipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    @UsePipes(new ZodValidationPipe(UserSchema))
    create(@Body() userDto: UserDto): Promise<User>{
        return this.userService.create(userDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findById(@Param("id") id: string): Promise<User>{
        return this.userService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @UsePipes(new ZodValidationPipe(UserSchema))
    updateOne(@Body() userDto: UserDto): Promise<User>{
        return this.userService.updateOne(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteById(@Param("id") id: string): Promise<User>{
        return this.userService.deleteById(id);
    }


}
