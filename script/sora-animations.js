// ===============================================
// SORA RESTAURANT - ULTIMATE ANIMATION LIBRARY
// Modern, Luxury, and Impressive Animations
// ===============================================

// ===== BLOG FUNCTIONALITY =====
// Blog card expand/collapse logic for professional frame
function blogCardExpandCollapse() {
    const cards = document.querySelectorAll('.blog-card, .featured-section');
    cards.forEach(card => {
        const fullContent = card.querySelector('.full-content');
        const readMoreBtn = card.querySelector('.read-more-btn');
        const readLessBtn = card.querySelector('.read-less-btn');
        if (fullContent && readMoreBtn && readLessBtn) {
            // Initial state
            fullContent.style.display = 'none';
            readMoreBtn.style.display = 'inline-block';
            readLessBtn.style.display = 'none';

            readMoreBtn.onclick = function () {
                // Collapse all other cards first
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherFull = otherCard.querySelector('.full-content');
                        const otherReadMore = otherCard.querySelector('.read-more-btn');
                        const otherReadLess = otherCard.querySelector('.read-less-btn');
                        if (otherFull && otherReadMore && otherReadLess) {
                            otherFull.style.display = 'none';
                            otherReadMore.style.display = 'inline-block';
                            otherReadLess.style.display = 'none';
                            otherCard.classList.remove('expanded');
                        }
                    }
                });
                fullContent.style.display = 'block';
                readMoreBtn.style.display = 'none';
                readLessBtn.style.display = 'inline-block';
                card.classList.add('expanded');
                // Smooth scroll to card
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            readLessBtn.onclick = function () {
                fullContent.style.display = 'none';
                readMoreBtn.style.display = 'inline-block';
                readLessBtn.style.display = 'none';
                card.classList.remove('expanded');
            };
        }
    });
}

// ===== PARTICLE SYSTEM =====
function createParticleSystem() {
    if (document.querySelector('.particle-container')) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    const particles = ['☕', '🌾', '🔥', '✨', '🌟', '💫'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: floatUp ${Math.random() * 8 + 6}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        particleContainer.appendChild(particle);

        setTimeout(() => particle.remove(), 8000);
    }

    // Add keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.3;
                }
                50% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-120vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
}

// ===== TYPING ANIMATION =====
function typeWriterEffect(element, text, speed = 100) {
    if (!element) return;

    element.innerHTML = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);

    function typeChar() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(typeChar, speed);
        } else {
            setTimeout(() => cursor.remove(), 2000);
        }
    }

    // Add blink animation
    if (!document.querySelector('#typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(typeChar, 500);
}

// ===== MAGNETIC CURSOR EFFECT =====
function createMagneticCursor() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ffd700, #d4941e);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('a, button, .magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #1a5c2e, #2d7542)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #ffd700, #d4941e)';
        });
    });
}

