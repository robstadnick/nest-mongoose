import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from '../../errors/interfaces/error-message.interface';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
    'auth:login:missingEmail': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without email.',
        userMessage: 'Veuillez indiquer votre adresse e-mail.'
    },
    'auth:login:missingPassword': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without password.',
        userMessage: 'Veuillez indiquer votre mot de passe.'
    }
};
