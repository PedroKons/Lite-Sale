

const dashboard = async (month: string) => {
    try {
        const response = await fetch(`http://localhost:3000/dashboard?month=${month}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar dashboard');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dashboard:', error);
        throw error;
    }
}

export { dashboard };