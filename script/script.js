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
// sora-animations.js
// Add luxury, attractive animations for hero, header, and sections
// No color or style changes, only JS-based effects

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

// Initialize all animations
function initLuxuryAnimations() {
    enableSmoothScroll();
    fadeInSections();
    parallaxHero();
    luxuryHover();
    revealOnScroll();
    pageTransition();
    blogCardExpandCollapse();
}

document.addEventListener('DOMContentLoaded', initLuxuryAnimations);