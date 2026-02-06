// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initScrollAnimations();
    initCounterAnimation();
    initFormSubmission();
    initFloatingShapes();
    initMenuToggle();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        // Update active nav link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.service-card, .work-card, .contact-item');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Counter animation for stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-count');
                        const count = +counter.innerText;
                        
                        const inc = target / speed;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                });
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('projectForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#10b981';
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
}

// Enhanced floating shapes animation
function initFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    
    if (shapesContainer) {
        // Create additional shapes dynamically
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape');
            
            // Random properties
            const size = Math.floor(Math.random() * 60) + 40;
            const top = Math.floor(Math.random() * 80) + 10;
            const left = Math.floor(Math.random() * 80) + 10;
            const delay = Math.random() * 5;
            const duration = Math.floor(Math.random() * 10) + 10;
            
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.top = `${top}%`;
            shape.style.left = `${left}%`;
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `${delay}s`;
            
            // Random color
            const colors = ['#6366f1', '#8b5cf6', '#10b981', '#3b82f6', '#ec4899'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            shape.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}80)`;
            
            shapesContainer.appendChild(shape);
        }
    }
}

// Mobile menu toggle
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Add some interactive effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});