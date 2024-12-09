import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Company} from "@/lib/types";
import {Badge} from "@/components/ui/badge";
import {CalendarIcon, InfoIcon} from "lucide-react";
import {format} from "@formkit/tempo";

export function CompanyProjects({ company }: { company: Company}) {
    if (company.projects?.length === 0 ) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg">No se encontraron proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No hay proyectos para esta organizacion</p>
                </CardContent>
            </Card>
        )
    }
   return (
       <div className="flex flex-col gap-2">
           {
               company.projects?.map((project) => (
                     <div key={project.id} className="flex flex-col gap-2">
                         {
                             <Card className="w-full">
                                 <CardHeader className="pb-2">
                                     <div className="flex justify-between items-start">
                                         <CardTitle className="text-lg">{project.name}</CardTitle>
                                         <Badge variant={project.isFinished === "true" ? "default" : "secondary"}>
                                             {project.isFinished === "true" ? "Terminado" : "En proceso"}
                                         </Badge>
                                     </div>
                                     <p className="text-sm text-muted-foreground">{project.keyname}</p>
                                 </CardHeader>
                                 <CardContent>
                                     <div className="space-y-2 text-sm">
                                         <p className="line-clamp-2" title={project.description}>
                                             <InfoIcon className="inline-block w-4 h-4 mr-1" />
                                             {project.description}
                                         </p>
                                         <p>
                                             <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                                             Started: {format(project.dateBegin, "medium", "es")}
                                         </p>
                                         <p>Funding: ${parseInt(project.funding).toLocaleString()}</p>
                                     </div>
                                 </CardContent>
                             </Card>
                         }
                     </div>
               ))
           }
       </div>
   )
}
