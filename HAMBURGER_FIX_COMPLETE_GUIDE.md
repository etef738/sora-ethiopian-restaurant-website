# COMPLETE HAMBURGER MENU FIX GUIDE
# Apply this structure to ALL HTML files for consistent responsive behavior

## 1. HTML STRUCTURE FIX
# Replace the top-bar structure in ALL pages with:

<div class="top-bar">
    <a href="index.html" class="logo">SORA</a>
    <div class="nav-controls">
        <!-- Hamburger Menu Button -->
        <button class="hamburger" onclick="toggleMenu()" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="social-icons">
            <a href="https://facebook.com/sorarestaurant" aria-label="Facebook">📘</a>
            <a href="https://instagram.com/sorarestaurant" aria-label="Instagram">📷</a>
            <a href="https://youtube.com/sorarestaurant" aria-label="YouTube">🎬</a>
            <a href="tel:+14165551234" aria-label="Call us">☎️</a>
        </div>
    </div>
</div>

## 2. CSS ADDITIONS
# Add this CSS to ALL pages:

.nav-controls {
    display: flex;
    align-items: center;
    gap: 20px;
}

.hamburger {
    display: flex;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    width: 40px;
    height: 32px;
    position: relative;
    z-index: 1002;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.hamburger:hover {
    background: rgba(245, 230, 211, 0.1);
}

/* Hamburger animation */
.hamburger span {
    display: block;
    height: 3px;
    width: 100%;
    background: #f5e6d3;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
}

.hamburger span:nth-child(1) {
    margin-bottom: 6px;
}

.hamburger span:nth-child(2) {
    margin-bottom: 6px;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

## 3. RESPONSIVE BREAKPOINTS
# Add these media queries to ALL pages:

/* Tablet Navigation */
@media (max-width: 1024px) {
    nav ul {
        gap: 20px;
    }
    
    nav a {
        font-size: 16px;
        padding: 6px 12px;
    }
}

/* Mobile Navigation */
@media (max-width: 768px) {
    .social-icons {
        display: none;
    }
    
    .hamburger {
        display: flex;
    }
}

/* Extra small screens */
@media (max-width: 480px) {
    .logo {
        font-size: 28px;
    }
    
    .hamburger {
        width: 35px;
        height: 28px;
    }
    
    nav {
        width: 100%;
        right: -100%;
    }
    
    nav.active {
        right: 0;
    }
}

## FILES NEEDING UPDATES:
✅ sportbar.html - COMPLETED
⏳ index.html - NEEDS FIX
⏳ about.html - NEEDS FIX  
⏳ menu.html - NEEDS FIX
⏳ contact.html - NEEDS FIX
⏳ blog.html - NEEDS FIX
⏳ livemusic.html - NEEDS FIX
⏳ catering.html - NEEDS FIX

## TESTING CHECKLIST:
□ Desktop (1200px+): Hamburger visible with hover effect
□ Tablet (768px-1024px): Compact navigation, hamburger accessible
□ Mobile (480px-768px): Social icons hidden, hamburger prominent
□ Extra Small (320px-480px): Full-width navigation menu
□ All links working when clicked from hamburger menu
□ Smooth menu transitions and animations
□ Proper z-index layering (no clickability issues)