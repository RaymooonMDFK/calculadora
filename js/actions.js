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

const modoFila = {};

function toggleModo(mealId, i) {
    const key = `${mealId}-${i}`;
    const food = state[mealId][i].food;
    const porcion = food && DB[food] ? DB[food][5] : null;
    if (!porcion) return;

    const actual = modoFila[key] || "g";
    const nuevo = actual === "g" ? "porcion" : "g";
    modoFila[key] = nuevo;

    const btn = document.getElementById(`toggle-${mealId}-${i}`);
    const inputEl = document.getElementById(`gramos-${mealId}-${i}`);

    if (nuevo === "porcion") {
        btn.textContent = "×" + porcion.unidad[0]; // ej. "×p"
        btn.classList.add("toggle-activo");
        inputEl.placeholder = porcion.unidad;
        // convertir gramos actuales a porciones
        const gramosActuales = parseFloat(state[mealId][i].grams) || 0;
        const porciones = gramosActuales > 0
            ? Math.round((gramosActuales / porcion.gramos) * 10) / 10
            : 1;
        inputEl.value = porciones;
        state[mealId][i].grams = porciones * porcion.gramos;
    } else {
        btn.textContent = "g";
        btn.classList.remove("toggle-activo");
        inputEl.placeholder = "g";
        // convertir porciones a gramos
        const porcionesActuales = parseFloat(inputEl.value) || 1;
        const gramos = Math.round(porcionesActuales * porcion.gramos);
        inputEl.value = gramos;
        state[mealId][i].grams = gramos;
    }

    renderMealMacros(mealId);
    renderSummary();
}

function onGramsInput(mealId, i, value) {
    const key = `${mealId}-${i}`;
    const food = state[mealId][i].food;
    const porcion = food && DB[food] ? DB[food][5] : null;
    const modo = modoFila[key] || "g";

    if (modo === "porcion" && porcion) {
        const porciones = parseFloat(value) || 0;
        state[mealId][i].grams = porciones * porcion.gramos;
    } else {
        state[mealId][i].grams = value === "" ? "" : parseFloat(value) || 0;
    }

    renderMealMacros(mealId);
    renderSummary();
}