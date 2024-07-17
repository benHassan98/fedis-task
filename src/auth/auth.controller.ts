import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("signin")
    signin(@Body("username") username: string, @Body("password") password: string): Promise<any>{
        return this.authService.signin(username, password);
    }


}
