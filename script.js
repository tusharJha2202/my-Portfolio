// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            const menu = document.querySelector('nav ul');
            const toggleButton = document.querySelector('.menu-toggle');
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                toggleButton.classList.remove('active');
            }
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate scroll position based on header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Show or hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Observe project cards for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in-element');
        observer.observe(card);
    });
    
    // Add animation classes to skill categories
    document.querySelectorAll('.skill-category').forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.2}s`;
        skill.classList.add('fade-in-element');
        observer.observe(skill);
    });
    
    // Typewriter effect for about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Form validation for contact form (if added later)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.value.trim() === '' && input.hasAttribute('required')) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Here you would normally submit the form or use AJAX
                // For now, just show a success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
    }
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .error {
        border: 2px solid #ff3860 !important;
    }
    
    .success-message {
        background-color: rgba(72, 199, 116, 0.2);
        color: #48c774;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
        animation: fadeIn 0.5s;
    }
</style>
`);
