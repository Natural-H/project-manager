"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Minus} from "lucide-react";

export function DeleteAdvisorDialog({advisorId, projectId}: { advisorId: number, projectId: number }) {
    const handleClick = async () => {
        const deleteAdvisor = await fetch(`http://localhost:3000/api/advisors/${advisorId}/projects/${projectId}`, {
            method: 'DELETE'
        })
        if (!deleteAdvisor.ok) {
            return
        }
        window.location.reload()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon' className="text-red-500">
                    <Minus/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar asesor</DialogTitle>
                    <DialogDescription className="text-red-500">
                        ¿Estás seguro que deseas eliminar a este asesor de este proyecto?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button variant="destructive" type="submit" onClick={handleClick}>Eliminar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
