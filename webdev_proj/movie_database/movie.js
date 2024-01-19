const movieSearchBox = document.getElementById('searchInput');
const searchList = document.querySelector('.search-list');
const resultGrid = document.querySelector('.result-grid');
const initial = document;
const justReleasedContainer = document.getElementById('justReleasedContainer');

async function getJustReleasedMovies() {
    try {
        const searchTerm = 'new';
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=1bf0310c&type=movie`;
        const res = await fetch(URL);
        const data = await res.json();

        if (data.Response === "True") {
            searchList.innerHTML = "";
            justReleasedContainer.innerHTML = "";
            createJustReleasedCards(data.Search);
        }
    } catch (error) {
        console.error('Error fetching newly released movies:', error);
    }
}

function createJustReleasedCards(movies) {
    movies.slice(0, 8).forEach(movie => {
        const card = createMovieCard(movie);
        justReleasedContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await getJustReleasedMovies();
});

async function loadMovies(searchTerm) {
    try {
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=1bf0310c`;
        const res = await fetch(URL);
        const data = await res.json();

        if (data.Response === "True") {
            justReleasedContainer.innerHTML = "";
            justReleasedContainer.style.display = 'none';
            displayMovieList(data.Search);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function findMovies() {
    const searchTerm = movieSearchBox.value.trim();

    if (searchTerm.length > 0) {
        justReleasedContainer.innerHTML = "";
        searchList.classList.remove('hide-search-list');
        justReleasedContainer.style.display = 'none';
        loadMovies(searchTerm);
    } else {
        searchList.innerHTML = "";
        searchList.classList.add('hide-search-list');
        justReleasedContainer.style.display = 'flex';
    }
}

movieSearchBox.addEventListener('input', findMovies);

function displayMovieList(movies) {
    searchList.innerHTML = "";

    const movieListContainer = document.createElement('div');
    movieListContainer.classList.add('cards-container');

    const heading = document.createElement('p');
    heading.classList.add('heading');
    const searchTerm = movieSearchBox.value.trim();
    heading.innerText = searchTerm[0].toUpperCase()+searchTerm.substring(1);
    movieListContainer.appendChild(heading);

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieListContainer.appendChild(card);
    });
    searchList.appendChild(movieListContainer);
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            try {
                const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
                const movieDetails = await result.json();
                displayMovieDetails(movieDetails);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        });
    });
}

async function getMoviesByGenre(genre) {
    try {
        const URL = `https://omdbapi.com/?s=${genre}&page=1&apikey=1bf0310c&type=movie`;
        const res = await fetch(URL);
        const data = await res.json();
        const justReleasedTitle = document.querySelector('.justreleased .title');
        justReleasedTitle.textContent = `${genre.charAt(0).toUpperCase() + genre.substring(1)} Movies`;

        if (data.Response === "True") {
            justReleasedContainer.innerHTML = "";
            justReleasedContainer.style.display = 'none';
            justReleasedContainer.innerText = justReleasedTitle;
            document.querySelectorAll('.cards-container').forEach(con => { con.innerHTML = ""; });
            await createGenreCards(data.Search, genre);
        }
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
    }
}

async function createGenreCards(movies, genre) {
    const genreContainer = document.getElementById(`${genre.toLowerCase()}Container`);
    genreContainer.innerHTML = "";

    movies.slice(0, 8).forEach(movie => {
        const card = createMovieCard(movie);
        genreContainer.appendChild(card);
    });
}

document.querySelectorAll('.genrenavelements a').forEach(genreLink => {
    genreLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const genre = event.target.textContent.trim();
        await getMoviesByGenre(genre);
    });
});

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;

    const title = document.createElement('div');
    title.classList.add('movie-title');
    title.textContent = movie.Title;

    card.appendChild(img);
    card.appendChild(title);
    card.addEventListener('click', () => {
        displayMovieDetails(movie);
    });

    return card;
}

async function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${details.Poster}" alt="Movie Poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>a
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors: </b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if (event.target !== movieSearchBox) {
        searchList.classList.add('hide-search-list');
    }
});
