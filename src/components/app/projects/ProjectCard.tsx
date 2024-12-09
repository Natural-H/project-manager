import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Project, Student} from "@prisma/client";
import {format} from "@formkit/tempo";
import Link from "next/link";

export function ProjectCard({project}: { project: Project }) {
    console.log(project.keyname, project.isFinished)
    return (
        <Link href={`/app/projects/${project.id}`}>
            <Card className="max-w-[350px] hover:shadow-lg transition-shadow ease-in-out">
                <CardHeader>
                    <div className="flex justify-between items-start flex-col">
                        <div className="flex gap-4">
                            <CardTitle>{project.name}</CardTitle>
                            <Badge
                                variant={project.isFinished === "false" ? "default" : "outline"}>
                                {project.isFinished === "false" ? "Finalizado" : "En curso"}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Fecha de inicio: <span
                        className="font-bold text-black">{format(project.dateBegin, {date: 'long'}, "es")}</span></p>
                    <p className="text-muted-foreground">Remuneración: <span
                        className="font-bold text-black">{Number(project.funding) === 0 ? 'Sin remuneración' : `$${project.funding}`}</span>
                    </p>
                </CardContent>
                <CardFooter>
                    <div className="flex -space-x-2">
                        {project.students.map((student: Student, index: number) => (
                            <Avatar key={index} className="border-2 border-background">
                                <AvatarFallback>{student.user.firstName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </CardFooter>
            </Card></Link>
    )
}

