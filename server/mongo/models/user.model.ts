import { Schema, Document } from 'mongoose';
import { isEmail, isMobilePhone } from 'validator';

export const UserSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    reset_password_token: String,
    sms_reset_password_token: Number,
    reset_password_expires: Date,
    password: String,
    passwords: [
        {
            password: String,
            date: Date
        }
    ],
    user_roles: [
        {
            role: String,
        }
    ],
    settings: {
        onboarding_complete: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    archived: { type: Boolean, required: true, default: false },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return isEmail(value);
        }
    },
    email_verified: { type: Boolean, required: true, default: false },
    email_verified_date: Date,
    profile: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        profile_photo_url: { type: String, default: null },
    },
    addresses: [
        {
            title: { type: String, required: true },
            line_one: { type: String, required: true },
            line_two: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip_code: { type: String, required: true },
            country: String,
        }
    ],
});

// UserSchema.pre('save', (next) => {
//     console.log('PRE SAVE');
//     next();
// });

// UserSchema.pre('update', (next) => {
//     console.log('POST SAVE');
//     next();
// });

/**
 * This is the User model. Testing the Documentation Details
 */
export interface ModelUser extends Document {
    _id: string
    created_at: Date
    updated_at: Date
    reset_password_token: string
    sms_reset_password_token: number
    reset_password_expires: Date,
    password: string
    passwords: [
        {
            password: string
            date: Date
        }
    ],
    email: string
    email_verified: boolean
    email_verified_date: Date
    profile: {
        first_name: string
        last_name: string
        profile_photo_url: string
    },
    settings: {
        onboarding_complete: boolean
    },
    addresses: [
        {
            title: string
            line_one: string
            line_two: string
            city: string
            state: string
            zip_code: string
            country: string
        }
    ],
    user_roles: [
        {
            role: string
        }
    ],
    __v: number;
}