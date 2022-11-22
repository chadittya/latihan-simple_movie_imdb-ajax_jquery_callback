// MENGGUNAKAN JQUERY AJAX
// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?i=tt3896198&apikey=7506a05e&s=" +
//       $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       movies.forEach((m) => {
//         $(showCards(m)).appendTo(".movie-container");
//       });

//       // ketika tombol detail di click
//       $(".modal-detail-button").on("click", function () {
//         //   console.log($(this).attr("data-imdbid")); //cek attribut data-imdbid
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=7506a05e&i=" +
//             $(this).attr("data-imdbid"),
//           success: (m) => {
//             const movieDetail = showModals(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// MENGGUNAKAN FETCH
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch(
//     "http://www.omdbapi.com/?i=tt3896198&apikey=7506a05e&s=" +
//       inputKeyword.value
//   )
//     .then((r) => r.json())
//     .then((r) => {
//       const movies = r.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di click
//       const detailsButton = document.querySelectorAll(".modal-detail-button");
//       detailsButton.forEach((db) => {
//         db.addEventListener("click", function () {
//           // console.log(this.dataset.imdbid); //cek dapat no imdb
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=7506a05e&i=" + imdbid)
//             .then((r) => r.json())
//             .then((m) => {
//               const movieDetail = showModals(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

//FETCH REFACTORING (MEMPERBAIKI CODE AGAR MUDAH DIBACA)
//rapiin fetch menjadi fungsi
//nambahin code async sebelum fungsi event agar memberitahukan akan ada method async yang akan dijalankan karena code yang dibuat sekrang adalah syncronus
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
  // console.log(movies);
});

//untuk tombol details karena munculnya setelah menjalankan event diatas, kita tidak bisa membuat event lagi/membuatnya dibawah code searchbutton karena akan dijalankan syncronus
// untuk mengantisipasinya menggunakan EVENT BINDING
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    // console.log(movieDetail);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=7506a05e&i=" + imdbid)
    .then((r) => r.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showModals(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += showCards(m);
  });
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function getMovies(keyword) {
  return fetch(
    "http://www.omdbapi.com/?i=tt3896198&apikey=7506a05e&s=" + keyword
  )
    .then((r) => r.json())
    .then((r) => r.Search);
}

function showCards(m) {
  return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top" alt="img-${m.Title}" />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
          data-bs-target="#movie-detail-modal" data-imdbid="${m.imdbID}">Details</a>
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
