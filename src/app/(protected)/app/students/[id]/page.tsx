import {StudentProfile} from "@/components/app/students/StudentProfile";

export default async function StudentPage({params} : {params: {id: string}}) {
    const student = await fetch(`http://localhost:3000/api/students/${params.id}`).then(res => res.json())
    return (
        <div>
            <StudentProfile student={student} />
        </div>
    )
}
