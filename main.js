/*document.getElementById('from').addEventListener('submit' , (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const product = new Product(name, price, image);
     product.addToDOM(document.getElementById('product'))
   
    
}); */

/*
document.addEventListener("DOMContentLoaded", () => {
    class Product {
        constructor(name, price, image) {
            this.name = name;
            this.price = price;
            this.image = image;
            this.id = Date.now();
        }

        addToDOM(container) {
            const productDiv = document.createElement("div");
            productDiv.className = "p-4 bg-white rounded shadow-lg flex flex-col items-center justify-center space-y-2";
            productDiv.innerHTML = `
                <h3 class="text-lg font-bold">${this.name}</h3>
                <p class="text-gray-700">$${this.price}</p>
                <img src="${this.image}" class="w-24 h-24 object-contain" />
                <input type="number" value="1" min="1" id="qty-${this.id}" class="mb-2 w-16 text-center border rounded">
                <div class="flex space-x-2">
                    <button class="add-single px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 cursor-pointer">Add 1 to Cart</button>
                    <button class="add-multiple px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 cursor-pointer">Add Multiple to Cart</button>
                </div>
            `;
            productDiv.querySelector(".add-single").addEventListener("click", () => cart.addToCart(this.id, false));
            productDiv.querySelector(".add-multiple").addEventListener("click", () => cart.addToCart(this.id, true));
            container.appendChild(productDiv);
        }
    }

    // Simulated cart object
    const cart = {
        items: [],
        addToCart(id, isMultiple) {
            const qtyInput = document.getElementById(`qty-${id}`);
            const quantity = isMultiple ? parseInt(qtyInput.value, 10) : 1;
            this.items.push({ id, quantity });
            console.log(`Added product with id ${id}, quantity: ${quantity}`);
        }
    };

    // Event listener for the form submission to add a product
    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('productImage').value;

        const product = new Product(name, price, image);
        product.addToDOM(document.getElementById('products'));
    });
});
*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productImageInput = document.getElementById("productImage");
    const errorMessage = document.getElementById("errorMessage");
    const productsContainer = document.getElementById("products");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalParagraph = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");
    const transactionsContainer = document.getElementById("transactions");

    // Array to store products
    let products = [];

    // Function to display products
    function displayProducts() {
        productsContainer.innerHTML = "";
        products.forEach(function (product) {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Function to add product
    function addProduct(name, price, image) {
        const id = new Date().getTime().toString();
        const product = { id, name, price, image };
        products.push(product);
        displayProducts();
    }

    // Function to handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        const image = productImageInput.value.trim();

        if (name && price && image) {
            addProduct(name, price, image);
            form.reset();
            errorMessage.textContent = "";
        } else {
            errorMessage.textContent = "Please fill in all fields.";
        }
    });

    // Function to add item to cart
    function addToCart(productId) {
        const product = products.find(item => item.id === productId);
        const cartItem = document.createElement("li");
        cartItem.textContent = `${product.name} - $${product.price}`;
        cartItemsContainer.appendChild(cartItem);
    }

    // Event delegation for adding to cart
    productsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.getAttribute("data-id");
            addToCart(productId);
        }
    });

    // Function to clear cart
    clearCartButton.addEventListener("click", function () {
        cartItemsContainer.innerHTML = "";
        updateCartTotal();
    });

    // Function to update cart total
    function updateCartTotal() {
        let total = 0;
        cartItemsContainer.querySelectorAll("li").forEach(function (item) {
            const price = parseFloat(item.textContent.split("$")[1]);
            total += price;
        });
        cartTotalParagraph.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to handle checkout
    checkoutButton.addEventListener("click", function () {
        const transactionDetails = cartItemsContainer.innerHTML;
        transactionsContainer.innerHTML += `<p>${transactionDetails}</p>`;
        clearCartButton.click(); // Clear the cart after checkout
    });
});






