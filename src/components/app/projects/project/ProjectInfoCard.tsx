import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {BriefcaseBusiness, CalendarIcon, DollarSign, PenToolIcon as Tool} from "lucide-react";
import {format} from "@formkit/tempo";
import {Project} from "@/lib/ProjectType";

export function ProjectInfoCard({project}: {project: Project}) {
    return (

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
        </Card>    )

}
