import * as React from "react"
import {
  ChartColumn,
  CirclePercent,
  ShoppingBasket
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Conrrefrio",
    email: "diretoria@conrefrio.com.br",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumn,
      isActive: true,
      items: [
        {
          title: "Geral",
          url: "/dashboard",
        }
      ],
    },
    {
      title: "Vendas",
      url: "/sales",
      icon: CirclePercent,
      items: [
        {
          title: "Consultar vendas",
          url: "/sales/list",
        },
        {
          title: "Cadastro de vendas",
          url: "/sales/register",
        },
        {
          title: "Cadastro de clientes",
          url: "/sales/customers",
        },
        {
          title: "Cadastro de vendedores",
          url: "/sales/sellers",
        },
      ],
    },
    {
      title: "Produtos",
      url: "/products",
      icon: ShoppingBasket,
      items: [
        {
          title: "Consultar produtos",
          url: "/products/list",
        },
        {
          title: "Cadastro de produtos",
          url: "/products/register",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
