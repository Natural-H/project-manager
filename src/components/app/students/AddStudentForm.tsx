'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export function AddStudentForm() {
    const [error, setError] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const user = {
            username: data.username,
            password: 'test',
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            curp: data.curp,
            email: data.email
       }
       const newData = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
       })
        if (!newData.ok) {
            setError(true)
            return
        }
        const newUser = await newData.json()
        const newStudentData = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUser: newUser.id,
                controlNumber: data.controlNumber
            })
        })
        if (!newStudentData.ok) {
            setError(true)
            return
        }
        window.location.reload()

    }
    return (
        <form onSubmit={handleSubmit}>
            {error &&
            <span className="text-red-500 text-sm">Error creando estudiante, verifica los datos</span>
            }
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Primer nombre
                    </Label>
                    <Input name="firstName" id="firstName" placeholder="Juan" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Segundo nombre
                    </Label>
                    <Input name="middleName" id="middleName" placeholder="Manuel" className="col-span-3"/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Apellido/s
                    </Label>
                    <Input name="lastName" id="lastName" placeholder="Ramos" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Nombre de usuario
                    </Label>
                    <Input name="username" id="username" placeholder="juanRamos" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Contraseña
                    </Label>
                    <Input id="password" placeholder="••••••••••••" className="col-span-3" disabled/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        CURP
                    </Label>
                    <Input name="curp" id="curp" placeholder="XXXX123456AAAGR" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Email
                    </Label>
                    <Input name="email" id="email" placeholder="juanramos@email.com" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Número de control
                    </Label>
                    <Input name="controlNumber" id="controlNumber" placeholder="22040000" className="col-span-3"/>
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">Añadir estudiante</Button>
            </div>
        </form>
    )
}
