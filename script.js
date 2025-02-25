// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Get the target section ID
        const targetSection = document.getElementById(targetId); // Get the section by ID
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - (window.innerHeight / 2) + (targetSection.clientHeight / 2), // Adjust scrolling for smooth centering
                behavior: 'smooth' // Smooth scroll effect
            });
        }
    });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show or hide the button when scrolling
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block"; // Show button
    } else {
        scrollToTopBtn.style.display = "none"; // Hide button
    }
};

// Scroll to top when clicked
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
// Function to toggle the navigation menu on mobile
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    const toggleButton = document.querySelector('.menu-toggle');

    // Toggle the display of the menu
    menu.classList.toggle('show');  // Show or hide the menu
    toggleButton.classList.toggle('active');  // Change the hamburger icon to "X"
}


