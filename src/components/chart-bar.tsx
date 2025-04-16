import { MapPin } from "lucide-react"
import { SalesByRegion } from "@/schemas/schemas"

function RegionBarChart({ regioes, totalSales }: { regioes: SalesByRegion, totalSales: number }) {
  const calculatePercentage = (value: number | undefined) => {
    if (!value || totalSales === 0) return 0;
    return (value / totalSales) * 100;
  };

  // Default to empty object if regioes is undefined
  const safeRegioes = regioes || {
    sudeste: 0,
    sul: 0,
    nordeste: 0,
    centroOeste: 0,
    norte: 0
  };

  const sudeste = calculatePercentage(safeRegioes.sudeste);
  const sul = calculatePercentage(safeRegioes.sul);
  const nordeste = calculatePercentage(safeRegioes.nordeste);
  const centroOeste = calculatePercentage(safeRegioes.centroOeste);
  const norte = calculatePercentage(safeRegioes.norte);
  
  const regions = [
    { name: "Sudeste", value: sudeste, color: "bg-blue-500" },
    { name: "Sul", value: sul, color: "bg-emerald-500" },
    { name: "Nordeste", value: nordeste, color: "bg-amber-500" },
    { name: "Centro-Oeste", value: centroOeste, color: "bg-purple-500" },
    { name: "Norte", value: norte, color: "bg-rose-500" },
  ]

  return (
    <div className="space-y-4">
      {regions.map((region) => (
        <div key={region.name} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <MapPin className="h-4 text-muted-foreground w-4" />
              <span className="text-sm font-medium">{region.name}</span>
            </div>
            <span className="text-muted-foreground text-sm">{region.value}%</span>
          </div>
          <div className="bg-muted h-2 rounded-full w-full">
            <div className={`h-2 rounded-full ${region.color}`} style={{ width: `${region.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

const ChartBarRegion = ({ salesByRegion, totalSales }: { salesByRegion: SalesByRegion, totalSales: number }) => {
  return (
    <div className="bg-muted/350 p-6 rounded-xl text-white">
        <div>
            <p className="text-1xl font-bold">Vendas por Região</p>
        </div>
        <div className="mt-4 pl-2">
            <RegionBarChart regioes={salesByRegion} totalSales={totalSales} />
        </div>
    </div>
  )
}

export default ChartBarRegion