document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
    if (e.shiftKey && e.altKey && e.key === "D") toggleAdminPanel();
});

loadUserDB();
render();