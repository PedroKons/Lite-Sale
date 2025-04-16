import { Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { FormEvent, useState } from "react"

const InputSellers = () => {
  const [name, setName] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/sellers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          "nome_completo" : name
        })
      })

      if (response.ok) {
        setName("")
        return console.log("Adicionado com sucesso o vendedor",name)
      }
    } catch (error) {
      console.error("Error ao enviar dados:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center w-full">
          <div className="w-1/3 flex flex-col gap-3">
              <Label htmlFor="name">Nome Completo:</Label>
              <Input 
                type="text" 
                id="name" 
                placeholder="Ex: João da Silva" 
                className="dark:bg-muted/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Adicionar
        </Button>
    </form>
  )
}

export default InputSellers