document.getElementById("loadProducts").addEventListener("click", fetchProducts);
document.getElementById("sortSelect").addEventListener("change", sortProducts);

let products = [];

async function fetchProducts() {
  const productGrid = document.getElementById("productGrid");
  const loadButton = document.getElementById("loadProducts");
  const mainElement = document.querySelector("main");

  loadButton.classList.add("loading");

  try {
    const response = await fetch("https://run.mocky.io/v3/92348b3d-54f7-4dc5-8688-ec7d855b6cce?mocky-delay=500ms");

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    products = await response.json();
    console.log(products);
    renderProducts(products);

    loadButton.style.display = "none";
    
    mainElement.style.padding = "5px";
  } catch (error) {
    console.error("Failed to fetch products:", error);
    productGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  } finally {
    loadButton.classList.remove("loading");
  }
}

function renderProducts(productArray) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = ""; 
  
  productArray.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.style.transitionDelay = `${index * 100}ms`;
    
    productCard.innerHTML = `
      <img src="${product.product.images[0].src}" alt="${product.product.title}">
      <h3>${product.product.title}</h3>
      <p class="price">₹${product.product.variants[0].price}</p>
      <button class="add-to-cart"> <span class="icon">🛒 </span>Add to Cart</button>
    `;

    productGrid.appendChild(productCard);

    setTimeout(() => {
      productCard.classList.add("fade-in");
    }, 0);
  });
}

function sortProducts() {
  const sortOption = document.getElementById("sortSelect").value;
  let sortedProducts = [...products];
  
  if (sortOption === "low-to-high") {
    sortedProducts.sort((a, b) => parseFloat(a.product.variants[0].price) - parseFloat(b.product.variants[0].price));
  } else if (sortOption === "high-to-low") {
    sortedProducts.sort((a, b) => parseFloat(b.product.variants[0].price) - parseFloat(a.product.variants[0].price));
  }
  
  renderProducts(sortedProducts);
}
