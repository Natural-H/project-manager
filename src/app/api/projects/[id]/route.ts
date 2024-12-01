import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const project = await prisma.project.findUnique({
        where: {
            id: Number((await params).id)
        },
        include: {
            students: true,
            advisor: true,
            tools: true
        }
    })

    return NextResponse.json(project, {status: project ? 200 : 404})
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json()
    const project = await prisma.project.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            keyname: data.keyname,
            name: data.name,
            description: data.description,
            funding: data.funding,
            dateBegin: data.dateBegin,
            dateEnd: data.dateEnd,
            companyId: data.companyId
        }
    })

    return NextResponse.json(project, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const project = await prisma.project.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(project, {status: 200})
}