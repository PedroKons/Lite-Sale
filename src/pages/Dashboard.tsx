import { ChartPie } from "@/components/chart-pie"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BadgeDollarSign, 
  Users,
  ShoppingBag
} from "lucide-react"
import ChartBarRegion from "@/components/chart-bar"
import Ranking from "@/components/ranking"
import { useEffect, useState } from "react"
import formatMoney from "@/utils/formartMoney"
import { getLastMonths } from "@/utils/getLastMMonths"
import { dashboard } from "@/fetchs/dashboard"
import { SalesByRegion, TypesOfCustomers, rankTopCustomers } from "@/schemas/schemas"
import Spinner from "@/components/spinner"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Formato YYYY-MM

  const [isInvoicing, setIsInvoicing] = useState();
  const [isTotalClients, setIsTotalClients] = useState();
  const [isTotalSales, setIsTotalSales] = useState();
  const [typesOfCustomers, setTypesOfCustomers] = useState<TypesOfCustomers[]>([]);
  const [isSalesByRegion, setIsSalesByRegion] = useState<SalesByRegion>();
  const [isRankTopCustomers, setIsRankTopCustomers] = useState<rankTopCustomers[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await dashboard(selectedMonth);
        const isDashboard = response.data;
        console.log(isDashboard)
        setIsInvoicing(isDashboard.monthly_sales[0].faturamento);
        setIsTotalClients(isDashboard.total_customers[0].total);
        setIsTotalSales(isDashboard.total_sales[0].count);
        setTypesOfCustomers(isDashboard.types_of_customers[0].distribution);
        setIsSalesByRegion(isDashboard.sales_by_region[0].regioes);
        setIsRankTopCustomers(isDashboard.rank_top_customers[0].top_valores);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [selectedMonth]); // Adiciona selectedMonth como dependência

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
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Geral</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {!isLoading && (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[150px] text-white">
                <SelectValue>{selectedMonth}</SelectValue>
              </SelectTrigger>
              <SelectContent className="dark" >
                {getLastMonths().map((month: string) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-6 grid-rows-3 gap-4">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 rounded-xl bg-muted/50">
              <div className="text-white text-2xl flex flex-col gap-8 p-6 h-full">
                <div className="flex items-center justify-between h-[10%]">
                  <p className="text-base font-bold">Faturamento Total</p>
                  <BadgeDollarSign />
                </div>
                <div className="flex items-start justify-start h-[80%] flex-col gap-2">
                  <p className="text-5xl font-bold">{formatMoney(isInvoicing)}</p>
                  <p className="text-sm text-green-500">+20.1% em relação ao mês anterior</p>
                </div>
              </div>
            </div>

            <div className="col-start-3 col-end-5 row-start-1 row-end-2 rounded-xl bg-muted/50">
              <div className="text-white text-2xl flex flex-col gap-8 p-6 h-full">
                <div className="flex items-center justify-between h-[10%]">
                  <p className="text-base font-bold">Total de Clientes</p>
                  <Users />
                </div>
                <div className="flex items-start justify-start h-[80%] flex-col gap-2">
                  <p className="text-5xl font-bold">+{isTotalClients}</p>
                  <p className="text-sm text-green-500">+12 novos este mês</p>
                </div>
              </div>
            </div>

            <div className="col-start-5 col-end-8 row-start-1 row-end-2 rounded-xl bg-muted/50">
              <div className="text-white text-2xl flex flex-col gap-8 p-6 h-full">
                <div className="flex items-center justify-between h-[10%]">
                  <p className="text-base font-bold">Total de Vendas</p>
                  <ShoppingBag />
                </div>
                <div className="flex items-start justify-start h-[80%] flex-col gap-2">
                  <p className="text-5xl font-bold">+{isTotalSales}</p>
                  <p className="text-sm text-green-500">+15.2% em relação ao mês anterior</p>
                </div>
              </div>
            </div>

            <div className="col-start-5 col-end-8 row-start-2 row-end-4 rounded-xl bg-muted/50">
              <ChartPie typesOfCustomers={typesOfCustomers} />
            </div>
            <div className="col-start-1 col-end-5 row-start-2 row-end-4 rounded-xl bg-muted/50 h-[80%]">
              <ChartBarRegion salesByRegion={isSalesByRegion} totalSales={isTotalSales}  />
            </div>

            <div className="col-start-1 col-end-8 row-start-4 row-end-6 rounded-xl bg-muted/50">
              <Ranking rankTopCustomers={isRankTopCustomers} />
            </div>
          </div> 
        </div>
      )}
      {isLoading && (
        <Spinner size={8} color="white"/>
      )}
    </div>
  )
}

