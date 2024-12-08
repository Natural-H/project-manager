import {StudentsSection} from "@/components/app/students/StudentsSection";

export default function StudentsPage() {
    return (
        <div className='h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Estudiantes</h1>
            <StudentsSection />
        </div>

    )
}
