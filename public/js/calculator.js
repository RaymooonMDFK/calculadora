const ACTIVITY_FACTORS = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    activo: 1.725,
    muy_activo: 1.9,
};

const MACROS_PCT = {
    prot: 0.35,
    carbs: 0.40,
    grasas: 0.25,
};

const AJUSTE_KCAL = {
    perder_grasa: -400,
    ganar_musculo: +250,
    mantenimiento: 0,
};

function calcMifflin(peso, altura, edad, sexo) {
    const base = (10 * peso) + (6.25 * altura) - (5 * edad);
    return sexo === "hombre" ? base + 5 : base - 161;
}

function calcTDEE(tmb, actividad) {
    return Math.round(tmb * ACTIVITY_FACTORS[actividad]);
}

function calcMacros(tdee, objetivo) {
    const kcalObjetivo = tdee + AJUSTE_KCAL[objetivo];

    const prot = Math.round((kcalObjetivo * MACROS_PCT.prot) / 4);
    const carbs = Math.round((kcalObjetivo * MACROS_PCT.carbs) / 4);
    const grasas = Math.round((kcalObjetivo * MACROS_PCT.grasas) / 9);

    return {
        kcal_objetivo: kcalObjetivo,
        prot,
        carbs,
        grasas,
    };
}

function toggleInfo(id, btnEl) {
    const tooltip = document.getElementById(id);
    const isOpen = tooltip.classList.contains("visible");

    document.querySelectorAll(".info-tooltip").forEach(t => t.classList.remove("visible"));
    if (isOpen) return;

    // posicionar encima del botón
    const rect = btnEl.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - 100) + "px";
    tooltip.style.top = (rect.top - 8) + "px";
    tooltip.style.transform = "translateY(-100%)";
    tooltip.classList.add("visible");
}

document.addEventListener("click", e => {
    if (!e.target.closest(".info-btn")) {
        document.querySelectorAll(".info-tooltip").forEach(t => t.classList.remove("visible"));
    }
});

function runCalculator() {
    const peso = parseFloat(document.getElementById("cPeso").value);
    const altura = parseFloat(document.getElementById("cAltura").value);
    const edad = parseFloat(document.getElementById("cEdad").value);
    const sexo = document.getElementById("cSexo").value;
    const actividad = document.getElementById("cActividad").value;
    const objetivo = document.getElementById("cObjetivo").value;

    const errEl = document.getElementById("calcError");

    if (!peso || !altura || !edad) {
        errEl.textContent = "// completa todos los campos";
        errEl.style.display = "block";
        return;
    }

    errEl.style.display = "none";

    const tmb = calcMifflin(peso, altura, edad, sexo);
    const tdee = calcTDEE(tmb, actividad);
    const macros = calcMacros(tdee, objetivo);

    document.getElementById("resTMB").textContent = Math.round(tmb);
    document.getElementById("resTDEE").textContent = tdee;
    document.getElementById("resKcal").textContent = macros.kcal_objetivo;
    document.getElementById("resCarbs").textContent = `${macros.carbs}g`;
    document.getElementById("resProt").textContent = `${macros.prot}g`;
    document.getElementById("resGrasas").textContent = `${macros.grasas}g`;

    // porcentajes fijos, siempre los mismos
    document.getElementById("resPctCarbs").textContent = "40%";
    document.getElementById("resPctProt").textContent = "35%";
    document.getElementById("resPctGrasas").textContent = "25%";

    document.getElementById("calcResults").style.display = "grid";
}

