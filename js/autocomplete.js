let acState = {};

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function onFoodInput(mealId, i, value) {
    state[mealId][i].food = value;
    showAutocomplete(mealId, i, value);
    renderMealMacros(mealId);
    renderSummary();
}

function showAutocomplete(mealId, i, query) {
    const wrap = document.getElementById(`wrap-${mealId}-${i}`);
    const existing = wrap.querySelector(".autocomplete-list");
    if (existing) existing.remove();
    if (!query.trim()) return;

    const q = normalize(query);
    const matches = Object.keys(DB).filter(k => normalize(k).includes(q));
    if (!matches.length) return;

    const list = document.createElement("div");
    list.className = "autocomplete-list";
    list.id = `ac-${mealId}-${i}`;

    const key = `${mealId}-${i}`;
    acState[key] = { active: -1, matches };

    matches.forEach(name => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.innerHTML = `${name} <span class="kcal-hint">${DB[name][0]} kcal/100g</span>`;
        item.onmousedown = (e) => {
            e.preventDefault();
            selectFood(mealId, i, name);
        };
        list.appendChild(item);
    });

    wrap.appendChild(list);
}

function hideAutocomplete(mealId, i) {
    setTimeout(() => {
        const wrap = document.getElementById(`wrap-${mealId}-${i}`);
        if (wrap) {
            const list = wrap.querySelector(".autocomplete-list");
            if (list) list.remove();
        }
    }, 150);
}

function onFoodKeydown(e, mealId, i) {
    const key = `${mealId}-${i}`;
    if (!acState[key]) return;
    const list = document.getElementById(`ac-${mealId}-${i}`);
    if (!list) return;
    const items = list.querySelectorAll(".autocomplete-item");
    let active = acState[key].active;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        active = (active + 1) % items.length;
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = (active - 1 + items.length) % items.length;
    } else if (e.key === "Enter" && active >= 0) {
        e.preventDefault();
        selectFood(mealId, i, acState[key].matches[active]);
        return;
    } else if (e.key === "Escape") {
        hideAutocomplete(mealId, i);
        return;
    } else if (e.key === "Tab") {
        if (!list) return;
        e.preventDefault();
        const matches = acState[key]?.matches;
        if (!matches?.length) return;
        const idx = acState[key].active >= 0 ? acState[key].active : 0;
        selectFood(mealId, i, matches[idx]);
        return;
    }

    acState[key].active = active;
    items.forEach((el, idx) => {
        el.classList.toggle("active", idx === active);
    });

    // desplazar el item activo a la vista
    const activeEl = list.querySelector(".autocomplete-item.active");
    if (activeEl) activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function selectFood(mealId, i, name) {
    state[mealId][i].food  = name;
    state[mealId][i].grams = state[mealId][i].grams || "";

    // si tiene porción, precarga el peso de 1 porción
    const porcion = DB[name] ? DB[name][5] : null;
    if (porcion && !state[mealId][i].grams) {
        state[mealId][i].grams = porcion.gramos;
    }

    // redibujar la fila completa para que aparezca el toggle
    renderMealRows(mealId);

    // mover foco al input de gramos
    const inputGramos = document.getElementById(`gramos-${mealId}-${i}`);
    if (inputGramos) {
        inputGramos.focus();
        inputGramos.select();
    }

    renderMealMacros(mealId);
    renderSummary();
}