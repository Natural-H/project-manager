
export default function LoginPage() {
    return (
        <main className="flex w-screen h-screen flex-row-reverse">
            <section className="flex flex-1 justify-center items-center">
                <h1 className="font-bold text-4xl">Iniciar sesión</h1>

            </section>
            <aside className="flex flex-1 relative">
                <img src="/login.jpg" alt="Login background image" className="object-cover"/>
                {/*<h2 className="absolute text-white top-32 left-32 text-6xl font-bold">¡Bienvenido de nuevo!</h2>*/}
            </aside>
        </main>
   )
}
