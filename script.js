// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMobile = document.getElementById('nav-mobile');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });

    // Mobile dropdown toggle
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    
    if (mobileDropdownTrigger) {
        mobileDropdownTrigger.addEventListener('click', function() {
            mobileDropdown.classList.toggle('active');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Utility function for debouncing scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler for header
const optimizedScrollHandler = debounce(function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);


// (IMPROVED) Statistics Counter Animation using requestAnimationFrame
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // Animation duration in milliseconds

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / animationDuration, 1);
            counter.textContent = Math.floor(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = target; // Ensure the final value is accurate
            }
        };

        window.requestAnimationFrame(step);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate statistics when they come into view
            if (entry.target.id === 'stats') {
                animateCounters();
                observer.unobserve(entry.target);
            }
            
            // Add fade-in animation for other sections
            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Add fade-in class to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Form Validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', scrollToTop);
});


// Add hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMobile = document.getElementById('nav-mobile');
        
        if (navMobile.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
        }
    }
});