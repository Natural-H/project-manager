import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Prisma} from "@prisma/client";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: Number((await params).id),
            },
            include: {
                user: true,
                project: true
            }
        })
        return NextResponse.json(student, {status: student ? 200 : 404});

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({message: e.message, code: e.code})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Parameter id is invalid"}, {status: 400})
        }

        throw e
    }
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id)

    try {
        const student = await prisma.student.delete({where: {id}})
        return NextResponse.json(student, {status: 200})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") return NextResponse.json(null, {status: 404})

            return NextResponse.json({message: e.message, code: e.code})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Parameter id is invalid"}, {status: 400})
        }

        throw e
    }
}

export async function PUT(request: NextRequest) {
    const body = await request.json()
    try {
        const student = await prisma.student.update({
            where: {
                id: body.id
            },
            data: {
                user: {
                    update: {
                        firstName: body.user.firstName,
                        middleName: body.user.middleName,
                        lastName: body.user.lastName,
                        email: body.user.email,
                        username: body.user.username,
                        curp: body.user.curp,
                    }
                },
                controlNumber: body.controlNumber,
            }
        })
        return NextResponse.json(student, {status: 200})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") return NextResponse.json(null, {status: 404})

            return NextResponse.json({message: e.message, code: e.code})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: e.message}, {status: 400})
        }
        console.log("Error", e)
        throw e
    }
}
