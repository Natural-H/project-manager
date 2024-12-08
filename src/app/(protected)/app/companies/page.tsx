import {AllCompaniesSection} from "@/components/app/companies/AllCompaniesSection";
import {AddCompanyButton} from "@/components/app/companies/AddCompanyButton";

export default function CompaniesPage() {
    return (
        <div className='h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Organizaciones</h1>
            <AddCompanyButton />
            <AllCompaniesSection />
        </div>

    )
}
