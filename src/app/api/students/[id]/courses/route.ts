import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";
import {auth} from "@/auth";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    try {
        const id = Number((await params).id)
        const courses = await prisma.student.findUnique({where: {id}}).courses({
            include: {
                students: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return NextResponse.json(courses, {status: courses ? 200 : 404});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({message: e.message, code: e.code}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Parameter id is invalid"}, {status: 400})
        }

        throw e
    }
}

export async function POST(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const id = Number((await params).id)
    const data = await request.json()

    try {
        const course = await prisma.course.create({
            data: {
                ...data,
                students: {
                    connect: [{id}, ...data.students?.map((a: Prisma.StudentSelect) => ({id: a.id})) ?? []]
                }
            },
            include: {
                students: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return NextResponse.json(course, {status: 201})
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

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const id = Number((await params).id)
    const {id: idC, ...data} = await request.json()

    try {
        const course = await prisma.course.update({
            where: {id: idC},
            data: {
                ...data,
                students: {
                    connect: [{id}, ...data.students?.map((a: Prisma.StudentSelect) => ({id: a.id})) ?? []]
                }
            },
            include: {
                students: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return NextResponse.json(course, {status: 200})
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