
// Register Request

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-register").value.trim()
    const email = document.querySelector("#email-register").value.trim();
    const password = document.querySelector("#password-register").value.trim();

    if (username && email && password) {
        const response = await fetch("/api/users", {
            method: "post", 
            body: JSON.stringify({
                username, 
                email, 
                password
            }),
            headers: { "Content-type": "application/json" }
        });
        
        if (response.ok) {
            console.log("success");
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector(".register-form").addEventListener("submit", signupFormHandler);

// Login Request

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/register", {
            method: "post", 
            body: JSON.stringify({
                email, 
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);



