"use strict";

/* =========================================================
   PULSE ELECTRONICS — script.js
   Vanilla JS only. Sections:
   1. Data (products, categories)
   2. State + localStorage helpers
   3. Utilities (toast, currency, stars)
   4. Render: categories, products, cart, product modal
   5. Feature wiring: search, sort, filter, wishlist
   6. Auth (login / sign up / logout)
   7. Cart (add / qty / remove / checkout)
   8. Countdown timer
   9. Nav (mobile menu, scroll header, active link)
   10. Forms (contact, newsletter)
   11. Dark mode
   12. Scroll reveal
   13. Init
   ========================================================= */

/* ---------------------------------------------------------
   1. DATA
   --------------------------------------------------------- */
const products = [
  {
    id: 1,
    sku: "PLS-100001",
    name: "Apple MacBook Air M2",
    category: "laptops",
    price: 1099,
    oldPrice: 1299,
    images: [
      "https://images.pexels.com/photos/34976564/pexels-photo-34976564.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1607603289612-71ae134aa577?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "13-inch Liquid Retina display, Apple M2 chip and all-day battery life — built for work, study and everything between.",
    rating: 5
  },
  {
    id: 2,
    sku: "PLS-100002",
    name: "Dell XPS 13",
    category: "laptops",
    price: 899,
    oldPrice: 899,
    images: [
      "https://images.pexels.com/photos/27467770/pexels-photo-27467770.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Ultra-light aluminum chassis with a crisp InfinityEdge display, made for people who live out of a backpack.",
    rating: 4
  },
  {
    id: 3,
    sku: "PLS-100003",
    name: "iPhone 15 Pro Max",
    category: "phones",
    price: 1199,
    oldPrice: 1349,
    images: [
      "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1726574686436-5ef90358e032?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Titanium design, A17 Pro chip and a pro camera system — flagship cameras and a screen that stays sharp in daylight.",
    rating: 5
  },
  {
    id: 4,
    sku: "PLS-100004",
    name: "Samsung Galaxy S24 Ultra",
    category: "phones",
    price: 1099,
    oldPrice: 1099,
    images: [
      "https://images.unsplash.com/photo-1551764046-eadb20826deb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553368047-78340407b97a?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "6.8-inch Dynamic AMOLED display, built-in S Pen and a 200MP camera — the same core experience, easy to hold, easy to love.",
    rating: 4
  },
  {
    id: 5,
    sku: "PLS-100005",
    name: "Sony WH-1000XM5 Headphones",
    category: "accessories",
    price: 349,
    oldPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612116454817-2b0841e30eaf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616661318204-51ededbdf7a8?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Industry-leading active noise cancellation with a warm, detailed sound signature and a 30-hour battery.",
    rating: 5
  },
  {
    id: 6,
    sku: "PLS-100006",
    name: "Samsung Galaxy Buds2 Pro",
    category: "accessories",
    price: 179,
    oldPrice: 219,
    images: [
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "True-wireless earbuds with adaptive noise cancellation and a case that tops up in minutes, not hours.",
    rating: 4
  },
  {
    id: 7,
    sku: "PLS-100007",
    name: "Apple Watch Series 9",
    category: "accessories",
    price: 399,
    oldPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616353329366-b5546ca70b1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560863185-a4f6199b5768?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Health tracking, always-on Retina display and notifications on your wrist — a battery that survives a full day on a single charge.",
    rating: 4
  },
  {
    id: 8,
    sku: "PLS-100008",
    name: "JBL Charge 5 Portable Speaker",
    category: "accessories",
    price: 149,
    oldPrice: 179,
    images: [
      "https://images.pexels.com/photos/18542239/pexels-photo-18542239.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Pocket-sized speaker with room-filling sound, powerbank function and an IP67 waterproof shell for outdoor use.",
    rating: 4
  },
  {
    id: 9,
    sku: "PLS-100009",
    name: "Logitech G Pro X RGB Keyboard",
    category: "gaming",
    price: 149,
    oldPrice: 179,
    images: [
      "https://images.pexels.com/photos/28779689/pexels-photo-28779689.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1629429409772-20bcd53917d2?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Hot-swappable mechanical switches with per-key RGB — built to survive marathon gaming sessions.",
    rating: 5
  },
  {
    id: 10,
    sku: "PLS-100010",
    name: "Razer DeathAdder V3 Gaming Mouse",
    category: "gaming",
    price: 79,
    oldPrice: 79,
    images: [
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "A featherweight, sensor-tuned mouse with on-the-fly DPI switching for competitive play.",
    rating: 5
  }
];

const categories = [
  { key: "all", label: "All", icon: "fa-border-all" },
  { key: "laptops", label: "Laptops", icon: "fa-laptop" },
  { key: "phones", label: "Phones", icon: "fa-mobile-screen-button" },
  { key: "accessories", label: "Accessories", icon: "fa-headphones-simple" },
  { key: "gaming", label: "Gaming", icon: "fa-gamepad" }
];

/* ---------------------------------------------------------
   2. STATE + STORAGE HELPERS
   --------------------------------------------------------- */
let state = {
  activeCategory: "all",
  searchTerm: "",
  sortBy: "default",
  wishlist: [],
  deliveryMethod: "standard"
};

const DELIVERY_OPTIONS = {
  standard: { label: "Standard Delivery", fee: 0, eta: "2–4 business days" },
  express: { label: "Express Delivery", fee: 6, eta: "Within 24 hours" }
};

let cart = [];
let users = [];
let currentUser = null;

function loadFromStorage() {
  const savedCart = localStorage.getItem("pulse_cart");
  cart = savedCart ? JSON.parse(savedCart) : [];

  const savedUsers = localStorage.getItem("pulse_users");
  users = savedUsers ? JSON.parse(savedUsers) : [];

  const savedUser = localStorage.getItem("pulse_current_user");
  currentUser = savedUser ? JSON.parse(savedUser) : null;

  const savedWishlist = localStorage.getItem("pulse_wishlist");
  state.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

  const savedTheme = localStorage.getItem("pulse_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
}

function saveCart() {
  localStorage.setItem("pulse_cart", JSON.stringify(cart));
}
function saveUsers() {
  localStorage.setItem("pulse_users", JSON.stringify(users));
}
function saveCurrentUser() {
  if (currentUser) {
    localStorage.setItem("pulse_current_user", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("pulse_current_user");
  }
}
function saveWishlist() {
  localStorage.setItem("pulse_wishlist", JSON.stringify(state.wishlist));
}

/* ---------------------------------------------------------
   3. UTILITIES
   --------------------------------------------------------- */
function formatPrice(num) {
  return "$" + num.toFixed(2);
}

function starsHTML(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += '<i class="fas fa-star"></i>';
    } else {
      html += '<i class="fa-regular fa-star"></i>';
    }
  }
  return html;
}

function showToast(message, type) {
  const stack = document.getElementById("toastStack");
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "warn" ? " warn" : "");
  const icon = type === "warn" ? "fa-triangle-exclamation" : "fa-circle-check";
  toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + "</span>";
  stack.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("leaving");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2600);
}

/* ---------------------------------------------------------
   4. RENDER: CATEGORIES
   --------------------------------------------------------- */
function renderCategoryTabs() {
  const wrap = document.getElementById("catTabs");
  wrap.innerHTML = categories
    .map(function (cat) {
      const count =
        cat.key === "all"
          ? products.length
          : products.filter(function (p) {
              return p.category === cat.key;
            }).length;
      const activeClass = state.activeCategory === cat.key ? " active" : "";
      return (
        '<button class="cat-tab' +
        activeClass +
        '" data-cat="' +
        cat.key +
        '"><i class="fas ' +
        cat.icon +
        '"></i> ' +
        cat.label +
        ' <span class="cnt">' +
        count +
        "</span></button>"
      );
    })
    .join("");

  wrap.querySelectorAll(".cat-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.activeCategory = btn.getAttribute("data-cat");
      renderCategoryTabs();
      renderProducts();
    });
  });
}

/* ---------------------------------------------------------
   4b. RENDER: PRODUCTS GRID
   --------------------------------------------------------- */
function getFilteredProducts() {
  let list = products.slice();

  if (state.activeCategory !== "all") {
    list = list.filter(function (p) {
      return p.category === state.activeCategory;
    });
  }

  const term = state.searchTerm.trim().toLowerCase();
  if (term.length > 0) {
    list = list.filter(function (p) {
      return p.name.toLowerCase().indexOf(term) !== -1;
    });
  }

  if (state.sortBy === "price-asc") {
    list.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (state.sortBy === "price-desc") {
    list.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (state.sortBy === "name-asc") {
    list.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const emptyState = document.getElementById("emptyState");
  const meta = document.getElementById("resultsMeta");
  const list = getFilteredProducts();

  meta.innerHTML =
    "Showing <strong>" + list.length + "</strong> of " + products.length + " products";

  if (list.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  grid.innerHTML = list
    .map(function (p, index) {
      const onSale = p.oldPrice > p.price;
      const isWished = state.wishlist.indexOf(p.id) !== -1;
      return `
        <article class="product-card" style="animation-delay:${Math.min(index, 8) * 0.05}s" data-id="${p.id}">
          <div class="pc-media">
            <div class="pc-badges">
              ${onSale ? '<span class="pc-badge sale">SALE</span>' : ""}
              ${p.id > products.length - 3 ? '<span class="pc-badge new">NEW</span>' : ""}
            </div>
            <button class="pc-wish${isWished ? " active" : ""}" data-wish="${p.id}" aria-label="Toggle wishlist">
              <i class="${isWished ? "fas" : "fa-regular"} fa-heart"></i>
            </button>
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          </div>
          <div class="pc-body">
            <span class="pc-cat">${p.category}</span>
            <h3>${p.name}</h3>
            <p class="pc-desc">${p.desc}</p>
            <div class="pc-rating">${starsHTML(p.rating)} <span>(${p.rating}.0)</span></div>
            <div class="pc-price-row">
              <span class="pc-price">${formatPrice(p.price)}</span>
              ${onSale ? '<span class="pc-old">' + formatPrice(p.oldPrice) + "</span>" : ""}
            </div>
            <div class="pc-actions">
              <button class="btn btn-ghost" data-view="${p.id}"><i class="fas fa-eye"></i> View</button>
              <button class="btn btn-primary" data-add="${p.id}"><i class="fas fa-cart-plus"></i> Add</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Wire up card buttons
  grid.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addToCart(parseInt(btn.getAttribute("data-add"), 10));
    });
  });
  grid.querySelectorAll("[data-view]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openProductModal(parseInt(btn.getAttribute("data-view"), 10));
    });
  });
  grid.querySelectorAll("[data-wish]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleWishlist(parseInt(btn.getAttribute("data-wish"), 10), btn);
    });
  });
}

function toggleWishlist(id, btn) {
  const idx = state.wishlist.indexOf(id);
  if (idx === -1) {
    state.wishlist.push(id);
    showToast("Added to your wishlist", "ok");
  } else {
    state.wishlist = state.wishlist.filter(function (w) {
      return w !== id;
    });
  }
  saveWishlist();
  btn.classList.toggle("active");
  const icon = btn.querySelector("i");
  if (btn.classList.contains("active")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fas");
  } else {
    icon.classList.add("fa-regular");
    icon.classList.remove("fas");
  }
}

/* ---------------------------------------------------------
   4c. PRODUCT DETAILS MODAL
   --------------------------------------------------------- */
function openProductModal(id) {
  const product = products.find(function (p) {
    return p.id === id;
  });
  if (!product) return;

  const onSale = product.oldPrice > product.price;
  const content = document.getElementById("pmContent");
  const thumbsHTML =
    product.images.length > 1
      ? `<div class="pm-thumbs">${product.images
          .map(function (img, i) {
            return `<button class="pm-thumb${i === 0 ? " active" : ""}" data-thumb="${img}"><img src="${img}" alt="${product.name} photo ${i + 1}"></button>`;
          })
          .join("")}</div>`
      : "";
  content.innerHTML = `
    <div class="pm-media">
      <img id="pmMainImg" src="${product.images[0]}" alt="${product.name}">
      ${thumbsHTML}
    </div>
    <div class="pm-body">
      <span class="pc-cat">${product.category}</span>
      <h2>${product.name}</h2>
      <div class="pc-rating">${starsHTML(product.rating)} <span>(${product.rating}.0 / 5)</span></div>
      <div class="pm-sku-row">
        <span>Item #: <strong>${product.sku}</strong></span>
        <span>Product #: <strong>${product.sku}</strong></span>
      </div>
      <p class="pm-desc">${product.desc}</p>
      <div class="pm-price-row">
        <span class="pc-price">${formatPrice(product.price)}</span>
        ${onSale ? '<span class="pc-old">' + formatPrice(product.oldPrice) + "</span>" : ""}
      </div>
      <div class="pm-delivery-note"><i class="fas fa-truck-fast"></i> Delivery available to all areas of Lebanon — choose Standard or Express at checkout.</div>
      <div class="pm-actions">
        <button class="btn btn-primary btn-block" id="pmAddBtn"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      </div>
    </div>
  `;

  document.getElementById("pmAddBtn").addEventListener("click", function () {
    addToCart(product.id);
  });

  content.querySelectorAll("[data-thumb]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("pmMainImg").src = btn.getAttribute("data-thumb");
      content.querySelectorAll(".pm-thumb").forEach(function (t) {
        t.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });

  const modal = document.getElementById("productModal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   6. AUTH — LOGIN / SIGN UP / LOGOUT
   --------------------------------------------------------- */
function openAuthModal(tab) {
  const modal = document.getElementById("authModal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  switchAuthTab(tab || "login");
}
function closeAuthModal() {
  document.getElementById("authModal").classList.remove("open");
  document.body.style.overflow = "";
}
function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tab").forEach(function (t) {
    t.classList.toggle("active", t.getAttribute("data-auth-tab") === tab);
  });
  document.getElementById("loginPanel").classList.toggle("active", tab === "login");
  document.getElementById("signupPanel").classList.toggle("active", tab === "signup");
}

function ensureDemoAccount() {
  const exists = users.some(function (u) {
    return u.email === "admin@gmail.com";
  });
  if (!exists) {
    users.push({ name: "Admin", email: "admin@gmail.com", password: "123456" });
    saveUsers();
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg");

  if (email === "" || password === "") {
    msg.textContent = "Please fill in both fields.";
    msg.className = "auth-msg show err";
    return;
  }

  const found = users.find(function (u) {
    return u.email.toLowerCase() === email && u.password === password;
  });

  if (!found) {
    msg.textContent = "Incorrect email or password.";
    msg.className = "auth-msg show err";
    return;
  }

  currentUser = found;
  saveCurrentUser();
  msg.textContent = "Welcome back!";
  msg.className = "auth-msg show ok";
  updateAuthUI();

  setTimeout(function () {
    closeAuthModal();
    showToast("Logged in as " + found.name, "ok");
    document.getElementById("loginPanel").reset();
    msg.className = "auth-msg";
  }, 500);
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();
  const msg = document.getElementById("signupMsg");

  if (name === "") {
    msg.textContent = "Please enter your full name.";
    msg.className = "auth-msg show err";
    return;
  }
  if (email.indexOf("@") === -1) {
    msg.textContent = "Please enter a valid email address.";
    msg.className = "auth-msg show err";
    return;
  }
  if (password.length < 6) {
    msg.textContent = "Password must be at least 6 characters.";
    msg.className = "auth-msg show err";
    return;
  }
  const alreadyExists = users.some(function (u) {
    return u.email.toLowerCase() === email;
  });
  if (alreadyExists) {
    msg.textContent = "An account with this email already exists.";
    msg.className = "auth-msg show err";
    return;
  }

  const newUser = { name: name, email: email, password: password };
  users.push(newUser);
  saveUsers();

  currentUser = newUser;
  saveCurrentUser();
  msg.textContent = "Account created! You're now logged in.";
  msg.className = "auth-msg show ok";
  updateAuthUI();

  setTimeout(function () {
    closeAuthModal();
    showToast("Account created — welcome, " + name.split(" ")[0] + "!", "ok");
    document.getElementById("signupPanel").reset();
    msg.className = "auth-msg";
  }, 600);
}

function handleLogout() {
  currentUser = null;
  saveCurrentUser();
  updateAuthUI();
  showToast("You have been logged out.", "ok");
}

function updateAuthUI() {
  const chip = document.getElementById("userChip");
  const loginBtn = document.getElementById("loginOpenBtn");
  if (currentUser) {
    chip.classList.add("show");
    loginBtn.style.display = "none";
    document.getElementById("userNameLabel").textContent = currentUser.name.split(" ")[0];
    document.getElementById("userAvatar").textContent = currentUser.name.charAt(0).toUpperCase();
  } else {
    chip.classList.remove("show");
    loginBtn.style.display = "inline-flex";
  }
}

/* ---------------------------------------------------------
   7. CART
   --------------------------------------------------------- */
function addToCart(id) {
  if (!currentUser) {
    showToast("Please log in to add items to your cart.", "warn");
    openAuthModal("login");
    return;
  }

  const product = products.find(function (p) {
    return p.id === id;
  });
  if (!product) return;

  const existing = cart.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1
    });
  }

  saveCart();
  renderCart();
  pingCartBadge();
  showToast(product.name + " added to cart", "ok");
}

function changeQty(id, delta) {
  const item = cart.find(function (i) {
    return i.id === id;
  });
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(function (i) {
      return i.id !== id;
    });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(function (i) {
    return i.id !== id;
  });
  saveCart();
  renderCart();
  showToast("Item removed from cart", "ok");
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function cartSubtotal() {
  let total = 0;
  cart.forEach(function (item) {
    total += item.price * item.qty;
  });
  return total;
}

function deliveryFee() {
  if (cart.length === 0) return 0;
  const method = DELIVERY_OPTIONS[state.deliveryMethod] ? state.deliveryMethod : "standard";
  return DELIVERY_OPTIONS[method].fee;
}

function cartTotal() {
  return cartSubtotal() + deliveryFee();
}

function cartCount() {
  let count = 0;
  cart.forEach(function (item) {
    count += item.qty;
  });
  return count;
}

function pingCartBadge() {
  const badge = document.getElementById("cartCount");
  badge.classList.remove("ping");
  // force reflow so the animation can restart
  void badge.offsetWidth;
  badge.classList.add("ping");
}

function renderCart() {
  const wrap = document.getElementById("cartItems");
  const countBadge = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const subtotalEl = document.getElementById("cartSubtotal");
  const deliveryFeeEl = document.getElementById("cartDeliveryFee");

  countBadge.textContent = cartCount();
  subtotalEl.textContent = formatPrice(cartSubtotal());
  const fee = deliveryFee();
  deliveryFeeEl.textContent = fee === 0 ? "Free" : formatPrice(fee);
  totalEl.textContent = formatPrice(cartTotal());

  if (cart.length === 0) {
    wrap.innerHTML =
      '<div class="cart-empty"><i class="fas fa-cart-shopping"></i><p>Your cart is empty.<br>Add something you like!</p></div>';
    return;
  }

  wrap.innerHTML = cart
    .map(function (item) {
      return `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="ci-info">
            <h4>${item.name}</h4>
            <span class="ci-price">${formatPrice(item.price)}</span>
            <div class="ci-row">
              <div class="qty-ctrl">
                <button data-dec="${item.id}" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
                <span>${item.qty}</span>
                <button data-inc="${item.id}" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
              </div>
              <button class="ci-remove" data-remove="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  wrap.querySelectorAll("[data-inc]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQty(parseInt(btn.getAttribute("data-inc"), 10), 1);
    });
  });
  wrap.querySelectorAll("[data-dec]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQty(parseInt(btn.getAttribute("data-dec"), 10), -1);
    });
  });
  wrap.querySelectorAll("[data-remove]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeFromCart(parseInt(btn.getAttribute("data-remove"), 10));
    });
  });
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleCheckout() {
  if (!currentUser) {
    showToast("Please log in before checking out.", "warn");
    openAuthModal("login");
    return;
  }
  if (cart.length === 0) {
    showToast("Your cart is empty", "warn");
    return;
  }
  const method = DELIVERY_OPTIONS[state.deliveryMethod] ? state.deliveryMethod : "standard";
  showToast("Thank you for your order! " + DELIVERY_OPTIONS[method].label + " — arriving " + DELIVERY_OPTIONS[method].eta + ".", "ok");
  clearCart();
  closeCart();
}

