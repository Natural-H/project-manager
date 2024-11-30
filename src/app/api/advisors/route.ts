import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const advisors = await prisma.advisor.findMany({
        include: {
            user: true,
            projects: true,
            departments: true
        },
    });

    return NextResponse.json(advisors, {status: 200});
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const advisor = await prisma.advisor.create({
        data: {
            idUser: data.idUser,
            rfc: data.rfc,
            isIntern: data.isIntern,
        }
    });

    return NextResponse.json(advisor, {status: 200});
}