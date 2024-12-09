import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";
import {auth} from "@/auth";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    try {
        const id = Number((await params).id)
        const project = await prisma.project.findUnique({
            where: {id},
            include: {
                students: {
                    include: {
                        user: true
                    }
                },
                advisor: {
                    include: {
                        user: true
                    }
                },
                tools: true,
                company: true
            }
        })

        return NextResponse.json(project, {status: project ? 200 : 404})
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
    try {
        const project = await prisma.project.delete({
            where: {
                id: Number((await params).id)
            }
        })

        return NextResponse.json(project, {status: 200})
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
