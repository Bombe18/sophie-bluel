window.addEventListener("load", () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const loginbutton = document.getElementById("login");
    console.log(token, "\n", userId)

    if (token && userId) {
        changeLoginToLogout();
        removeCookies();
        addBlackBanner();
        removeFilters();
        addEditMode();
    }

    function removeCookies() {
        loginbutton.addEventListener("click", (event) => {
            window.localStorage.removeItem("authToken");
            window.localStorage.removeItem("userId");
            window.location.reload();
        })
    }

    function changeLoginToLogout() {
        loginbutton.textContent = "logout"
    }

    function editMode() {
        //TODO 
    };

    function addBlackBanner() {
        let blackBanner = document.createElement("div");
        blackBanner.id = "blackBanner";
        blackBanner.innerHTML = `
        <p class="editMode">
        <i class="fa-regular fa-pen-to-square"></i> Mode édition
        </p>
        `;
        document.body.insertBefore(blackBanner, document.body.firstChild);
    };

    function removeFilters() {
        document.getElementById("list-filters").hidden = true;
    };

    function addEditMode() {
        let editMode = document.createElement("p");
        let insert = document.getElementsByClassName("titleh2")[0]

        editMode.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i> 
        modifier
        `;
        insert.after(editMode)
    }

    function windowModale () {
        
    }

})
