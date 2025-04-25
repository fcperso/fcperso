// Fonction pour ajouter un produit au panier (déjà existante)
function ajouterAuPanier(type, image, options = []) {
  if (!image) {
    alert("Vous n’avez pas sélectionné l’exemplaire.");
    return;
  }

  const panier = JSON.parse(localStorage.getItem("panier") || "[]");
  panier.push({ type, image, options });
  localStorage.setItem("panier", JSON.stringify(panier));
  alert("Produit ajouté au panier !");
}

// Fonction pour ajouter une coque au panier (déjà existante)
function ajouterCoque() {
  const image = document.querySelector(".coque.selected img")?.src || null;
  const modele = document.getElementById("modele").value;
  const prenom = document.getElementById("prenom").value;
  const numero = document.getElementById("numero").value;

  ajouterAuPanier("Coque", image, [
    "Modèle : " + modele,
    "Nom : " + prenom,
    "Numéro : " + numero
  ]);
}

// Fonction pour ajouter une gourde au panier (déjà existante)
function ajouterGourde() {
  const image = document.querySelector(".gourde.selected img")?.src || null;
  const prenom = document.getElementById("prenom")?.value || "";
  const logo = document.getElementById("logo")?.files[0]?.name || "Aucun logo";

  ajouterAuPanier("Gourde", image, [
    "Nom : " + prenom,
    "Logo : " + logo
  ]);
}

// Fonction pour ajouter un maillot au panier (déjà existante)
function ajouterMaillot() {
  const image = document.querySelector(".maillot.selected img")?.src || null;
  const prenom = document.getElementById("prenom").value;
  const numero = document.getElementById("numero").value;
  const taille = document.getElementById("taille").value;
  const equipe = document.getElementById("equipe").value;

  ajouterAuPanier("Maillot", image, [
    "Nom : " + prenom,
    "Numéro : " + numero,
    "Taille : " + taille,
    "Équipe : " + equipe
  ]);
}

// Fonction pour ajouter des protège-tibias au panier (déjà existante)
function ajouterTibias() {
  const image = document.getElementById("image")?.files[0]?.name || "Aucune image";
  const prenom = document.getElementById("prenom").value;
  const numero = document.getElementById("numero").value;
  const taille = document.getElementById("taille").value;

  const imagePreview = "/image/protege-tibia.jpg";

  ajouterAuPanier("Protège-tibias", imagePreview, [
    "Nom : " + prenom,
    "Numéro : " + numero,
    "Taille : " + taille,
    "Image perso : " + image
  ]);
}

// Sélection image cliquable (déjà existante)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".selectable").forEach(el => {
    el.addEventListener("click", () => {
      const parent = el.parentNode;
      parent.querySelectorAll(".selectable").forEach(e => e.classList.remove("selected"));
      el.classList.add("selected");
    });
  });
});

// Nouvelle fonction pour envoyer la commande
function envoyerCommande() {
  // Récupérer les données du panier stockées dans le localStorage
  const panier = JSON.parse(localStorage.getItem("panier") || "[]");

  // Calculer le total du panier (si tu as un prix associé à chaque produit)
  const total = panier.reduce((acc, produit) => acc + parseFloat(produit.prix || 0), 0);

  // Récupérer les informations de l'utilisateur (prénom, e-mail)
  const nom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;

  // Convertir le panier en JSON pour l'envoyer au PHP
  const produitsJson = JSON.stringify(panier);

  // Créer un formulaire caché pour envoyer les données au script PHP
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'envoyer-commande.php'; // Ton script PHP pour envoyer la commande

  // Ajouter les champs cachés pour envoyer les informations
  const nomField = document.createElement('input');
  nomField.type = 'hidden';
  nomField.name = 'nom';
  nomField.value = nom;

  const emailField = document.createElement('input');
  emailField.type = 'hidden';
  emailField.name = 'email';
  emailField.value = email;

  const produitsField = document.createElement('input');
  produitsField.type = 'hidden';
  produitsField.name = 'produits';
  produitsField.value = produitsJson;

  const totalField = document.createElement('input');
  totalField.type = 'hidden';
  totalField.name = 'total';
  totalField.value = total;

  // Ajouter les champs au formulaire
  form.appendChild(nomField);
  form.appendChild(emailField);
  form.appendChild(produitsField);
  form.appendChild(totalField);

  // Soumettre le formulaire
  document.body.appendChild(form);
  form.submit();  // Le formulaire est envoyé au serveur
}