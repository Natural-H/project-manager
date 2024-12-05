import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
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

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const id = Number((await params).id
        )
        const student = await prisma.student.update({
            where: {id},
            data: {
                ...data,
                project: {
                    connectOrCreate: {
                        where: {
                            ...data.project
                        },
                        create: {
                            ...data.project
                        }
                    }
                }
            }
        })
        return NextResponse.json(student, {status: student ? 200 : 404})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "SQLITE_CONSTRAINT")
                return NextResponse.json({message: "There is a unique constraint violation."}, {status: 409})
            if (e.code === "P2025") return NextResponse.json(null, {status: 404})

            return NextResponse.json({message: e.message, code: e.code}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Malformed request"}, {status: 400})
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