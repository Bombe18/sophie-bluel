window.addEventListener("load", async () => {
  const buttonsFilter = document.querySelectorAll(".projet-buttons")
  const gallery = document.querySelector("#gallery")

  const response = await fetch("http://localhost:5678/api/works")
  const works = await response.json();

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
    newFigure.dataset.category = category; /* taking category from database */
    /* fill gallery */

    let gallery = document.querySelector("#gallery")
    gallery.appendChild(newFigure)
  })

   buttonsFilter.forEach(button => {
    button.addEventListener("click", () => {
      buttonsFilter.forEach(button => button.classList.remove("active"))
      button.classList.add("active")

      const filterId = button.id

      const figures = gallery.querySelectorAll("figure")

      figures.forEach(figure => {
        const figureCategory = figure.dataset.category

        if (filterId === "all" ||  filterId === figureCategory) {
          figure.classList.remove("hidden")
        } else {
          figure.classList.add("hidden")
        }
      })
    })
  })
})

















