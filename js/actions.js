function onGramsInput(mealId, i, value) {
    state[mealId][i].grams = value === "" ? "" : parseFloat(value) || 0;
    renderMealMacros(mealId);
    renderSummary();
}

function addRow(mealId) {
    state[mealId].push({ food: "", grams: "" });
    renderMealRows(mealId);
    renderSummary();

    const body = document.getElementById(`body-${mealId}`);
    const inputs = body.querySelectorAll(".food-input");
    const last = inputs[inputs.length - 1];
    if (last) last.focus();
}

function removeRow(mealId, i) {
    if (state[mealId].length === 1) {
        state[mealId][0] = { food: "", grams: "" };
    } else {
        state[mealId].splice(i, 1);
    }
    renderMealRows(mealId);
    renderSummary();
}

function resetAll() {
    MEALS.forEach(m => { state[m.id] = [{ food: "", grams: "" }]; });
    render();
}