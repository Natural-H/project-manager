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

export function DeleteStudentDialog({studentId}: { studentId: number }) {
    const handleClick = async () => {
        const deleteStudent = await fetch(`http://localhost:3000/api/students/${studentId}/project`, {
            method: 'DELETE'
        })
        if (!deleteStudent.ok) {
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
                    <DialogTitle>Eliminar estudiante</DialogTitle>
                    <DialogDescription className="text-red-500">
                        ¿Estás seguro que deseas eliminar a este estudiante de este proyecto?
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
