import {auth} from "@/auth";
import  {cookies} from "next/headers";
import {Project} from "@prisma/client";
import {ProjectCard} from "@/components/app/projects/ProjectCard";

export async function MyProjectsSection() {
    const session = await auth()
    const cookieStore = await cookies()
    const data = await fetch(`http://localhost:3000/api/advisors/${session?.user.id}/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
        }
    })
    const projects = await data.json()
    if (!projects) return <p>No hay proyectos</p>
    return (
        <div className='flex-1 w-full p-5 flex gap-2'>
            {
                projects.map((project: Project) => (
                    <ProjectCard project={project} key={project.id} />
                ))
            }
      </div>
    )
}