// ===== FLOATING ELEMENTS =====
function createFloatingElements() {
    const floatingElements = ['🍖', '🌾', '☕', '🔥', '🎵', '⚽'];

    floatingElements.forEach((emoji, index) => {
        const floater = document.createElement('div');
        floater.innerHTML = emoji;
        floater.style.cssText = `
            position: fixed;
            font-size: 30px;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${6 + index}s ease-in-out infinite;
        `;
        document.body.appendChild(floater);
    });

    // Add float animation
    if (!document.querySelector('#float-styles')) {
        const style = document.createElement('style');
        style.id = 'float-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-20px) rotate(90deg); }
                50% { transform: translateY(0px) rotate(180deg); }
                75% { transform: translateY(-10px) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== CARD TILT EFFECT =====
function addCardTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .value-card, .contact-card, .blog-card, .menu-card, .team-member, .event-card');

    cards.forEach(card => {
        card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ===== LOADING SCREEN =====
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'sora-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a5c2e 0%, #2d7542 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;

    loader.innerHTML = `
        <div style="color: #ffd700; font-size: 48px; font-weight: bold; margin-bottom: 30px; animation: pulse 2s infinite;">SORA</div>
        <div style="color: #f5e6d3; font-size: 18px; margin-bottom: 40px;">Authentic Ethiopian Experience</div>
        <div class="loader-spinner" style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(245, 230, 211, 0.3);
            border-top: 3px solid #ffd700;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;

    document.body.appendChild(loader);

    // Add animations
    if (!document.querySelector('#loader-styles')) {
        const style = document.createElement('style');
        style.id = 'loader-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('section, .feature-card, .value-card, .contact-card, .blog-card, .timeline-item, .team-member');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'revealUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add reveal animation
    if (!document.querySelector('#reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            @keyframes revealUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== NAVIGATION ENHANCEMENTS =====
function enhanceNavigation() {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');

    if (nav) {
        // Add backdrop blur on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.background = 'rgba(26, 92, 46, 0.95)';
            } else {
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.background = 'rgba(26, 92, 46, 0.9)';
            }
        });
    }

    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'logoGlow 0.5s ease forwards';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.animation = 'none';
        });
    }

    // Add logo glow animation
    if (!document.querySelector('#nav-styles')) {
        const style = document.createElement('style');
        style.id = 'nav-styles';
        style.textContent = `
            @keyframes logoGlow {
                0% { text-shadow: none; }
                100% { text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FORM ENHANCEMENTS =====
function enhanceFormFields() {
    const formFields = document.querySelectorAll('input, textarea, select');

    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.style.transform = 'scale(1.02)';
            field.style.boxShadow = '0 0 20px rgba(26, 92, 46, 0.3)';
        });

        field.addEventListener('blur', () => {
            field.style.transform = 'scale(1)';
            field.style.boxShadow = 'none';
        });
    });
}

// ===== TIMELINE ANIMATIONS =====
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    content.style.animation = 'slideInTimeline 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(-50px)';
        }
        observer.observe(item);
    });

    // Add timeline animation
    if (!document.querySelector('#timeline-styles')) {
        const style = document.createElement('style');
        style.id = 'timeline-styles';
        style.textContent = `
            @keyframes slideInTimeline {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
// ===== LEGACY ANIMATIONS (PRESERVED) =====
// Smooth scroll for anchor links
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Fade-in animation for hero and header backgrounds
function fadeInSections() {
    const fadeTargets = document.querySelectorAll('.hero, header, section');
    fadeTargets.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1.2s cubic-bezier(0.77,0,0.175,1)';
        setTimeout(() => {
            el.style.opacity = 1;
        }, 300);
    });
}

// Parallax effect for hero background
function parallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const offset = window.scrollY * 0.3;
        hero.style.backgroundPosition = `center ${offset}px`;
    });
}

// ===== HERO BACKGROUND IMAGE SETUP =====
function initHeroBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Only apply to home page
    const isHomePage = window.location.pathname === '/' ||
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '';

    if (!isHomePage) return;

    // Set up hero background image with overlay
    hero.style.backgroundImage = `
        linear-gradient(
            rgba(26, 92, 46, 0.4), 
            rgba(26, 92, 46, 0.6)
        ),
        url('asset/image/homehero.png')
    `;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center center';
    hero.style.backgroundRepeat = 'no-repeat';
    hero.style.backgroundAttachment = 'fixed';
    hero.style.position = 'relative';

    // Add subtle animation on load
    hero.style.opacity = '0';
    hero.style.transition = 'opacity 1.5s ease-in-out';

    // Fade in after a short delay
    setTimeout(() => {
        hero.style.opacity = '1';
    }, 300);

    // Ensure text remains readable with enhanced contrast - WHITE TEXT
    const heroContent = hero.querySelectorAll('h1, p, .hero-tagline, .hero-description');
    heroContent.forEach(element => {
        element.style.color = '#ffffff'; // Pure white text
        element.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.9)'; // Strong shadow for readability
        element.style.position = 'relative';
        element.style.zIndex = '2';
    });

    // Special styling for the main SORA title
    const mainTitle = hero.querySelector('h1');
    if (mainTitle) {
        mainTitle.style.color = '#ffffff';
        mainTitle.style.textShadow = '4px 4px 8px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.8)';
        mainTitle.style.fontWeight = 'bold';
    }

    // Special styling for the tagline
    const tagline = hero.querySelector('.hero-tagline');
    if (tagline) {
        tagline.style.color = '#f5f5f5'; // Slightly off-white for tagline
        tagline.style.textShadow = '2px 2px 6px rgba(0, 0, 0, 0.8)';
    }

    // Add a subtle gradient overlay for better text readability
    const overlay = document.createElement('div');
    overlay.className = 'hero-text-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            rgba(26, 92, 46, 0.2) 0%,
            rgba(26, 92, 46, 0.4) 50%,
            rgba(26, 92, 46, 0.6) 100%
        );
        z-index: 1;
        pointer-events: none;
    `;
    hero.appendChild(overlay);

    console.log('🖼️ Hero background image applied: asset/image/homehero.png');
}

