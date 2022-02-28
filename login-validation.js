
// login input validation

const formButn = document.getElementById("formButn");


// function för att hämta data från användaren och matcha detta med sparande data i local storage.

formButn.addEventListener("click", function (e) {
  const userName = document.getElementById("user-name").value;
  const userPass = document.getElementById("user-pass").value;
  let users = JSON.parse(localStorage.getItem("user"));
  let loggedin = false;
  
  // Om user input matchar kan användaren login.
  users.forEach((account) => {
    if (userName == account.email && userPass == account.password) {
      window.location.href = "./index.html";
      alert("Success! You are now logged in");
      localStorage.setItem("currentUser", JSON.stringify(account));
      loggedin = true;
    }
  });
   // Om user input matchar inte kan användaren inte lögga in.
  if (loggedin == false) {
    alert(
      "Oops, something went wrong! Please review your information and try again."
    );
    e.defaultPrevented();
  }
});
