import  {cookies} from "next/headers";
import {Project} from "@prisma/client";
import {ProjectCard} from "@/components/app/projects/ProjectCard";

export async function AllProjectsSection() {
    const cookieStore = await cookies()
    const data = await fetch('http://localhost:3000/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
        }
    })
    const projects = await data.json()
    if (!projects) return <p>No hay proyectos</p>
    return (
        <div className='flex-1 w-full flex flex-wrap gap-2 py-4'>
            {
                projects.map((project: Project) => (
                    <ProjectCard project={project} key={project.id} />
                ))
            }
        </div>
    )
}
