window.addEventListener("load", () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const loginbutton = document.getElementById("login");
    let modale;
    console.log(token, "\n", userId)



    if (token && userId) {
        isAdmin = true
        changeLoginToLogout();
        removeCookies();
        addBlackBanner();
        removeFilters();
        editMode();
        windowModale();
        

    } else {
        isAdmin = false
    };

    if (isAdmin === true) {
        console.log("Is admin", isAdmin)
    } else {
        console.log("Is admin", isAdmin)
    };

    function removeCookies() {
        loginbutton.addEventListener("click", (event) => {
            window.localStorage.removeItem("authToken");
            window.localStorage.removeItem("userId");
            window.location.reload();
        })
    }

    function changeLoginToLogout() {
        loginbutton.textContent = "logout"
    };

    function editMode() {
        let editMode = document.createElement("span");
        editMode.className = "open-modale";
        editMode.style.cursor = "pointer";
        editMode.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i> modifier
    `;
        let insert = document.getElementsByClassName("titleh2")[0];
        insert.after(editMode);

        editMode.addEventListener("click", openModale);
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
        const listFilters = document.getElementById("list-filters");
        listFilters.className = "hidden";
    };

    function windowModale() {
        modale = document.createElement("div");
        modale.className = "modale hidden";

        modale.innerHTML = `<div id="modaleContent" class="modaleContent"></div>`;

        document.body.appendChild(modale);
    }

    async function openModale() {
        modale.classList.remove("hidden");
        modaleGallery();
    };

    async function modaleGallery() {
        const modaleContent = document.getElementById("modaleContent");

        modaleContent.innerHTML = `
        <button id="closeButton" class="closeButton">
            <i class="fa-solid fa-x"></i>
        </button>

        <div class="modaleWrapper">
            <p class="ModaleTitle">Galerie photo</p>
            <div id="gallery-modale" class="gallery-modale"></div>
            <div class="footer-modale">
                <button id="addPicture" class="buttons-modale">
                    Ajouter une photo
                </button>
            </div>
        </div>
    `;

        const modaleGallery = modale.querySelector("#gallery-modale");
        modaleGallery.innerHTML = "";

        const products = await fetchProducts();
        addProductToDOM(products, modaleGallery, true);

        modaleGallery.querySelectorAll("figcaption").forEach(c => c.remove());

        modaleAddPicture();
        deleteItem();
        closeModale();
    };




    function modaleAddPicture() {
        const buttonModale = document.getElementById("addPicture");
        if (!buttonModale) return;

        buttonModale.addEventListener("click", () => {
            const modaleContent = document.getElementById("modaleContent");

            modaleContent.innerHTML = `
            <div class="button-adjust">
                <button id="returnButton" class="return-button">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button id="closeButton" class="closeButton">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>

   
            <div class="modaleWrapper">
                <p class="ModaleTitle">Ajout photo</p>
                <form class="form-modale" method="get">
                    <div class="upload-box">
                        <label class="addpicturemodale2" for="addPictureModale2">
                            <input class="add-picture" type="file" id="addPictureModale2" hidden>
                            <div class="logo-image"><img src="assets/icons/picture-svgrepo-com 1.png" alt="img"></i></div>
                            <div class="upload-btn">+ Ajouter photo</div>
                            <p class="upload-info">jpg, png : 4mo max</p>
                        </label>
                    </div>
                    <div class="modale-img-spec">
                        <label class="title-img-to-add" for="addTitle">Titre</label>
                        <input class="addTitle" type="text"></input>
                        <label class="category-img-modale" for="addCategory">Catégorie</label>
                        <select class="addCategory" id="addCategory" name="categorie"></select>
                    </div>
                </form>
            </div>
            <div class="footer-modale">
                <button id="validate" class="buttons-modale">
                    Ajouter une photo
                </button>
            </div>
        `;

            document.addEventListener("click", (event) => {
                if (event.target.closest("#returnButton")) {
                    modaleGallery();
                }
            });

            closeModale();
        });
    };

   function deleteItem() {
    const trashbins = document.querySelectorAll(".trash-class");

    trashbins.forEach(trashbin => {
        trashbin.addEventListener("click", () => {
            console.log("button cliqué", trashbin);
        });
    });
}

deleteItem();

    function closeModale() {
        modale.addEventListener("click", (event) => {
            if (event.target === modale) {
                modale.classList.add("hidden");
            };
        });

        const closeButton = modale.querySelector("#closeButton");
        if (closeButton) {
            closeButton.style.cursor = "pointer";
            closeButton.addEventListener("click", () => {
                modale.classList.add("hidden");
            });
        };
    };

})