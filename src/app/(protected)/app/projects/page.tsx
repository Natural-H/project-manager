import {MyProjectsSection} from "@/components/app/projects/MyProjectsSection";
import {AllProjectsSection} from "@/components/app/projects/AllProjectsSection";
import {AddProjectButton} from "@/components/app/projects/AddProjectButton";

export default function ProjectsPage() {
    return (
        <div className='h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Proyectos</h1>
            <AddProjectButton />
            <div className='flex-1'>
                <h3 className='text-xl font-bold'>Mis proyectos</h3>
                <p className='text-sm text-gray-500'>Aquí encontrarás tus proyectos</p>
                <MyProjectsSection />
                <h3 className='text-xl font-bold'>Todos los proyectos</h3>
                <p className='text-sm text-gray-500'>Aquí encontrarás todos los proyectos</p>
                <AllProjectsSection />
            </div>
        </div>
    )
}
