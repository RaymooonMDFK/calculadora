function render() {
    renderMeals();
    renderSummary();
}

function renderMeals() {
    const grid = document.getElementById("mealsGrid");
    grid.innerHTML = "";
    MEALS.forEach(meal => {
        const isImage = meal.icon.includes('.');
        const iconHtml = isImage
            ? `<img src="${meal.icon}" alt="${meal.label}" style="width:24px; height:24px; vertical-align:middle;">`
            : meal.icon;

        const card = document.createElement("div");
        card.className = "meal-card";
        card.innerHTML = `
            <div class="meal-header">
                <span class="meal-icon">${iconHtml}</span>
                <span class="meal-title">${meal.label}</span>
            </div>
            <div class="meal-body" id="body-${meal.id}"></div>
            <div class="meal-macros" id="macros-${meal.id}"></div>
        `;
        grid.appendChild(card);
        renderMealRows(meal.id);
    });
}

function renderMealRows(mealId) {
    const body = document.getElementById(`body-${mealId}`);
    body.innerHTML = "";
    state[mealId].forEach((row, i) => {
        const rowEl = document.createElement("div");
        rowEl.className = "food-row";
        rowEl.innerHTML = `
            <div class="food-input-wrap" id="wrap-${mealId}-${i}">
                <input
                    class="food-input"
                    type="text"
                    placeholder="alimento..."
                    value="${row.food}"
                    autocomplete="off"
                    oninput="onFoodInput('${mealId}',${i},this.value)"
                    onblur="hideAutocomplete('${mealId}',${i})"
                    onkeydown="onFoodKeydown(event,'${mealId}',${i})"
                />
            </div>
            <input
                class="grams-input"
                type="number"
                min="0"
                placeholder="g"
                value="${row.grams}"
                oninput="onGramsInput('${mealId}',${i},this.value)"
            />
            <button class="remove-btn" onclick="removeRow('${mealId}',${i})" title="Eliminar">×</button>
        `;
        body.appendChild(rowEl);
    });

    const addBtn = document.createElement("button");
    addBtn.className = "add-row-btn";
    addBtn.innerHTML = "+ añadir alimento";
    addBtn.onclick = () => addRow(mealId);
    body.appendChild(addBtn);

    renderMealMacros(mealId);
}

function renderMealMacros(mealId) {
    const macrosEl = document.getElementById(`macros-${mealId}`);
    const totals = calcMeal(mealId);
    macrosEl.innerHTML = `
        <span class="macro-chip" style="color:var(--cal-color)">${totals[0]} kcal</span>
        <span class="macro-chip" style="color:var(--prot-color)">${totals[1]}g prot</span>
        <span class="macro-chip" style="color:var(--carb-color)">${totals[2]}g carb</span>
        <span class="macro-chip" style="color:var(--fat-color)">${totals[3]}g gras</span>
        <span class="macro-chip" style="color:var(--fib-color)">${totals[4]}g fib</span>
    `;
}

function renderSummary() {
    const total = calcTotal();
    const labels = ["Calorías", "Proteína", "Carbohidratos", "Grasas", "Fibra"];
    const units = ["kcal", "g", "g", "g", "g"];
    const classes = ["cal", "prot", "carb", "fat", "fib"];
    const grid = document.getElementById("summaryGrid");

    grid.innerHTML = labels.map((label, i) => `
        <div class="summary-card ${classes[i]}">
            <div class="s-label">${label}</div>
            <div class="s-value">${total[i]}</div>
            <div class="s-unit">${units[i]}</div>
        </div>
    `).join("");

    renderBreakdown();
}

function renderBreakdown() {
    const wrap = document.getElementById("breakdownWrap");
    const allRows = [];

    MEALS.forEach(meal => {
        const validRows = state[meal.id].filter(r => r.food && DB[r.food] && parseFloat(r.grams) > 0);
        if (validRows.length) {
            allRows.push({ type: "group", label: meal.label });
            validRows.forEach(r => {
                const vals = calcRow(r.food, r.grams);
                allRows.push({ type: "row", food: r.food, grams: r.grams, vals });
            });
        }
    });

    if (!allRows.length) {
        wrap.innerHTML = `<div class="empty-note">// aún no hay alimentos ingresados</div>`;
        return;
    }

    const total = calcTotal();
    const table = document.createElement("table");
    table.className = "breakdown-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Alimento</th>
                <th>g</th>
                <th style="color:var(--cal-color)">kcal</th>
                <th style="color:var(--prot-color)">Prot</th>
                <th style="color:var(--carb-color)">Carb</th>
                <th style="color:var(--fat-color)">Gras</th>
                <th style="color:var(--fib-color)">Fib</th>
            </tr>
        </thead>
        <tbody>
            ${allRows.map(r => r.type === "group"
        ? `<tr class="meal-group"><td colspan="7">${r.label}</td></tr>`
        : `<tr>
                    <td>${r.food}</td>
                    <td>${r.grams}</td>
                    <td>${r.vals[0]}</td>
                    <td>${r.vals[1]}</td>
                    <td>${r.vals[2]}</td>
                    <td>${r.vals[3]}</td>
                    <td>${r.vals[4]}</td>
                   </tr>`
    ).join("")}
            <tr class="total-row">
                <td colspan="2">TOTAL</td>
                <td>${total[0]}</td>
                <td>${total[1]}</td>
                <td>${total[2]}</td>
                <td>${total[3]}</td>
                <td>${total[4]}</td>
            </tr>
        </tbody>
    `;
    wrap.innerHTML = "";
    wrap.appendChild(table);
}