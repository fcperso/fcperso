<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sécurisation des données
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $nom = htmlspecialchars(trim($_POST['nom']));
    $produits = json_decode($_POST['produits'], true);  // Liste des produits (au format JSON)
    $total = htmlspecialchars(trim($_POST['total']));

    // Adresse de réception
    $to = "aide.fcperso@gmail.com"; // Remplace par ton adresse e-mail réelle
    $subject = "Nouvelle commande depuis le site FC Perso";

    // Contenu du message
    $body = "Vous avez reçu une nouvelle commande depuis le site FC Perso.\n\n";
    $body .= "Nom : $nom\n";
    $body .= "Email : $email\n";
    $body .= "Total de la commande : $total €\n\n";
    $body .= "Détails des produits :\n";
    
    foreach ($produits as $produit) {
        $body .= "Produit : " . $produit['type'] . "\n";
        foreach ($produit['options'] as $key => $value) {
            $body .= "$key : $value\n";
        }
        $body .= "Prix : " . $produit['prix'] . " €\n\n";
    }

    // En-têtes de l'e-mail
    $headers = "From: no-reply@fcperso.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoi de l'e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Votre commande a été envoyée avec succès !";
    } else {
        echo "Une erreur est survenue. Veuillez réessayer.";
    }
} else {
    // Si la méthode n'est pas POST
    echo "Méthode non autorisée.";
}
?>