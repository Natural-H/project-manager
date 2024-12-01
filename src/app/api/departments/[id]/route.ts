import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const department = await prisma.department.findUnique({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(department, {status: department ? 200 : 404})
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }>}) {
    const data = await request.json()
    const department = await prisma.department.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            codename: data.codename,
            name: data.name
        }
    })

    return NextResponse.json(department, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const department = await prisma.department.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(department, {status: 200})
}

