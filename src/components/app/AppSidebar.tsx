import {Building2,  GraduationCap, Home, Inbox, Search, Settings} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Inicio",
        url: "/app",
        icon: Home,
    },
    {
        title: "Proyectos",
        url: "/app/projects",
        icon: Inbox,
    },
    {
        title: "Estudiantes",
        url: "/app/students",
        icon: GraduationCap,
    },
    {
        title: "Organizaciones",
        url: "/app/companies",
        icon: Building2,
    },
    {
        title: "Buscar",
        url: "/app/search",
        icon: Search,
    },
    {
        title: "Configuración",
        icon: Settings,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <h2 className='font-bold text-xl my-5 text-black text-center'>Sistema Gestor de Residencias</h2>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
