import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const tools= await prisma.tools.findMany()

    return NextResponse.json(tools, {status: 200})
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const tool = await prisma.tools.create({
        data: {
            name: data.name
        }
    })

    return NextResponse.json(tool, {status: 201})
}