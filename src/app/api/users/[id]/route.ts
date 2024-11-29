import {prisma} from "@/app/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const user = await prisma.users.findUnique({
        where: {
            idUser: Number(params.id),
        }
    })

    return NextResponse.json(user, {status: user ? 200 : 404});
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
    const data = await request.json();
    await prisma.users.update({
        where: {
            idUser: Number(params.id),
        },
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

    return NextResponse.json(null, {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
    await prisma.users.delete({
        where: {
            idUser: Number(params.id),
        }
    })

    return NextResponse.json(null, {status: 200});
}
