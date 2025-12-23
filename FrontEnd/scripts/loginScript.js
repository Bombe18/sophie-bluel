
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.querySelector(".errorMsgP");



form.addEventListener("submit", async (e) => {
    e.preventDefault(); // empêche le reload

    const login = {
        email: email.value,
        password: password.value
    };

    await fetchLogin(login)
});

async function fetchLogin(login) {
errorMsg.innerHTML="";

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
    })


    if (!response.ok) {
        console.log("Email ou mot de passe incorrect");
        let errorMsgP = document.createElement("div");
        errorMsgP.textContent = "Erreur dans l’identifiant ou le mot de passe";
        errorMsg.appendChild(errorMsgP);
    }

    const data = await response.json();
    location.href = "index.html";
    window.localStorage.setItem("login", login.token);
    console.log(login.token)
    return data;

};




//Attendre le chargement de la page.

//récupérer et mail et pw de l'utilisateur
//Comparer l'email et le pw avec le serveur.
//Si oui, accepter la connexion et donner un token puis sauvegarder
//si non, refuser la connexion. 