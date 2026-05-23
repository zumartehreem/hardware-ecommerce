// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Sign Up / Sign In Modals
const signupModal = document.getElementById('signupModal');
const signinModal = document.getElementById('signinModal');
const openSignup = document.getElementById('openSignup');
const openSignin = document.getElementById('openSignin');
const closeSignup = document.getElementById('closeSignup');
const closeSignin = document.getElementById('closeSignin');
const goToSignin = document.getElementById('goToSignin');
const goToSignup = document.getElementById('goToSignup');

function attachModalListeners() {
    // Moved to separate pages signup.html and login.html
}

// Forms & Filters
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');

// Chatbot Elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendChatbot = document.getElementById('sendChatbot');

// ===== STATE =====
let cart = [];
let allProducts = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    initPayPal();
    initTheme();
    checkUserLogin();
});

// Update navbar based on login status
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const userSection = document.getElementById('userSection');
    if (user && userSection) {
        userSection.innerHTML = `
            <span style="color:var(--accent); font-weight:700; margin-right:10px;">Hi, ${user.name.split(' ')[0]}</span>
            <button class="btn-nav" id="logoutBtn" style="padding:5px 12px; font-size:12px;">Logout</button>
        `;
        document.getElementById('logoutBtn').onclick = () => {
            localStorage.removeItem('loggedInUser');
            location.reload();
        };
    }
}

// ===== THEME TOGGLE =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===== PRODUCT API INTEGRATION =====
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback or error message
    }
}

function renderProducts(products) {
    const categories = ['laptops', 'laptop-bags', 'laptop-chargers', 'tablets', 'phones', 'phone-covers', 'phone-chargers', 'smartwatches'];
    
    categories.forEach(catId => {
        const container = document.querySelector(`#${catId} .product-grid`);
        if (!container) return;

        const catProducts = products.filter(p => p.category === catId);
        container.innerHTML = catProducts.map(p => `
            <article class="product-card" data-id="${p.id}" data-price="${p.price}" data-name="${p.name}">
                <div class="card-image">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.badge ? `<span class="card-badge ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
                </div>
                <div class="hover-content">
                    <h3>${p.name}</h3>
                    <p>Exclusive high-quality hardware directly from DeviceHub.</p>
                    <button class="btn-cart" data-name="${p.name}" data-price="${p.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                </div>
                <div class="card-body">
                    <h4>${p.name}</h4>
                    <p class="card-price">PKR ${p.price.toLocaleString()}</p>
                    <button class="btn-cart" data-name="${p.name}" data-price="${p.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                </div>
            </article>
        `).join('');
    });

    // Re-attach event listeners for "Add to Cart" buttons
    attachCartListeners();
    // Re-run scroll animations observer
    initObserver();
}

// ===== SORTING FUNCTIONALITY =====
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const val = sortSelect.value;
        let sorted = [...allProducts];

        if (val === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (val === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (val === 'name-az') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        }

        renderProducts(sorted);
    });
}

// ===== NAVBAR TOGGLE =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Category Dropdown Toggle
const categoryToggle = document.getElementById('categoryToggle');
const categoryDropdown = document.getElementById('categoryDropdown');

if (categoryToggle) {
    categoryToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            categoryDropdown.classList.toggle('open');
        }
    });

    // Hover works for desktop in CSS, but let's add click for robustness
    categoryToggle.onclick = (e) => {
        e.preventDefault();
        categoryDropdown.classList.toggle('open');
    };
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (categoryDropdown && !categoryDropdown.contains(e.target)) {
        categoryDropdown.classList.remove('open');
    }
});

// ===== CHATBOT (GEMINI API MOCK) =====
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('active'));
    closeChatbot.addEventListener('click', () => chatbotWindow.classList.remove('active'));
}

async function handleChat() {
    const text = chatbotInput.value.trim().toLowerCase();
    if (!text) return;

    appendMessage('user', chatbotInput.value.trim());
    chatbotInput.value = '';

    // Thinking indicator
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'chat-msg bot';
    thinkingMsg.textContent = "Thinking...";
    chatbotMessages.appendChild(thinkingMsg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Simulate API Delay
    setTimeout(() => {
        let response = "";
        
        if (text.includes('hello') || text.includes('hi')) {
            response = "Hello! Welcome to DeviceHub. How can I assist you with your hardware needs today?";
        } else if (text.includes('price') || text.includes('cost')) {
            response = "Our prices are very competitive! Laptops start from PKR 165,000, and phone covers are as low as PKR 1,200.";
        } else if (text.includes('contact')) {
            response = "You can reach us at zumartehreem@gmail.com or via the Contact Us page.";
        } else if (text.includes('laptop')) {
            response = "We have high-end laptops including MacBook Air M2, HP Spectre, and Dell Inspiron. Check the Laptops section!";
        } else if (text.includes('mobile') || text.includes('phone')) {
            response = "We offer the latest iPhones, Samsung Galaxy S24, and Vivo models. Which one are you looking for?";
        } else if (text.includes('delivery') || text.includes('shipping')) {
            response = "We provide nationwide shipping across Pakistan. Delivery usually takes 2-4 business days.";
        } else {
            response = "That's a great question! For detailed info about " + text + ", please contact our support team at +92 345-5698123.";
        }
        
        thinkingMsg.textContent = response;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1000);
}

function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role}`;
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (sendChatbot) sendChatbot.addEventListener('click', handleChat);
if (chatbotInput) chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// ===== PAYPAL INTEGRATION (MOCK) =====
function initPayPal() {
    if (window.paypal) {
        // This is where the real PayPal button would be rendered
        // paypal.Buttons({...}).render('#paypal-button-container');
    }
}

// ===== CART FUNCTIONS =====
function attachCartListeners() {
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.onclick = () => {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));

            cart.push({ name, price });
            renderCart();

            btn.style.background = '#2ecc71';
            btn.style.borderColor = '#2ecc71';
            btn.style.color = '#fff';
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';

            setTimeout(() => {
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
            }, 1200);

            showToast(`${name} added to cart!`);
        };
    });
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = 'PKR 0';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>PKR ${item.price.toLocaleString()}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    cartCount.textContent = cart.length;
    cartTotal.textContent = `PKR ${total.toLocaleString()}`;
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
};

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartFn() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCartFn);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartFn);

