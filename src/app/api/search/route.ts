import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/prisma";
import {auth} from "@/auth";
import {Prisma} from "@prisma/client";

export async function GET(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json("Not authorized", {status: 401})

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search");

    if (!search) return NextResponse.json({message: "Search is empty!"}, {status: 400});

    try {
        const students = await prisma.student.findMany({
            where: {
                OR: [
                    {controlNumber: {contains: search}},
                    {user: {username: {contains: search}}}
                ]
            },
            include: {user: true}
        })

        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    {keyname: {contains: search}},
                    {name: {contains: search}}
                ]
            }
        })

        const companies = await prisma.company.findMany({
            where: {
                OR: [
                    {codename: {contains: search}},
                    {name: {contains: search}}
                ]
            }
        })

        const results = [
            ...students.map((s) => ({kind: 'student', id: s.id, name: `${s.user.firstName} ${s.user.lastName}`})),
            ...projects.map((p) => ({kind: 'project', id: p.id, name: p.name})),
            ...companies.map((c) => ({kind: 'company', id: c.id, name: c.name})),
        ]

        return NextResponse.json(results, {status: 200})
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({message: e.message, code: e.code}, {status: 500})
        } else if (e instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({message: "Parameter id is invalid"}, {status: 400})
        }

        throw e
    }
}