/* ---------------------------------------------------------
   8. COUNTDOWN TIMER
   --------------------------------------------------------- */
function startCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 3);
  target.setHours(23, 59, 59, 0);

  function tick() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("cdDays").textContent = String(days).padStart(2, "0");
    document.getElementById("cdHours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cdMinutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("cdSeconds").textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   9. NAV — mobile menu, scroll header, active link
   --------------------------------------------------------- */
function setupMobileMenu() {
  const btn = document.getElementById("hamburgerBtn");
  const icon = document.getElementById("hamburgerIcon");
  const menu = document.getElementById("mobileMenu");

  btn.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("mmLoginBtn").addEventListener("click", function () {
    menu.classList.remove("open");
    openAuthModal("login");
  });
}

function setupActiveNavOnScroll() {
  const sections = ["home", "products", "deals", "about", "contact"];
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "home";
    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) {
        current = id;
      }
    });
    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  });
}

/* ---------------------------------------------------------
   10. FORMS — contact + newsletter
   --------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();
    const msg = document.getElementById("contactMsg");

    if (name === "" || email === "" || message === "") {
      msg.textContent = "All fields are required.";
      msg.className = "form-msg show err";
      return;
    }
    if (email.indexOf("@") === -1) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg show err";
      return;
    }

    msg.textContent = "Message sent successfully.";
    msg.className = "form-msg show ok";
    form.reset();
    showToast("Your message has been sent", "ok");
  });
}

function setupNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    const msg = document.getElementById("newsletterMsg");

    if (email === "" || email.indexOf("@") === -1) {
      msg.textContent = "Please enter a valid email to subscribe.";
      msg.className = "newsletter-msg show";
      return;
    }

    msg.textContent = "Thank you for subscribing!";
    msg.className = "newsletter-msg show";
    form.reset();
  });
}

/* ---------------------------------------------------------
   11. DARK MODE
   --------------------------------------------------------- */
