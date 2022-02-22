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
   console.log(items);
 }
 //Fanny & Fredrikas funktion för att skriva ut html i varukorgen
 //Kvar att göra: hålla koll på antal items och skriva ut totalsumma+totalt antal items
 //Koppla plus&minusknapparna till det
 function generateCartItems(json){
   const cartItemWrapper = document.getElementById("cart-wrapper");
  if(cartItemWrapper){
    cartItemWrapper.innerHTML = "";  
    //hämta info från local storage
    const items = JSON.parse(localStorage.getItem("cartItems"));
    items.forEach((item) => {
    //loopa igenom och hämta id
      console.log(item);
    //matcha id med id från data och skriv ut titel, författare, omslag, pris
      json.categories.forEach((category) =>{
        category.books.forEach((book)=>{
          if (item.book == book.id){
            console.log(book);
            const newCartItem = ` <div class="cart-wrapper">
            <div class="cart-products-wrapper">
             <img src="${book.bookImage}" alt="picture of book" class="cart-img" id="cart-img">
             <div class="cart-inner-wrapper">
             <h4 class="cart-title" id="cart-title">${book.title}</h4>
             <p class="cart-author" id="cart-author">${book.author}</p>
            <div class="item-div">
             <p class="cart-items">Items:<span class="number-item" id="number-item">x</span></p>
             <button class="cart-add cart-btn" id="cart-add-btn">+</button>
             <button class="cart-remove cart-btn" id="cart-remove-btn">-</button>
            </div>
          </div>
          <p class="cart-price" id="cart-price">${book.price}SEK</p>
            </div>
            <p class="total-p">Total amount(<span class="total-items" id="total-items">x</span> items): <span class="total-price" id="total-price">x</span>SEK</p>
          </div>`;
           cartItemWrapper.insertAdjacentHTML("beforeend", newCartItem);
          }
        })
      })
    })
  }
}
function readJson() {
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then((json) => {
      console.log(json.categories);
      const params = new URLSearchParams(location.search);
      let categoryId = params.get("category");
      let bookId = params.get("bookid");
      console.log(bookId);
      generateCartItems(json);
      const productWrapper = document.getElementById("productContainer");
      productWrapper.innerHTML = "";
      
      if (bookId) {
        generateProductPage(json);
      } else if (!categoryId) {
        generateCategory(json);
      } else {
        generateProducts(json);
        document.querySelector(".filter-section").classList.add("visible");
      }
      
      
      const buyButton = document.querySelectorAll(".buy");
      const searchFilter = document.getElementById("searchInput");
      searchFilter.addEventListener("keyup", (event) => {
        filter();
      });
      buyButton.forEach((el) =>
        el.addEventListener("click", (event) => {
          addToCart(el.getAttribute("book-id"));
        })
      );
      function filter() {
        let value = searchFilter.value;
        var filter = value.toUpperCase();
        var list = document.getElementById("productContainer");
        var divs = list.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
          var a = divs[i].getElementsByTagName("h2")[0];
          var b = divs[i].getElementsByTagName("h3")[0];
          if (a || b) {
            if (
              a.innerHTML.toUpperCase().indexOf(filter) > -1 ||
              b.innerHTML.toUpperCase().indexOf(filter) > -1
            ) {
              divs[i].classList.add("visible-categ");
              divs[i].classList.remove("hidden-categ");
            } else {
              divs[i].classList.add("hidden-categ");
              divs[i].classList.remove("visible-categ");
            }
          }
        }
      }
      function generateProducts(data) {
        var generateProduct = data.categories.forEach((item) => {
          if (item.categoryName == categoryId) {
            console.log(item.books);
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
            <h3 class="book-author">-${item.author}</h3>
            <h3 class="category-price">${item.price} kr</h3>
            <a class="more-info" href="product.html?bookid=${item.id}">More information</a>
            <button book-id="${item.id}" class="buy btn">ADD TO CART</button>
          </div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            });
          }
        });
      }
      function generateCategory(data) {
        const categoryCount = data.categories;
        console.log(categoryCount);
        categoryCount.forEach((item) => {
          const newCategory = `<div class="category-container"><a class="select-category" href="index.html?category=${item.categoryName}" ><div class="product">
          <div class="img-frame category-frame"><div class="image-container"><img class="book-img" src="${item.categoryBgImage}"></img></div><div class="categ-title-container">
          <h2 class="categ-title">${item.categoryName}</h2>
          <p class="categ-desc">${item.desc}</p></div></div>
        </div></a></div>`;
          productWrapper.insertAdjacentHTML("beforeend", newCategory);
        });
        var categorySelect = document.querySelectorAll(".category-container");
      }
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
            <h3 class="category-price"><a class="category-link" href="index.html?category=${item.categ}">${item.categ}</a> ${item.price} kr</h3></div><div class="desc-container"><p class="book-desc-text">${item.desc}</div></div>
            </div><div class="buy-button-container product-info-page"> <button book-id="${item.id}" class="buy btn">ADD TO CART</button></div></div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            }
          });
        });
      }
    })
    .catch(function (e) {
      console.log("error");
      console.log(e);
    });
}
readJson();

//Fanny länka checkout knapp till checkout formulär + alert om shopping cart är tom
  let myCheckoutButton = document.querySelector("#cart-checkout-btn");

  if (window.location.href==="http://127.0.0.1:5500/shoppingcart.html") {
    myCheckoutButton.addEventListener("click",()=>{
      
      if(localStorage.getItem("cartItems")=== null){
        alert("You need to add an item to the shopping cart!")
      }
      else{
      window.location.href="http://127.0.0.1:5500/checkout.html";
      }
    });
  };

// login form validation "amin"


const formButn= document.getElementById("formButn")
const signOut = document.querySelector(".hidden")



const getfromLocal=JSON.parse(localStorage.getItem("user")) 
const email= getfromLocal[0].email
const password= getfromLocal[0].password




formButn.addEventListener("click",function(e){
 
const userName=document.getElementById("user-name").value;
const userPass=document.getElementById("user-pass").value;
if((userName == email)&&(userPass == password)){
  window.location.href = "./logout.html";
  alert("Success! You are now logged in")
  signOut.innerHTML="Sign out"
  localStorage.setItem("email",email)
  localStorage.setItem("password",password)
  
}


else{
  alert("Oops, something went wrong! Please review your information and try again.")
  e.defaultPrevented();
  
}
})


signOut.addEventListener("click",function(){
  localStorage.removeItem("email")
  localStorage.removeItem("password")
  window.location.href ="./login.html"
})