// Luxury hover effect for nav links and buttons
function luxuryHover() {
    const hoverEls = document.querySelectorAll('nav a, button, .luxury-hover');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.08)' }
            ], {
                duration: 250,
                fill: 'forwards'
            });
        });
        el.addEventListener('mouseleave', () => {
            el.animate([
                { transform: 'scale(1.08)' },
                { transform: 'scale(1)' }
            ], {
                duration: 200,
                fill: 'forwards'
            });
        });
    });
}

// Reveal sections on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const reveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(reveal, { threshold: 0.2 });
    sections.forEach(section => {
        section.style.transform = 'translateY(40px)';
        section.style.opacity = 0;
        section.style.transition = 'all 1s cubic-bezier(0.77,0,0.175,1)';
        observer.observe(section);
    });
}

// Animate page transitions (fade out on link click)
function pageTransition() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.target === '_blank' || this.href.startsWith('mailto:')) return;
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = 0.2;
        });
    });
}

// ===== ADVANCED CONTACT FORM HANDLING =====
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

// ===== NOTIFICATION SYSTEM =====
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

    // Add notification styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                max-width: 400px;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left: 4px solid #1a5c2e;
                color: #1a5c2e;
            }
            .notification-error {
                border-left: 4px solid #dc3545;
                color: #dc3545;
            }
            .notification-info {
                border-left: 4px solid #17a2b8;
                color: #17a2b8;
            }
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
                color: inherit;
                opacity: 0.7;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

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

