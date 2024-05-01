const handlelogOut = () => {
    const token = localStorage.getItem("token");
  
    fetch("https://watchmate.onrender.com/user/logout/", {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
      });
};


function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
}


function updateNavigationLinks() {
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');

    if (isLoggedIn()) {
        loginLink.style.display = 'none';
    } 
    else {
        logoutLink.style.display = 'none';
    }
}


updateNavigationLinks();