// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());
 
// Fonction qui génère toute la page web
function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    let article = pieces[i]
       // Création d’une balise dédiée à une pièce auto
       const pieceElement = document.createElement("article");
       // On crée l’élément img.
       const imageElement = document.createElement("img");
       // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
       imageElement.src = pieces[i].image;
       // On rattache l’image à pieceElement (la balise article)
       pieceElement.appendChild(imageElement);
       // Idem pour le nom, le prix et la catégorie ...
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
        // ...  
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(disponibiliteElement)
         
       // On rattache la balise article au body
       const sectionFiche = document.querySelector(".fiches")
       sectionFiche.appendChild(pieceElement)
  }
 
}
 
// Premier affichage de la page
genererPieces(pieces);
 
// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces)
   piecesOrdonnees.sort(function (a, b) {
       return b.prix - a.prix;
   });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
 
// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.disponibilite;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

// Ecouter le input range pour trier les produits
const filtreRange = document.querySelector("#prix-max")
filtreRange.addEventListener("input", () => {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= filtreRange.value
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})