import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../modules/users/user.service';
// tslint:disable: variable-name
// tslint:disable: new-parens
@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private _userService: UserService
    ) { }
    public async use(req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            if (req.headers.apikey === process.env.TEST_APIKEY) {
                return next();
            }
        }
        if (req.headers.authorization && (req.headers.authorization as string)) {
            const token = (req.headers.authorization as string).replace('Bearer access-token-', '');
            if (!token) {
                throw new UnauthorizedException('No Access');
            }
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
                const user = await this._userService.findById(decoded._id);
                if (!user) { throw new UnauthorizedException('User Not Found'); }
                req.jwt_user = user;
                return next();
            } catch (error) {
                throw new UnauthorizedException('Access Rejected', 'No access allowed');
            }
        } else {
            throw new UnauthorizedException('No Access');
        }
    }
}
