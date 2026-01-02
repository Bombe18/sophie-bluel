window.addEventListener("load", async () => {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsgP");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le reload

        const credentials = {
            email: email.value,
            password: password.value
        };

        fetchLogin(credentials);
    });

    async function fetchLogin(credentials) {
        resetDisplayMessages();

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.userId);

                window.location.href = 'index.html';
            } else {
                displayErrorMessage("Erreur dans l'identifiant ou le mot de passe");
            }
        } catch (error) {
            console.error('Erreur: ', error);
            displayErrorMessage('Erreur réseau');
        }
    }

    function displayErrorMessage(message) {
        let errorMsgDiv = document.createElement("div");
        errorMsgDiv.textContent = message;
        errorMsg.appendChild(errorMsgDiv);
    }

    function resetDisplayMessages() {
        errorMsg.innerHTML = "";
    }
});