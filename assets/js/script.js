// Bestseller Carousel - Infinite scroll, 1 product per scroll, 4 visible
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const products = Array.from(document.querySelectorAll('.carousel-product'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const productsPerRow = 4;
    let currentIndex = 0;
    let autoplayInterval;
    // Add click event to carousel cards to open product page
    document.querySelectorAll('.carousel-card').forEach(card => {
        card.addEventListener('click', function() {
            // Get product name from card (assume data-product or .product-info h3)
            let productName = card.getAttribute('data-product');
            if (!productName) {
                const h3 = card.querySelector('.product-info h3');
                if (h3) productName = h3.textContent.trim();
            }
            if (productName) {
                // Convert product name to url-friendly format
                let urlName = productName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, '');
                // Open product page (assume products/{urlName}.html)
                window.open(`/products/${urlName}.html`, '_self');
            }
        });
    });

    // Clone first and last few products for infinite effect
    for (let i = 0; i < productsPerRow; i++) {
        const cloneFirst = products[i].cloneNode(true);
        const cloneLast = products[products.length - 1 - i].cloneNode(true);
        track.appendChild(cloneFirst);
        track.insertBefore(cloneLast, track.firstChild);
    }

    const allProducts = Array.from(track.children);
    let total = products.length;
    let position = productsPerRow; // Start after prepended clones

    // Set initial position
    track.style.transform = `translateX(-${position * 100 / allProducts.length}%)`;

    // Dots
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToIndex(i));
        dotsContainer.appendChild(dot);
    }
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToIndex(idx) {
        currentIndex = idx;
        position = idx + productsPerRow;
        track.style.transition = 'transform 0.8s';
        track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex++;
        position = currentIndex + productsPerRow;
        track.style.transition = 'transform 0.8s';
        track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
        updateDots();
    }
    function prevSlide() {
        currentIndex--;
        position = currentIndex + productsPerRow;
        track.style.transition = 'transform 0.8s';
        track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
        updateDots();
    }

    // Infinite scroll effect
    track.addEventListener('transitionend', () => {
        // Seamless infinite loop: hide transition during instant jump
        if (currentIndex >= total) {
            track.style.transition = 'none';
            currentIndex = 0;
            position = productsPerRow;
            track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
            updateDots();
            // Force reflow, then restore transition for next move
            setTimeout(() => {
                track.style.transition = 'transform 0.8s';
            }, 20);
        }
        if (currentIndex < 0) {
            track.style.transition = 'none';
            currentIndex = total - 1;
            position = currentIndex + productsPerRow;
            track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
            updateDots();
            setTimeout(() => {
                track.style.transition = 'transform 0.8s';
            }, 20);
        }
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    updateDots();
    startAutoplay();
});


// header section
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    if (!toggle || !header || !nav) return;

    toggle.addEventListener('click', function () {
        const isOpen = header.classList.toggle('nav-open');
        this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (header.classList.contains('nav-open')) {
                header.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        itemsContainer.innerText = 'No items in cart.';
        totalContainer.innerText = '';
        return;
    }

    let list = '';
    let total = 0;
    cart.forEach(item => {
        list += `${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    itemsContainer.innerText = list.trim();
    totalContainer.innerText = `Total: ₹${total}`;
        currentIndex++;
        if (currentIndex >= total) {
            currentIndex = 0;
        }
        position = currentIndex + productsPerRow;
        track.style.transition = 'transform 0.8s';
        track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
        updateDots();
    }


        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = total - 1;
        }
        position = currentIndex + productsPerRow;
        track.style.transition = 'transform 0.8s';
        track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
        updateDots();

function clearCart() {
    cart = [];
    saveCart();
        // If we've moved past the last real product, jump instantly to the first real product (after clones)
        if (currentIndex >= total) {
            track.style.transition = 'none';
            currentIndex = 0;
            position = productsPerRow;
            track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
            updateDots();
        }
        // If we've moved before the first real product, jump instantly to the last real product (before clones)
        if (currentIndex < 0) {
            track.style.transition = 'none';
            currentIndex = total - 1;
            position = currentIndex + productsPerRow;
            track.style.transform = `translateX(-${position * 100 / productsPerRow}%)`;
            updateDots();
        }
    if (cart.length === 0) {
        itemsContainer.innerText = 'No items in cart.';
        totalContainer.innerText = '';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    let list = '';
    let total = 0;
    cart.forEach((item, i) => {
        list += `${i + 1}. ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    itemsContainer.innerText = list.trim();
    totalContainer.innerText = `Total: ₹${total}`;
    if (clearBtn) {
        clearBtn.style.display = 'inline-block';
        clearBtn.onclick = clearCart;
    }
}

// initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
});


