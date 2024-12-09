import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Company} from "@prisma/client";
import {DropdownOptions} from "@/components/app/companies/card/DropdownOptions";


export function CompanyCard({ company } : {company: Company}) {
    return (
            <Card className="max-w-md">
                <CardHeader className="flex justify-between flex-row">
                    <CardTitle className="flex flex-col gap-2">
                        {company.name}
                        <span>
                         <Badge variant="outline">{company.codename}</Badge>
                        </span>
                    </CardTitle>
                    <DropdownOptions company={company} />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Tamaño: {company.size}</p>
                </CardContent>
            </Card>
    )
}

