import {Schema, Document} from 'mongoose';

export const UserSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: String,
    reset_password_token: String,
    reset_password_expires: Date,
    stripe_id: String,
    addresses: [
        {
            title: String,
            street: String,
            street_two: String,
        }
    ],
    user_roles: [
        {
            role: String,
            street: String,
        }
    ]
});

export interface ModelUser extends Document {
    id: string
    email: string
    first_name: string
    last_name: string
    password: string
    reset_password_token: string
    reset_password_expires: Date
    stripe_id: string
    addresses: ModelUserAddresses[]
    user_roles: ModelUserRoles[]
}

interface ModelUserAddresses {
    id: string
    title: string
    street: string
}

interface ModelUserRoles {
    id: string
    role: string
}
