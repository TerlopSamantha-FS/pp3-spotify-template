document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        localStorage.setItem('jwt', token);
    }
    const storedToken = localStorage.getItem('jwt');
    if (!storedToken) {
        window.location.href = '/login.html';
    } else {
        const response = await fetch('/spotify/status', {
            headers: { 'Authorization': storedToken }
        });
        const data = await response.json();
        if (!data.valid) {
            localStorage.removeItem('jwt');
            window.location.href = '/login.html';
        }
    }
});

async function searchSpotify() {
    const query = document.getElementById('searchQuery').value;
    const storedToken = localStorage.getItem('jwt');
    const response = await fetch(`/spotify/search?query=${query}`, {
        headers: { 'Authorization': storedToken }
    });
    const data = await response.json();
    displayResults(data);
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    data.tracks.items.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.innerHTML = `<p>${track.name} by ${track.artists[0].name}</p>`;
        resultsDiv.appendChild(trackDiv);
    });
}
