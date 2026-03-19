const container = document.querySelector(".galleri");

const endpoint1 = "https://dummyjson.com/products/category/womens-dresses";
const endpoint2 = "https://dummyjson.com/products/category/womens-shoes";
const endpoint3 = "https://dummyjson.com/products/category/tops";
const endpoint4 = "https://dummyjson.com/products/category/womens-bags";

let allData = [];
let udsnit;

function showProducts(json) {
  let markup = "";

  json.forEach((product, index) => {
    if (product.name === "Taske") {
      // gør ingenting
    } else {
      markup += `
        <article class="produkt_kort">
          <div class="billede_wrap">
            <img src="${product.thumbnail}" alt="${product.title}" />
          </div>
          <h3>${product.title}</h3>
          <p class="pris">${product.price} kr</p>
        </article>
      `;
    }
  });

  container.innerHTML = markup;
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

      udsnit = allData;
      showProducts(udsnit);
    })
    .catch((error) => {
      console.error("Der skete en fejl:", error);
    });
}

getData();
