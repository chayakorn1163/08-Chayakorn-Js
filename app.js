let products = [];
let cart = [];
let productId = 1;
const defaultImageUrl = "./images/default-product.jpg";

function addProduct() {
  // Use querySelector to get the input values (input value is a string)
  const productName = document.querySelector("#productName").value;
  const unitPrice = document.querySelector("#unitPrice").value;
  let image = document.querySelector("#image").value || defaultImageUrl;

  // Validate image URL
  if (!isValidImageUrl(image)) {
    alert("Please enter a valid image URL (jpg, png, gif)");
    return;
  }

  // Create a new product object
  const product = {
    id: productId++,
    name: productName,
    unitPrice: parseFloat(unitPrice).toFixed(2),
    image: image,
  };

  // Add the product to the products array
  products.push(product);

  // Render the product
  renderProduct(product);

  // Clear the form after saving
  document.querySelector("#productForm").reset();
}

function isValidImageUrl(url) {
  // Check if the URL ends with jpg, png, or gif (case insensitive)
  return /\.(jpg|jpeg|png|gif)$/i.test(url);
}

function renderProduct(product) {
  const productList = document.querySelector("#productList");

  // Create product container
  const productItem = document.createElement("div");

  // Create image element
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  // Create product details container
  const productDetails = document.createElement("div");

  // Create product name element
  const productName = document.createElement("h3");
  productName.textContent = product.name;

  // Create product unit price element
  const productUnitPrice = document.createElement("p");
  productUnitPrice.textContent = `Unit Price: $${product.unitPrice}`;

  // Create add to cart button
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", () => addToCart(product));

  // Append product details to the product details container
  productDetails.appendChild(productName);
  productDetails.appendChild(productUnitPrice);
  productDetails.appendChild(addToCartButton);

  // Append image and product details to the product item container
  productItem.appendChild(img);
  productItem.appendChild(productDetails);

  // Append product item to the product list
  productList.appendChild(productItem);
}

function addToCart(product) {
  cart.push(product);
  renderCart();
  updateTotalValue();
}

function renderCart() {
  const cartItems = document.querySelector("#cart-items");
  cartItems.innerHTML = ""; // Clear previous cart items

  cart.forEach((product) => {
    const cartItem = document.createElement("li");

    // Create image element
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    // Create product details container
    const cartItemDetails = document.createElement("div");

    // Create product name element
    const productName = document.createElement("h4");
    productName.textContent = product.name;

    // Create product unit price element
    const productUnitPrice = document.createElement("p");
    productUnitPrice.textContent = `$${product.unitPrice}`;

    // Append product details to the cart item details container
    cartItemDetails.appendChild(productName);
    cartItemDetails.appendChild(productUnitPrice);

    // Append image and product details to the cart item container
    cartItem.appendChild(img);
    cartItem.appendChild(cartItemDetails);

    // Append cart item to the cart items list
    cartItems.appendChild(cartItem);
  });
}

function updateTotalValue() {
  let totalValue = cart.reduce(
    (sum, product) => sum + parseFloat(product.unitPrice),
    0
  );

  // Formatting the total value as currency
  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalValue);

  // Update the total value in the inventory total value container
  document.querySelector("#totalValue").textContent = formattedTotalValue;
  document.querySelector(
    "#cart-total"
  ).textContent = `Total: ${formattedTotalValue}`;
}

document.querySelector("#clear-cart").addEventListener("click", () => {
  cart = [];
  renderCart();
  updateTotalValue();
});

document.querySelector("#checkout").addEventListener("click", () => {
  alert(`Final Price: ${document.querySelector("#cart-total").textContent}`);
});
