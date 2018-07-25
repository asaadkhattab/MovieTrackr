/*Get */

function getMovies(){
  return fetch('/api/movie')
  .then(response => response.json())
  .then(movies => {
    console.log("Recieved", movies);
    return movies;
  })
  .catch(error => console.error("Display ", error));
}


function renderMovies(movies) {
  const listMovies = movies.map(movie => `
    <li class="list-group-item">
    <strong>${movie.title}</strong> - ${movie.description}
    </li>`);
    const html = `<ul class="list-group"> ${listMovies.join('')}</ul>`;
    return html;
}

function refreshMovieDisplay(){
  getMovies()
    .then(movies => {
      const html = renderMovies(movies);
      $(`#list-container`).html(html);
    });
}

function submitMovieForm(){
  console.log("Submitted");

  const movieData = {
    title: $('#movie-title').val(),
    description: $('#file-description').val(),
  };
  console.log("Movies: ", movieData);
}

function cancelMovieForm(){
  console.log("Clear");
}
