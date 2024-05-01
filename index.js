const loadingMovie = () => {
    fetch("https://watchmate.onrender.com/watch/list/")
      .then((res) => res.json())
      .then((data) => displayMovies(data.results))
      .catch((err) => console.log(err));
};

const displayMovies = (movies) => {
    movies.forEach((movie) => {
        const parent = document.getElementById("row-movie");
        
        const div = document.createElement("div");
        div.classList.add("col-sm-6", "col-md-3");

        const newDiv = document.createElement("div");
        newDiv.classList.add("latest-movie");

        newDiv.innerHTML = `
        <a href="#"><img style="width:270px; height:380px;" src="${movie.image}" alt=""></a>
        `;
        
        div.appendChild(newDiv);

        parent.appendChild(div);
    });
  };

loadingMovie();


