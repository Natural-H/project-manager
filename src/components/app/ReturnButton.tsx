'use client'

import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

export function ReturnButton({page}: {page?: string}) {
    const router = useRouter()
    return (
        <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Regresar{' '}{page}
        </Button>
    )
}
