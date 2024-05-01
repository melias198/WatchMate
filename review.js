const loadMovie = (search) => {
    console.log(search);
    document.getElementById("movie-list").innerHTML = "";
    document.getElementById("nodata").style.display="none";
    let url = 'https://watchmate.onrender.com/watch/list/';
    if (search) {
        url += `?search=${search}`;
    }
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        if(data.results.length>0){
            displayMovie(data?.results);
        }
        else{
            document.getElementById("nodata").style.display="block";
            document.getElementById("movie-list").innerHTML = "";
        }
    });
};



// const loadMovie = () => {
//     fetch("https://watchmate.onrender.com/watch/list/")
//       .then((res) => res.json())
//       .then((data) => displayMovie(data.results))
//     //   .then((data) => console.log(data))
//       .catch((err) => console.log(err));
// };

function shuffleMovie(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const displayMovie = (movies) => {
    shuffleMovie(movies);

    movies.forEach((movie) => {
      const parent = document.getElementById("movie-list");

      const div = document.createElement("div");
      div.classList.add("movie");

      const figure = document.createElement("figure");
      figure.classList.add("movie-poster");
      figure.innerHTML = `
      <img src="${movie.image}" alt="#">
      `;
      div.appendChild(figure);

      const newDiv = document.createElement("div");
      newDiv.classList.add("movie-title");
      newDiv.innerHTML = `
      <a href="details.html?movieId=${
        movie.id}">${movie.title}</a>
      `;
      div.appendChild(newDiv);

      div.innerHTML += ``;
      
      parent.appendChild(div);
    });
  };


const loadCategory = () => {
    fetch("https://watchmate.onrender.com/watch/category/")
      .then((res) => res.json())
      .then((data) => displayCategory(data))
      .catch((err) => console.log(err));
};


function changeFunc() {
    var selectBox = document.getElementById("category-id");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    loadMovie(selectedValue);
}



const displayCategory = (categories) => {
    const parent = document.getElementById("category-id");
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.innerHTML = `
        <option>${category.name}</option>
        `
        parent.appendChild(option);
    });
  };



  const loadRelease = () => {
    fetch("https://watchmate.onrender.com/watch/release/")
      .then((res) => res.json())
      .then((data) => displayRelease(data))
      .catch((err) => console.log(err));
};


function changeYear() {
    var selectBox = document.getElementById("release-id");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    loadMovie(selectedValue);
}



const displayRelease = (years) => {
    const parent = document.getElementById("release-id");
    years.forEach((year) => {
        const option = document.createElement("option");
        option.innerHTML = `
        <option>${year.year}</option>
        `
        parent.appendChild(option);
    });
  };


const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadMovie(value);
    document.getElementById("search").value = '';
};


loadMovie();
loadCategory();
loadRelease();