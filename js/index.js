// Hent data fra DummyJSON
async function loadBags() {
  try {
    const res = await fetch(
      "https://dummyjson.com/products/category/womens-bags",
    );
    const data = await res.json();
    const products = data.products.slice(0, 5); // De første 5 produkter

    const grid = document.getElementById("bagsGrid");

    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.classList.add("bag-card");

      // Billede
      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title;

      // Titel
      const title = document.createElement("p");
      title.textContent = product.title;

      // Tilføj til kortet
      card.appendChild(img);
      card.appendChild(title);

      // Tilføj kortet til grid
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Fejl ved hentning af produkter:", err);
  }
}

// Kør funktionen
loadBags();