// ===== PRICE DISPLAY FORMATTING =====
function initPriceDisplay() {
    const priceElements = document.querySelectorAll('.menu-item-price, .price');

    priceElements.forEach(price => {
        const priceText = price.textContent;
        if (priceText.includes('$')) {
            price.innerHTML = `<span class="currency">$</span><span class="amount">${priceText.replace('$', '')}</span>`;
        }
    });

    // Add price styling if not present
    if (!document.querySelector('#price-styles')) {
        const style = document.createElement('style');
        style.id = 'price-styles';
        style.textContent = `
            .currency {
                font-size: 0.8em;
                opacity: 0.8;
                margin-right: 2px;
            }
            .amount {
                font-weight: bold;
                color: #d4941e;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const title = item.querySelector('.menu-item-title, h3, h4')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.menu-item-description, p')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        const visibleItems = Array.from(menuItems).filter(item => item.style.display !== 'none');
        handleNoResultsMessage(visibleItems.length === 0, searchTerm);
    });

    function handleNoResultsMessage(showMessage, searchTerm) {
        let noResultsMsg = document.querySelector('.no-results-message');

        if (showMessage && searchTerm.length > 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                        <h3>No results found for "${searchTerm}"</h3>
                        <p>Try searching for different terms or browse our menu categories.</p>
                    </div>
                `;
                searchInput.parentNode.insertBefore(noResultsMsg, searchInput.nextSibling);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// ===== ENHANCED HEADER EFFECTS =====
function initAdvancedHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up (mobile UX improvement)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        }

        lastScrollTop = scrollTop;
    });

    // Add header styles if not present
    if (!document.querySelector('#advanced-header-styles')) {
        const style = document.createElement('style');
        style.id = 'advanced-header-styles';
        style.textContent = `
            header.hidden {
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            }
            header.scrolled {
                backdrop-filter: blur(20px);
                background: rgba(26, 92, 46, 0.95);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ETHIOPIAN TEXT ANIMATIONS =====
function initEthiopianTextAnimations() {
    const ethiopianTexts = document.querySelectorAll('.amharic, .ethiopic-text, .ethiopian-text');

    ethiopianTexts.forEach(text => {
        text.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
            this.style.color = '#d4941e';
            this.style.textShadow = '0 0 10px rgba(212, 148, 30, 0.5)';
            this.style.transition = 'all 0.3s ease';
        });

        text.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.color = '';
            this.style.textShadow = '';
        });
    });
}

// ===== IMAGE LAZY LOADING SYSTEM =====
function initImageLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });

    // Add lazy loading styles
    if (!document.querySelector('#lazy-loading-styles')) {
        const style = document.createElement('style');
        style.id = 'lazy-loading-styles';
        style.textContent = `
            img.lazy {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            img.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

// ORDER ONLINE BUTTON SETUP REMOVED - Using native HTML links instead

// ===== LOGO ENHANCEMENT =====
function initLogoStyling() {
    // Add logo styles if not present
    if (!document.querySelector('#logo-styles')) {
        const style = document.createElement('style');
        style.id = 'logo-styles';
        style.textContent = `
            .logo {
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
            }
            .logo-img {
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                object-fit: cover !important;
                border: 2px solid rgba(245, 230, 211, 0.5) !important;
                transition: all 0.3s ease !important;
            }
            .logo-text {
                color: #f5e6d3 !important;
                font-size: 36px !important;
                font-weight: bold !important;
                letter-spacing: 2px !important;
                font-family: 'Playfair Display', serif !important;
            }
            .logo:hover .logo-img {
                transform: scale(1.1) !important;
                border-color: #ffd700 !important;
                box-shadow: 0 0 15px rgba(255, 215, 0, 0.5) !important;
            }
            .logo:hover .logo-text {
                color: #ffd700 !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.3) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== MENU ITEM INTERACTIONS =====
function initMenuItemInteractions() {
    document.addEventListener('click', function (e) {
        // Menu item order buttons
        if (e.target.matches('.menu-item-btn, .order-btn')) {
            e.preventDefault();
            const menuItem = e.target.closest('.menu-item, .feature-card');
            const itemTitle = menuItem.querySelector('.menu-item-title, h3, h4')?.textContent || 'Item';
            const itemPrice = menuItem.querySelector('.menu-item-price, .price')?.textContent || '';

            showNotification(`Added "${itemTitle}" to cart ${itemPrice ? 'for ' + itemPrice : ''}`, 'success');

            // Add visual feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        }

        // Category buttons
        if (e.target.matches('.category-btn')) {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            if (target && target.startsWith('#')) {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

        // ORDER ONLINE BUTTON FUNCTIONALITY REMOVED - Using native HTML links instead
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    window.addEventListener('load', () => {
        // Preload critical resources
        const criticalImages = [
            'asset/image/ethiopian-food-hero.jpg',
            'asset/image/teff-injera.jpg',
            'asset/image/ethiopian-coffee.jpg',
            'asset/image/sora-logo.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    });
}

// ===== MAIN INITIALIZATION FUNCTION =====
function initSoraAnimations() {
    // Create loading screen first
    createLoadingScreen();

    // Initialize core animations
    enableSmoothScroll();
    fadeInSections();
    initHeroBackground(); // Set up hero background image
    initLogoStyling(); // Set up logo styling and image
    parallaxHero();
    luxuryHover();
    revealOnScroll();
    pageTransition();

    // Initialize new modern animations
    createParticleSystem();
    createMagneticCursor();
    createFloatingElements();
    addCardTiltEffect();
    initScrollReveal();
    enhanceNavigation();
    enhanceFormFields();
    animateTimeline();

    // Blog functionality
    blogCardExpandCollapse();

    // ===== NEW INTEGRATED FEATURES =====
    // Advanced contact form handling
    initContactForm();

    // Price display formatting
    initPriceDisplay();

    // Search functionality
    initSearchFunctionality();

    // Enhanced header effects
    initAdvancedHeaderEffects();

    // Ethiopian text animations
    initEthiopianTextAnimations();

    // Image lazy loading
    initImageLazyLoading();

    // Menu item interactions
    initMenuItemInteractions();

    // Performance optimizations
    initPerformanceOptimizations();

    // Initialize typing effect for hero titles
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1, .page-hero h1');
        if (heroTitle && heroTitle.textContent.includes('SORA')) {
            const originalText = heroTitle.textContent;
            typeWriterEffect(heroTitle, originalText, 150);
        }
    }, 1500);

    // Console welcome message
    console.log(`
🇪🇹 Welcome to Sora Ethiopian Restaurant ሶራ 🇪🇹
Authentic Ethiopian food in East York Toronto
Organic teff injera • Vegan options • Traditional flavors
Visit us at 1585 Danforth Avenue!
    `);
}

// ===== PAGE-SPECIFIC ANIMATIONS =====
function initPageSpecificAnimations() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            initHomePageAnimations();
            break;
        case 'about.html':
            initAboutPageAnimations();
            break;
        case 'contact.html':
            initContactPageAnimations();
            break;
        case 'blog.html':
            initBlogPageAnimations();
            break;
        case 'livemusic.html':
            initLiveMusicAnimations();
            break;
        case 'sportbar.html':
            initSportBarAnimations();
            break;
    }
}

// Home page specific animations
function initHomePageAnimations() {
    // Animate feature cards with stagger
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Animate CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach((btn, index) => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px) scale(1.05)';
            btn.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
            btn.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
}

// About page specific animations
function initAboutPageAnimations() {
    // Animate team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const avatar = member.querySelector('.avatar');
            if (avatar) {
                avatar.style.transform = 'rotateY(180deg) scale(1.1)';
                avatar.style.background = 'linear-gradient(135deg, #d4941e, #1a5c2e)';
            }
        });
        member.addEventListener('mouseleave', () => {
            const avatar = member.querySelector('.avatar');
            if (avatar) {
                avatar.style.transform = 'rotateY(0deg) scale(1)';
                avatar.style.background = 'linear-gradient(135deg, #1a5c2e, #d4941e)';
            }
        });
    });
}

// Contact page specific animations
function initContactPageAnimations() {
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(360deg)';
                icon.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Initialize interactive map animations
    initMapInteractions();
}

// ===== INTERACTIVE MAP FUNCTIONALITY =====
function initMapInteractions() {
    const mapFrame = document.querySelector('.map-frame');
    const mapOverlay = document.querySelector('.map-overlay');
    const mapMarker = document.querySelector('.map-marker');
    const locationItems = document.querySelectorAll('.location-item');

    if (mapFrame) {
        // Enhanced map hover effects
        mapFrame.addEventListener('mouseenter', () => {
            mapFrame.style.transform = 'scale(1.05) translateY(-5px)';
            mapFrame.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';

            if (mapOverlay) {
                mapOverlay.style.background = 'rgba(13, 58, 26, 0.98)';
                mapOverlay.style.borderColor = '#ffd700';
                mapOverlay.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
            }
        });

        mapFrame.addEventListener('mouseleave', () => {
            mapFrame.style.transform = 'scale(1) translateY(0px)';
            mapFrame.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';

            if (mapOverlay) {
                mapOverlay.style.background = 'rgba(13, 58, 26, 0.95)';
                mapOverlay.style.borderColor = '#daa520';
                mapOverlay.style.boxShadow = 'none';
            }
        });

        // Click to focus on location
        mapFrame.addEventListener('click', () => {
            if (mapMarker) {
                mapMarker.style.animation = 'none';
                setTimeout(() => {
                    mapMarker.style.animation = 'bounce 1s ease-in-out 3';
                }, 10);
            }

            // Show location ping effect
            createLocationPing();
        });
    }

    // Animate location items on page load
    locationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }, (index + 1) * 200);
    });

    // Add click to directions functionality
    const directionsButtons = document.querySelectorAll('.btn[href*="maps"], .directions-btn');
    directionsButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);

            // Show notification
            showNotification('Opening directions to Sora Ethiopian Restaurant...', 'info');
        });
    });
}

// Create location ping effect
function createLocationPing() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    const ping = document.createElement('div');
    ping.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: #ffd700;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: locationPing 2s ease-out;
        pointer-events: none;
        z-index: 20;
    `;

    mapContainer.appendChild(ping);

    // Add ping animation
    if (!document.querySelector('#location-ping-styles')) {
        const style = document.createElement('style');
        style.id = 'location-ping-styles';
        style.textContent = `
            @keyframes locationPing {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => ping.remove(), 2000);
}

// Blog page specific animations
function initBlogPageAnimations() {
    // Enhanced blog card animations
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    });
}

// Live music page animations
function initLiveMusicAnimations() {
    // Music note floating animation
    setInterval(() => {
        createFloatingMusicNote();
    }, 1500);
}

function createFloatingMusicNote() {
    const notes = ['♪', '♫', '♬', '🎵', '🎶'];
    const note = document.createElement('div');
    note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
    note.style.cssText = `
        position: fixed;
        font-size: 25px;
        color: #ffd700;
        opacity: 0.7;
        pointer-events: none;
        z-index: 100;
        left: ${Math.random() * 100}vw;
        animation: musicFloat 4s linear forwards;
    `;
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 4000);

    // Add music float animation
    if (!document.querySelector('#music-styles')) {
        const style = document.createElement('style');
        style.id = 'music-styles';
        style.textContent = `
            @keyframes musicFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Sport bar page animations
function initSportBarAnimations() {
    // Already implemented in the HTML file
}

// ===== CLEAN HAMBURGER MENU SYSTEM - YOUR PREFERRED STYLE =====
// Simple jQuery-like functionality with smooth slide animations
let menuOpen = false;

function toggleMenu() {
    const nav = document.querySelector('#nav-menu');
    const hamburger = document.querySelector('#hamburger');

    if (!nav || !hamburger) {
        console.error('Navigation elements not found!');
        return;
    }

    if (!menuOpen) {
        // Open the menu - slide from right
        nav.classList.add('open');
        hamburger.classList.add('active');
        menuOpen = true;
    } else {
        // Close the menu - slide to right
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        menuOpen = false;
    }
}

// jQuery-like animate function for navigation
function animateNavigation(element, targetRight, duration, easing) {
    const startRight = parseInt(getComputedStyle(element).right) || -200;
    const distance = targetRight - startRight;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing functions
        let easedProgress;
        if (easing === 'ease-out') {
            easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        } else if (easing === 'ease-in') {
            easedProgress = progress * progress * progress; // Cubic ease-in
        } else {
            easedProgress = progress; // Linear
        }

        const currentRight = startRight + (distance * easedProgress);
        element.style.right = currentRight + 'px';

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// Make toggleMenu globally available
window.toggleMenu = toggleMenu; function createMenuOverlay() {
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.addEventListener('click', toggleMenu); // Close menu when clicking overlay
        document.body.appendChild(overlay);
    }
    return overlay;
}

// Enhanced menu closing with smooth link interactions
function closeMenuOnNavClick() {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && menuOpen) {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                link.style.background = 'rgba(255, 215, 0, 0.2)';

                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                    link.style.background = '';
                }, 150);

                // Close menu with delay for visual feedback
                setTimeout(() => {
                    toggleMenu();
                }, 200);

                // Prevent immediate navigation to show animation
                if (!link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
                    e.preventDefault();
                    setTimeout(() => {
                        if (link.href && link.href !== '#') {
                            window.location.href = link.href;
                        }
                    }, 400);
                }
            }
        });

        // Add hover effects for menu links
        link.addEventListener('mouseenter', () => {
            if (menuOpen) {
                link.style.transform = 'translateX(10px) scale(1.02)';
                link.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if (menuOpen) {
                link.style.transform = 'translateX(0) scale(1)';
                link.style.textShadow = 'none';
            }
        });
    });
}

