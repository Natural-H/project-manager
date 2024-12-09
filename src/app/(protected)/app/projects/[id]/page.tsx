import {ProjectInfo} from "@/components/app/projects/ProjectInfo";
import {ReturnButton} from "@/components/app/ReturnButton";
import {cookies} from "next/headers";

export default async function ProjectDetailsPage({params}: {params: {id: string}}) {
    const cookieStore = await cookies()
    const data = await fetch(`http://localhost:3000/api/projects/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
        }
    })
    const project = await data.json()
    if (!project) return <p className="w-full h-full flex justify-center items-center font-bold text-xl">No se encontró el proyecto</p>

    return (
        <div className='h-full flex-1 w-full p-5'>
            <ReturnButton page='a lista de proyectos' />
            <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
            <ProjectInfo project={project} />
        </div>
    )
}

