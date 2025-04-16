function formatPhone(value) {
    const digits = value.replace(/\D/g, "") // Remove tudo que não é número
  
    if (digits.length <= 10) {
      // Telefone fixo: (47) 3241-4450
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14) // limita tamanho com máscara
    } else {
      // Celular: (47) 99722-7062
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15)
    }
  }

export default formatPhone