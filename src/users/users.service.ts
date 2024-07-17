import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId }  from 'mongoose';
import {User} from "./schemas/user.schema";
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User> ){}

    async create(userDto: UserDto): Promise<User>{
        if(userDto.id){
            throw new BadRequestException("Id shouldn't exist when creating new user");
        }
        const savedUser = new this.userModel(userDto);
        return savedUser.save();
    }

    async findAll(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise< User > {
        
        let user;
        try{
            user = await this.userModel.findById(id);
        }
        catch(err){
            throw new BadRequestException("Bad id");
        }

        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async updateOne(userDto: UserDto): Promise<User>{
        if(!userDto.id){
            throw new BadRequestException("Id should exist when updating user");
        }

        let updatedUser;
        try{
            updatedUser = await this.userModel.findByIdAndUpdate(userDto.id, userDto);
        }
        catch(err){
            throw new BadRequestException("Bad id");   
        }

        if(!updatedUser){
            throw new NotFoundException("User not found");
        }

        return updatedUser;
    }

    async deleteById(id: string): Promise<User>{
        
        let user;
        try{
            user = await this.userModel.findByIdAndDelete(id);
        }
        catch(err){
            throw new BadRequestException("Bad id");
        }

        if(!user){
            throw new NotFoundException("User not found");
        }

        return user;        
    }
}

