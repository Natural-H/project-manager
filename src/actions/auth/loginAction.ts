'use server'
import crypto from 'crypto';
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

export async function loginAction(formData: any) {
    const pwHash = crypto.createHash('sha256').update(formData.get('password')).digest('hex')
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: pwHash,
            redirectTo: '/',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': {
                    return { error: 'Invalid credentials' }
                }
                default: {
                    return { error: 'An unexpected error has occurred' }
                }
            }
        }
        throw error
    }

}
