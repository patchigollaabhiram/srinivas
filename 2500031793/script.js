
const products = [
  { id: 1, name: "Laptop", price: 55000,
    category: "Electronics", image: "💻" },
  { id: 2, name: "Smartphone", price: 20000,
    category: "Electronics", image: "📱" },
  { id: 3, name: "Headphones", price: 1999,
    category: "Electronics", image: "🎧" },
  { id: 4, name: "Smart Watch", price: 2999,
    category: "Accessories", image: "⌚" },
  { id: 5, name: "T-Shirt", price: 799,
    category: "Fashion", image: "👕" },
  { id: 6, name: "Shoes", price: 2499,
    category: "Fashion", image: "👟" },
  { id: 7, name: "Backpack", price: 1499,
    category: "Accessories", image: "🎒" },
  { id: 8, name: "Camera", price: 35000,
    category: "Electronics", image: "📷" }
];

let cart = [];
let category = "All";

function showProducts() {
  const search = document.getElementById("search")
    .value.toLowerCase();

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search)
  );

  document.getElementById("products").innerHTML =
    filtered.length ? filtered.map(p => `
      <div class="product">
        <div style="font-size:90px">${p.image}</div>
        <h3>${p.name}</h3>
        <p>₹${p.price.toLocaleString("en-IN")}</p>
        <button onclick="addToCart(${p.id})">
          Add to Cart 🛒
        </button>
      </div>
    `).join("") : "<p>No products found.</p>";
}

function filterCategory(c) {
  category = c;
  showProducts();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  alert(product.name + " added to cart!");
}

function updateCart() {
  document.getElementById("count").textContent = cart.length;

  let total = cart.reduce((sum, p) => sum + p.price, 0);

  document.getElementById("total").textContent =
    total.toLocaleString("en-IN");

  document.getElementById("cartItems").innerHTML =
    cart.length ? cart.map((p, i) => `
      <div class="cart-item">
        <strong>${p.name}</strong>
        <p>₹${p.price.toLocaleString("en-IN")}</p>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `).join("") : "<p>Your cart is empty.</p>";
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const panel = document.getElementById("cart");
  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Demo checkout successful! No payment was processed.");
  cart = [];
  updateCart();
  toggleCart();
}

showProducts();
updateCart();
