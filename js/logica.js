// ─────────────────────────────────────────────
//  BASE DE DATOS — valores por 100g
//  Para agregar un alimento nuevo:
//  "Nombre": [kcal, proteína, carbs, grasas, fibra]
// ─────────────────────────────────────────────
const DB = {
    "Claras de huevo": [52, 10.9, 0.7, 0.2, 0],
    "Huevo entero": [143, 12.6, 1.1, 9.5, 0],
    "Atún en sobre": [116, 25.5, 0, 1.0, 0],
    "Pechuga de pollo": [165, 31.0, 0, 3.6, 0],
    "Chuleta de cerdo": [242, 27.0, 0, 14.0, 0],
    "Arroz blanco crudo": [365, 7.1, 79, 1, 1.3],
    "Lechuga": [15, 1.4, 2.9, 0.2, 1.3],
    "Plátano": [89, 1.1, 22.8, 0.3, 2.6],
    "aguacate": [160, 2.0, 8.5, 15.0, 6.7],
    "avena": [389, 16.9, 66.3, 6.9, 10.6],
    "chia": [486, 16.5, 42.1, 30.7, 34.4],
    "leche deslactosada": [35, 3.4, 5, 0.1, 0],
    "doritos morados": [500, 5.8, 50, 30, 3],
    "papa": [86, 1.5, 18, 2.6, 1], 
    "Chetos bolita": [548, 4.9, 45.5, 38.5, 2.3],
    "rummo": [347, 14, 65, 3.5, 2.6],
    "pasta lasaña": [165, 5.9, 32.1, 1.5, 2.4],
    "papa": [80, 1.5, 18, 2.6, 1]
};

const MEALS = [
    { id: "desayuno", label: "Desayuno", icon: "../img/naranja.png" },
    { id: "colacion1", label: "Colación", icon: "../img/verde.png" },
    { id: "comida", label: "Comida", icon: "../img/rojo.png" },
    { id: "colacion2", label: "Colación", icon: "../img/verde.png" },
    { id: "cena", label: "Cena", icon: "../img/azul.png" },
];

// state: { mealId: [ { food: string, grams: number } ] }
let state = {};
MEALS.forEach(m => { state[m.id] = [{ food: "", grams: "" }]; });

function saveToUserDB(name, values) {
    DB[name] = values;
    try {
        const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
        saved[name] = values;
        localStorage.setItem("userDB", JSON.stringify(saved));
    } catch { }
}

function verUserDB() {
    const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
    console.table(saved);
    console.log(JSON.stringify(saved, null, 2));
}

// ─── modal ────────────────────────────────────
function openModal() {
    ["mNombre", "mCal", "mProt", "mCarb", "mGras", "mFib"]
        .forEach(id => document.getElementById(id).value = "");
    document.getElementById("modalError").style.display = "none";
    const m = document.getElementById("addFoodModal");
    m.style.display = "flex";
    document.getElementById("mNombre").focus();
}

function closeModal() {
    document.getElementById("addFoodModal").style.display = "none";
}

function submitNewFood() {
    const name = document.getElementById("mNombre").value.trim();
    const vals = ["mCal", "mProt", "mCarb", "mGras", "mFib"]
        .map(id => parseFloat(document.getElementById(id).value) || 0);

    const errEl = document.getElementById("modalError");

    if (!name) {
        errEl.textContent = "// el nombre no puede estar vacío";
        errEl.style.display = "block";
        return;
    }
    if (DB[name]) {
        errEl.textContent = `// "${name}" ya existe en la base de datos`;
        errEl.style.display = "block";
        return;
    }

    saveToUserDB(name, vals);
    closeModal();
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});


// ─── render ───────────────────────────────────
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

    // add row button
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

// ─── autocomplete ─────────────────────────────
let acState = {}; // { "mealId-i": { active: -1 } }

function onFoodInput(mealId, i, value) {
    state[mealId][i].food = value;
    showAutocomplete(mealId, i, value);
    renderMealMacros(mealId);
    renderSummary();
}

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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

    matches.forEach((name, idx) => {
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
        const list = document.getElementById(`ac-${mealId}-${i}`);
        if (!list) return;
        e.preventDefault();
        const key = `${mealId}-${i}`;
        const matches = acState[key]?.matches;
        if (!matches?.length) return;
        const idx = acState[key].active >= 0 ? acState[key].active : 0;
        selectFood(mealId, i, matches[idx]);
    }


    acState[key].active = active;
    items.forEach((el, idx) => {
        el.classList.toggle("active", idx === active);
    });
}

function selectFood(mealId, i, name) {
    state[mealId][i].food = name;
    const wrap = document.getElementById(`wrap-${mealId}-${i}`);
    const input = wrap.querySelector(".food-input");
    if (input) input.value = name;
    const list = wrap.querySelector(".autocomplete-list");
    if (list) list.remove();
    renderMealMacros(mealId);
    renderSummary();
}

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

// ─── calculations ─────────────────────────────
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

// ─── summary ──────────────────────────────────
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

function resetAll() {
    MEALS.forEach(m => { state[m.id] = [{ food: "", grams: "" }]; });
    render();
}


function loadImageAsBase64(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = src;
    });
}

