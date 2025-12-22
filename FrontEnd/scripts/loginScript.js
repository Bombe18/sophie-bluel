
window.addEventListener("load", async () => {
    const login = await fetchLogin();




async function fetchLogin(login) {
const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login)
})
}
export function formlistener() {
    const loginField = document.querySelector("form");

    loginField.addEventListener("submit", function (event) {
        event.preventDefault();

        login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
    })
}

})

function validationLogIn(formlistener, login) {
    if email === login.email && password === login.password {
        window.localStorage.setItem("token");
        console.log("accepté");

    } else {
        email != login.email || password != login.password
        console.log("erreur");
    }
}






//Attendre le chargement de la page.

//récupérer et mail et pw de l'utilisateur
//Comparer l'email et le pw avec le serveur.
//Si oui, accepter la connexion et donner un token puis sauvegarder
//si non, refuser la connexion. 