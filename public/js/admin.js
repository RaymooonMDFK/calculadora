document.addEventListener("keydown", e => {
  if (e.shiftKey && e.altKey && e.key === "d") toggleAdminPanel();
});

function toggleAdminPanel() {
  let panel = document.getElementById("adminPanel");
  if (panel) { panel.remove(); return; }

  const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
  const entries = Object.entries(saved);

  // clonar template
  const template = document.getElementById("adminPanelTemplate");
  const clone = template.content.cloneNode(true);

  panel = document.createElement("div");
  panel.id = "adminPanel";
  panel.appendChild(clone);

  // título
  panel.querySelector(".admin-title").textContent =
    `// userDB — ${entries.length} alimento(s)`;

  // contenido
  const content = panel.querySelector(".admin-content");
  if (entries.length === 0) {
    content.innerHTML = `<div class="admin-empty">// vacío — aún no has agregado alimentos</div>`;
  } else {
    const table = document.createElement("table");
    table.className = "admin-table";
    table.innerHTML = `
      <tr>
        <th>nombre</th>
        <th style="color:#ffd166">kcal</th>
        <th style="color:#c8f060">prot</th>
        <th style="color:#74b9ff">carb</th>
        <th style="color:#fd79a8">gras</th>
        <th style="color:#a29bfe">fib</th>
        <th></th>
      </tr>
      ${entries.map(([name, v]) => `
        <tr>
          <td>${name}</td>
          <td style="color:#ffd166">${v[0]}</td>
          <td style="color:#c8f060">${v[1]}</td>
          <td style="color:#74b9ff">${v[2]}</td>
          <td style="color:#fd79a8">${v[3]}</td>
          <td style="color:#a29bfe">${v[4]}</td>
          <td><span style="color:#ff6b6b; cursor:pointer;" onclick="deleteFromUserDB('${name}')">✕</span></td>
        </tr>
      `).join("")}
    `;
    content.appendChild(table);
  }

  // textarea con snippet para copiar al código
  panel.querySelector(".admin-textarea").value =
    entries.map(([name, v]) => `"${name}": [${v.join(", ")}],`).join("\n");

  document.body.appendChild(panel);
}

function deleteFromUserDB(name) {
  delete DB[name];
  try {
    const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
    delete saved[name];
    localStorage.setItem("userDB", JSON.stringify(saved));
  } catch {}
  document.getElementById("adminPanel")?.remove();
  toggleAdminPanel();
}