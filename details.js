const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("movieId");
    fetch(`https://watchmate.onrender.com/watch/list/${param}/`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));
  
    fetch(`https://watchmate.onrender.com/watch/list/${param}/review/`)
      .then((res) => res.json())
      .then((data) => movieReview(data));
};


const displayDetails = (movie) => {
    const movie_name = document.getElementById("breadcrumbs");
    const span = document.createElement("span");
    span.textContent = `${movie.title}`;
    movie_name.appendChild(span);

    const parent = document.getElementById("details-part");

    const div = document.createElement("div");
    div.classList.add("col-md-6");
    const figure = document.createElement("figure");
    figure.classList.add("movie-poster");
    figure.innerHTML = `
    <img src="${movie.image}" alt="#">
    `;
    div.appendChild(figure);


    const newDiv = document.createElement("div");
    newDiv.classList.add("col-md-6");

    const h2 = document.createElement("h2");
    h2.classList.add("movie-title");
    h2.textContent = `${movie.title}`;
    newDiv.appendChild(h2);

    const summery = document.createElement("div");
    summery.classList.add("movie-summary");
    summery.innerHTML = `
    <p>${movie.storyline}</p>
    `;
    newDiv.appendChild(summery);


    const ul = document.createElement("ul");
    ul.classList.add("movie-meta");
    ul.innerHTML = ` 
    <li><strong>Rating: </strong> ${movie.avg_rating} out of 5</li>
	  <li><strong>Length: </strong> ${movie.length} min</li>
	  <li><strong>Premiere: </strong> ${movie.release}</li>
    <li><strong>Category: </strong>
    ${movie.category.map((item) => {
        return `${item}`;
    })}
	</li>
    `;
    newDiv.appendChild(ul);

    const startUl = document.createElement("ul");
    startUl.classList.add("starring");
    startUl.innerHTML = `
    <li><strong>Directors: </strong> ${movie.director} </li>
	  <li><strong>Writers: </strong> ${movie.writer} </li>
	  <li><strong>Stars:</strong> ${movie.stars} </li>
    `;
    newDiv.appendChild(startUl);

    parent.appendChild(div);
    parent.appendChild(newDiv);
};


const movieReview = (reviews) => {
    console.log(reviews);
    reviews.forEach(review => {
        const parent = document.getElementById("review-part");
        const div = document.createElement("div");
        div.innerHTML = `
        <h4> <strong>user: </strong> ${review.reviewer} <br> 
        <strong>rating: </strong> ${review.rating} <br>
        <p class="border border-primary">${review.description}</p>
        </h4>
        <hr>
        `;
        parent.appendChild(div);
    });
};




const handleReview = () => {
    const param = new URLSearchParams(window.location.search).get("movieId");
    const rating = document.getElementById("review-container").value;
    const massege = document.getElementById("review-massege").value;

    const Token = localStorage.getItem("token");
    const User = localStorage.getItem("user_id");
    
    const info = {
     reviewer: User,
     title: "Good Movie",
     rating: rating,
     description: massege,
     watchlist: param,
    };

    console.log(info);
    console.log(Token);
  fetch(`https://watchmate.onrender.com/watch/list/${param}/review/create/`, {
    method: "POST",
    headers: { 
      "Authorization": `Token ${Token}`,
      "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('error',data);
      if(data.detail)
      {
        const p = document.getElementById('error-message');
        p.textContent = 'You must be logged in to give a review!';
      }
      else if(data.id)
      {
        const p = document.getElementById('error-message');
        p.textContent = 'Review create successfully. Please reload.';
      }
      else
      {
        const p = document.getElementById('error-message');
        p.textContent = "You've already given a review for this content.";
      };
    });
    
};

getparams();