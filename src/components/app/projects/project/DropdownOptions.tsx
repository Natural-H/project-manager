'use client'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Project } from '@/lib/ProjectType'
import {useRouter} from "next/navigation";

export function DropdownOptions({ project }: { project: Project }) {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4"/>
                    <span className="sr-only">Abrir menú</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col">
                <Dialog>
                    <DialogTrigger>
                        <DropdownMenuItem disabled onSelect={(e) => e.preventDefault()}>
                            Editar proyecto
                        </DropdownMenuItem>
                    </DialogTrigger>
               </Dialog>
                <Dialog>
                    <DialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                            Eliminar proyecto
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Eliminar proyecto</DialogTitle>
                            <DialogDescription className="flex flex-col text-red-500">
                                ¿Estás seguro de que deseas eliminar este proyecto?
                            </DialogDescription>
                            <span>
                                Esta acción no se puede deshacer. Si el proyecto aún tiene estudiantes o asesores asignados,
                                estos se desasignarán automáticamente.
                            </span>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={async () => {
                                await fetch(`http://localhost:3000/api/projects/${project.id}`, {
                                    method: 'DELETE'
                                })
                                router.push('/app/projects')
                            }}>Eliminar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
