import {Project} from "@/lib/ProjectType";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {User} from "lucide-react";
import {AddAdvisorDialog} from "@/components/app/projects/project/AddAdvisorDialog";
import {DeleteAdvisorDialog} from "@/components/app/projects/project/DeleteAdvisorDialog";

export function ProjectAdvisorsCard({project}: {project: Project}) {
   return (
       <Card>
           <CardHeader className="flex items-center justify-between flex-row p-5">
               <CardTitle>Asesores</CardTitle>
               <AddAdvisorDialog projectId={project.id} />
           </CardHeader>
           <CardContent>
               {
                   project.advisor.length === 0 &&
                   <p className="text-muted-foreground">No hay asesores asignados a este proyecto</p>
               }

               {project.advisor.map((advisor) => (
                   <div key={advisor.id} className="justify-between items-center flex">
                       <div className="flex items-center space-x-4 mb-4">
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
                       <DeleteAdvisorDialog advisorId={advisor.id} projectId={project.id} />
                  </div>
               ))}

           </CardContent>
       </Card>
   )
}
