function formatCnpj(cnpj) {
    if (!cnpj) return "";
    return cnpj
        .replace(/\D/g, "")                           // Remove tudo que não for número
        .replace(/^(\d{2})(\d)/, "$1.$2")             // Coloca o primeiro ponto
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")  // Coloca o segundo ponto
        .replace(/\.(\d{3})(\d)/, ".$1/$2")           // Coloca a barra
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");       // Coloca o traço
}

export default formatCnpj;