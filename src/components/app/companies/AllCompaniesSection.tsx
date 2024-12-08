import  {cookies} from "next/headers";
import {Company, Project} from "@prisma/client";
import {ProjectCard} from "@/components/app/projects/ProjectCard";
import {CompanyCard} from "@/components/app/companies/CompanyCard";

export async function AllCompaniesSection() {
    const cookieStore = await cookies()
    const data = await fetch('http://localhost:3000/api/companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
        }
    })
    const companies = await data.json()
    if (!companies) return <p>No hay compañías</p>
    return (
        <div className='flex-1 w-full p-5 flex gap-2'>
            {
                companies.map((company: Company) => (
                    <CompanyCard company={company} key={company.id} />
                ))
            }
        </div>
    )
}
