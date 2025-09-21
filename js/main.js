// Initialisation de Supabase
const supabaseUrl = 'https://buaolvejrkiarrdtocvg.supabase.co';  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YW9sdmVqcmtpYXJyZHRvY3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDYwNDcsImV4cCI6MjA3NDAyMjA0N30.oiR6-74kf1Nq37yWenQQpZMJXDzfIqAumFRT-u_BFbM'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fonction pour récupérer les évaluations depuis Supabase
async function getReviews() {
    const { data, error } = await supabase
        .from('reviews')  // Table 'reviews' dans Supabase
        .select('*')
        .order('created_at', { ascending: false });  // Trier par date, du plus récent au plus ancien

    if (error) {
        console.error('Erreur lors de la récupération des avis:', error);
        return [];
    }
    return data;
}

// Fonction pour soumettre une nouvelle évaluation
async function submitReview(name, cleanliness, service, comfort, comment) {
    const { data, error } = await supabase
        .from('reviews')
        .insert([{ name, cleanliness, service, comfort, comment }]);

    if (error) {
        console.error('Erreur lors de l\'ajout de l\'évaluation:', error);
        return null;
    } else {
        console.log('Évaluation ajoutée avec succès:', data);
        return data;
    }
}

// Fonction pour mettre à jour l'affichage des évaluations
function updateReviewList(reviews) {
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';  // Vider la liste avant de la remplir

    if (reviews.length === 0) {
        reviewList.innerHTML = '<p>Aucun avis pour le moment.</p>';
    } else {
        reviews.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-item');
            reviewElement.innerHTML = `
                <p><strong>${review.name}</strong></p>
                <p>Propreté : ${getEmojiLabel(review.cleanliness)}</p>
                <p>Service : ${getEmojiLabel(review.service)}</p>
                <p>Confort : ${getEmojiLabel(review.comfort)}</p>
                <p>${review.comment}</p>
                <p><small>${new Date(review.created_at).toLocaleString()}</small></p>
            `;
            reviewList.appendChild(reviewElement);
        });
    }
}

// Fonction pour obtenir l'émoji correspondant à la note
function getEmojiLabel(rating) {
    switch (rating) {
        case "1": return "😡";  // Très mauvais
        case "2": return "😐";  // Moyen
        case "3": return "🙂";  // Assez bien
        case "4": return "😊";  // Bon
        case "5": return "😄";  // Excellent
        default: return "Inconnu";  // En cas d'erreur
    }
}

// Fonction pour gérer le formulaire d'évaluation
document.getElementById('reviewForm').addEventListener('submit', (event) => {
    event.preventDefault();  // Empêche le rechargement de la page

    const name = document.getElementById('name').value;
    const cleanliness = document.querySelector('input[name="cleanliness"]:checked').value;
    const service = document.querySelector('input[name="service"]:checked').value;
    const comfort = document.querySelector('input[name="comfort"]:checked').value;
    const comment = document.getElementById('comment').value;

    // Soumettre l'évaluation à Supabase
    submitReview(name, cleanliness, service, comfort, comment).then(() => {
        alert('Merci pour votre évaluation !');
        getReviews().then(updateReviewList);  // Récupérer les évaluations et mettre à jour la liste
    }).catch(err => {
        alert('Une erreur est survenue.');
        console.error(err);
    });
});

// Mettre à jour la liste des évaluations au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    getReviews().then(updateReviewList);
});
