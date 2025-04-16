
const getLastMonths =  () => {
    const months = [];
    const today = new Date();
    const todayMonth = today.getMonth() + 1;

    for (let i = 0; i < todayMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const formattedDate = date.toISOString().slice(0, 7);
      months.push(formattedDate);
    }
    
    return months;
  };

export { getLastMonths };