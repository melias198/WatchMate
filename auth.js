const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
  
    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        console.log(info);
  
        fetch("https://watchmate.onrender.com/user/register/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('info',data)
            if(data.response)
            {
                window.location.href = "login.html";
            }
            else{
                if(data.username){
                    const p = document.getElementById('signup-error-message');
                    p.textContent = 'A user with that username already exists!';
                }
                else
                {
                    const p = document.getElementById('signup-error-message');
                    p.textContent = 'Email already exists!';
                }
            };
        });
      } else {
        document.getElementById("error").innerText =
          "Password must be contain eight characters, at least one letter, one number and one special character.";
      }
    } else {
      document.getElementById("error").innerText =
        "Password and confirm password do not match!";
    }
  };
  
  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };
  
  const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://watchmate.onrender.com/user/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.user_id);

          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "index.html";
          }
          else
          {
            const p = document.getElementById('login-error-message');
            p.textContent = 'Incorrect Username or Password!';
          }
        });
    }
  };