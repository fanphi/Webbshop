(function () {
  //Fredrikas funktion för skapa användare-formuläret
  const userForm = document.getElementById("createUser");
  const userName = document.getElementById("name");
  const userAddress = document.getElementById("address");
  const userZip = document.getElementById("zipcode");
  const userCity = document.getElementById("city");
  const userEmail = document.getElementById("useremail");
  const userPhone = document.getElementById("phone");
  const userPassword = document.getElementById("userpass");

  let userArray = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  function addUser() {
    const user_info = {
      name: userName.value,
      address: userAddress.value,
      zipcode: userZip.value,
      city: userCity.value,
      email: userEmail.value,
      phone: userPhone.value,
      password: userPassword.value,
    };

    userArray.push(user_info);
    localStorage.setItem("user", JSON.stringify(userArray));
  }

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addUser();

    alert("Your account was successfully created!");
    window.location.href = "./login.html";
  });
})();
