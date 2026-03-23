emailjs.init("4gwEysrLnzDGVlxOB");

function sendSuggestion() {
    const nombre = document.getElementById("sNombre").value.trim();
    const marca = document.getElementById("sMarca").value.trim();
    const mensaje = document.getElementById("sMensaje")?.value.trim() || "";
    const cal = document.getElementById("sCal").value.trim();
    const prot = document.getElementById("sProt").value.trim();
    const carb = document.getElementById("sCarb").value.trim();
    const gras = document.getElementById("sGras").value.trim();
    const fib = document.getElementById("sFib").value.trim();

    const errEl = document.getElementById("suggestError");
    const btnEl = document.querySelector(".calc-btn[onclick='sendSuggestion()']");

    if (!nombre || !marca) {
        errEl.textContent = "// nombre y marca/versión son obligatorios";
        errEl.style.display = "block";
        return;
    }

    errEl.style.display = "none";

    // construir texto de declaración
    const tieneDeclaracion = cal || prot || carb || gras || fib;

    const declaracion =
        `Alimento: ${nombre},
        Marca: ${marca},
        Mensaje: ${mensaje || "—"}
        "${nombre} ${marca}": [${cal || 0}, ${prot || 0}, ${carb || 0}, ${gras || 0}, ${fib || 0}, {cantidad: x, unidad: "x", gramos: x}],`;

    // feedback visual mientras envía
    btnEl.textContent = "Enviando...";
    btnEl.disabled = true;

    emailjs.send("service_mnu9yzm", "template_dm8mlzc", {
        nombre,
        marca,
        declaracion,
    })
        .then(() => {
            btnEl.textContent = "✓ Enviado";
            // limpiar campos
            ["sNombre", "sMarca", "sMensaje", "sCal", "sProt", "sCarb", "sGras", "sFib"]
                .forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = "";
                });
            setTimeout(() => {
                btnEl.textContent = "Enviar sugerencia";
                btnEl.disabled = false;
            }, 3000);
        })
        .catch(err => {
            console.error("EmailJS error:", err);
            errEl.textContent = "// error al enviar, intenta de nuevo";
            errEl.style.display = "block";
            btnEl.textContent = "Enviar sugerencia";
            btnEl.disabled = false;
        });
}