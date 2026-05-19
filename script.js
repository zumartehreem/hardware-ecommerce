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

// Forms
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// ===== CART STATE =====
let cart = [];

// ===== NAVBAR TOGGLE (Hamburger) =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav when clicking a link (mobile)
navLinks.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== DROPDOWN TOGGLE (Multiple Dropdowns) =====
const allDropdowns = document.querySelectorAll('.dropdown');

allDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Close all other dropdowns
            allDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    allDropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});

// Close dropdown when clicking a category link
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        allDropdowns.forEach(d => d.classList.remove('open'));
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== SCROLL PROGRESS BAR =====
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MODAL OPEN / CLOSE =====
if (openSignup) openSignup.addEventListener('click', () => signupModal.classList.add('active'));
if (openSignin) openSignin.addEventListener('click', () => signinModal.classList.add('active'));
if (closeSignup) closeSignup.addEventListener('click', () => signupModal.classList.remove('active'));
if (closeSignin) closeSignin.addEventListener('click', () => signinModal.classList.remove('active'));

if (goToSignin) {
    goToSignin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('active');
        setTimeout(() => signinModal.classList.add('active'), 200);
    });
}

if (goToSignup) {
    goToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        signinModal.classList.remove('active');
        setTimeout(() => signupModal.classList.add('active'), 200);
    });
}

// Close modal on overlay click
if (signupModal) {
    signupModal.addEventListener('click', (e) => {
        if (e.target === signupModal) signupModal.classList.remove('active');
    });
}
if (signinModal) {
    signinModal.addEventListener('click', (e) => {
        if (e.target === signinModal) signinModal.classList.remove('active');
    });
}

// ===== SIGN UP FORM VALIDATION =====
const fullNameInput = document.getElementById('fullName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const signupPasswordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const genderError = document.getElementById('genderError');

const strengthBar = document.getElementById('strengthBar');
const strengthBarContainer = document.getElementById('strengthBarContainer');
const strengthText = document.getElementById('strengthText');

// Validation Helpers
function validateName(name) {
    if (name.length < 5 || name.length > 20) {
        return 'Name must be 5-20 characters long';
    }
    return '';
}

function validatePhone(phone) {
    const phonePattern = /^03\d{2}-\d{7}$/;
    if (!phonePattern.test(phone)) {
        return 'Format must be 03XX-XXXXXXX (e.g., 0345-5698123)';
    }
    return '';
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return 'Enter a valid email address';
    }
    return '';
}

function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }
    if (!/^[A-Z]/.test(password)) {
        return 'Password must start with a capital letter';
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return 'Password must contain at least 1 special character';
    }
    return '';
}

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
}

// Password Strength Checker
function checkStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

    if (password.length === 0) {
        strengthBarContainer.classList.remove('show');
        strengthText.textContent = '';
        return;
    }

    strengthBarContainer.classList.add('show');

    if (strength <= 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.background = '#ef4565';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ef4565';
    } else if (strength === 2) {
        strengthBar.style.width = '50%';
        strengthBar.style.background = '#f39c12';
        strengthText.textContent = 'Fair';
        strengthText.style.color = '#f39c12';
    } else if (strength === 3) {
        strengthBar.style.width = '75%';
        strengthBar.style.background = '#4f6af0';
        strengthText.textContent = 'Good';
        strengthText.style.color = '#4f6af0';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#2ecc71';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#2ecc71';
    }
}

// Real-time validation with input classes
function setInputState(input, errorEl, errorMsg) {
    errorEl.textContent = errorMsg;
    if (errorMsg) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
    } else if (input.value.length > 0) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }
}

if (fullNameInput) {
    fullNameInput.addEventListener('input', () => {
        setInputState(fullNameInput, nameError, validateName(fullNameInput.value));
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d-]/g, '');
        e.target.value = value;
        setInputState(phoneInput, phoneError, validatePhone(phoneInput.value));
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        setInputState(emailInput, emailError, validateEmail(emailInput.value));
    });
}

