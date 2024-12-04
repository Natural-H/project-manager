import Link from 'next/link'
import {Button} from "@/components/ui/button"
import {ArrowRight} from 'lucide-react'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <span className="ml-2 text-2xl font-bold">ITD</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button>Entrar</Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Sistema Gestor de Residencias
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Administra, controla y gestiona las residencias de tus estudiantes de manera
                                    eficiente.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <Button type="submit">
                                    Comenzar
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                           </div>
                        </div>
                    </div>
                </section>
           </main>
            <footer className="flex gap-2 justify-end py-6 w-full shrink-0 px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">
                    Creado por: Marco Antonio Mauricio Martínez y Emilio Salas Luján
                </p>
           </footer>
        </div>
    )
}
