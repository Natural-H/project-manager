import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Plus} from "lucide-react";
// TODO: Finish this component
export function AddProjectButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bottom-6 right-6 fixed"><Plus />Añadir proyecto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir proyecto</DialogTitle>
                    <DialogDescription>
                        Rellena los campos para añadir un proyecto
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                           Nombre del proyecto
                        </Label>
                        <Input id="name" placeholder="Proyecto de residencia" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" placeholder="Linus Torvalds" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Añadir proyecto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