function setupDarkMode() {
  const btn = document.getElementById("darkModeBtn");
  const icon = document.getElementById("darkModeIcon");

  function syncIcon() {
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
  syncIcon();

  btn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("pulse_theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    syncIcon();
  });
}

/* ---------------------------------------------------------
   12. SCROLL REVEAL
   --------------------------------------------------------- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach(function (el) {
    observer.observe(el);
  });
}

/* ---------------------------------------------------------
   MISC WIRING
   --------------------------------------------------------- */
function setupSearchAndSort() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClear");

  input.addEventListener("keyup", function () {
    state.searchTerm = input.value;
    clearBtn.classList.toggle("show", input.value.trim().length > 0);
    renderProducts();
  });

  clearBtn.addEventListener("click", function () {
    input.value = "";
    state.searchTerm = "";
    clearBtn.classList.remove("show");
    renderProducts();
    input.focus();
  });

  document.getElementById("sortSelect").addEventListener("change", function (e) {
    state.sortBy = e.target.value;
    renderProducts();
  });
}

function setupModals() {
  document.getElementById("productModalClose").addEventListener("click", closeProductModal);
  document.getElementById("productModal").addEventListener("click", function (e) {
    if (e.target.id === "productModal") closeProductModal();
  });

  document.getElementById("authModalClose").addEventListener("click", closeAuthModal);
  document.getElementById("authModal").addEventListener("click", function (e) {
    if (e.target.id === "authModal") closeAuthModal();
  });

  document.querySelectorAll(".auth-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      switchAuthTab(tab.getAttribute("data-auth-tab"));
    });
  });

  document.getElementById("loginOpenBtn").addEventListener("click", function () {
    openAuthModal("login");
  });
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);

  document.getElementById("loginPanel").addEventListener("submit", handleLogin);
  document.getElementById("signupPanel").addEventListener("submit", handleSignup);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProductModal();
      closeAuthModal();
      closeCart();
    }
  });
}

