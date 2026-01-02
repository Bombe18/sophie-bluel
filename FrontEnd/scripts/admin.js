window.addEventListener("load", () => {
    /*Si le token et l'userID est ok
    Alors, charge le mode admin
    else -> ne rien faire
    */
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const loginbutton = document.querySelector("#login");
    console.log(token, "\n", userId)

    if (token && userId) {
        changeLoginToLogout();
        removeCookies();
    }

    function removeCookies() {
        loginbutton.addEventListener("click", (event) => {
            window.localStorage.removeItem("authToken");
            window.localStorage.removeItem("userId");
            window.location.reload();
        })}

        function changeLoginToLogout() {
            loginbutton.textContent = "logout"
        }

        function editMode() {
            //TODO 
        };

        function changeUi() {
            //TODO 
        };
    })
