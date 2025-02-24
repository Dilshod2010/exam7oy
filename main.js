document.addEventListener("DOMContentLoaded", function() {
    filterMovies();
});



function filterMovies() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let genreValue = document.getElementById("genre-filter").value;
    let sortValue = document.getElementById("sort-filter").value;

    console.log("Barcha kinolar:", movies);

    let filteredMovies = movies.filter(movie => {
        if (!movie || !movie.Title || typeof movie.Title !== "string") {
            console.warn("Noto‘g‘ri kino obyekti topildi:", movie);
            return false;
        }

        let titleMatch = movie.Title.toLowerCase().includes(searchValue);
        let genreMatch = genreValue === "all" || (movie.Categories && movie.Categories.includes(genreValue));

        return titleMatch && genreMatch;
    });

    console.log("Filtrdan keyin:", filteredMovies); 

    if (sortValue === "year") {
        filteredMovies.sort((a, b) => b.movie_year - a.movie_year);
    } else if (sortValue === "rating") {
        filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
    }

    displayMovies(filteredMovies);
}
function displayMovies(movieArray) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    
    movieArray.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        let imgSrc = movie.ImageURL ? movie.ImageURL : "default-image.jpg";

        movieCard.innerHTML = `
            <img src="./images/thor.jpg" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>⭐ ${movie.imdb_rating}</p>
            <p>📅 ${movie.movie_year}</p>
            <p>${movie.Categories ? movie.Categories.split("|").join(", ") : "No category"}</p>
            <button class="info-btn" onclick="showMoreInfo('${movie.Title}', '${movie.movie_year}', '${movie.imdb_rating}', '${movie.Categories}', '${movie.summary}')">More Info</button>
        `;

        movieList.appendChild(movieCard);
    });
}




function showMoreInfo(title, image, year, rating, categories, summary) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalYear").innerText = year;
    document.getElementById("modalRating").innerText = rating;
    document.getElementById("modalCategories").innerText = categories;
    document.getElementById("modalSummary").innerText = summary;

    document.getElementById("movieModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}







