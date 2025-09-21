// Initialisation de Supabase
const supabaseUrl = 'https://your-project-id.supabase.co';  // Remplace par ton URL Supabase
const supabaseKey = 'your-public-anon-key';  // Remplace par ta clé publique
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
                <p>Propreté : ${review.cleanliness} / 5</p>
                <p>Service : ${review.service} / 5</p>
                <p>Confort : ${review.comfort} / 5</p>
                <p>${review.comment}</p>
                <p><small>${new Date(review.created_at).toLocaleString()}</small></p>
            `;
            reviewList.appendChild(reviewElement);
        });
    }
}

// Fonction pour gérer le formulaire d'évaluation
document.getElementById('reviewForm').addEventListener('submit', (event) => {
    event.preventDefault();  // Empêche le rechargement de la page

    const name = document.getElementById('name').value;
    const cleanliness = document.getElementById('cleanliness').value;
    const service = document.getElementById('service').value;
    const comfort = document.getElementById('comfort').value;
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