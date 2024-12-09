import {Project} from "@/lib/ProjectType";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {AddStudentDialog} from "@/components/app/projects/project/AddStudentDialog";

export function ProjectStudentsCard({project}: { project: Project }) {
    return (
         <Card>
                <CardHeader className="flex items-center justify-between flex-row p-5">
                    <CardTitle>Estudiantes</CardTitle>
                    <AddStudentDialog projectId={project.id} />
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
    )
}
