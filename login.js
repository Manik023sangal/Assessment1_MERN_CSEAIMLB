document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    const validUsername = "admin";
    const validPassword = "admin";

    if(username === validUsername && password === validPassword){
        window.location.href = "currency_convertor.html";
    } 
    else {
        loginMessage.textContent = "Invalid username or password";
    }
});
