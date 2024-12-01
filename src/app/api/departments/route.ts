import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const departments = await prisma.department.findMany()
    return NextResponse.json(departments, {status: 200})
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const department = await prisma.department.create({
        data: {
            codename: data.codename,
            name: data.name
        }
    })

    return NextResponse.json(department, {status: 200})
}