import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const company = await prisma.company.findUnique({
        where: {
            id: Number((await params).id)
        },
        include: {
            projects: true,
            advisors: true
        }
    })

    return NextResponse.json(company, {status: company ? 200 : 404})
}

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const data = await request.json();
    const company = await prisma.company.update({
        where: {
            id: Number((await params).id)
        },
        data: {
            codename: data.codename,
            name: data.name,
            size: data.size
        },
        include: {
            projects: true,
            advisors: true
        }
    })

    return NextResponse.json(company, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const company = await prisma.company.delete({
        where: {
            id: Number((await params).id)
        }
    })

    return NextResponse.json(company, {status: 200})
}