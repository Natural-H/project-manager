import {auth} from "@/auth";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    try {
        const id = Number((await params).id)

        const projects = await prisma.advisor.findUnique({where: {id}})
            .projects({
                include: {
                    advisor: true,
                    students: {
                        include: {
                            user: true
                        }
                    },
                    tools: true,
                },
            });

        return NextResponse.json(projects, {status: projects ? 200 : 404})
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

    const {advisor, students, tools, ...data} = await request.json()
    const idAdvisor = Number((await params).id)

    try {
        const project = await prisma.project.create({
            data: {
                ...data,
                advisor: {
                    connect: [{id: idAdvisor}, ...advisor?.map((a: Prisma.AdvisorSelect) => ({id: a.id})) ?? []]
                },
                students: {
                    connect: students?.map((s: Prisma.StudentSelect) => ({id: s.id})) ?? []
                },
                tools: {
                    connect: tools?.map((t: Prisma.ToolsSelect) => ({id: t.id})) ?? []
                }
            },
            include: {
                advisor: true,
                students: true,
                tools: true
            },
        })

        return NextResponse.json(project, {status: 201})
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

    const {id, advisor, students, tools, ...data} = await request.json()
    const idAdvisor = Number((await params).id)

    try {
        const project = await prisma.project.update({
            where: {id},
            data: {
                ...data,
                advisor: {
                    connect: [{id: idAdvisor}, ...advisor?.map((a: Prisma.AdvisorSelect) => ({id: a.id})) ?? []]
                },
                students: {
                    connect: students?.map((s: Prisma.StudentSelect) => ({id: s.id})) ?? []
                },
                tools: {
                    connect: tools?.map((t: Prisma.ToolsSelect) => ({id: t.id})) ?? []
                }
            },
            include: {
                advisor: true,
                students: true,
                tools: true
            },
        })

        return NextResponse.json(project, {status: project ? 200 : 404})
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

