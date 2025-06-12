document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelectorAll('.nav-links li a');

  // Toggle mobile menu
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    navbar.classList.toggle('menu-open'); // Optional: add special class when menu is open
  });

  // Close menu when a nav link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navbar.classList.remove('menu-open');
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Close menu when scrolling (optional)
    if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      navbar.classList.remove('menu-open');
    }
  });

  // Initial check for scroll position
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
  const brochureBtn = document.getElementById('brochureBtn');
  const modal = document.getElementById('loginModal');
  const closeBtn = modal.querySelector('.close');

  // Open modal when brochure button is clicked
  brochureBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  });

  // Close modal on close icon click
  closeBtn.addEventListener('click', function () {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }, 300);
  });

  // Close modal when clicking outside the modal content
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('#username').value;
    const phone = this.querySelector('#password').value;

    if (!email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('Thank you! The brochure will be sent to your email shortly.');
      loginForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      closeBtn.click();
    }, 1500);
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const phone = this.querySelector('#phone').value.trim();
    const message = this.querySelector('#message').value.trim();

    if (!name || !email || !phone || !message) {
      alert('Please fill in all required fields');
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('Thank you for your message! Our team will contact you shortly.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
});

// Image Slider Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // Initialize slider
    function showSlide(index) {
      if (index >= totalSlides) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = totalSlides - 1;
      } else {
        currentSlide = index;
      }
      
      const sliderContainer = document.getElementById('sliderContainer');
      sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
    
    // Next button
    document.getElementById('nextBtn').addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
    
    // Previous button
    document.getElementById('prevBtn').addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
    
    // Dot navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
      });
    });
    
    // Auto slide change
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);

document.addEventListener('DOMContentLoaded', function() {
  // Get all floor plan cards
  const floorPlanCards = document.querySelectorAll('.floor-plan-card');
  
  // Add event listeners to each card
  floorPlanCards.forEach(card => {
    const enquireBtn = card.querySelector('.enquire-btn');
    const cardImg = card.querySelector('img');
    
    // Show/hide enquire button on hover
    card.addEventListener('mouseenter', function() {
      enquireBtn.style.opacity = '1';
      enquireBtn.style.transform = 'translateY(0) translateX(-50%)';
      cardImg.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      enquireBtn.style.opacity = '0';
      enquireBtn.style.transform = 'translateY(20px) translateX(-50%)';
      cardImg.style.transform = 'scale(1)';
    });
    
    // Enquire button click handler
    enquireBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const planTitle = card.querySelector('h3').textContent;
      showEnquiryModal(planTitle);
    });
  });
  
  // Mobile touch support
  if ('ontouchstart' in window) {
    floorPlanCards.forEach(card => {
      const enquireBtn = card.querySelector('.enquire-btn');
      enquireBtn.style.opacity = '1';
      enquireBtn.style.transform = 'none';
    });
  }
  
  // Show enquiry modal function
  function showEnquiryModal(planTitle) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'enquiry-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'enquiry-modal';
    modal.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      position: relative;
    `;
    
    modal.innerHTML = `
      <h3>Enquire About ${planTitle}</h3>
      <form id="enquiry-form">
        <div class="form-group">
          <input type="text" placeholder="Your Name" required>
        </div>
        <div class="form-group">
          <input type="email" placeholder="Your Email" required>
        </div>
        <div class="form-group">
          <input type="tel" placeholder="Your Phone Number">
        </div>
        <div class="form-group">
          <textarea placeholder="Your Message"></textarea>
        </div>
        <button type="submit" class="submit-btn">Submit Enquiry</button>
      </form>
      <button class="close-modal">&times;</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      background: none;
      border: none;
      cursor: pointer;
    `;
    
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(overlay);
      document.body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      }
    });
    
    // Form submission handler
    const form = modal.querySelector('#enquiry-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically send the form data to your server
      alert(`Thank you for your enquiry about ${planTitle}! We'll contact you soon.`);
      document.body.removeChild(overlay);
      document.body.style.overflow = 'auto';
    });
  }
});

// Hover effect on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px)';
    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--box-shadow)';
  });
});
 const imageContainer = document.getElementById('imageContainer');
        const blurOverlay = document.getElementById('blurOverlay');
        const loginForm = document.getElementById('loginForm');
        
        imageContainer.addEventListener('click', function() {
            blurOverlay.classList.add('hidden');
            loginForm.style.display = 'block';
        });
        
  
        