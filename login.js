
// Login Form
const loginForm = document.querySelector(".login-form");

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", function(event){
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === ""){
        alert("Please enter your username and password.");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "feed.html";
});

