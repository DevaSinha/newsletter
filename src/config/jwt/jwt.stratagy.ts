import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/service/user.service';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
    email: string;
    sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private secret_key = process.env.JWT_SECRET
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
