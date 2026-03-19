function calcRow(food, grams) {
    const g = parseFloat(grams) || 0;
    if (!food || !DB[food] || g === 0) return [0, 0, 0, 0, 0];
    return DB[food].map(v => Math.round((v * g / 100) * 10) / 10);
}

function calcMeal(mealId) {
    const totals = [0, 0, 0, 0, 0];
    state[mealId].forEach(row => {
        const vals = calcRow(row.food, row.grams);
        vals.forEach((v, i) => { totals[i] += v; });
    });
    return totals.map(v => Math.round(v * 10) / 10);
}

function calcTotal() {
    const totals = [0, 0, 0, 0, 0];
    MEALS.forEach(m => {
        calcMeal(m.id).forEach((v, i) => { totals[i] += v; });
    });
    return totals.map(v => Math.round(v * 10) / 10);
}