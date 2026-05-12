// Variable globale pour stocker tous les éléments
let allItems = [];
let data = null; // pour stocker le JSON complet

// Chargement des données
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(json => {
    data = json;

    // Rassembler tous les types dans une seule liste
    // 1. Cities
    json.countries.forEach(country => {
      country.cities.forEach(city => {
        city.type = 'city';
        allItems.push(city);
      });
    });
    // 2. Temples
    json.temples.forEach(temple => {
      temple.type = 'temple';
      allItems.push(temple);
    });
    // 3. Beaches
    json.beaches.forEach(beach => {
      beach.type = 'beach';
      allItems.push(beach);
    });

    // Afficher tout au début
    showRecommendations(allItems, document.getElementById('recommendations'));
  });

  function showRecommendations(items, container) {

    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    items.forEach(item => {

        const card = document.createElement('div');
        card.className = 'recommendation-card';

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;

        const name = document.createElement('h3');
        name.textContent = item.name;

        const desc = document.createElement('p');
        desc.textContent = item.description;

        // Heure locale
        let localTime = '';

        if (item.timeZone) {

            const options = {
                timeZone: item.timeZone,
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };

            localTime = new Date().toLocaleTimeString(
                'en-US',
                options
            );
        }

        const time = document.createElement('p');
        time.textContent = `Current time: ${localTime}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(time);

        container.appendChild(card);
    });
}
  

  function executeSearch() {

    const query = document.getElementById('searchInput')
        .value
        .trim()
        .toLowerCase();

    document.querySelector('.intro').style.display = 'none';

    const recDiv = document.getElementById('recommendations');

    recDiv.style.display = 'grid';

    let filteredItems = [];

    // BEACH / BEACHES
    if (query === 'beach' || query === 'beaches') {

        filteredItems = allItems.filter(
            item => item.type === 'beach'
        );
    }

    // TEMPLE / TEMPLES
    else if (query === 'temple' || query === 'temples') {

        filteredItems = allItems.filter(
            item => item.type === 'temple'
        );
    }

    // COUNTRY / COUNTRIES
    else if (query === 'country' || query === 'countries') {

        filteredItems = allItems.filter(
            item => item.type === 'city'
        );
    }

    // Recherche normale
    else {

        filteredItems = allItems.filter(item =>
            item.name.toLowerCase().includes(query)
        );
    }

    showRecommendations(filteredItems, recDiv);
}

function clearSearch() {

    // Vide le champ de recherche
    document.getElementById('searchInput').value = '';

    // Cache les recommandations
    const recDiv = document.getElementById('recommendations');
    recDiv.style.display = 'none';
    recDiv.innerHTML = '';

    // Réaffiche la section principale
    document.querySelector('.intro').style.display = 'flex';
}

const options = {
    timeZone: item.timeZone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

const localTime = new Date().toLocaleTimeString(
    'en-US',
    options
);

const time = document.createElement('p');

time.textContent = `Current time: ${localTime}`;

card.appendChild(time);