// ─── PDF export ───────────────────────────────
async function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const today = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;

    const C = {
        bg: [15, 15, 15],
        surface: [24, 24, 24],
        muted: [100, 100, 100],
        text: [240, 240, 240],
        cal: [255, 209, 102],
        prot: [200, 240, 96],
        carb: [116, 185, 255],
        fat: [253, 121, 168],
        fib: [162, 155, 254],
        border: [42, 42, 42],
    };

    // ── Fondo completo
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, 210, 297, "F");

    // ── Header
    doc.setFillColor(...C.surface);
    doc.rect(0, 0, 210, 28, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...C.text);
    doc.text("CALCULADORA DE DIETA", margin, 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(today, margin, 19);

    // ── Tarjetas de totales
    const total = calcTotal();
    const macroLabels = ["Calorías", "Proteína", "Carbs", "Grasas", "Fibra"];
    const macroUnits = ["kcal", "g", "g", "g", "g"];
    const macroColors = [C.cal, C.prot, C.carb, C.fat, C.fib];

    const cardW = (pageW - margin * 2 - 4 * 3) / 5;
    const cardY = 32;
    const cardH = 18;

    total.forEach((val, i) => {
        const x = margin + i * (cardW + 3);

        doc.setFillColor(...C.surface);
        doc.roundedRect(x, cardY, cardW, cardH, 2, 2, "F");

        doc.setFillColor(...macroColors[i]);
        doc.rect(x, cardY + cardH - 1.5, cardW, 1.5, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(...C.muted);
        doc.text(macroLabels[i].toUpperCase(), x + cardW / 2, cardY + 5, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...macroColors[i]);
        doc.text(String(val), x + cardW / 2, cardY + 11.5, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(...C.muted);
        doc.text(macroUnits[i], x + cardW / 2, cardY + 15.5, { align: "center" });
    });

    // ── Tabla de desglose por comida
    let curY = cardY + cardH + 8;

    for (const meal of MEALS) {
        const validRows = state[meal.id].filter(r => r.food && DB[r.food] && parseFloat(r.grams) > 0);
        if (!validRows.length) continue;

        // Encabezado de comida
        doc.setFillColor(...C.surface);
        doc.rect(margin, curY, pageW - margin * 2, 7, "F");
        doc.setDrawColor(...C.border);
        doc.rect(margin, curY, pageW - margin * 2, 7, "S");

        // Icono: imagen o emoji
        const isImage = meal.icon.includes('.');
        if (isImage) {
            try {
                const b64 = await loadImageAsBase64(meal.icon);
                doc.addImage(b64, 'PNG', margin + 2, curY + 1, 5, 5);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.5);
                doc.setTextColor(...C.text);
                doc.text(meal.label.toUpperCase(), margin + 9, curY + 4.8);
            } catch {
                // si la imagen falla, solo muestra el texto
                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.5);
                doc.setTextColor(...C.text);
                doc.text(meal.label.toUpperCase(), margin + 3, curY + 4.8);
            }
        } else {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.5);
            doc.setTextColor(...C.text);
            doc.text(meal.label.toUpperCase(), margin + 3, curY + 4.8);
        }

        // Macros del tiempo en lado derecho
        const mTotals = calcMeal(meal.id);
        const mStr = `${mTotals[0]} kcal  |  P: ${mTotals[1]}g  C: ${mTotals[2]}g  G: ${mTotals[3]}g  F: ${mTotals[4]}g`;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(...C.muted);
        doc.text(mStr, pageW - margin - 3, curY + 4.8, { align: "right" });

        curY += 7;

        // Filas de alimentos
        const tableRows = validRows.map(r => {
            const v = calcRow(r.food, r.grams);
            return [r.food, `${r.grams}g`, v[0], v[1], v[2], v[3], v[4]];
        });

        doc.autoTable({
            startY: curY,
            margin: { left: margin, right: margin },
            head: [["Alimento", "Gramos", "kcal", "Prot", "Carb", "Gras", "Fib"]],
            body: tableRows,
            theme: "plain",
            styles: {
                font: "helvetica",
                fontSize: 7.5,
                textColor: C.text,
                cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
                fillColor: C.bg,
                lineColor: C.border,
                lineWidth: 0.2,
            },
            headStyles: {
                fillColor: [20, 20, 20],
                textColor: C.muted,
                fontSize: 6.5,
                fontStyle: "normal",
            },
            columnStyles: {
                0: { cellWidth: "auto" },
                1: { cellWidth: 18, halign: "right", textColor: C.text },
                2: { cellWidth: 16, halign: "right", textColor: C.cal },
                3: { cellWidth: 16, halign: "right", textColor: C.prot },
                4: { cellWidth: 16, halign: "right", textColor: C.carb },
                5: { cellWidth: 16, halign: "right", textColor: C.fat },
                6: { cellWidth: 16, halign: "right", textColor: C.fib },
            },
            alternateRowStyles: { fillColor: [18, 18, 18] },
            didParseCell(data) {
                if (data.section === "body") {
                    data.cell.styles.lineColor = C.border;
                }
            },
        });

        curY = doc.lastAutoTable.finalY + 5;
    }

    // ── Fila TOTAL final
    const colW = [0, 18, 16, 16, 16, 16, 16];
    const usableW = pageW - margin * 2;
    const firstColW = usableW - colW.slice(1).reduce((a, b) => a + b, 0);

    doc.setFillColor(...C.surface);
    doc.rect(margin, curY, usableW, 8, "F");
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    doc.line(margin, curY, margin + usableW, curY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.text);
    doc.text("TOTAL DEL DÍA", margin + 3, curY + 5.3);

    const colColors = [C.cal, C.prot, C.carb, C.fat, C.fib];
    let cx = margin + firstColW + colW[1];
    total.forEach((val, i) => {
        doc.setTextColor(...colColors[i]);
        doc.text(String(val), cx - 3, curY + 5.3, { align: "right" });
        cx += colW[i + 2];
    });

    // ── Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...C.muted);
    doc.text("// generado con calculadora-dieta.html", margin, 292);

    doc.save(`dieta-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function loadUserDB() {
    try {
        const saved = localStorage.getItem("userDB");
        if (saved) Object.assign(DB, JSON.parse(saved));
    } catch { }
}

loadUserDB();
render();
// init
render();