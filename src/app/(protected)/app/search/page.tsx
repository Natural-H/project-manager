"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Search, Briefcase, FolderOpen, GraduationCap} from 'lucide-react'
import Link from "next/link";

// Define a type for our search results
type SearchResult = {
    id: string
    kind: "user" | "project" | "company"
    name: string
}

// Mock data for demonstration

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const handleSearch = async () => {
        const data = await fetch(`http://localhost:3000/api/search?search=${searchTerm}`)
        const results = await data.json()
        console.log(results)
       setSearchResults(results)
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "student":
                return <GraduationCap className="h-4 w-4" />
            case "project":
                return <FolderOpen className="h-4 w-4" />
            case "company":
                return <Briefcase className="h-4 w-4" />
        }
    }

    return (
        <div className='h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Buscar</h1>
            <div className="flex gap-2 mb-6">
                <Input
                    placeholder="Busca estudiantes, proyectos, organizaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2"/>
                    Buscar
                </Button>
            </div>
            <div className="space-y-4 flex flex-col">
                {searchResults.map((result, index) => (

                    <Link key={index} href={`/app/${result.kind}s/${result.id}`}>
                        <Card className="hover:shadow-lg transition-shadow ease-in-out">
                        <CardContent className="flex items-center p-4">
                            <Badge variant="outline" className="mr-4">
                                {getIcon(result.kind)}
                                <span className="ml-1 capitalize">{result.kind}</span>
                            </Badge>
                            <div>
                                <h2 className="text-lg font-semibold">{result.name}</h2>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>               ))}
                {searchResults.length === 0 && searchTerm && (
                    <p className="text-center text-muted-foreground">No se encontraron resultados</p>
                )}
            </div>
        </div>
    )
}

