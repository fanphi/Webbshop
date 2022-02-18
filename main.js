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

      const productWrapper = document.getElementById("productContainer");
      productWrapper.innerHTML = "";

      if (bookId) {
        var generateProduct = json.categories.forEach((item) => {
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
            </div><div class="buy-button-container product-info-page"> <button class="buy btn">ADD TO CART</button></div></div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            }
          });
        });

        console.log(json.categories);
      } else if (!categoryId) {
        const categoryCount = json.categories;
        console.log(categoryCount);
        categoryCount.forEach((item) => {
          const newCategory = `<div class="category-container"><a class="select-category" href="index.html?category=${item.categoryName}" ><div class="product">
          <div class="img-frame category-frame"><div class="image-container"><img class="book-img" src="${item.categoryBgImage}"></img></div><div class="categ-title-container">
          <h2 class="categ-title">${item.categoryName}</h2></div></div>
        </div></a></div>`;
          productWrapper.insertAdjacentHTML("beforeend", newCategory);
        });
        var categorySelect = document.querySelectorAll(".category-container");
      } else {
        var generateProduct = json.categories.forEach((item) => {
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
            <h3 class="book-author">-${item.author}</h3>
            <h3 class="category-price">${item.price} kr</h3>
            <a class="more-info" href="product.html?bookid=${item.id}">More information</a>
            <button class="buy btn">ADD TO CART</button>
          </div>`;
              productWrapper.insertAdjacentHTML("beforeend", newProduct);
            });
          }
        });
      }
    })
    .catch(function () {
      console.log("error");
    });
}
readJson();
