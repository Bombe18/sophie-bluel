window.addEventListener("load", () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const loginbutton = document.getElementById("login");
    let modale;
    console.log(token, "\n", userId)

    if (token && userId) {
        changeLoginToLogout();
        removeCookies();
        addBlackBanner();
        removeFilters();
        editMode();
        windowModale();
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
        let editMode = document.createElement("span");
        editMode.className = "open-modale";
        editMode.style.cursor = "pointer";
        editMode.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i> modifier
    `;
        let insert = document.getElementsByClassName("titleh2")[0];
        insert.after(editMode);

        editMode.addEventListener("click", openModale);


    }

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
        const listFilters =  document.getElementById("list-filters");
        listFilters.className = "hidden";
    };

    async function windowModale() {
        modale = document.createElement("div");
        modale.className = "modale hidden";

        const modaleContent = document.createElement("div");
        modaleContent.className = "modaleWindow";

        modaleContent.innerHTML = `
        <aside id="modaleContent" class="modaleContent" aria-hidden="hidden" role="dialog" aria-labelledby="ModaleTitle">
        <button id="closeButton" class="closeButton"><i  class="fa-solid fa-x"></i></button>
        <div class=modaleWrapper>
        <p class="ModaleTitle">Galerie photo</p>
        <div id="gallery-modale" class="gallery-modale"></div>
        <button id="addPicture" class="buttons-modale">Ajouter une photo</button>
        </div> 
        </aside>
    `;

        modale.appendChild(modaleContent);
        document.body.appendChild(modale);
    }

    async function openModale() {
        modale.classList.remove("hidden");

        const modaleGallery = modale.querySelector("#gallery-modale");
        modaleGallery.innerHTML = "";

        const products = await fetchProducts();
        addProductToDOM(products, modaleGallery);
        const captions = modaleGallery.querySelectorAll("figcaption");
        captions.forEach(caption => caption.remove());
        closeModale();
    }

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


    }

})