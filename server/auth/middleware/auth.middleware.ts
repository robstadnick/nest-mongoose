import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { MessageCodeError } from '../../errors';
import { UserService } from '../../modules/users/user.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private _userService: UserService
    ){}
    public async use(req, res, next) {
        if (req.headers.authorization && (req.headers.authorization as string)) {
            const token = (req.headers.authorization as string).replace('Bearer access-token-', '')
            if(!token){
                throw new UnauthorizedException('No Access')
            }
            const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');
            const user = await this._userService.findById(decoded.id);
            // const user = await ModelUser.findOne({
            //     where: {
            //         id: decoded.id,
            //         email: decoded.email
            //     }
            // });
            if (!user) throw new UnauthorizedException
            next();
        } else {
            throw new UnauthorizedException('No Access')
        }
    }
}