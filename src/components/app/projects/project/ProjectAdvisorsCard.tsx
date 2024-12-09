import {Project} from "@/lib/ProjectType";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {User} from "lucide-react";

export function ProjectAdvisorsCard({project}: {project: Project}) {
   return (
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
   )
}
