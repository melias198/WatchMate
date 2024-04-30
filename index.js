const loadMovie = () => {
    fetch("https://watchmate.onrender.com/watch/list/")
      .then((res) => res.json())
      .then((data) => displayMovie(data.results))
    //   .then((data) => console.log(data))
      .catch((err) => console.log(err));
};

const displayMovie = (movies) => {
    // console.log(movies);
    // console.log(movies[0]);
    movies.forEach((movie) => {
        // const parent = document.getElementById("slider");
        // const ul =document.createElement("ul");
        // ul.classList.add("slides");

        // ul.innerHTML = `
        // <li><a href="#"><img src="${movie.image}" alt=""></a></li>
        // `;

        // parent.appendChild(ul);

        const parent = document.getElementById("row-movie");
        
        const div = document.createElement("div");
        div.classList.add("col-sm-6", "col-md-3");

        const newDiv = document.createElement("div");
        newDiv.classList.add("latest-movie");

        newDiv.innerHTML = `
        <a href="#"><img src="${movie.image}" alt="Movie 3"></a>
        `;
        
        div.appendChild(newDiv);

        parent.appendChild(div);
    });
  };

// const handleSearch = () => {
//     const value = document.getElementById("search").value;
//     loadMovie(value);
//     document.getElementById("search").value = '';
// };

loadMovie()


