function sendSuggestion() {
    const nombre = document.getElementById("sNombre").value.trim();
    const marca = document.getElementById("sMarca").value.trim();
    const mensaje = document.getElementById("sMensaje").value.trim();
    const cal = document.getElementById("sCal").value.trim();
    const prot = document.getElementById("sProt").value.trim();
    const carb = document.getElementById("sCarb").value.trim();
    const gras = document.getElementById("sGras").value.trim();
    const fib = document.getElementById("sFib").value.trim();

    const errEl = document.getElementById("suggestError");

    if (!nombre || !marca) {
        errEl.textContent = "// nombre y marca/versión son obligatorios";
        errEl.style.display = "block";
        return;
    }

    errEl.style.display = "none";

    // construir cuerpo del correo
    let body = `Alimento: ${nombre}\nMarca / versión: ${marca}\n`;

    const tieneDeclaracion = cal || prot || carb || gras || fib || mensaje;
    if (mensaje) body += `Mensaje: ${mensaje}\n`;
    if (tieneDeclaracion) {
        body += `\n--- Declaración nutrimental (por 100g) ---\n`;
        if (cal) body += `Calorías:      ${cal} kcal\n`;
        if (prot) body += `Proteína:      ${prot} g\n`;
        if (carb) body += `Carbohidratos: ${carb} g\n`;
        if (gras) body += `Grasas:        ${gras} g\n`;
        if (fib) body += `Fibra:         ${fib} g\n`;
    } else {
        body += `\nSin declaración nutrimental — revisar manualmente.\n`;
    }

    const mailto = `mailto:copypastencapa8@gmail.com`
        + `?subject=${encodeURIComponent(`[Sugerencia] ${nombre} — ${marca}`)}`
        + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
}