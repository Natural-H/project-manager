'use client'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import {
    Dialog,
    DialogContent, DialogDescription, DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {EditCompanyDialog} from "@/components/app/companies/EditCompanyDialog";
import {Company} from "@prisma/client";
import {useState} from "react";

export function DropdownOptions({company}: { company: Company }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4"/>
                    <span className="sr-only">Abrir menú</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Dialog>
                    <DialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Editar empresa
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
                <DropdownMenuItem>Eliminar empresa</DropdownMenuItem>
                <DropdownMenuItem>Ver proyectos</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
