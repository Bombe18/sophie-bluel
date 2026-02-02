window.addEventListener("load", async () => {
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
        products.forEach(work => {
            console.log("WORK ID =", work.id);
        });
        modaleGallery.querySelectorAll("figcaption").forEach(c => c.remove());
        deleteItem();
        modaleAddPicture();

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
                            <input class="add-picture" type="file" id="addPictureModale2" accept=".jpg, .png" hidden>
                            <div class="logo-image"><img src="assets/icons/picture-svgrepo-com 1.png" alt="img"></i></div>
                            <div class="upload-btn">+ Ajouter photo</div>
                            <p class="upload-info">jpg, png : 4mo max</p>
                            
                        </label>
                        <div class="div-uploaded-img"></div>
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
                <button id="validate" class="button-validate">
                    Valider
                </button>
            </div>
        `;

            document.addEventListener("click", (event) => {
                if (event.target.closest("#returnButton")) {
                    modaleGallery();
                }
            });
            selectCategory();
            uploadImage();
            validateForm();
            closeModale();
        });
    };

    async function fetchCategories() {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    }


    async function selectCategory() {
        const selectCategories = document.querySelector(".addCategory")
        if (!selectCategories) return;
        selectCategories.innerHTML = "";
        const categories = await fetchCategories();
        console.log(categories);

        categories.forEach(categoryOption => {
            const option = document.createElement("option");
            option.value = categoryOption.id;
            option.textContent = categoryOption.name;
            selectCategories.appendChild(option);

        });
    }

    function deleteItem() {
        const trashbins = document.querySelectorAll(".trash-class");

        trashbins.forEach(trashbin => {
            trashbin.addEventListener("click", async () => {
                const figure = trashbin.closest("figure");
                const id = figure.dataset.id;

                console.log("button cliqué", trashbin);

                try {
                    const response = await fetch(
                        `http://localhost:5678/api/works/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );


                    if (response.ok) {
                        figure.remove();

                        const mainGallery = document.querySelector(".gallery");
                        mainGallery
                            ?.querySelector(`figure[data-id="${id}"]`)
                            ?.remove();
                    }

                    if (!response.ok) {
                        throw new Error("erreur suppression")
                    }

                } catch (error) {
                    console.error(error)

                }
            })

        });
    }

    function uploadImage() {
        const fileInput = document.getElementById("addPictureModale2");
        const uploadedPicture = document.querySelector(".div-uploaded-img");
        const label = document.querySelector(".addpicturemodale2");
        const validatebtn = document.getElementById("validate");

        if (!fileInput) return;

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;

            const maxSize = 4 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("Le fichier dépasse 4 Mo");
                fileInput.value = "";
                return;
            }

            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                alert("Format non autorisé (jpg, png)");
                fileInput.value = "";
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                uploadedPicture.innerHTML = `
                <img class="uploadedImg" src="${e.target.result}" alt="aperçu image">
            `;

                label.classList.add("hidden");
            };


        })

        validatebtn.addEventListener("click", () => {
            sendImgToBackend();

        });
    }

    function sendImgToBackend() {
        const fileInput = document.getElementById("addPictureModale2");
        const titleInput = document.querySelector(".addTitle");
        const categorySelect = document.querySelector(".addCategory");
        const token = localStorage.getItem("authToken");

        if (!fileInput || !titleInput || !categorySelect || !token) return;


        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        formData.append("title", titleInput.value.trim());
        formData.append("category", categorySelect.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })

            .then(async response => {
               if (response.ok) {
                    const newWork = await response.json();
                    alert("Image ajoutée avec succès");
                    addWorkToGallery(newWork);
                    clearForm();
                    validateForm();
                    return newWork;
                }
            })

            .catch(error => {
                const message = "erreur réseau"
                console.error(error);
                alert(error.message || message);

            });
    }

function validateForm() {
    const titleInput = document.querySelector(".addTitle");
    const fileInput = document.querySelector(".add-picture");
    const validatebtn = document.getElementById("validate");
    const fileCategory = document.querySelector(".addCategory").value;

    function checkForm() {
        const hasTitle = titleInput.value.trim() !== 0;
        const hasFile = fileInput.files.length > 0;
        const hasCategory = fileCategory !== 0;

        if (hasTitle && hasFile && hasCategory) {
            validatebtn.disabled = false;
            validatebtn.classList.add("active");
        } else {
            validatebtn.disabled = true;
            validatebtn.classList.remove("active");
        }
    }
    checkForm();
    titleInput.addEventListener("input", checkForm);
    fileInput.addEventListener("change", checkForm);
}

    function clearForm() {
        const fileInput = document.getElementById("addPictureModale2");
        const titleInput = document.querySelector(".addTitle");
        const categorySelect = document.querySelector(".addCategory");
        const uploadedPicture = document.querySelector(".div-uploaded-img");
        const label = document.querySelector(".addpicturemodale2");

        fileInput.value = "";
        titleInput.value = "";
        categorySelect.value = 1;
        uploadedPicture.innerHTML = "";
        label.classList.remove("hidden");
    }

    function addWorkToGallery(work) {
        const mainGallery = document.querySelector(".gallery");
        if (!mainGallery) return;

        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    `;

        mainGallery.appendChild(figure);
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
    };

})