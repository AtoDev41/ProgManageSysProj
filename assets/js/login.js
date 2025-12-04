document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".loginButton");
    const usernameInput = document.querySelector(".usernameTextBox");
    const passwordInput = document.querySelector(".passwordTextBox");

    loginButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "Ato" && password === "admin123") {

            // Save username for dashboard greeting
            localStorage.setItem("loggedUser", username);

            window.location.href = "dashboard.html";

        } else {
            alert("Wrong username or password!");
        }
    });
});
