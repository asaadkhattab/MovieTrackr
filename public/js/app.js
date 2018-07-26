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
    <span class="pull-right">
      <button type="button" class="btn btn-xs btn-default" onclick="handleEditMovieClick()" data-movie-id="${movie._id}">Edit</button>
    </span>
    </li>`);
    const html = `<ul class="list-group"> ${listMovies.join('')}</ul>`;
    return html;
}

function handleEditMovieClick(element) {
    const movieId = element.getAttribute('data-movie-id');

    const movie = window.movieList.find(movie => movie._id === movieId);
    if (movie) {
      setForm(movie)
    }
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
  console.log("Submitted.");

  const movieData = {
    title: $('#movie-title').val(),
    description: $('#movie-description').val(),
    _id: $('#movie-id').val();
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
        refreshMovieList();
      })
      .catch(err => {
        console.error("Error", err);
      }) 
}



function cancelMovieForm(){
  setForm();
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
