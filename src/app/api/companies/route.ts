import {prisma} from "@/app/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const companies = await prisma.company.findMany({
        include: {
            projects: true,
            advisors: true
        }
    });
    return NextResponse.json(companies, {status: 200});
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const company = await prisma.company.create({
        data: {
            codename: data.codename,
            name: data.name,
            size: data.size
        },
        include: {
            projects: true,
            advisors: true
        }
    })

    return NextResponse.json(company, {status: 201})
}
