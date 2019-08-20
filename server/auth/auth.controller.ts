import { Controller, Get, Post, Body, NotFoundException, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../modules/users/user.service';
import { DTOSetPassword } from './interfaces/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        // tslint:disable-next-line: variable-name
        private _authService: AuthService,
        private _userService: UserService
    ) { }

    @Post('sign-in')
    async signIn(@Body() body, @Res() res) {
        const { email, password } = body;
        const user = await this._authService.findByEmailAndPassword(email, password);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        try {
            const token = await this._authService.generateAuthToken(user);
            const refreshToken = await this._authService.generateRefreshToken(user);
            // TODO: Logger service
            // let broker_code
            // if (user.is_employee) {
            //     broker_code = null
            // } else {
            //     broker_code = user.broker_code
            // }
            return res.status(200).json({ token, refreshToken })
        } catch (error) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
    }
    @Post('sign-out')
    async signout(@Res() res) {
        const success = 'success';
        return res.status(200).json(success)
    }

    @Post('request-pass')
    async forgotPass(@Body() body, @Req() req, @Res() res) {
        const user = await this._userService.findOne({ where: { email: body.email } });
        if (!user) {
            throw new NotFoundException(`User with email ${body.email} not found`);
        }
        const reset = await this._authService.passwordResetToken(user, req);
        const sent = await this._authService.sendResetEmailMailGun(reset.user, reset.url);
        return res.status(200).json(sent)
    }

    @Post('set-pass')
    async setPasswordQ(@Body() body: DTOSetPassword, @Res() res) {
        const update = await this._authService.setPassword(body);
        return res.status(200).json(update)
    }

}