if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', () => {
        checkStrength(signupPasswordInput.value);
        setInputState(signupPasswordInput, passwordError, validatePassword(signupPasswordInput.value));
        if (confirmPasswordInput.value) {
            setInputState(confirmPasswordInput, confirmError, validateConfirmPassword(signupPasswordInput.value, confirmPasswordInput.value));
        }
    });
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        setInputState(confirmPasswordInput, confirmError, validateConfirmPassword(signupPasswordInput.value, confirmPasswordInput.value));
    });
}

// Form Submit
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameErr = validateName(fullNameInput.value);
        const phoneErr = validatePhone(phoneInput.value);
        const emailErr = validateEmail(emailInput.value);
        const passErr = validatePassword(signupPasswordInput.value);
        const confirmErr = validateConfirmPassword(signupPasswordInput.value, confirmPasswordInput.value);

        const genderSelected = document.querySelector('input[name="gender"]:checked');

        setInputState(fullNameInput, nameError, nameErr);
        setInputState(phoneInput, phoneError, phoneErr);
        setInputState(emailInput, emailError, emailErr);
        setInputState(signupPasswordInput, passwordError, passErr);
        setInputState(confirmPasswordInput, confirmError, confirmErr);
        genderError.textContent = genderSelected ? '' : 'Please select a gender';

        if (!nameErr && !phoneErr && !emailErr && !passErr && !confirmErr && genderSelected) {
            const user = {
                name: fullNameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                gender: genderSelected.value,
                password: signupPasswordInput.value
            };
            localStorage.setItem('devicehub_user', JSON.stringify(user));

            showToast('Account created successfully!');
            signupForm.reset();
            signupModal.classList.remove('active');
            strengthBarContainer.classList.remove('show');
            strengthText.textContent = '';

            signupForm.querySelectorAll('input').forEach(inp => {
                inp.classList.remove('input-error', 'input-success');
            });
        }
    });
}

// ===== SIGN IN FORM =====
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signinUser = document.getElementById('signinUser');
        const signinPass = document.getElementById('signinPass');
        const signinUserError = document.getElementById('signinUserError');
        const signinPassError = document.getElementById('signinPassError');

        let hasError = false;

        if (!signinUser.value.trim()) {
            signinUserError.textContent = 'Please enter your username or email';
            signinUser.classList.add('input-error');
            hasError = true;
        } else {
            signinUserError.textContent = '';
            signinUser.classList.remove('input-error');
        }

        if (!signinPass.value.trim()) {
            signinPassError.textContent = 'Please enter your password';
            signinPass.classList.add('input-error');
            hasError = true;
        } else {
            signinPassError.textContent = '';
            signinPass.classList.remove('input-error');
        }

        if (!hasError) {
            const storedUser = JSON.parse(localStorage.getItem('devicehub_user'));
            if (storedUser && (signinUser.value === storedUser.email || signinUser.value === storedUser.name) && signinPass.value === storedUser.password) {
                showToast(`Welcome back, ${storedUser.name}!`);
                signinForm.reset();
                signinModal.classList.remove('active');
                signinUser.classList.remove('input-error');
                signinPass.classList.remove('input-error');
            } else {
                showToast('Invalid credentials. Please try again.');
            }
        }
    });
}

// ===== CART FUNCTIONS =====
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

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Add to Cart Buttons
document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));

        cart.push({ name, price });
        renderCart();

        // Button animation
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
    });
});

// Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        showToast('Thank you for your purchase!');
        cart = [];
        renderCart();
        closeCartFn();
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
        const name = card.querySelector('h4').textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // Hide empty category blocks
    allBlocks.forEach(block => {
        const visibleCards = block.querySelectorAll('.product-card:not([style*="display: none"])');
        block.style.display = visibleCards.length === 0 ? 'none' : '';
    });
}

if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
        // Live search
        performSearch();
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial hidden state and observe
document.querySelectorAll('.product-card, .about-item, .category-title, .stat-card, .team-card, .contact-detail').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(30, 42, 58, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});