// Enhanced responsive handling with dynamic sizing
function handleResize() {
    const hamburger = document.querySelector('#hamburger') || document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.menu-overlay');

    if (window.innerWidth > 768) {
        // Desktop mode - reset menu state
        if (mainNav) {
            mainNav.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
        menuOpen = false;
    } else {
        // Mobile/tablet mode - adjust menu size dynamically
        adjustMenuSizeByScreen();
    }
}

// Dynamic menu sizing based on screen dimensions
function adjustMenuSizeByScreen() {
    const mainNav = document.querySelector('.main-nav');
    if (!mainNav) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Responsive width calculation
    let menuWidth;
    if (screenWidth <= 360) {
        // Small phones
        menuWidth = Math.min(300, screenWidth * 0.9);
    } else if (screenWidth <= 480) {
        // Medium phones
        menuWidth = Math.min(340, screenWidth * 0.85);
    } else if (screenWidth <= 768) {
        // Large phones / small tablets
        menuWidth = Math.min(380, screenWidth * 0.8);
    } else {
        // Fallback
        menuWidth = 350;
    }

    // Apply dynamic width
    mainNav.style.width = `${menuWidth}px`;

    // Adjust font size based on screen
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        if (screenWidth <= 360) {
            link.style.fontSize = '1.1rem';
            link.style.padding = '16px 25px';
        } else {
            link.style.fontSize = '1.2rem';
            link.style.padding = '20px 30px';
        }
    });

    console.log(`📱 Menu adjusted for ${screenWidth}px width: ${menuWidth}px menu`);
}

