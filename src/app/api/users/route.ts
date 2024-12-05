import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import * as crypto from "node:crypto";
import {auth} from "@/auth";
import {Prisma} from "@prisma/client";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401});
    const users = await prisma.user.findMany()
    return NextResponse.json(users, {status: 200});
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401});

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const hash = crypto.createHash("sha256").update(data.password).digest("hex")

        const user = await prisma.user.create({
            data: {
                ...data,
                password: hash
            }
        })

        return NextResponse.json(user, {status: 201})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "SQLITE_CONSTRAINT")
                return NextResponse.json({message: "There is a unique constraint violation."}, {status: 409})

            return NextResponse.json({message: e.message, code: e.code}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Malformed request"}, {status: 400})
        }

        throw e
    }
}