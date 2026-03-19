const mainImage = document.querySelector("#mainProductImage");
const thumbsContainer = document.querySelector("#thumbs");
const productTitle = document.querySelector("#productTitle");
const productPrice = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
const relatedGrid = document.querySelector("#relatedGrid");

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

async function loadProduct() {
  try {
    const res = await fetch("https://dummyjson.com/products/173");
    const product = await res.json();

    productTitle.textContent = product.title;
    productPrice.textContent = `${product.price} kr`;
    productDescription.textContent = product.description;

    if (product.images && product.images.length > 0) {
      mainImage.src = product.images[0];
      mainImage.alt = product.title;

      product.images.forEach((img, index) => {
        const btn = document.createElement("button");
        btn.className = `thumb ${index === 0 ? "active" : ""}`;
        btn.type = "button";
        btn.dataset.image = img;
        btn.innerHTML = `<img src="${img}" alt="${product.title} - view ${index + 1}" />`;

        btn.addEventListener("click", () => {
          mainImage.src = img;
          document.querySelectorAll(".thumb").forEach((thumb) => {
            thumb.classList.remove("active");
          });
          btn.classList.add("active");
        });

        thumbsContainer.appendChild(btn);
      });
    }
  } catch (error) {
    console.error("Kunne ikke hente produktdata:", error);
  }
}

async function loadRelated() {
  try {
    const res = await fetch(
      "https://dummyjson.com/products/category/womens-bags",
    );
    const data = await res.json();

    data.products.slice(0, 5).forEach((p) => {
      const card = document.createElement("div");
      card.className = "related-card";
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}" />
        <p>${p.title}</p>
      `;
      relatedGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Kunne ikke hente relaterede produkter:", error);
  }
}

function setupMenu() {
  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
}

function setupSizes() {
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function setupColors() {
  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

loadProduct();
loadRelated();
setupMenu();
setupSizes();
setupColors();
