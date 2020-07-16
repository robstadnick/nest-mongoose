import { Injectable, ConflictException, NotFoundException, UnauthorizedException, ServiceUnavailableException, BadRequestException } from '@nestjs/common';
import { UserService } from '../../modules/users/user.service';
import { MailGunService } from '../../services/mail-gun/mail-gun.service';
import { DTOPasswordResetURL } from '../interfaces/auth.dto';

import * as crypto from 'crypto';
import { Request } from 'express';
import { ModelUser } from '../../mongo/models/users/user.model';
// tslint:disable: variable-name
// tslint:disable: new-parens
@Injectable()
export class VerifyEmailService {
    constructor(
        private _userService: UserService,
        private _mailGunService: MailGunService,
    ) {

    }

    async generateToken(user: ModelUser): Promise<number> {
        // Generates reset password token using crypto buffer to hex
        const snstoken = Math.floor(100000 + Math.random() * 900000);
        const date = new Date();
        date.setHours(date.getHours() + 72);
        // Set password reset url
        user.reset_password_expires = date;
        user.sms_reset_password_token = snstoken;
        await this._userService.update(user);
        return snstoken;
    }

    async sendEmailValidationToken(user, snstoken) {
        const data = {
            from: 'Welcome to Street Parking - <noreply@streetparking.com>',
            // from: 'Welcome to Zastc - Set Up Your Password <noreply@zastc.com>',
            to: user.email,
            subject: 'Please Verify Your Email',
            text: `Here is your passcode ${snstoken}`
        };
        return await this._mailGunService.sendEmail(data);
    }

    async getUserValidateToken(email, token): Promise<any> {
        const user = await this._userService.findOne({ email, sms_reset_password_token: token, reset_password_expires: { $gt: Date.now() } });
        if (!user) {
            throw new NotFoundException(`User not found or token expired`);
        }
        user.email_verified = true;
        user.email_verified_date = new Date();
        await this._userService.update(user);
        const safeUser = await this._userService.findById(user._id);
        return safeUser;
    }

    async autoVerifySendEmail(user: ModelUser, req: Request): Promise<DTOPasswordResetURL> {
        // Generates reset password token using crypto buffer to hex
        const token = crypto.randomBytes(25).toString('hex');
        const date = new Date();
        date.setHours(date.getHours() + 168);
        let url;
        if (process.env.NODE_ENV === 'development') {
            url = `${req.hostname}:${process.env.PORT}/auth/verify-email-auto/${token}`;
        } else {
            url = `https://${req.hostname}/auth/verify-email-auto/${token}`;
        }
        // Set password reset url
        user.reset_password_expires = date;
        user.reset_password_token = token;
        await this._userService.update(user);
        // await this._userService.update(user);
        return { user, url };
    }

    async autoVerifyEmailValidate(body, req: Request): Promise<boolean> {
        const user = await this._userService.findOne({ reset_password_token: body.token, reset_password_expires: { $gt: Date.now() } });
        if (user) {
            user.email_verified = true;
            user.email_verified_date = new Date();
            await this._userService.update(user);
            return true;
        } else {
            const emailUser = await this._userService.findOne({ reset_password_token: body.token });
            await this.autoVerifySendEmail(emailUser, req);
            return false;
        }
    }
}
