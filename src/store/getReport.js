const getReports = (sales) => {
    let reportsCount = 0;
    let totalSalesDay = 0;
    const reportsRegisteredCount = sales.length;
    let totalSalesMonth = 0;
    const currentDatetime = (new Date().toLocaleString()).split(',')[0];
    const dailySales = {};

    sales.forEach((sale) => {
        const saleDatetime = (sale.datetime).split(',')[0];
        if (saleDatetime === currentDatetime){
            reportsCount += 1;
            totalSalesDay += sale.amount;
        }
        totalSalesMonth += sale.amount;

        if (!dailySales[saleDatetime]) {
            dailySales[saleDatetime] = 0;
        }
        dailySales[saleDatetime] += sale.amount;
    });

    return {
        reportsCountDay: reportsCount,
        totalSalesDay: totalSalesDay.toFixed(2),
        reportsRegisteredCount: reportsRegisteredCount,
        totalSalesMonth: totalSalesMonth.toFixed(2),
    };
};

export default getReports;