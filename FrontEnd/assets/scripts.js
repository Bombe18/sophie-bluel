
const buttonsFilter = document.querySelectorAll(".projet-buttons");
const galleryItems = document.querySelectorAll("#gallery figure");

/* Call API */

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    works.forEach(work => {
      /* Balise creation */
      let newFigure = document.createElement("figure");
      let newImg = document.createElement("img");
      let newCaption = document.createElement("figcaption");
      let category = work.category.id; /* create category from database. Hidden */
      /* fill balise */
      newImg.src = work.imageUrl;
      newCaption.textContent = work.title;
      /* assemblage */
      newFigure.appendChild(newImg);
      newFigure.appendChild(newCaption);
      newFigure.dataset.category = category; /* taking category from database */
      /* fill gallery */

      let gallery = document.querySelector("#gallery");
      gallery.appendChild(newFigure);

      console.log(category);
    })
    
  });

/*  Si clic button - Alors montre button id */
buttonsFilter.forEach(button => {
  button.addEventListener("click", () => {
    buttonsFilter.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");

    const filterId = button.id;
    console.log(filterId);

    /*  pour chaque button clic
    affiche image lié à l'id.*/

    work.forEach(item => {
      const work = item.dataset.category.id;
      if (filterId === "all" || filterId === itemCategory) {
        item.value.remove("hidden");
      } else { item.value.add("hidden"); };
    })
  });
});





/*


window.addEventListener("load", (event) => {
  async function fetchProducts() {
    const response = await fetch("http://localhost:5678/api/works");
    const products = await response.json(); 
    return products
  
  console.log("page chargée")}
});


*/