// ===== CHECKOUT FUNCTIONALITY =====
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Your cart is empty! Add products first.", "warning");
            return;
        }
        
        // Save cart temporarily to localStorage for the checkout page
        localStorage.setItem('tempCart', JSON.stringify(cart));
        localStorage.setItem('tempTotal', cartTotal.textContent.replace('PKR ', ''));
        
        showToast("Redirecting to Secure Checkout...", "success");
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1200);
    });
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.product-card');
    const allBlocks = document.querySelectorAll('.category-block');

    if (!query) {
        allCards.forEach(card => card.style.display = '');
        allBlocks.forEach(block => block.style.display = '');
        return;
    }

    allCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    allBlocks.forEach(block => {
        const visibleCards = block.querySelectorAll('.product-card:not([style*="display: none"])');
        block.style.display = visibleCards.length === 0 ? 'none' : '';
    });
}

if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (searchInput) searchInput.addEventListener('keyup', performSearch);

// ===== FORM VALIDATION =====
const signupPasswordInput = document.getElementById('signupPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', () => {
        const val = signupPasswordInput.value;
        let strength = 0;
        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        const colors = ['#ef4565', '#f39c12', '#4f6af0', '#2ecc71'];
        const texts = ['Weak', 'Fair', 'Good', 'Strong'];
        
        strengthBar.style.width = (strength * 25) + '%';
        strengthBar.style.background = colors[strength-1] || '#333';
        strengthText.textContent = texts[strength-1] || '';
    });
}

// ===== OBSERVER FOR ANIMATIONS =====
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .category-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.6s ease';
        observer.observe(el);
    });
}

// ===== TOAST =====
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// General helpers
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
    
    // Scroll progress
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
});

if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
