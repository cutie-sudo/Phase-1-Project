// Smooth scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation toggle functionality
const navToggler = document.querySelectorAll('[data-nav-toggler]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

navToggler.forEach(toggler => {
    toggler.addEventListener('click', () => {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
});

// Close navigation when clicking outside
overlay.addEventListener('click', () => {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
});

// Form submission handler for newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    const emailInput = this.querySelector('.email-field').value;
    
    // Here you could send the email to your server
    console.log(`Email submitted: ${emailInput}`);
    
    // Clear input field after submission
    this.reset();
    alert('Thank you for subscribing!');
});

// Back to Top button functionality
const backTopBtn = document.querySelector('[data-back-top-btn]');
backTopBtn.addEventListener('click', scrollToTop);

// Show/hide the Back to Top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backTopBtn.classList.add('active');
    } else {
        backTopBtn.classList.remove('active');
    }
});

fetch('db.json')
  .then(response => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    console.log(data); // Handle the JSON data
    // For example, access vehicles: data.vehicles
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  fetch('db.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.vehicles); // Access the vehicles array
    // You can now work with the vehicles array
  });
