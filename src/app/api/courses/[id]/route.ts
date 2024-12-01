import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const course = await prisma.course.findUnique({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(course, {status: course ? 200 : 404})
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json()
    const course = await prisma.course.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            codename: data.codename,
            name: data.name
        }
    })

    return NextResponse.json(course, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const course = await prisma.course.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(course, {status: 200})
}