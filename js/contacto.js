function sendContact() {
    const nombre = document.getElementById("cNombre").value.trim();
    const correo = document.getElementById("cCorreo").value.trim();
    const asunto = document.getElementById("cAsunto").value.trim();
    const mensaje = document.getElementById("cMensaje").value.trim();

    const errEl = document.getElementById("contactoError");
    const btnEl = document.querySelector(".calc-btn[onclick='sendContact()']");

    if (!correo || !mensaje) {
        errEl.textContent = "// correo y mensaje son obligatorios";
        errEl.style.display = "block";
        return;
    }

    errEl.style.display = "none";
    btnEl.textContent = "Enviando...";
    btnEl.disabled = true;

   emailjs.send("service_mnu9yzm","template_ln22aq3", {
        nombre: nombre || "Anónimo",
        correo,
        asunto: asunto || "Sin asunto",
        mensaje,
    })
        .then(() => {
            btnEl.textContent = "✓ Mensaje enviado";
            ["cNombre", "cCorreo", "cAsunto", "cMensaje"]
                .forEach(id => document.getElementById(id).value = "");
            setTimeout(() => {
                btnEl.textContent = "Enviar mensaje";
                btnEl.disabled = false;
            }, 3000);
        })
        .catch(err => {
            console.error("EmailJS error:", err);
            errEl.textContent = "// error al enviar, intenta de nuevo";
            errEl.style.display = "block";
            btnEl.textContent = "Enviar mensaje";
            btnEl.disabled = false;
        });
}