import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from 'src/dto/user.dto';

export interface JwtToken {
    access_token: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<JwtToken> {
        const user = await this.userService.findByEmail(loginDto.email);
        if (
            !user ||
            !(await this.userService.comparePassword(loginDto.password, user.password_hash))
        ) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email };
        const accessToken = await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET});
        return { access_token: accessToken };
    }
}