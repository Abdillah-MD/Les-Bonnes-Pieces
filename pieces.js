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

// Permet d'écouter le click btn filtre et réordoner la liste  APRENDRE LA FONCTI° ******SORT*****
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix 
    })
    console.log(piecesOrdonnees)
})

// Permet d'écouter le click et filtrer le résultat  APRENDRE LA FONCT° *********FILTER********
const boutonFiltre = document.querySelector(".btn-filtrer")
boutonFiltre.addEventListener("click", () => {
    const piecesFiltres = pieces.filter(function(piece) {
        return piece.prix <= 35
    })
    console.log(piecesFiltres)
})

// Ecouter le click puis cacher produits sans description APRENDRE LA FONCT° *********FILTER********
const boutonDescription = document.querySelector(".btn-description")
boutonDescription.addEventListener("click", () => {
    const piecesDescription = pieces.filter(function(piece) {
        return piece.description
    })
    console.log(piecesDescription)
})

// Ecouter le click puis trier dans l'ordre décroissant APRENDRE LA FONCTI° ******SORT*****
const boutonDecroissant = document.querySelector(".btn-prix_Decroissant")
boutonDecroissant.addEventListener("click", () => {
    const piecesDecroissant = Array.from(pieces)
    piecesDecroissant.sort(function(a, b) {
        return b.prix - a.prix
    })
    console.log(piecesDecroissant)
})

// Maper le tableau le tableau pour extraire liste "nom produit"
const noms = pieces.map(piece => piece.nom)
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}
console.log(noms)

// Maper le tableau pour avoir liste "prix produit"
const nomsPrix = pieces.map(piece => piece.prix)
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        nomsPrix.splice(i, 1)
    }
}
console.log(nomsPrix)

// Création de la liste 
const abordablesElements = document.createElement("ul")
for (let i=0; i < noms.length; i++) {
    const nomElement = document.createElement("li")
    nomElement.innerText = `${noms[i]} - (${nomsPrix[i]} €)`
    abordablesElements.appendChild(nomElement)
}
document.querySelector(".abordables")
    .appendChild(abordablesElements)


// Creation liste description 
const abordablesDescription = document.createElement("ul")
const nomsDescription = pieces.map(piece => piece.description)
// Supprimer les description qui ne nous interesse pas 
for (let i = noms.length -1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        nomsDescription.splice(i, 1)
    }
}
// Injecter les description dans l'ordre voulu
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement("li")
    nomElement.innerText = nomsDescription[i] ?? "(Pas de description)"
    abordablesDescription.appendChild(nomElement)
}
console.log(nomsDescription)
document.querySelector(".description")
    .appendChild(abordablesDescription)


/// Chapitre innertHTML
document.querySelector(".fiches").innerHTML = ''