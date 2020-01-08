import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../modules/users/user.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private _userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload) {
        const { email } = payload;
        const user = this._userService.findOne({ email });
        if (!user) {
            throw new NotFoundException(`Could not find user with email ${email}`);
        }
        return user;
    }
}
