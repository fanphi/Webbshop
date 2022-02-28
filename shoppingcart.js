if (localStorage.getItem("cartItems") === null) {
  const cartItemWrapper = document.getElementById("productContainer");
  const totalPrice = `<p class="total-p">
            Din varukorg är tom!
            </p>`;
  document.getElementById("cart-checkout-btn").disabled = true; //Fredrika
  cartItemWrapper.insertAdjacentHTML("beforeend", totalPrice);
}

let myCheckoutButton = document.querySelector("#cart-checkout-btn");

myCheckoutButton.addEventListener("click", () => {
  if (localStorage.getItem("cartItems") === null) {
    alert("You need to add an item to the shopping cart!");
  } else {
    window.location.href = "./checkout.html?page=checkout";
  }
});
