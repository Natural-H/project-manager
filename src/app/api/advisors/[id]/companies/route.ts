import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";
import {auth} from "@/auth";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    try {
        const id = Number((await params).id)
        const companies = await prisma.advisor.findUnique({where: {id}}).companies({
            include: {
                advisors: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return NextResponse.json(companies, {status: companies ? 200 : 404});
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
        const company = await prisma.company.create({
            data: {
                ...data,
                advisors: {
                    connect: [{id}, ...data.advisors?.map((a: Prisma.StudentSelect) => ({id: a.id})) ?? []]
                }
            },
            include: {
                advisors: {
                    include: {
                        user: true
                    }
                }
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

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const id = Number((await params).id)
    const {id: idC, ...data} = await request.json()

    try {
        const company = await prisma.company.update({
            where: {id: idC},
            data: {
                ...data,
                advisors: {
                    connect: [{id}, ...data.advisors?.map((a: Prisma.StudentSelect) => ({id: a.id})) ?? []]
                }
            },
            include: {
                advisors: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return NextResponse.json(company, {status: 200})
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