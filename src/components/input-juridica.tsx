import { Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "./date-picker"
import { ComboboxDemo } from "./combobox"
import { states } from "@/utils/states"
import { Separator } from "./ui/separator"
import { FormEvent, useEffect, useState } from "react"
import { format } from "date-fns"
import { toast, Toaster } from "sonner"
import { checkAddress } from "@/utils/viacep"
import formatName from "@/utils/formatName"
import formatPhone from "@/utils/formatPhone"
import formatCnpj from "@/utils/formatCnpj"
import { Button } from "./ui/button"
import Spinner from "./spinner"


const InputJuridica = () => {

    const [razaoSocial, setRazaoSocial] = useState<string>("")
    const [nomeFantasia, setNomeFantasia] = useState<string>("")
    const [cnpj, setCnpj] = useState<string>("")
    const [inscricaoEstadual, setInscricaoEstadual] = useState<string>("")
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState<string>("")
    const [birthdayDate, setBirthdayDate] = useState<Date | null>(null)

    const [street, setStreet] = useState<string>("")
    const [complement, setComplement] = useState<string>("")
    const [homeNumber, setHomeNumber] = useState<number>(0)
    const [neighborhood, setNeighborhood] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [cep, setCep] = useState<string>("")
    const [isStates, setStates] = useState<string>("")

    const [phoneFixed, setPhoneFixed] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [originCustumer, setOriginCustumer] = useState<string>("")
    const [typeCompany, setTypeCompany] = useState<string>("")

    const [isCheckAddress, setIsCheckAddress] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false)

    useEffect(() => {
        const fetchAddress = async () => {
            if(isCheckAddress && cep) {
                try {
                    setIsLoadingCep(true)
                    const data = await checkAddress(cep)
                    setStreet(data.logradouro)
                    setNeighborhood(data.bairro)
                    setCity(data.localidade)
                    setStates(data.uf)
                } catch (error) {
                    console.error("Erro ao buscar endereço:", error)
                } finally {
                    setIsLoadingCep(false)
                    setIsCheckAddress(false)
                }
            }
        }

        fetchAddress()
    }, [isCheckAddress, cep])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const cleanCnpj = cnpj.replace(/\D/g, ""); // Remove all non-digit characters
            const formData = {
                ...(birthdayDate && { data_nascimento: format(birthdayDate, "MM-dd-yyyy") }),
                cnpj: cleanCnpj,
                razao_social: razaoSocial,
                ...(nomeFantasia && {nome_fantasia: nomeFantasia}),
                ...(inscricaoEstadual && {inscricao_estadual: inscricaoEstadual}),
                ...(inscricaoMunicipal && {inscricao_municipal: inscricaoMunicipal}),
                ...(street && { rua: street }),
                ...(complement && { complemento: complement }),
                ...(homeNumber > 0 && { numero: homeNumber }),
                ...(neighborhood && { bairro: neighborhood }),
                ...(city && { cidade: city }),
                ...(isStates && { estado: isStates }),
                ...(cep && { cep: cep }),
                ...(phoneFixed && { telefone_fixo: phoneFixed }),
                ...(phone && { celular: phone }),
                ...(email && { email: email }),
                ...(originCustumer && { origem: originCustumer }),
                ...(typeCompany && { tipo_empresa: typeCompany })
            }

            const response = await fetch('http://localhost:3000/cnpjUsers', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok) {
                toast.error('Erro ao adicionar cliente!', {
                    description: 'Verifique os dados e tente novamente.',
                    duration: 4000,
                })
                return console.log("Erro ao adicionar cliente", razaoSocial)
            }

            setCnpj("")
            setRazaoSocial("")
            setNomeFantasia("")
            setInscricaoEstadual("")
            setInscricaoMunicipal("")
            setBirthdayDate(null)
            setStreet("")
            setComplement("")
            setHomeNumber(0)
            setNeighborhood("")
            setCity("")
            setCep("")
            setStates("")
            setPhoneFixed("")
            setPhone("")
            setEmail("")
            setOriginCustumer("")
            setTypeCompany("")

            toast.success('Cliente adicionado com sucesso!', {
                description: `${formatName(razaoSocial)} foi cadastrado no sistema.`,
                duration: 4000,
            })
            return console.log("Adicionado com sucesso cliente", razaoSocial)

        } catch (error) {
            console.error("Error ao enviar dados:", error)
        } finally {
            setIsLoading(false)
        }
    }


  return (
    <form onSubmit={handleSubmit}>
        <Toaster position="bottom-right" richColors />
        <p className="text-2xl font-bold mb-4 mt-4">Dados Pessoais</p>
        <div className="grid grid-cols-3 gap-4 items-center w-full">
            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="razao-social">Razão Social:</Label>
                <Input 
                    type="text" 
                    id="razao-social" 
                    value={formatName(razaoSocial)}
                    placeholder="Ex: Empresa Exemplo LTDA" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setRazaoSocial(formatName(e.target.value))}
                    required                   
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="nome-fantasia">Nome Fantasia:</Label>
                <Input 
                    type="text" 
                    id="nome-fantasia" 
                    value={formatName(nomeFantasia)}
                    placeholder="Ex: Empresa Exemplo" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setNomeFantasia(formatName(e.target.value))}
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="cnpj">CNPJ:</Label>
                <Input 
                    type="text" 
                    id="cnpj"
                    maxLength={18}
                    value={formatCnpj(cnpj)} 
                    placeholder="Ex: 00.000.000/0001-00" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
                    required
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="inscricao-estadual">Inscrição Estadual:</Label>
                <Input 
                    type="text" 
                    id="inscricao-estadual"
                    value={inscricaoEstadual} 
                    placeholder="Ex: 1234567" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setInscricaoEstadual(e.target.value)}
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="inscricao-municipa	l">Inscrição Municipal:</Label>
                <Input type="text" id="inscricao-municipal" placeholder="Ex: 123456789" className="dark:bg-muted/50"/>
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="date">Data de Nascimento:</Label>
                <DatePickerDemo
                    birthdayDate={birthdayDate} 
                    setBirthdayDate={setBirthdayDate}
                />
            </div>
        </div>
        <Separator className="my-6"/>

        <p className="text-2xl font-bold mb-4 mt-4">Endereço</p>
        <div className="grid grid-cols-3 gap-4 items-center w-full ">
            <div className="col-span-2 flex flex-col gap-3">
                <Label htmlFor="street">Rua</Label>
                <Input 
                    type="text" 
                    id="street"
                    value={street}
                    placeholder="R. Exemplo" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setStreet(e.target.value)}    
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="complement">Complemento</Label>
                <Input 
                    type="text" 
                    id="complement"
                    value={complement}
                    placeholder="Ex: Sala 2" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setComplement(e.target.value)}    
                />
            </div>

            <div className="col-span-1">
                <Label htmlFor="number">Número</Label>  
                <Input 
                    type="number" 
                    id="number" 
                    value={homeNumber}
                    placeholder="Ex: 123" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setHomeNumber(parseInt(e.target.value))}    
                />
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input 
                    type="text" 
                    id="neighborhood"
                    value={neighborhood} 
                    placeholder="Ex: Jardim Exemplo" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setNeighborhood(e.target.value)} 
                />
            </div>
            
            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="city">Cidade</Label>
                <Input 
                    type="text" 
                    id="city"
                    value={city} 
                    placeholder="Ex: São Paulo" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setCity(e.target.value)} 
                />
            </div>

            <div className="col-span-1 flex flex-row gap-3">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="cep">CEP</Label>
                    <Input 
                        type="text" 
                        id="cep" 
                        value={cep}
                        maxLength={8}
                        placeholder="Ex: 00000000" 
                        className="dark:bg-muted/50"
                        onChange={(e) => setCep(e.target.value)}
                    />
                </div>
                <a 
                    onClick={() => setIsCheckAddress(true)} 
                    className={`flex items-end text-sm cursor-pointer ease-linear hover:font-bold pointer-events-${isLoadingCep ? "none" : "auto"}`}
                >
                    {isLoadingCep ? "Carregando..." : "Consultar"}
                </a>
            </div>

            <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="state">Estado</Label>
                <ComboboxDemo 
                    options={states} 
                    placeholder="Selecione um estado" 
                    type="estado"
                    stateValue={isStates}
                    setStateValue={setStates}
                />
            </div>
        </div>
        <Separator className="my-6"/>

        <p className="text-2xl font-bold mb-4 mt-4">Contato</p>
        <div className="flex gap-4 items-center w-full ">
            <div className="w-1/3 flex flex-col gap-3">
                <Label htmlFor="phonefix">Telefone</Label>
                <Input type="text" 
                    id="phonefix"
                    value={formatPhone(phoneFixed)} 
                    placeholder="Ex: (11) 3333-3333" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setPhoneFixed(e.target.value.replace(/\D/g, ""))}
                />
            </div>

            <div className="w-1/3 flex flex-col gap-3">
                <Label htmlFor="phone">Celular</Label>
                <Input 
                    type="text" 
                    id="phone" 
                    value={formatPhone(phone)}
                    placeholder="Ex: (11) 99999-9999" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                />
            </div>

            <div className="w-1/3 flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                    type="text" 
                    id="email" 
                    value={email}
                    placeholder="Ex: exemplo@email.com" 
                    className="dark:bg-muted/50"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>
        <Separator className="my-6"/>

        <p className="text-2xl font-bold mb-4 mt-4">Informações adicionais</p>
        <div className="flex gap-4 items-center w-full ">
            <div className="flex flex-col gap-3">
                <Label htmlFor="origin">Origem do cliente</Label>
                <ComboboxDemo 
                    options={[
                        {value: "indicacao", label: "Indicação"}, 
                        {value: "rede social", label: "Rede Social"}, 
                        {value: "site", label: "Site"}, 
                        {value: "vendedor", label: "Vendedor"}, 
                        {value: "outros", label: "Outros"}
                    ]}
                    placeholder="Selecione a origem"
                    type="cliente"
                    stateValue={originCustumer}
                    setStateValue={setOriginCustumer}
                />

            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="typecompany">Tipo de empresa</Label>
                <ComboboxDemo 
                    options={[
                        {value: "industria", label: "Indústria"}, 
                        {value: "comercio", label: "Comércio"}, 
                    ]}
                    placeholder="Selecione o tipo"
                    type="empresa"
                    stateValue={typeCompany}
                    setStateValue={setTypeCompany}  
                />
            </div>
        </div>
        <Button type="submit" className="mt-4" disabled={isLoading}>
          {!isLoading &&(
            "Adicionar"
          )}
          {isLoading && (
            <Spinner size={5} color="black"/>
          )}
        </Button>
    </form>
  )
}

export default InputJuridica