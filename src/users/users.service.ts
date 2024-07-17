import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from "./schemas/user.schema";
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User> ){}

    create(userDto: UserDto): Promise<User>{
        if(userDto.id){
            throw new BadRequestException("Id shouldn't exist when creating new user");
        }
        const savedUser = new this.userModel(userDto);
        return savedUser.save();
    }

    findAll(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    findOne(id: string): Promise< User | null > {
        return this.userModel.findById(id).exec();
    }

    // updateOne(userDto: UserDto): Promise<User>{
    //     if(!userDto.id){
    //         throw new BadRequestException("Id should exist when updating user");
    //     }

    //     const updatedUser = this.userModel.updateOne({_id:userDto.id}, userDto);
    //     return updatedUser.exec();
    // }

    deleteOne(){}
}

