import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService){}

    async login(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        
        if(user && await bcrypt.compare(password, user.password)){
            const payload = { username: user.username, sub: user._id };
            return {
              access_token: this.jwtService.sign(payload),
              
            };
            
        }
        
        throw new UnauthorizedException("username/password invalid");
        
    }

    

}
