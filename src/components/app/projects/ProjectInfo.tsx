import {Project} from "@/lib/ProjectType";
import {ProjectStudentsCard} from "@/components/app/projects/project/ProjectStudentsCard";
import {ProjectAdvisorsCard} from "@/components/app/projects/project/ProjectAdvisorsCard";
import {ProjectCompanyCard} from "@/components/app/projects/project/ProjectCompanyCard";
import {ProjectInfoCard} from "@/components/app/projects/project/ProjectInfoCard";

export function ProjectInfo({project}: { project: Project }) {
    return (

        <div className="grid gap-6 md:grid-cols-2">
           <ProjectInfoCard project={project} />

           <ProjectStudentsCard project={project} />

            <ProjectAdvisorsCard project={project} />

           <ProjectCompanyCard project={project} />
        </div>)
}
