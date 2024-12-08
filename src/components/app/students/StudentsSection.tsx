import {cookies} from "next/headers";
import {StudentCard} from "@/components/app/students/StudentCard";
import {Student} from "@/lib/types";

export async function StudentsSection() {
    const cookieStore = await cookies()
    const data = await fetch('http://localhost:3000/api/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieStore.toString()
        }
    })
    const students = await data.json()
    if (!students) return <p>No hay estudiantes registrados</p>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                students.map((student: Student) => (
                    <StudentCard key={student.id} student={student} />
                ))
            }
        </div>
    )
}
