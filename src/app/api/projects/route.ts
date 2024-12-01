import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const projects = await prisma.project.findMany({
        include: {
            students: true,
            advisor: true,
            tools: true
        }
    })
    return NextResponse.json(projects, {status: 200})
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const project = await prisma.project.create({
        data: {
            keyname: data.keyname,
            name: data.name,
            description: data.description,
            funding: data.funding,
            dateBegin: data.dateBegin,
            dateEnd: data.dateEnd,
            companyId: data.companyId
        }
    })

    return NextResponse.json(project, {status: 200})
}