import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

    async findById(id: ObjectId): Promise< User > {

        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async updateOne(userDto: UserDto): Promise<boolean>{
        if(!userDto.id){
            throw new BadRequestException("Id should exist when updating user");
        }

        const updatedUser = await this.userModel.updateOne({_id:userDto.id}, userDto);
        return updatedUser.acknowledged;
    }

    async deleteById(id: ObjectId): Promise<User>{
        
        const user = await this.userModel.findByIdAndDelete(id);

        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;        
    }
}

