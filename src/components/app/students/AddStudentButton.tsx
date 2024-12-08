import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Plus} from "lucide-react";
import {AddStudentForm} from "@/components/app/students/AddStudentForm";
export function AddStudentButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bottom-6 right-6 fixed"><Plus />Añadir estudiante</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir estudiante</DialogTitle>
                    <DialogDescription>
                        Rellena los campos para añadir un estudiante
                    </DialogDescription>
                </DialogHeader>
                <AddStudentForm />
           </DialogContent>
        </Dialog>
    )
}

