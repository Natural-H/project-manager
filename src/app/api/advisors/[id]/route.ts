import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const advisor = await prisma.advisor.findUnique({
        where: {
            id: Number((await params).id)
        },
        include: {
            user: true
        }
    });

    return NextResponse.json(advisor, {status: advisor ? 200 : 404});
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json()
    const advisor = await prisma.advisor.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            rfc: data.rfc,
            isIntern: data.isIntern
        }
    })

    return NextResponse.json(advisor, {status: 200})
}

export async function DELETE({params}: { params: Promise<{ id: string }> }) {
    const advisor = await prisma.advisor.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(advisor, {status: 200})
}