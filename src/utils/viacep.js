const checkAddress = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })

        if(response.ok) {
            const data = await response.json()
            return data 
        }
    } catch (error) {
        console.error("Error ao receber informações de endereço", error)
        throw error
    }
}

export { checkAddress }