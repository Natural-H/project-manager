import {prisma} from "@/app/prisma"
import {NextRequest, NextResponse} from "next/server"
import {auth} from "@/auth"
import {Prisma} from "@prisma/client"

export async function GET() {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const tools = await prisma.tools.findMany()
    return NextResponse.json(tools, {status: 200})
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const data = await request.json()

    try {
        const tool = await prisma.tools.create({data: {...data}})

        return NextResponse.json(tool, {status: 201})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "SQLITE_CONSTRAINT")
                return NextResponse.json({message: "There is a unique constraint violation."}, {status: 409})

            return NextResponse.json({message: e.message}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Malformed request"}, {status: 400})
        }

        throw e
    }
}

export async function PUT(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const {id, ...data} = await request.json()

    try {
        const tool = await prisma.tools.update({
            where: {id},
            data: { ...data }
        })

        return NextResponse.json(tool, {status: 200})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "SQLITE_CONSTRAINT")
                return NextResponse.json({message: "There is a unique constraint violation."}, {status: 409})
            if (e.code === "P2025") return NextResponse.json(null, {status: 404})

            return NextResponse.json({message: e.message}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Malformed request"}, {status: 400})
        }

        throw e
    }
}