document.addEventListener("DOMContentLoaded", () => {
    // Load username
    const username = localStorage.getItem("loggedUser");
    if (!username) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("username").textContent = username;

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html";
    });

    // Sidebar button highlight
    const sideButtons = document.querySelectorAll(".side-item");

    sideButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            sideButtons.forEach(b => b.classList.remove("active"));

            // Add to clicked one
            btn.classList.add("active");
        });
    });
});
