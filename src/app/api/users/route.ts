import {NextResponse} from "next/server";
import {prisma} from "@/app/prisma";

export async function GET() {
    const users = await prisma.users.findMany()
    return NextResponse.json(users, {status: 200});
}

export async function POST(request: Request) {
    const data = await request.json()

    const user = await prisma.users.create({
        data: {
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            curp: data.curp,
            email: data.email,
        }
    })

    return NextResponse.json(user, {status: 201})
}
