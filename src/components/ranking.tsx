import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Building2, Factory, MapPin } from "lucide-react"
import { rankTopCustomers } from "@/schemas/schemas"

const Ranking = ({ rankTopCustomers }: { rankTopCustomers: rankTopCustomers[] }) => {

  let id = 1

  const topClients = rankTopCustomers.map((customer) => ({
    id: id++,
    name: customer.nome,
    type: customer.tipo_empresa,
    region: customer.estado,
    value: customer.valor,
  }))

  return ( 
    <div className="col-span-1 p-6 text-white">
        <div className="text-white">
            <p className="text-2xl font-bold">Ranking de Maiores Compras</p>
            <p className="text-sm text-muted-foreground">Top 5 clientes com maiores compras no mês</p>
        </div>
        <div>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Posição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Região</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topClients.map((client, index) => (
                <TableRow key={client.id}>
                    <TableCell className="font-medium">{index + 1}º</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>
                    <div className="flex items-center gap-2">
                        {client.type === "Comércio" ? (
                        <Building2 className="h-4 w-4 text-blue-400" />
                        ) : (
                        <Factory className="h-4 w-4 text-amber-400" />
                        )}
                        {client.type}
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {client.region}
                    </div>
                    </TableCell>
                    <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(client.value)}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default Ranking