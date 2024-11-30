import {prisma} from "@/app/prisma"
import {NextRequest, NextResponse} from "next/server"

export async function GET() {
    const student = await prisma.student.findMany({
            include: {
                user: true,
                project: true
            }
        }
    )
    return NextResponse.json(student, {status: 200})
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const student = await prisma.student.create({
        data: {
            idUser: data.idUser,
            controlNumber: data.controlNumber
        }
    })
    return NextResponse.json(student, {status: 201})
}

export async function PUT(request: NextRequest) {
    const data = await request.json()
    const student = await prisma.student.update({
        where: {
            id: data.id,
        },
        data: {
            controlNumber: data.controlNumber,
            projectId: data.projectId
        }
    })

    return NextResponse.json(student, {status:200})
}

export async function DELETE(request: NextRequest) {
    const data = await request.json()
    const student = await prisma.student.delete({
        where: {
            id: data.id,
        },
    })

    return NextResponse.json(student, {status: 200})
}