import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectCardProps {
    title: string
    description: string
    progress: number
    status: "En progreso" | "Completado" | "En espera"
    team: { name: string; avatar: string }[]
}

export function ProjectCard({ title, description, progress, status, team }: ProjectCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{title}</CardTitle>
                    <Badge variant={status === "Completado" ? "default" : status === "En progreso" ? "secondary" : "outline"}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{description}</p>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">{progress}% completado</p>
            </CardContent>
            <CardFooter>
                <div className="flex -space-x-2">
                    {team.map((member, index) => (
                        <Avatar key={index} className="border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}

