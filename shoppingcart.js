
let myCheckoutButton = document.querySelector("#cart-checkout-btn");

  myCheckoutButton.addEventListener("click", () => {
    if (localStorage.getItem("cartItems") === null) {
      alert("You need to add an item to the shopping cart!");
    } else {
      window.location.href = "./checkout.html";
    }
  });
