$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?i=tt3896198&apikey=7506a05e&s=" +
      $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      movies.forEach((m) => {
        $(showCards(m)).appendTo(".movie-container");
      });

      // ketika tombol detail di click
      $(".modal-detail-button").on("click", function () {
        //   console.log($(this).attr("data-imdb-id")); //cek attribut data-imdb-id
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=7506a05e&i=" +
            $(this).attr("data-imdb-id"),
          success: (m) => {
            const movieDetail = showModals(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCards(m) {
  return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top" alt="img-${m.Title}" />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
          data-bs-target="#movie-detail-modal" data-imdb-id="${m.imdbID}">Details</a>
        </div>
      </div>
    </div>
      `;
}

function showModals(m) {
  return `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${m.Poster}" alt="img-${m.Title}" class="img-fluid" />
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
            <li class="list-group-item">
              <strong>Director: </strong>${m.Director}
            </li>
            <li class="list-group-item">
              <strong>Actors: </strong>${m.Actors}
            </li>
            <li class="list-group-item">
              <strong>Penulis: </strong>${m.Writer}
            </li>
            <li class="list-group-item">
              <strong>Plot :</strong><br />
              ${m.Plot}
            </li>
          </ul>
        </div>
      </div>
    </div>
    `;
}