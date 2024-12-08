import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {Fingerprint, IdCard, Mail, MapPin, MoreVertical, Phone} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Student} from "@/lib/Types";
import {Button} from "@/components/ui/button";
export function StudentCard({student} : {student: Student}){
    return (
        <Card key={student.id}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar className="h-14 w-14">
                        <AvatarFallback>{student.user.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{`${student.user.firstName} ${student.user.lastName}`}</CardTitle>
                        <p className="text-sm text-muted-foreground">{student.user.username}</p>
                    </div>
                </div>
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                        <DropdownMenuItem>Editar la información del estudiante</DropdownMenuItem>
                        <DropdownMenuItem>Contactar estudiante</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <Badge variant={student.project ? "default" : "outline"}>
                        {student.project ? student.project.name : "Sin proyecto"}
                    </Badge>

                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {student.user.email}
                    </div>
                    <div className="flex items-center">
                        <IdCard className="h-4 w-4 mr-2 text-muted-foreground" />
                        {student.user.curp}
                    </div>
                    <div className="flex items-center">
                        <Fingerprint className="h-4 w-4 mr-2 text-muted-foreground" />
                        {student.controlNumber}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
           </CardFooter>
        </Card>
    )
}
