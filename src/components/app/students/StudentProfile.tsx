"use client"

import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/navigation"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ArrowLeft, Save} from 'lucide-react'
import {Student} from "@/lib/Types";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export function StudentProfile({student}: { student: Student }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState({
        message: '',
        show: false
    })
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!student) {
            router.push('/app/students')
        }
        console.log(student)
    }, [router, student]);
    const handleSave = async () => {
        const studentData = new FormData(formRef.current as HTMLFormElement)
        console.log(studentData.get('controlNumber'))

        const body = {
            controlNumber: studentData.get('controlNumber'),
            id: student.id,
            project: student.project,
            projectId: student.projectId,
            idUser: student.idUser,
            user: {
                password: student.user.password,
                id: student.user.id,
                firstName: studentData.get('firstName'),
                middleName: studentData.get('middleName'),
                lastName: studentData.get('lastName'),
                curp: studentData.get('curp'),
                email: studentData.get('email'),
                username: studentData.get('username'),
            },
        }

        console.log(body)
        const res = await fetch(`/api/students/${student.id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            const data = await res.json()
            setError({
                message: data.message,
                show: true
            })
            return
        }
        console.log(res)
        const data = await res.json()
        console.log(data)
        setIsEditing(false)
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/students/${student.id}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            const data = await res.json()
            setError({
                message: data.message,
                show: true
            })
            return
        }
        router.push('/app/students')
    }

    return (
        <div className="container mx-auto py-3">
            <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Regresar a lista de estudiantes
            </Button>
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex gap-4">
                    <CardTitle className="text-2xl">{isEditing ? "Editar" : "Ver"} perfil de estudiante</CardTitle>
                    <div className="flex gap-4 items-center">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback>{student.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">{`${student.user.firstName} ${student.user.lastName}`}</h3>
                    </div>

                </CardHeader>
                <CardContent className="space-y-4">
                    <form ref={formRef}>
                        {
                            error.show &&
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                 role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline">{error.message}</span>
                            </div>
                        }
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Primer nombre</Label>
                                <Input
                                    id="name"
                                    name="firstName"
                                    defaultValue={student.user.firstName}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Segundo nombre</Label>
                                <Input
                                    id="middleName"
                                    name="middleName"
                                    defaultValue={student.user.middleName}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Apellidos</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={student.user.lastName}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">CURP</Label>
                                <Input
                                    id="curp"
                                    name="curp"
                                    defaultValue={student.user.curp}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    defaultValue={student.user.username}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={student.user.email}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Número de control</Label>
                                <Input
                                    id="controlNumber"
                                    name="controlNumber"
                                    defaultValue={student.controlNumber}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => {
                                setIsEditing(false)
                                window.location.reload()
                            }}>Cancel</Button>
                            <Button onClick={handleSave}>
                                <Save className="mr-2 h-4 w-4"/>
                                Guardar cambios
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setIsEditing(true)}>Editar perfil</Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">Eliminar estudiante</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Eliminar estudiante</DialogTitle>
                                        <DialogDescription>
                                            ¿Estás seguro de que deseas <span className='text-red-500'>eliminar</span> a {student.user.firstName} {student.user.lastName}?
                                            Nota: Esta acción no se puede deshacer.
                                        </DialogDescription>
                                    </DialogHeader>
                                   <DialogFooter>
                                       <DialogClose asChild>
                                           <Button variant="outline">Cancelar</Button>
                                       </DialogClose>
                                        <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

