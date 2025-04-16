import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerDemo({birthdayDate, setBirthdayDate}) {

  // Função para gerar array de anos (exemplo: últimos 100 anos a partir de hoje)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  // Handler para quando o ano é selecionado no select
  const handleYearChange = (year: string) => {
    const newDate = birthdayDate ? new Date(birthdayDate) : new Date()
    newDate.setFullYear(parseInt(year))
    setBirthdayDate(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal dark:bg-muted/50",
            !birthdayDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {birthdayDate ? format(birthdayDate, "PPP", { locale: ptBR }) : <span>Escolha a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          {/* Select de anos */}
          <Select
            onValueChange={handleYearChange}
            value={birthdayDate?.getFullYear().toString()}
          >
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Escolha o ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Calendário */}
          <Calendar
            mode="single"
            selected={birthdayDate}
            onSelect={setBirthdayDate}
            initialFocus
            locale={ptBR}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}