const searchFilter = document.getElementById("searchInput");
searchFilter.addEventListener("keyup", (event) => {
  filter();
});
function filter() {
  let value = searchFilter.value;
  var filter = value.toUpperCase();
  var list = document.getElementById("productContainer");
  var divs = list.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
    var a = divs[i].getElementsByTagName("h2")[0];
    var b = divs[i].getElementsByTagName("h3")[0];
    var c = divs[i].getElementsByTagName("p")[0];

    if (b == null) {
      if (a || c) {
        if (
          a.innerHTML.toUpperCase().indexOf(filter) > -1 ||
          c.innerHTML.toUpperCase().indexOf(filter) > -1
        ) {
          divs[i].classList.add("visible-categ");
          divs[i].classList.remove("hidden-categ");
        } else {
          divs[i].classList.add("hidden-categ");
          divs[i].classList.remove("visible-categ");
        }
      }
    } else {
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
}
