const navigationElem = document.querySelector(".header-nav");

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
      categoryId ? console.log(categoryId) : (categoryId = "poetry");

      console.log(json.categories);

      const names = json.categories[categoryId].map((product) => ({
        name: product.author,
        price: product.price,
        src: product.bookImage,
      }));
      console.log(names);

      const productWrapper = document.getElementById("productContainer");
      productWrapper.innerHTML = "";
      //ifall vi vill lägga till max antal produkter -> names.slice(0, 2).forEach((item) => {
      names.forEach((item) => {
        const newProduct = `<div class="product">
        <div class="img-frame"><img class="book-img" src="${item.src}"</img></div>
        <h2 class="book-title">${item.name}</h2>
        <h3 class="category-price">${item.price} kr</h3>
        <button class="buy btn">ADD TO CART</button>
      </div>`;
        productWrapper.insertAdjacentHTML("beforeend", newProduct);
      });
    })
    .catch(function () {
      console.log("error");
    });
}
readJson();

navigationElem.addEventListener("click", (event) => {
  console.log("test");
});

function changeQuery() {
  var newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?category=" +
    "XD";
  window.history.pushState({ path: newurl }, "", newurl);
}
