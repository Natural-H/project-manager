'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'


export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Card className="w-full max-w-md z-10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">¡Bienvenido de vuelta!</CardTitle>
                <CardDescription>Ingresa tus credenciales para iniciar sesión</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="linustorvalds@gmail.com" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <Button className="w-full">Iniciar sesión</Button>
            </CardFooter>
        </Card>
    )
}

