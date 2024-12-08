import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Company} from "@prisma/client";


export function CompanyCard({ company } : {company: Company}) {
    return (
        <Link href={`/companies/${company.id}`}>
            <Card className="max-w-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                        {company.name}
                        <span>
                         <Badge variant="outline">{company.codename}</Badge>
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Tamaño: {company.size}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

