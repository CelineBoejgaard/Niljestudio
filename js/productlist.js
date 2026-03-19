const container = document.querySelector(".galleri");
const filterButtons = document.querySelectorAll(".filter-btn");

const endpoint1 = "https://dummyjson.com/products/category/womens-dresses";
const endpoint2 = "https://dummyjson.com/products/category/womens-shoes";
const endpoint3 = "https://dummyjson.com/products/category/tops";
const endpoint4 = "https://dummyjson.com/products/category/womens-bags";

let allData = [];

function getCategory(product) {
  if (product.category === "womens-bags") {
    return "bags";
  }

  if (product.category === "womens-shoes") {
    return "shoes";
  }

  if (product.category === "womens-dresses" || product.category === "tops") {
    return "clothing";
  }

  return "accessories";
}

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    markup += `
      <article class="produkt_kort">
        <div class="billede_wrap">
          <img
            class="linkable"
            src="${product.thumbnail}"
            alt="${product.title}"
            onclick="window.location.href='product.html'"
          />
        </div>
        <h3 class="linkable" onclick="window.location.href='product.html'">${product.title}</h3>
        <p class="pris linkable" onclick="window.location.href='product.html'">${product.price} kr</p>
      </article>
    `;
  });

  container.innerHTML = markup;
}

function filterProducts(filter) {
  if (filter === "all") {
    showProducts(allData);
    return;
  }

  const filteredProducts = allData.filter((product) => {
    return getCategory(product) === filter;
  });

  showProducts(filteredProducts);
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      filterProducts(filter);
    });
  });
}

function getData() {
  Promise.all([
    fetch(endpoint1).then((res) => res.json()),
    fetch(endpoint2).then((res) => res.json()),
    fetch(endpoint3).then((res) => res.json()),
    fetch(endpoint4).then((res) => res.json()),
  ])
    .then((data) => {
      allData = [
        ...data[0].products,
        ...data[1].products,
        ...data[2].products,
        ...data[3].products,
      ];

      showProducts(allData);
      setupFilters();
    })
    .catch((error) => {
      console.error("Der skete en fejl:", error);
    });
}

getData();
