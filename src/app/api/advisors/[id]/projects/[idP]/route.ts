import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string, idP: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    try {
        const id = Number((await params).id)
        const idP = Number((await params).idP)

        await prisma.advisor.update({
            where: {
                id,
                projects: {
                    some: {id: idP}
                }
            },
            data: {
                projects: {
                    disconnect: {id: idP}
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