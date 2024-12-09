import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Building2} from "lucide-react";
import {Project} from "@/lib/ProjectType";

export function ProjectCompanyCard({project}: {project: Project}) {
    return (

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
        </Card>    )
}
