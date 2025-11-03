// Sora Ethiopian Restaurant - Interactive JavaScript
// Enhanced functionality for Ethiopian restaurant website

// Loading screen management
document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Hide loading screen after page load
    window.addEventListener('load', function () {
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    });

    // Initialize all interactive features
    initScrollReveal();
    init3DEffects();
    initPriceDisplay();
    initContactForm();
    initSmoothScrolling();
    initHeaderEffects();
});

// Scroll reveal animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// 3D card effects for menu items and features
function init3DEffects() {
    const cards = document.querySelectorAll('.feature-card, .menu-item, .category-card, .team-member, .service-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Price display and formatting
function initPriceDisplay() {
    const priceElements = document.querySelectorAll('.menu-item-price, .price');

    priceElements.forEach(price => {
        const priceText = price.textContent;
        if (priceText.includes('$')) {
            price.innerHTML = `<span class="currency">$</span><span class="amount">${priceText.replace('$', '')}</span>`;
        }
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you! Your message has been sent. We\'ll respond within 2-4 hours.', 'success');

            // Reset form
            this.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearErrors);
    });

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();

        // Remove existing error
        clearInputError(input);

        if (!value) {
            showInputError(input, 'This field is required');
            return false;
        }

        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showInputError(input, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (input.type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showInputError(input, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    function showInputError(input, message) {
        input.classList.add('error');

        let errorElement = input.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearInputError(input) {
        input.classList.remove('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function clearErrors(e) {
        clearInputError(e.target);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header effects on scroll
function initHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });
}

// Menu item interactions
document.addEventListener('click', function (e) {
    // Menu item order buttons
    if (e.target.matches('.menu-item-btn')) {
        e.preventDefault();
        const menuItem = e.target.closest('.menu-item');
        const itemTitle = menuItem.querySelector('.menu-item-title').textContent;
        const itemPrice = menuItem.querySelector('.menu-item-price').textContent;

        showNotification(`Added "${itemTitle}" to cart for ${itemPrice}`, 'success');
    }

    // Category buttons
    if (e.target.matches('.category-btn')) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        if (target.startsWith('#')) {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Search functionality (if search input exists)
const searchInput = document.querySelector('#search-input');
if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
            const description = item.querySelector('.menu-item-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Ethiopian text animation
function animateEthiopianText() {
    const ethiopianTexts = document.querySelectorAll('.amharic, .ethiopic-text');

    ethiopianTexts.forEach(text => {
        text.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--ethiopian-gold)';
        });

        text.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        });
    });
}

// Initialize Ethiopian text animations
document.addEventListener('DOMContentLoaded', animateEthiopianText);

// Lazy loading for images (if implemented)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical resources
    const criticalImages = [
        '/images/ethiopian-food-hero.jpg',
        '/images/teff-injera.jpg',
        '/images/ethiopian-coffee.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Console welcome message
console.log(`
🇪🇹 Welcome to Sora Ethiopian Restaurant ሶራ 🇪🇹
Authentic Ethiopian food in East York Toronto
Organic teff injera • Vegan options • Traditional flavors
Visit us at 1585 Danforth Avenue!
`);