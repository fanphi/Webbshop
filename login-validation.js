// login form validation "amin"

const formButn = document.getElementById("formButn");

formButn.addEventListener("click", function (e) {
  const userName = document.getElementById("user-name").value;
  const userPass = document.getElementById("user-pass").value;
  let users = JSON.parse(localStorage.getItem("user"));
  let loggedin = false;
  users.forEach((account) => {
    if (userName == account.email && userPass == account.password) {
      window.location.href = "./index.html";
      alert("Success! You are now logged in");
      localStorage.setItem("currentUser", JSON.stringify(account));
      loggedin = true;
    }
  });
  if (loggedin == false) {
    alert(
      "Oops, something went wrong! Please review your information and try again."
    );
    e.defaultPrevented();
  }
});
