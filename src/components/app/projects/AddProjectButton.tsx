'use client'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {CalendarIcon, Plus} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from '@/components/ui/calendar'
import {useEffect, useState} from "react";
import {format} from "@formkit/tempo";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Company} from "@/lib/ProjectType";

export function AddProjectButton() {
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [companies, setCompanies] = useState<Company[]>([])
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await fetch('/api/companies')
            const data = await res.json()
            setCompanies(data)
        }
        fetchCompanies()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data)
       const addProject = await fetch(`http://localhost:3000/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keyname: data.keyname,
                name: data.name,
                description: data.description,
                funding: parseFloat(data.funding as string),
                companyId: Number(data.company),
                dateBegin: startDate,
                dateEnd: endDate
            })
        })
        const body = await addProject.json()
        console.log(body)
        if(!addProject.ok) {
            setError(true)
            return
        }
        setError(false)
        window.location.reload()

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bottom-6 right-6 fixed"><Plus/>Añadir proyecto</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir proyecto</DialogTitle>
                    <DialogDescription className="flex flex-col">
                        Rellena los campos para añadir un proyecto
                        {
                            error && <span className='text-red-500'>
                                Error al añadir proyecto
                            </span>
                        }
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre del proyecto
                            </Label>
                            <Input id="name" name="name" placeholder="Proyecto de residencia" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="keyname" className="text-right">
                                Nombre clave
                            </Label>
                            <Input id="keyname" name="keyname" placeholder="Linus Torvalds" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descripción
                            </Label>
                            <Textarea name="description" placeholder="Añade la descripción de tu proyecto..."
                                      className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="funding" className="text-right">
                                Remuneración
                            </Label>
                            <Input id="funding" name="funding" defaultValue="0" type="number" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Fecha de inicio
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`pl-3 text-left font-normal col-span-3 ${startDate ? 'text-black' : 'text-muted-foreground '}`}
                                    >
                                        {startDate ? (
                                            format(startDate, "medium", "es")
                                        ) : (
                                            <span>Selecciona una fecha</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        initialFocus
                                        selected={startDate}
                                        onSelect={setStartDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Fecha de fin
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`pl-3 text-left font-normal col-span-3 ${endDate ? 'text-black' : 'text-muted-foreground '}`}
                                    >
                                        {endDate ? (
                                            format(endDate, "medium", "es")
                                        ) : (
                                            <span>Selecciona una fecha</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        initialFocus
                                        selected={endDate}
                                        onSelect={setEndDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Organización
                            </Label>

                            <Select name="company">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Organización"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        companies.map(company => (
                                            <SelectItem key={company.id} value={company.id.toString()}>
                                                {company.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Añadir proyecto</Button>
                    </div>
                </form>
           </DialogContent>
        </Dialog>
    )
}