// Initialize clean navigation system
function initResponsiveNavigation() {
    // Set up hamburger button click event
    const hamburger = document.querySelector('#hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            toggleMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu(); // Close menu on desktop
        }
    });

    console.log('🍔 Clean navigation system initialized');
}// ===== CATERING PAGE SPECIFIC FUNCTIONALITY =====
function initCateringAnimations() {
    // Counter animation for trust badges
    const counters = document.querySelectorAll('.trust-number');

    function animateCounter(element) {
        const originalText = element.textContent;

        // Handle different number formats
        if (originalText.includes('-')) {
            // For ranges like "10-1000", just add a scaling animation
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 500);
            return;
        }

        const target = parseInt(originalText);
        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = Date.now();

        function updateCounter() {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            if (originalText.includes('+')) {
                element.textContent = current + '+';
            } else if (originalText.includes('★')) {
                element.textContent = current + '★';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        updateCounter();
    }    // Intersection Observer for counter animation
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Service icon bounce animation
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });

    // Package card hover enhancement
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🍽️ Catering page animations initialized');
}

// Make toggleMenu globally available
window.toggleMenu = toggleMenu;

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initSoraAnimations();
    initResponsiveNavigation(); // Initialize enhanced responsive menu system

    // Initialize responsive sizing immediately
    setTimeout(() => {
        adjustMenuSizeByScreen();
    }, 100);

    // Initialize catering-specific features if on catering page
    if (document.querySelector('.catering-hero')) {
        initCateringAnimations();
    }

    setTimeout(() => {
        initPageSpecificAnimations();
    }, 1000);

    console.log('🚀 SORA Enhanced Navigation System Ready!');
});

