// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i]

    // Récupérer la section fiches puis injecter ses enfants 
    const sectionFiche = document.querySelector(".fiches")
    const pieceElement = document.createElement("article")

    // Déclarer tous les éléments puis les injecter dans le DOM
    const imageElement = document.createElement("img")
    imageElement.src = article.image
    const nomElement = document.createElement("h2")
    nomElement.innerText = article.nom
    const prixElement = document.createElement("p")
    prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`
    const categorieElement = document.createElement("p")
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)"
    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = article.description ?? "(pas de description pour le moment)"
    const disponibiliteElement = document.createElement("p")
    disponibiliteElement.innerText = `${article.disponibilite === true ? "En stock" : "Rupture de stock"}`

    sectionFiche.appendChild(pieceElement)
    pieceElement.appendChild(imageElement)
    pieceElement.appendChild(nomElement)
    pieceElement.appendChild(prixElement)
    pieceElement.appendChild(categorieElement)
    pieceElement.appendChild(descriptionElement)
    pieceElement.appendChild(disponibiliteElement)

}

// Permet d'écouter le click btn filtre et réordoner la liste 
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix 
    })
    console.log(piecesOrdonnees)
})

// Permet d'écouter le click et filtrer le résultat
const boutonFiltre = document.querySelector(".btn-filtrer")
boutonFiltre.addEventListener("click", () => {
    const piecesFiltres = pieces.filter(function(piece) {
        return piece.prix <= 35
    })
    console.log(piecesFiltres)
})

// Ecouter le click puis cacher produits sans description 
const boutonDescription = document.querySelector(".btn-description")
boutonDescription.addEventListener("click", () => {
    const piecesDescription = pieces.filter(function(piece) {
        return piece.description
    })
    console.log(piecesDescription)
})

// Ecouter le click puis trier dans l'ordre décroissant 
const boutonDecroissant = document.querySelector(".btn-prix_Decroissant")
boutonDecroissant.addEventListener("click", () => {
    const piecesDecroissant = Array.from(pieces)
    piecesDecroissant.sort(function(a, b) {
        return b.prix - a.prix
    })
    console.log(piecesDecroissant)
})