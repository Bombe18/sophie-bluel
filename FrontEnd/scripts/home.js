window.addEventListener("load", async () => {
    const products = await fetchProducts();

    const buttonsFilter = document.querySelectorAll(".projet-buttons");
    const gallery = document.getElementById("gallery");

    addProductToDOM(products, gallery);

    buttonsFilter.forEach(button => {
        button.addEventListener("click", () => {
            filterProduct(button, buttonsFilter, gallery);
        });
    });
});

async function fetchProducts() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

function addProductToDOM(works, gallery, isAdmin = false) {
    works.forEach(work => {
        /* Balise creation */
        let newFigure = document.createElement("figure")
        let newImg = document.createElement("img")
        let newCaption = document.createElement("figcaption")
        let category = work.category.id; /* create category from database. Hidden */
        
        /* fill balise */
        newImg.src = work.imageUrl
        newCaption.textContent = work.title

        /* assemblage */
        newFigure.appendChild(newImg)
        newFigure.appendChild(newCaption)
        newFigure.dataset.category = category;
        newFigure.dataset.id = work.id;
      
        /* fill gallery */
        gallery.appendChild(newFigure);
          if (isAdmin===true) {
            const trashbin = document.createElement("button")
            trashbin.classList="trash-class"
            trashbin.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            newFigure.appendChild(trashbin);
        }
    })


}

function filterProduct(button, buttonsFilter, gallery) {
    const filterId = button.id
    const figures = gallery.querySelectorAll("figure")

    buttonsFilter.forEach(button => button.classList.remove("active"));
    button.classList.add("active");

    figures.forEach(figure => {
        const figureCategory = figure.dataset.category

        if (filterId === "all" || filterId === figureCategory) {
            figure.classList.remove("hidden")
        } else {
            figure.classList.add("hidden")
        }
    })
}