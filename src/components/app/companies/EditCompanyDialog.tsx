import {DialogFooter} from "@/components/ui/dialog";
import {Company} from "@prisma/client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useState} from "react";

export function EditCompanyDialog({company}: { company: Company }) {
    const [error, setError] = useState(false)
    console.log(company)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data)
        const editCompany = await fetch(`http://localhost:3000/api/companies/${company.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(!editCompany.ok) {
            setError(true)
            return
        }
        setError(false)
        window.location.reload()
    }
    return (
        <div className="grid gap-4 py-4">
            {
                error && <span className="text-red-500">Error al editar organización</span>
            }
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre de la organización
                        </Label>
                        <Input id="name" name="name" placeholder="Empresa X" defaultValue={company.name}
                               className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right" >
                            Nombre clave
                        </Label>
                        <Input id="codename" name="codename" placeholder="Linus Torvalds" className="col-span-3" defaultValue={company.codename}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Tamaño
                        </Label>
                        <Select name="size" defaultValue={company.size}>
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
                    <Button type="submit">Guardar cambios</Button>
                </DialogFooter>
            </form>
        </div>
    )
}
