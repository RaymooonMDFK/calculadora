const ACTIVITY_FACTORS = {
    sedentario: 1.2,
    ligero:     1.375,
    moderado:   1.55,
    activo:     1.725,
    muy_activo: 1.9,
};

const AJUSTE_KCAL = {
    perder_grasa:  -400,
    ganar_musculo: +250,
    mantenimiento: 0,
};

const GRAMOS_POR_KILO = {
    sedentario: {prot: 1.5, grasas: 0.7},
    ligero: {prot: 1.8, grasas: 0.8},
    moderado: {prot: 2, grasas: 1},
    activo: {prot: 2, grasas: 1},
    muy_activo: {prot: 2, grasas: 1},
};

function calcMifflin(peso, altura, edad, sexo) {
    const base = (10 * peso) + (6.25 * altura) - (5 * edad);
    return sexo === "hombre" ? base + 5 : base - 161;
}

function calcTDEE(tmb, actividad) {
    return Math.round(tmb * ACTIVITY_FACTORS[actividad]);
}

function calcMacros(tdee, objetivo, peso, actividad) {
    const kcalObjetivo = tdee + AJUSTE_KCAL[objetivo];

    const factores = GRAMOS_POR_KILO[actividad];
    const prot     = Math.round(peso * factores.prot);
    const grasas   = Math.round(peso * factores.grasas);

    const kcalProt   = prot   * 4;
    const kcalGrasas = grasas * 9;
    const kcalCarbs  = kcalObjetivo - kcalProt - kcalGrasas;
    const carbs      = Math.round(kcalCarbs / 4);

    const pctProt   = Math.round((kcalProt   / kcalObjetivo) * 100);
    const pctGrasas = Math.round((kcalGrasas / kcalObjetivo) * 100);
    const pctCarbs  = 100 - pctProt - pctGrasas;

    return { kcal_objetivo: kcalObjetivo, prot, carbs, grasas, pctProt, pctCarbs, pctGrasas };
}

function toggleInfo(id, btnEl) {
    const tooltip = document.getElementById(id);
    const isOpen  = tooltip.classList.contains("visible");

    document.querySelectorAll(".info-tooltip").forEach(t => t.classList.remove("visible"));
    if (isOpen) return;

    const rect = btnEl.getBoundingClientRect();
    tooltip.style.left      = (rect.left + rect.width / 2 - 100) + "px";
    tooltip.style.top       = (rect.top - 8) + "px";
    tooltip.style.transform = "translateY(-100%)";
    tooltip.classList.add("visible");
}

document.addEventListener("click", e => {
    if (!e.target.closest(".info-btn")) {
        document.querySelectorAll(".info-tooltip").forEach(t => t.classList.remove("visible"));
    }
});

function runCalculator() {
    const peso     = parseFloat(document.getElementById("cPeso").value);
    const altura   = parseFloat(document.getElementById("cAltura").value);
    const edad     = parseFloat(document.getElementById("cEdad").value);
    const sexo     = document.getElementById("cSexo").value;
    const actividad = document.getElementById("cActividad").value;
    const objetivo  = document.getElementById("cObjetivo").value;

    const errEl = document.getElementById("calcError");

    if (!peso || !altura || !edad) {
        errEl.textContent = "// completa todos los campos";
        errEl.style.display = "block";
        return;
    }

    errEl.style.display = "none";

    const tmb    = calcMifflin(peso, altura, edad, sexo);
    const tdee   = calcTDEE(tmb, actividad);
    const macros = calcMacros(tdee, objetivo, peso, actividad);

    document.getElementById("resTMB").textContent    = Math.round(tmb);
    document.getElementById("resTDEE").textContent   = tdee;
    document.getElementById("resKcal").textContent   = macros.kcal_objetivo;
    document.getElementById("resCarbs").textContent  = `${macros.carbs}g`;
    document.getElementById("resProt").textContent   = `${macros.prot}g`;
    document.getElementById("resGrasas").textContent = `${macros.grasas}g`;

    // porcentajes calculados dinámicamente según peso
    document.getElementById("resPctCarbs").textContent  = `${macros.pctCarbs}%`;
    document.getElementById("resPctProt").textContent   = `${macros.pctProt}%`;
    document.getElementById("resPctGrasas").textContent = `${macros.pctGrasas}%`;

    document.getElementById("calcResults").style.display = "grid";
}