export interface IUserSafe { 
    _id: string
    created_at: Date
    updated_at: Date
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
    __v: number;
}