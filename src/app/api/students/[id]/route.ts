import {prisma} from "@/app/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const student = await prisma.student.findUnique({
        where: {
            id: Number((await params).id),
        },
        include: {
            user: true,
            project: true
        }
    })

    return NextResponse.json(student, {status: student ? 200 : 404});
}