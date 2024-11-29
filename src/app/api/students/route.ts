import {prisma} from "@/app/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    const student = await prisma.student.findMany();
    return NextResponse.json(student, {status: 200});
}

export async function POST(request: Request) {
    const data = await request.json()
    const student = await prisma.student.create({
        data: {
            idUser: data.idUser,
            controlNumber: data.controlNumber
        }
    })
    return NextResponse.json(student, {status: 200});
}