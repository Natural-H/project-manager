import {prisma} from "@/app/prisma";
import {NextResponse} from "next/server";
import crypto from "node:crypto";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(params.id),
        }
    })

    return NextResponse.json(user, {status: user ? 200 : 404});
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
    const data = await request.json();
    const hash = crypto.createHash('sha256')
    hash.update(data.password)

    await prisma.user.update({
        where: {
            id: Number(params.id),
        },
        data: {
            username: data.username,
            password: hash.digest('hex'),
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            curp: data.curp,
            email: data.email,
        }
    })

    return NextResponse.json(null, {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
    await prisma.user.delete({
        where: {
            id: Number(params.id),
        }
    })

    return NextResponse.json(null, {status: 200});
}
