/* eslint-disable @typescript-eslint/no-unused-vars */
import InputFisica from "@/components/input-fisica"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import RadioCardsDemo from "@/components/radio-custom"
import { useState } from "react";
import InputJuridica from "@/components/input-juridica";


const CustomerRegistration = () => {
  const [isJuridica, setIsJuridica] = useState(false);
  const [isFisica, setIsFisica] = useState(true);

    return (
        <div className="w-full h-full"> 
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Vendas
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Cadastro de Clientes</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Cadastro de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
              <div>
                <div className="flex items-center gap-2 w-full justify-end">
                <RadioCardsDemo setIsJuridica={setIsJuridica} setIsFisica={setIsFisica} />
                </div>
                {isJuridica ? (
                  <InputJuridica />
                ) : (
                  <InputFisica />
                )}
              </div>
              </CardContent>
            </Card>
          </div>

        </div>
      )
}

export default CustomerRegistration