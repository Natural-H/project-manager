import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {BriefcaseBusiness, Building2, CalendarIcon, DollarSign, PenToolIcon as Tool, User} from "lucide-react";
import {format} from "@formkit/tempo";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Project} from "@/lib/ProjectType";

export function ProjectInfo({project}: {project: Project}) {
    return (

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Detalles del proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Nombre:</strong> {project.name}</p>
                    <p><strong>Clave:</strong> {project.keyname}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                    <div className="flex items-center gap-1"><strong>Estado:</strong> <Badge
                        variant={project.isFinished === "true" ? "default" : "secondary"}>{project.isFinished === "true" ? "Terminado" : "En proceso"}</Badge>
                    </div>
                    <p><CalendarIcon className="inline-block w-4 h-4 mr-1"/>
                        <strong>Fecha de inicio:</strong> {format(project.dateBegin, "long", "es")}</p>
                    {project.dateEnd && <p><CalendarIcon className="inline-block w-4 h-4 mr-1"/>
                        <strong>Fecha de fin:</strong> {format(project.dateEnd, "long", "es")}</p>}
                    <p><DollarSign className="inline-block w-4 h-4 mr-1"/>
                        <strong>Remuneración:</strong> ${parseInt(project.funding).toLocaleString()}</p>
                    <div className="flex gap-1 items-center">
                        <span className="flex items-center">
                            <BriefcaseBusiness className="inline-block w-4 h-4 mr-1"/>
                            <strong>Herramientas:</strong>
                        </span>
                       {
                            !project.tools || project.tools.length === 0 && (
                                <span
                                    className="text-muted-foreground"> No hay herramientas asignadas a este proyecto</span>
                            )

                        }
                        {
                            project.tools.map((tool) => (
                                <Badge key={tool.id} variant="secondary" className="mr-2">
                                    <Tool className="w-4 h-4 mr-1"/>
                                    {tool.name}
                                </Badge>
                            ))
                        }
                </div>
            </CardContent>
        </Card>

    <Card>
        <CardHeader>
        <CardTitle>Estudiantes</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        project.students.length === 0 &&
                        <p className="text-muted-foreground">No hay estudiantes asignados a este proyecto</p>
                    }
                    {project.students.map((student) => (
                        <div key={student.id} className="flex items-center space-x-4 mb-4">
                            <Avatar>
                                <AvatarFallback>{student.user.firstName[0]}{student.user.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{student.user.firstName} {student.user.middleName} {student.user.lastName}</p>
                                <p className="text-sm text-muted-foreground">Control
                                    Number: {student.controlNumber}</p>
                                <p className="text-sm text-muted-foreground">{student.user.email}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Asesores</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        project.advisor.length === 0 &&
                        <p className="text-muted-foreground">No hay asesores asignados a este proyecto</p>
                    }

                    {project.advisor.map((advisor) => (
                        <div key={advisor.id} className="flex items-center space-x-4 mb-4">
                            <User className="h-10 w-10 text-muted-foreground"/>
                            <div>
                                <p className="font-semibold">{`${advisor.user.firstName} ${advisor.user.lastName}`}</p>
                                <p className="text-sm text-muted-foreground">Email: {advisor.user.email}</p>
                                <p className="text-sm text-muted-foreground">RFC: {advisor.rfc}</p>
                                <p className="text-sm text-muted-foreground">Tipo: {
                                    advisor.isIntern ? "Interno" : "Externo"
                                }</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Organización</CardTitle>
                </CardHeader>
                <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                            <Building2 className="h-10 w-10 text-muted-foreground"/>
                            <div>
                                <p className="font-semibold">{project.company.name}</p>
                                <p className="text-sm text-muted-foreground">Nombre clave: {project.company.codename}</p>
                            </div>
                        </div>
                </CardContent>
            </Card>
        </div>)
}