// =====================================================
// ABOUT PAGE SPECIFIC FUNCTIONS - EXTRACTED FROM HTML
// =====================================================

// Toggle mobile navigation menu
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Initialize about page menu functionality
function initAboutPageMenu() {
    // Close menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav ul');
            const hamburger = document.querySelector('.hamburger');
            const overlay = document.querySelector('.mobile-overlay');
            const body = document.body;

            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
}

// Initialize about page functionality when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutPageMenu);
} else {
    initAboutPageMenu();
}

/* ============================================
   MENU PAGE SPECIFIC FUNCTIONS
   ============================================ */

// Menu filtering functionality
function initMenuPageFunctionality() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.textContent.toLowerCase();

            // Show/hide sections based on category
            menuSections.forEach(section => {
                if (category === 'all items') {
                    section.style.display = 'block';
                } else if (category === 'meat dishes' && section.querySelector('.section-title').textContent === 'Meat Dishes') {
                    section.style.display = 'block';
                } else if ((category === 'vegetarian' || category === 'vegan fasting') && section.querySelector('.section-title').textContent === 'Vegetarian & Vegan') {
                    section.style.display = 'block';
                } else if (category === 'combos' && section.classList.contains('combo-section')) {
                    section.style.display = 'block';
                } else if (category === 'beverages' && section.querySelector('.section-title').textContent === 'Beverages') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Add smooth scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all menu items
    document.querySelectorAll('.menu-item, .combo-card, .beverage-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Add magnetic cursor effect
    if (window.createMagneticCursor) {
        createMagneticCursor();
    }

    // Add particle system
    if (window.createParticleSystem) {
        createParticleSystem();
    }

    // Add card tilt effects
    if (window.addCardTiltEffect) {
        document.querySelectorAll('.menu-item').forEach(addCardTiltEffect);
    }
}

// Initialize menu page functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the menu page
    if (document.querySelector('.menu-categories') || document.querySelector('.category-tab')) {
        initMenuPageFunctionality();
    }
});