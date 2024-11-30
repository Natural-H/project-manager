import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET({params}: { params: { id: string } }) {
    const advisor = await prisma.advisor.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(advisor, {status: advisor ? 200 : 404});
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    const data = await request.json()
    const advisor = await prisma.advisor.update({
        where: {
            id: Number(params.id)
        },
        data: {
            rfc: data.rfc,
            isIntern: data.isIntern,
        }
    })

    return NextResponse.json(advisor, {status: 200})
}

export async function DELETE({params}: { params: { id: string } }) {
    const advisor = await prisma.advisor.delete({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json(advisor, {status: 200})
}