// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Designer Watch",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Fashion"
    },
    {
        id: 4,
        name: "Smart Coffee Maker",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Home & Kitchen"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartCount = document.querySelector('.cart-count');

// Display products
function displayProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
});

function displayFilteredProducts(filteredProducts) {
    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Check if user is logged in
function checkUserLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userProfile = document.getElementById('userProfile');
    const loginLink = document.getElementById('loginLink');
    const userName = document.getElementById('userName');

    if (currentUser) {
        userProfile.style.display = 'block';
        loginLink.style.display = 'none';
        userName.textContent = currentUser.name;
    } else {
        userProfile.style.display = 'none';
        loginLink.style.display = 'block';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    checkUserLogin();
});

// Add some CSS for the notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .add-to-cart {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
        margin-top: 0.5rem;
    }

    .add-to-cart:hover {
        background-color: #2980b9;
    }
`;
document.head.appendChild(style); 