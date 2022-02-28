const inputs = document.querySelectorAll("#checkoutForm input[autofill]");
const formSelect = document.getElementById("checkoutForm");
const receipt = document.getElementById("receiptWrapper");
const formContainer = document.querySelector("section.checkout-wrapper");
formSelect.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let fName = document.querySelector("[autofill=name]").value;
  let adress = document.querySelector("[autofill=address]").value;
  let postalCode = document.querySelector("[autofill=zipcode]").value;
  let city = document.querySelector("[autofill=city]").value;
  let email = document.querySelector("[autofill=email]").value;

  generateReceipt(fName, adress, postalCode, city, email);

  receipt.classList.remove("hide-item");
  formContainer.classList.add("hide-item");
}
showCart();
const generateTotal = document.getElementById("generateTotal");
const generateUDetails = document.getElementById("generateDetails");
const productWrapper = document.querySelector("#generateBooks");
const visibleCartWrapper = document.querySelector("#cartContainer");
const totalCartWrapper = document.querySelector("#totalContainer");
function showCart() {
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then((json) => {
      const items = JSON.parse(localStorage.getItem("cartItems"));

      items.forEach((item) => {
        //loopa igenom och hämta id

        //matcha id med id från data och skriv ut titel, författare, omslag, pris
        json.categories.forEach((category) => {
          category.books.forEach((book) => {
            if (item.book == book.id) {
              const totalP = item.count * book.price;

              const newCartItem = `
              <div class="book">
           <p class="cart-author" id="cart-author">${book.title}, ${book.author} (${item.count}ST)</p>
           <div class="book-container">
            <span class="numberr-item" totalPrice=${totalP} totalBook=${item.count} id="number-item"></span>
           <p class="cart-price" id="cart-price">${totalP}SEK</p></div></div>
         `;
              visibleCartWrapper.insertAdjacentHTML("beforeend", newCartItem);
            }
          });
        });
      });

      let totalBooks = document.querySelectorAll(".numberr-item");
      let countB = 0;
      let countP = 0;
      totalBooks.forEach((item) => {
        countB += parseInt(item.getAttribute("totalBook"));
        countP += parseInt(item.getAttribute("totalPrice"));
      });

      const totalPrice = `<p class="total-p">
      Total (<span class="total-items" id="total-items">${countB}</span>
      items): <span class="total-price" id="total-price"> ${countP}</span>SEK
    </p>`;
      totalCartWrapper.insertAdjacentHTML("beforeend", totalPrice);
    });
}

function generateReceipt(
  userfullName,
  userAdress,
  userPostalCode,
  userCity,
  userEmail
) {
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then((json) => {
      const items = JSON.parse(localStorage.getItem("cartItems"));

      items.forEach((item) => {
        //loopa igenom och hämta id

        //matcha id med id från data och skriv ut titel, författare, omslag, pris
        json.categories.forEach((category) => {
          category.books.forEach((book) => {
            if (item.book == book.id) {
              const totalP = item.count * book.price;

              const newCartItem = `
              <div class="book">
           <p class="cart-author" id="cart-author">${book.title}, ${book.author} (${item.count}ST)</p>
           <div class="book-container">
            <span class="number-item" totalPrice=${totalP} totalBook=${item.count} id="number-item"></span>
           <p class="cart-price" id="cart-price">${totalP}SEK</p></div></div>
         `;
              productWrapper.insertAdjacentHTML("beforeend", newCartItem);
            }
          });
        });
      });

      const newProduct = `<p class="full-name">${userfullName}</p>
  <p class="adress">${userAdress}</p>
  <p class="postal-code">${userPostalCode}</p>
  <p class="city">${userCity}</p>
  <p class="userEmail">${userEmail}</p>
`;
      generateUDetails.insertAdjacentHTML("beforeend", newProduct);

      let totalBooks = document.querySelectorAll(".number-item");
      let countB = 0;
      let countP = 0;
      totalBooks.forEach((item) => {
        countB += parseInt(item.getAttribute("totalBook"));
        countP += parseInt(item.getAttribute("totalPrice"));
      });

      const totalPrice = `<p class="total-p">
      Total (<span class="total-items" id="total-items">${countB}</span>
      items): <span class="total-price" id="total-price"> ${countP}</span>SEK
    </p>`;
      generateTotal.insertAdjacentHTML("beforeend", totalPrice);
      localStorage.removeItem("cartItems");
    });
}
