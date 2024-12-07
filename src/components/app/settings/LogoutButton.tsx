import {signOut} from "@/auth";
import {Button} from "@/components/ui/button";

export function LogoutButton() {
    return (
        <Button onClick={async () => {
            "use server"
            await signOut()
        }}>Cerrar sesión</Button>
    )
}

