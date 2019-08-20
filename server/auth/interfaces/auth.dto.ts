// import { ModelUser } from "../../database/models/users/user.model";


export interface DTOSetPassword {
    password: string;
    confirmPassword: string;
    token: string;
    reset_password_token: string;
}

export interface DTOPasswordResetURL {
    user: any;
    url: string;
}

export interface JWTObject {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    status: string;
}