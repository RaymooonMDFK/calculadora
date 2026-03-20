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
    state[mealId][i].food = name;
    const wrap  = document.getElementById(`wrap-${mealId}-${i}`);
    const input = wrap.querySelector(".food-input");
    if (input) input.value = name;
    const list = wrap.querySelector(".autocomplete-list");
    if (list) list.remove();

    // si tiene porción, autocompleta con el peso de 1 porción
    const porcion = DB[name] ? DB[name][5] : null;
    const hintEl  = document.getElementById(`hint-${mealId}-${i}`);
    const inputGramos = document.getElementById(`gramos-${mealId}-${i}`);

    if (porcion) {
        if (hintEl) {
            hintEl.textContent = `1 ${porcion.unidad} = ${porcion.gramos}g`;
            hintEl.style.display = "block";
        }
        if (inputGramos && !state[mealId][i].grams) {
            inputGramos.value      = porcion.gramos;
            state[mealId][i].grams = porcion.gramos;
        }
    } else {
        if (hintEl) hintEl.style.display = "none";
    }

    renderMealMacros(mealId);
    renderSummary();
}