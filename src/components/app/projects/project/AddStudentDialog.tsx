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
import {Plus} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useEffect, useState} from "react";
import {Student} from "@/lib/types";


export function AddStudentDialog({projectId}: {projectId: number}) {
    const [students, setStudents] = useState<Student[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        function getStudentsWithNullProjectId(data: Student[]) {
            return data.filter(student => student.projectId === null);
        }

        const fetchStudents = async () => {
            const res = await fetch('/api/students')
            const data = await res.json()
            setStudents(getStudentsWithNullProjectId(data))
        }
        fetchStudents()
    }, [projectId])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data)
        const assignStudent = await fetch(`http://localhost:3000/api/students/${data.student}/project`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: projectId
            })
        })
        if(!assignStudent.ok) {
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
                    <DialogTitle>Asignar estudiante</DialogTitle>
                    <DialogDescription className='flex flex-col'>
                        Seleccione un estudiante para asignar al proyecto.
                        {
                            error && <span className='text-red-500'>
                                Error al asignar estudiante
                            </span>
                        }
                   </DialogDescription>
                </DialogHeader>
                {
                    // TODO: Change this component to a Combobox
                }
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Select name="student">
                        <SelectTrigger>
                            <SelectValue placeholder="Alumno" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                students.map(student => (
                                    <SelectItem key={student.id} value={student.id.toString()}>
                                        {student.user.firstName} {student.user.lastName}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                        <div className="flex justify-end">
                            <Button type="submit">Asignar estudiante</Button>
                        </div>

                    </Select>

                </form>
          </DialogContent>
        </Dialog>
    )
}
