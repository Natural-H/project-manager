import {prisma} from "@/app/prisma"
import {NextRequest, NextResponse} from "next/server"
import {auth} from "@/auth";
import {Prisma} from "@prisma/client";

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
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const student = await prisma.student.create({data: {...data}})
        return NextResponse.json(student, {status: 201})
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
