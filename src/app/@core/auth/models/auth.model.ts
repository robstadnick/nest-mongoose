export interface IAuthTokenUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_coach: boolean;
    role: string
    stripeApiKey: string
}