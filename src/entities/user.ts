export interface User {
    id: string,
    display_name: string
    email: string
    password?: string
    confirmPassword?: string // Optional since Supabase doesn't use it
}