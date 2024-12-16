
// User data collection
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// login form
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        showAppPage();
    } else {
        alert('Invalid Username or Password');
    }
});

// Register form
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const role = document.getElementById('register-role').value;

    // password confirm
    if (password !== confirmPassword) {
        alert('Confirmation is different from the password');
        return;
    }

    if (users.some(u => u.username === username)) {
        alert('Username already be used');
        return;
    }

    // Create new user
    const newUser = {
        username,
        password,
        role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Register successed!');
    showLoginForm();
});

// Show login form
function showLoginForm() {
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('register-page').classList.add('hidden');
}

// Show register form
function showRegisterForm() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('register-page').classList.remove('hidden');
}

// Show application page
function showAppPage() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('register-page').classList.add('hidden');
    document.getElementById('app-page').classList.remove('hidden');
    
    // Update current user
    document.getElementById('current-user').textContent = `Welcome，${currentUser.username} (${currentUser.role === 'admin' ? 'Admin' : 'User'})`;
    
    // 根据用户角色控制界面
    currentRole = currentUser.role;
    updateView();
}

// logout
function logout() {
    currentUser = null;
    document.getElementById('app-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}


let products = [
    { id: 1, name: 'phone', price: 3999, stock: 50, description: '' },
    { id: 2, name: 'laptop', price: 6999, stock: 30, description: '' },
    { id: 3, name: 'wireless headset', price: 499, stock: 100, description: '' }
];

// Cart
let cart = [];

// Current role
let currentRole = 'user';

// Toggle role
function toggleRole() {
    if (currentUser.role !== 'admin') {
        alert('Only admin can toggle the role');
        return;
    }
    
    currentRole = currentRole === 'user' ? 'admin' : 'user';
    updateView();
}

// Update view
function updateView() {
    const userView = document.getElementById('user-view');
    const adminView = document.getElementById('admin-view');
    
    if (currentRole === 'user') {
        userView.classList.remove('hidden');
        adminView.classList.add('hidden');
        renderProducts();
    } else {
        userView.classList.add('hidden');
        adminView.classList.remove('hidden');
    }
}

// Render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price：$${product.price}</p>
            <p>Stock：${product.stock}</p>
            <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of stoock' : 'Adding to cart'}
            </button>
        `;
        productList.appendChild(productCard);
    });
}

// Adding product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingCartItem = cart.find(item => item.id === productId);
    
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    // decrease the stock
    product.stock--;
    
    updateCart();
    renderProducts();
}

// update cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            ${item.name} x ${item.quantity} - ¥${itemTotal}
            <button onclick="removeFromCart(${item.id})">Delete</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `Total price：¥${total}`;
}

// Remove item from the cart
function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        
        // restock
        product.stock += cartItem.quantity;
        
        cart.splice(cartItemIndex, 1);
        updateCart();
        renderProducts();
    }
}

// checkout
function checkout() {
    if (cart.length === 0) {
        alert('The cart is empty');
        return;
    }
    
    alert(`Checkout successed！Total amount：$${cart.reduce((total, item) => total + item.price * item.quantity, 0)}`);
    cart = [];
    updateCart();
}

// Adding product - Admin
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('product-name').value,
        price: Number(document.getElementById('product-price').value),
        stock: Number(document.getElementById('product-stock').value),
        description: document.getElementById('product-description').value
    };
    
    products.push(newProduct);
    renderProducts();
    
    // reset form
    this.reset();
});
