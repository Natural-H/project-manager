import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const tool = await prisma.tools.findUnique({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(tool, {status: tool ? 200 : 404})
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json()
    const tool = await prisma.tools.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            name: data.name
        }
    })

    return NextResponse.json(tool, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const tool = await prisma.tools.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(tool, {status: 200})
}