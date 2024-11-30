import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";
import crypto from "node:crypto";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const user = await prisma.user.findUnique({
        where: {
            id: Number((await params).id),
        }
    })

    return NextResponse.json(user, {status: user ? 200 : 404});
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json();
    const hash = crypto.createHash('sha256')
    hash.update(data.password)

    const user = await prisma.user.update({
        where: {
            id: Number((await params).id),
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

    return NextResponse.json(user, {status: 200});
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const user = await prisma.user.delete({
        where: {
            id: Number((await params).id),
        }
    })

    return NextResponse.json(user, {status: 200});
}
