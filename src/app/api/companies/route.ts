import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {Prisma} from "@prisma/client";

export async function GET() {
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    const companies = await prisma.company.findMany({
        include: {
            projects: true,
            advisors: true
        }
    });
    return NextResponse.json(companies, {status: 200});
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    const {id, ...data} = await request.json()
    if (id) return NextResponse.json({message: "Manually putting an id is not allowed"}, {status: 400})

    try {
        const company = await prisma.company.create({
            data: {
                codename: data.codename,
                name: data.name,
                size: data.size
            },
            include: {
                projects: true,
                advisors: true
            }
        })

        return NextResponse.json(company, {status: 201})
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
