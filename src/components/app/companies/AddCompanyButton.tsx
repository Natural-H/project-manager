'use client'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Plus} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// TODO: Finish this component
export function AddCompanyButton() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data)
        const newCompany = await fetch('http://localhost:3000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(!newCompany.ok) {
            return
        }
        window.location.reload()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bottom-6 right-6 fixed"><Plus/>Añadir organización</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Añadir organización</DialogTitle>
                    <DialogDescription>
                        Rellena los campos para añadir una organización
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre de la organización
                            </Label>
                            <Input id="name" name="name" placeholder="Empresa X" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Nombre clave
                            </Label>
                            <Input id="codename" name="codename" placeholder="Linus Torvalds" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Tamaño
                            </Label>
                            <Select name="size">
                                <SelectTrigger className="w-[340px]">
                                    <SelectValue placeholder="Pequeña, mediana, grande"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tamaños</SelectLabel>
                                        <SelectItem value="short">Pequeña</SelectItem>
                                        <SelectItem value="medium">Mediana</SelectItem>
                                        <SelectItem value="large">Grande</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Añadir organización</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
