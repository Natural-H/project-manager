import {auth} from "@/auth";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

    try {
        const id = Number((await params).id)

        const project = await prisma.student.findUnique({
            where: {
                id
            }
        }).project({include: {tools: true}})

        return NextResponse.json(project, {status: project ? 200 : 404})
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
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const data = await request.json()

    try {
        const id = Number((await params).id)

        const student = await prisma.student.update({
            where: {
                id
            },
            data: {
                project: {
                    connect: {
                        id: data.id
                    }
                }
            },
            include: {
                project: {
                    include: {tools: true}
                },
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

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const id = Number((await params).id)

        const student = await prisma.student.update({
            where: {
                id
            },
            data: {
                project: {
                    update: {
                        ...data,
                        tools: {
                            connect: [
                                ...data.tools
                            ]
                        }
                    }
                }
            },
            include: {
                project: {
                    include: {
                        tools: true
                    }
                },
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
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    try {
        const id = Number((await params).id)

        await prisma.student.update({
            where: {
                id
            },
            data: {
                project: {
                    disconnect: {}
                }
            }
        })

        return NextResponse.json(null, {status: 200})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") return NextResponse.json(null, {status: 404})

            return NextResponse.json({message: e.message, code: e.code}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Malformed request"}, {status: 400})
        }

        throw e
    }
}