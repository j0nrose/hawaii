// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.island-card, .activity-item, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// CTA Button scroll to islands
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    const islandsSection = document.querySelector('#islands');
    const offsetTop = islandsSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const island = e.target.querySelector('select').value;
    const message = e.target.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !island || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Aloha ${name}! Thank you for your interest in visiting ${island}. We'll get back to you soon!`);
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Island cards hover effects
document.querySelectorAll('.island-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Activity items animation on hover
document.querySelectorAll('.activity-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.activity-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.activity-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const speed = scrolled * 0.5;
        heroContent.style.transform = `translateY(${speed}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add floating animation to hero elements
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        // Add subtle floating animation
        setInterval(() => {
            heroTitle.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
            heroSubtitle.style.transform = `translateY(${Math.sin(Date.now() * 0.0008) * 3}px)`;
        }, 16); // ~60fps
    }
});

// Dynamic wave animation
function createWaveAnimation() {
    const waves = document.querySelector('.hero-waves svg path');
    if (waves) {
        let offset = 0;
        setInterval(() => {
            offset += 0.5;
            waves.style.transform = `translateX(${Math.sin(offset * 0.01) * 10}px)`;
        }, 50);
    }
}

// Initialize wave animation
createWaveAnimation();

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg - Konami code for special Hawaii animation
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateHawaiiMode();
        konamiCode = [];
    }
});

function activateHawaiiMode() {
    // Add rainbow background animation
    document.body.style.animation = 'rainbow 3s infinite';
    
    // Add CSS for rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show aloha message
    const alohaMessage = document.createElement('div');
    alohaMessage.innerHTML = '🌺 ALOHA! You found the secret! 🌺';
    alohaMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 0.5s ease-in-out;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(alohaMessage);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alohaMessage.remove();
        document.body.style.animation = '';
        style.remove();
    }, 3000);
}

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.section-title, .footer-section');
revealElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll handling code here
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            const speed = scrolled * 0.3;
            heroContent.style.transform = `translateY(${speed}px)`;
        }
    }
}, 16));

// Add click ripple effect to buttons
document.querySelectorAll('button, .cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});