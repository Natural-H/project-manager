import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {Prisma} from "@prisma/client";
import {auth} from "@/auth";

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string, idC: string }> }) {
    const session = await auth()
    if (!session) return NextResponse.json({message: "Not authorized"}, {status: 401})

    const parameters = await params
    const [id, idC] = [Number(parameters.id), Number(parameters.idC)]

    try {
        await prisma.advisor.update({
            where: {
                id,
                companies: {
                    some: {id: idC}
                }
            },
            data: {
                companies: {
                    disconnect: {
                        id: idC
                    }
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