import NextAuth, { Session, User as NextAuthUser } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/app/prisma"

interface User extends NextAuthUser {
    id: string
}

declare module 'next-auth' {
    interface Session {
        user: User
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null
                    console.log("credentials", credentials)

                    const {email, password} = credentials


                    // logic to verify if the user exists
                    user = await prisma.user.findUnique({
                        where: {
                            email,
                            password
                        },
                    })

                    if (!user) {
                        // Return null if user data could not be retrieved
                        return null
                    }

                    // return JSON object with the user data
                    return {
                        email: user.email,
                        username: user.username,
                        id: user.id
                    }
                } catch (error) {
                    // Return null if user data could not be retrieved
                    console.log(error.message)
                    return null
                }
            },
        }),
    ],
})