function setupCartUI() {
  document.getElementById("cartOpenBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", handleCheckout);
  document.getElementById("clearCartBtn").addEventListener("click", function (e) {
    e.preventDefault();
    if (cart.length === 0) return;
    clearCart();
    showToast("Cart cleared", "ok");
  });
}

function setupDeliveryOptions() {
  document.querySelectorAll('input[name="deliveryMethod"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (radio.checked) {
        state.deliveryMethod = radio.value;
        renderCart();
      }
    });
  });
}

function setupFooterCategoryLinks() {
  document.querySelectorAll("[data-cat-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      state.activeCategory = link.getAttribute("data-cat-link");
      renderCategoryTabs();
      renderProducts();
    });
  });
}

/* ---------------------------------------------------------
   13. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  loadFromStorage();
  ensureDemoAccount();

  document.getElementById("year").textContent = new Date().getFullYear();

  renderCategoryTabs();
  renderProducts();
  renderCart();
  updateAuthUI();

  setupSearchAndSort();
  setupModals();
  setupCartUI();
  setupMobileMenu();
  setupActiveNavOnScroll();
  setupContactForm();
  setupNewsletterForm();
  setupDarkMode();
  setupScrollReveal();
  setupFooterCategoryLinks();
  setupDeliveryOptions();
  startCountdown();
});
