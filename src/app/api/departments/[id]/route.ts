import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";
import {auth} from "@/auth";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    try {
        const department = await prisma.department.findUnique({
            where: {
                id: Number((await params).id)
            }
        })

        return NextResponse.json(department, {status: department ? 200 : 404})
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
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const id = Number((await params).id)
        const department = await prisma.department.update({
            where: {id},
            data: {...data}
        })

        return NextResponse.json(department, {status: 200})
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
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    try {
        const id = Number((await params).id)
        const department = await prisma.department.delete({where: {id}})

        return NextResponse.json(department, {status: 200})
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

