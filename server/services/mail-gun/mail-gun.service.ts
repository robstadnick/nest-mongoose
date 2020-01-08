import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailGunService {

    async sendEmail(data) {
        const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: 'www.zastc.com' });
        return mg.messages().send(data)
            .then((success) => {
                return Promise.resolve(success);
            })
            .catch((err) => {
                console.log(err);
                return Promise.reject(err);
            });
    }

    async validateEmail(email: string) {
        const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, publicApiKey: 'pubkey-facb015452377c4b6a6d652b354fdd15', domain: 'www.zastc.com' });
        return mg.validate(email)
            .then((success) => {
                return Promise.resolve(success);
            })
            .catch((err) => {
                console.log(err);
                return Promise.reject(err);
            });
    }

}




// const data = {
//     from: 'No Reply <noreply@zastc.com>',
//     to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
// };