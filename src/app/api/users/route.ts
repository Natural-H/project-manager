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

export async function PUT(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401});

    const {id, ...data} = await request.json()

    try {
        // // Validating that the user actually owns this account
        // /*TODO: Improve the way of doing this, it works but it's kinda cursed and time expensive,
        //    maybe storing the id as another session property?
        //    For this reason, this is the only method that implements this validation
        //    */
        // const email = await prisma.user.findUnique({
        //     where: {id},
        //     select: {email: true}
        // }).then(u => u?.email)
        //
        // if (!email) return NextResponse.json(null, {status: 404})
        // if (session.user?.email !== email) return NextResponse.json({message: "Not authorized"}, {status: 401});
        const hash = crypto.createHash("sha256").update(data.password).digest("hex");

        const user = await prisma.user.update({
            where: {id},
            data: {
                ...data,
                password: hash
            }
        })

        return NextResponse.json(user, {status: 200})
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