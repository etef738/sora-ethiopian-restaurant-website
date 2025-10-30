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

// ===== MAIN INITIALIZATION FUNCTION =====
function initSoraAnimations() {
    // Create loading screen first
    createLoadingScreen();

    // Initialize core animations
    enableSmoothScroll();
    fadeInSections();
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

    // Initialize typing effect for hero titles
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1, .page-hero h1');
        if (heroTitle && heroTitle.textContent.includes('SORA')) {
            const originalText = heroTitle.textContent;
            typeWriterEffect(heroTitle, originalText, 150);
        }
    }, 1500);
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

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initSoraAnimations();
    setTimeout(() => {
        initPageSpecificAnimations();
    }, 1000);
});