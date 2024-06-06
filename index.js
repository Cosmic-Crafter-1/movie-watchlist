
const input = document.getElementById("movie-search-input")
const searchBtn = document.getElementById("search-btn")
const moviesDisplay = document.querySelector(".movies-display")

searchBtn.addEventListener("click", renderMovies)

async function renderMovies() {
	try {
		const response = await fetch(`https://www.omdbapi.com/?&apikey=e09cc38b&s=${input.value}`)
		const data = await response.json()
		console.log(data)
		if (data.Response === "False") {
			throw Error("Something Went Wrong, Please try again.")
		}
		let html = ``
data.Search.forEach(function(movie) {
    // Make an additional API call for each movie to get more details
    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e09cc38b`)
        .then(response => response.json())
        .then(details => {
            // Now you have the detailed information in the 'details' object
            html +=
            `
                <div class="movie">
                <img src="${details.Poster}" class="poster" onerror="this.src='http://www.mnit.ac.in/new/PortalProfile/images/faculty/noimage.jpg';" width="150px" height="220px" > 

                <div class="movie-info">

                    <div class="movie-header">
                        <h2> ${details.Title}</h2>
                        <span>&#11088; ${details.imdbRating} </span>
                        <div class="add-to-watchlist">
                        <img src="images/add-circle-svgrepo-com (1).svg"> Watchlist
                    </div>

                </div>

                    <div class="movie-genre">
                        <span id="time"> ${details.Runtime} </span>
                        <span id="genre"> ${details.Genre} </span>
                    </div>

                        <div class="movie-description">${details.Plot}</div>

                    </div>
                </div>
                <hr>
            `
            // Optionally, you can append the HTML to the DOM here
            moviesDisplay.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});

	} catch (error) {
		window.alert("Movie not found.")
	}
}



