import {LogoutButton} from "@/components/app/settings/LogoutButton";
import {auth} from "@/auth";

export default async function SettingsPage() {
    const session = await auth()
    return (
        <div className='outline h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Configuración</h1>
            <h2>Información de la cuenta</h2>
            <p>ID de la cuenta: {session?.user.id}</p>
            <p>Nombre de usuario: {session?.user.name}</p>
            <p>Correo electrónico: {session?.user.email}</p>
            <div className='flex-1'>
                <LogoutButton />
            </div>
        </div>
    )
}
