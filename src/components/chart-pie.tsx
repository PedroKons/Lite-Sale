import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TypesOfCustomers } from "@/schemas/schemas"

function ClientTypePieChart({ typesOfCustomers }: { typesOfCustomers: TypesOfCustomers[] }) {
  // Extract percentages from typesOfCustomers
  const commercePercentage = typesOfCustomers[0]?.percentage || 0;
  const industryPercentage = typesOfCustomers[1]?.percentage || 0;
  
  // Calculate stroke dasharray values
  // Full circle circumference is 2πr = 2π*40 = 251.2
  const circumference = 2 * Math.PI * 40;
  const commerceStrokeDasharray = `${(commercePercentage / 100) * circumference} ${circumference}`;
  const industryStrokeDasharray = `${(industryPercentage / 100) * circumference} ${circumference}`;
  const industryStrokeDashoffset = -((commercePercentage / 100) * circumference);
  
  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      <div className="relative h-60 w-60">
        {/* Gráfico de pizza */}
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {/* Comércio */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#60a5fa" // Azul mais claro para dark mode
            strokeWidth="20"
            strokeDasharray={commerceStrokeDasharray}
            transform="rotate(-90 50 50)"
          />
          {/* Indústria */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#fbbf24" // Amarelo mais claro para dark mode
            strokeWidth="20"
            strokeDasharray={industryStrokeDasharray}
            strokeDashoffset={industryStrokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">100%</span>
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
      </div>
      <div className="ml-4 space-y-2">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-blue-400" />
          <span>Comércio ({commercePercentage}%)</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-amber-400" />
          <span>Indústria ({industryPercentage}%)</span>
        </div>
      </div>
    </div>
  )
}

export function ChartPie({ typesOfCustomers }: { typesOfCustomers: TypesOfCustomers[] }) {
  return (
    <div className="flex gap-4 flex-col-reverse">
      <Card className="col-span-3 aspect-video rounded-xl bg-muted/350">
        <CardHeader>
          <CardTitle>Tipos de Clientes</CardTitle>
          <CardDescription>Distribuição entre comércio e indústria</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientTypePieChart typesOfCustomers={typesOfCustomers} />
        </CardContent>
      </Card>
    </div>
  )
}