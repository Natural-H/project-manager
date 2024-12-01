import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const courses = prisma.course.findMany()
    return NextResponse.json(courses, {status: 200})
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const course = await prisma.course.create({
        data: {
            codename: data.codename,
            name: data.name
        }
    })

    return NextResponse.json(course, {status: 201})
}
