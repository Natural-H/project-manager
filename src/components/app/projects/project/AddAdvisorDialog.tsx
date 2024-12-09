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
import {Plus} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useEffect, useState} from "react";
import {Advisor} from "@/lib/AdvisorType";


export function AddAdvisorDialog({projectId}: {projectId: number}) {
    const [advisors, setAdvisors] = useState<Advisor[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchAdvisors = async () => {
            const res = await fetch('/api/advisors')
            const data = await res.json()
            setAdvisors(data)
        }
        fetchAdvisors()
    }, [projectId])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data)
        const assignAdvisor= await fetch(`http://localhost:3000/api/advisors/${data.advisor}/projects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: projectId
            })
        })
        if(!assignAdvisor.ok) {
            setError(true)
            return
        }
        window.location.reload()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="m-0">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Asignar asesor</DialogTitle>
                    <DialogDescription className='flex flex-col'>
                        Seleccione un asesor para asignar al proyecto.
                        {
                            error && <span className='text-red-500'>
                                Error al asignar asesor
                            </span>
                        }
                    </DialogDescription>
                </DialogHeader>
                {
                    // TODO: Change this component to a Combobox
                }
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Select name="advisor">
                        <SelectTrigger>
                            <SelectValue placeholder="Asesor" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                advisors.map(advisor => (
                                    <SelectItem key={advisor.id} value={advisor.id.toString()}>
                                        {advisor.user.firstName} {advisor.user.lastName}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                        <div className="flex justify-end">
                            <Button type="submit">Asignar asesor</Button>
                        </div>

                    </Select>

                </form>
            </DialogContent>
        </Dialog>
    )
}
