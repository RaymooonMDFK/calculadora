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

async function submitNewFood() {
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

    await saveToUserDB(name, vals);
    closeModal();
}