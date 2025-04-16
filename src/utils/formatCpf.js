function formatCpf(cpf) {
    if (!cpf) return "";
    return cpf
        .replace(/\D/g, "")                       // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, "$1.$2")          // Coloca o primeiro ponto
        .replace(/(\d{3})(\d)/, "$1.$2")          // Coloca o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")    // Coloca o traço
}

export default formatCpf;    
