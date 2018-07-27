/*getMovies */

function getMovies(){
  return fetch('/api/movie')
  .then(response => response.json())
  .then(movies => {
    return movies;
  })
  .catch(error => console.error("Display ", error));
}


function renderMovies(movies) {
  const listMovies = movies.map(movie => `
    <li class="flex-container">
    <div >


    <div class="card border-primary mb-3 list-group-item-action" style="max-width: 20rem;">
      <div class="card-header text-white bg-primary"><strong>${movie.title}</strong></div>
      <div class="card-body">
        <h4 class="card-title">${movie.description}</h4>
        <p class="card-text">
        <span class="pull-right">
          <button type="button" class="btn btn-xs btn-info" onclick="handleEditMovieClick(this)" data-movie-id="${movie._id}">Edit</button>
          <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteMovieClick(this)" data-movie-id="${movie._id}">Delete</button>
        </span>
        </p>
      </div>
    </div>


    </div>
    </li>`);
    const html = `<ul class="list-group"> ${listMovies.join('')}</ul>`;
    return html;
}

function refreshMovieDisplay(){
  getMovies()
    .then(movies => {
      window.movieList = movies;

      const html = renderMovies(movies);
      $('#list-container').html(html);
    });
}



function submitMovieForm() {

  const movieData = {
    title: $('#movie-title').val(),
    description: $('#movie-description').val(),
    _id: $('#movie-id').val(),
  };

  let method, url;
  if (movieData._id) {
    method = 'PUT';
    url = '/api/movie/' + movieData._id;
  } else
  {
    method = 'POST';
    url = '/api/movie';
    }
    fetch(url, {
      method: method,
      body: JSON.stringify(movieData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(movie => {
        console.log("Update", movie);
        setForm();
        refreshMovieDisplay();
      })
      .catch(err => {
        console.error("Error", err);
      })
}



function cancelMovieForm(){
  setForm();
}

function handleEditMovieClick(element) {
    const movieId = element.getAttribute('data-movie-id');

    const movie = window.movieList.find(movie => movie._id === movieId);
    if (movie) {
      setForm(movie);
    }
  }


function setForm(data) {
  data = data || {};

  const movie = {
    title: data.title || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#movie-title').val(movie.title);
  $('#movie-description').val(movie.description);
  $('#movie-id').val(movie._id);

  if (movie._id) {
    $('#form-label').text("Edit Movie");
  } else {
    $('#form-label').text("Add Movie");
  }
}

/* DELETE */
function handleDeleteMovieClick(element){
  const movieId = element.getAttribute('data-movie-id');

  if (confirm("Do you want to delete this movie?")) {
    deleteMovie(movieId);
  }
}

function deleteMovie(movieId) {
  const url = '/api/movie/' + movieId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      refreshMovieDisplay();
    })
    .catch(err => {
    });
}

refreshMovieDisplay();
