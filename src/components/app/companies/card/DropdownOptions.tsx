'use client'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {EditCompanyDialog} from "@/components/app/companies/card/EditCompanyDialog";
import {Company} from "@prisma/client";
import {CompanyProjects} from "@/components/app/companies/card/CompanyProjects";

export function DropdownOptions({company}: { company: Company }) {
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
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Editar organización
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar organización</DialogTitle>
                            <DialogDescription className="flex flex-col">
                                Rellena los campos para editar la organización
                            </DialogDescription>
                        </DialogHeader>
                        <EditCompanyDialog company={company}/>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                            Eliminar organización
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Eliminar organización</DialogTitle>
                            <DialogDescription className="flex flex-col text-red-500">
                                ¿Estás seguro de que deseas eliminar la organización?
                            </DialogDescription>
                            <span>
                                Esta acción no se puede deshacer. Las organizaciones que tengan proyectos u asesores asignados no
                                podrán ser eliminadas.
                            </span>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={async () => {
                                await fetch(`http://localhost:3000/api/companies/${company.id}`, {
                                    method: 'DELETE'
                                })
                                window.location.reload()
                            }}>Eliminar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <Dialog>
                        <DialogTrigger>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                Ver proyectos
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Proyectos de esta organización</DialogTitle>
                           </DialogHeader>
                            <CompanyProjects company={company} />
                        </DialogContent>
                    </Dialog>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
