//creates localstorage cart items if it does not exist when u add a book to the cart
function addToCart(bookId) {
  const items = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = items.find((item) => item.book === bookId);

  if (item) {
    item.count += 1;
  } else {
    items.push({
      book: bookId,
      count: 1,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
}

//removes/updates the cart with the specific book removed
function removeFromCart(bookId) {
  const items = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = items.find((item) => item.book === bookId);
  const deleteBook = items.indexOf(item);
  if (item) {
    if (item.count < 2) {
      items.splice(deleteBook, 1);
    } else {
      item.count -= 1;
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
}

//starts off with
function readJson() {
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then((json) => {
      const params = new URLSearchParams(location.search);
      let categoryId = params.get("category");
      let bookId = params.get("bookid");

      const productWrapper = document.getElementById("productContainer");
      if (!productWrapper) {
      } else {
        productWrapper.innerHTML = "";
        let pageCheck = params.get("page");
        //checks the parameters for what page it is and run specific function
        switch (pageCheck) {
          case "categorypage":
            generateProducts(json);

            break;
          case "shoppingcart":
            generateCartItems(json);

            break;
          case "productpage":
            generateProductPage(json);

            break;
          case "login":
            break;
          case "checkout":
            break;
          default:
            generateCategory(json);
        }
      }
      //dynamically generated htmn that gets data from json
      function generateProducts(data) {
        var generateProduct = data.categories.forEach((item) => {
          if (item.categoryName == categoryId) {
            const names = item.books.map((product) => ({
              name: product.title,
              author: product.author,
              price: product.price,
              src: product.bookImage,
              id: product.id,
            }));
            names.forEach((item) => {
              const newProduct = `<div class="product">
            <div class="img-frame"><img class="book-img" src="${item.src}"</img></div>
            <h2 class="book-title">${item.name}</h2>
            <h3 class="book-author">- ${item.author}</h3>
            <h3 class="category-price">${item.price} kr</h3>
            <a class="more-info" href="product.html?bookid=${item.id}&page=productpage">More information</a>
            <button book-id="${item.id}" class="buy btn">ADD TO CART</button>
          </div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            });
          }
        });
      }
      function generateCategory(data) {
        const categoryCount = data.categories;

        categoryCount.forEach((item) => {
          const newCategory = `<div class="category-container"><a class="select-category" href="index.html?category=${item.categoryName}&page=categorypage" ><div class="product">
          <div class="img-frame category-frame"><div class="image-container"><img class="book-img" src="${item.categoryBgImage}"></img></div><div class="categ-title-container">
          <h2 class="categ-title">${item.categoryName}</h2>
          <p class="categ-desc">${item.desc}</p></div></div>
        </div></a></div>`;
          productWrapper.insertAdjacentHTML("beforeend", newCategory);
        });
        var categorySelect = document.querySelectorAll(".category-container");
      }
      //dynamically generated htmn that gets data from json
      function generateProductPage(data) {
        var generateProduct = data.categories.forEach((item) => {
          const names = item.books.map((product) => ({
            name: product.title,
            auth: product.author,
            price: product.price,
            src: product.bookImage,
            id: product.id,
            categ: product.category,
            desc: product.desc,
          }));
          names.forEach((item) => {
            if (item.id === bookId) {
              const newProduct = `<div class="product-info-container"><div class="product book-page">
              <div class="product-image-container"><img class="book-img" src="${item.src}"</img></div>
            <div class="text-container-product-page"><div class="title-container"><h2 class="book-title">${item.name}, ${item.auth}</h2>
            <h3 class="category-price"><a class="category-link" href="index.html?category=${item.categ}&page=categorypage">${item.categ}</a> ${item.price} kr</h3></div><div class="desc-container"><p class="book-desc-text">${item.desc}</div></div>
            </div><div class="buy-button-container product-info-page"> <button book-id="${item.id}" class="buy btn">ADD TO CART</button></div></div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            }
          });
        });
      }
      //Fanny & Fredrikas funktion för att skriva ut html i varukorgen

      function generateCartItems(json) {
        const cartItemWrapper = document.getElementById("productContainer");

        if (cartItemWrapper) {
          cartItemWrapper.innerHTML = "";
          const items = JSON.parse(localStorage.getItem("cartItems"));
          if (!items) {
          } else {
            items.forEach((item) => {
              json.categories.forEach((category) => {
                category.books.forEach((book) => {
                  if (item.book == book.id) {
                    const totalP = item.count * book.price;

                    const newCartItem = ` <div class="cart-wrapper">
                  <div class="cart-products-wrapper">
                   <img src="${book.bookImage}" alt="picture of book" class="cart-img" id="cart-img">
                   <div class="cart-inner-wrapper">
                   <h4 class="cart-title" id="cart-title">${book.title}</h4>
                   <p class="cart-author" id="cart-author">${book.author}</p>
                  <div class="item-div">
                   <p class="cart-items">Items:<span class="number-item" totalPrice=${totalP} id="number-item">${item.count}</span></p>
                   <button class="cart-add cart-btn buy" book-id="${book.id}" id="cartAddBtn"  cart-pg="cartPage">+</button>
                   <button class="cart-remove cart-btn remove" book-id="${book.id}" cart-pg="cartPage" id="cartRemoveBtn">-</button>
                  </div>
                </div>
                <p class="cart-price" id="cart-price">${book.price}SEK</p>
                  </div>
                </div>`;
                    cartItemWrapper.insertAdjacentHTML(
                      "beforeend",
                      newCartItem
                    );
                  }
                });
              });
            });
          }

          let totalBooks = document.querySelectorAll(".number-item");
          let countB = 0;
          let countP = 0;
          //code sets how many of each book is in shopping cart and also caluclates total price
          totalBooks.forEach((item) => {
            countB += parseInt(item.textContent);
            countP += parseInt(item.getAttribute("totalPrice"));
          });
          if (countB < 1) {
            const totalPrice = `<p class="total-p">
            Din varukorg är tom!
            </p>`;
            document.getElementById("cart-checkout-btn").disabled = true; 
            cartItemWrapper.insertAdjacentHTML("beforeend", totalPrice);
          } else {
            const totalPrice = `<p class="total-p">
            Total amount(<span class="total-items" id="total-items">${countB}</span>
            items): <span class="total-price" id="total-price">${countP}</span>SEK
          </p>`;
            cartItemWrapper.insertAdjacentHTML("beforeend", totalPrice);
          }
        }
      }
      const buyButton = document.querySelectorAll(".buy");
      const butnSelect = document.querySelector("#productContainer");
      if (!butnSelect) {
      } else {
        //event bubbeling since the buttons get dynamically generated so event listener will get removed when content updates
        butnSelect.addEventListener("click", function (event) {
          let checkCartPage = event.target.getAttribute("cart-pg");

          if (event.target.tagName.toLowerCase() === "button") {
            switch (checkCartPage) {
              case "cartPage":
                if (event.target.classList.contains("buy")) {
                  addToCart(event.target.getAttribute("book-id"));
                  generateCartItems(json);
                } else if (event.target.classList.contains("remove")) {
                  removeFromCart(event.target.getAttribute("book-id"));
                  generateCartItems(json);
                }
                break;
              default:
                addToCart(event.target.getAttribute("book-id"));
            }
          }
        });
      }
    })
    .catch(function (e) {
      console.log("error");
      console.log(e);
    });
}
readJson();
//check if someone is logged in and if is logged in add log-out button and add welcome user message
if (localStorage.getItem("currentUser") !== null) {
  const checkOutFormElem = document.querySelector("#checkoutForm");
  let currentU = JSON.parse(localStorage.getItem("currentUser"));
  //checks if form elements excists
  if (checkOutFormElem) {
    let autoFillFields = document.querySelectorAll("[autofill]");
    //gets all the fields that need to get filled in if user is logged in and dynamically adds that information
    autoFillFields.forEach((item) => {
      let cItem = item.getAttribute("autofill");
      item.value = currentU[cItem];
    });
  }
  //changes log out button text
  const signOut = document.querySelector(".log-in-button");
  signOut.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
  });
  signOut.innerHTML = "Log out";
  const navSelector = document.querySelector(".login-nav");
  const welcomeUser = `<p class="welcome-user">
  Welcome ${currentU.name}
</p>`;
  navSelector.insertAdjacentHTML("afterbegin", welcomeUser);
} else {
}
