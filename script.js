// Mobile Menu Toggle
document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('active');
  document.getElementById('nav-links').classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

function closeMenu() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('nav-links').classList.remove('active');
  document.body.classList.remove('no-scroll');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      closeMenu();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

// Scroll to top functionality
const scrollTopIcon = document.getElementById('scrollToTopIcon');
scrollTopIcon.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 300) {
    scrollTopIcon.style.display = 'flex';
    setTimeout(() => {
      scrollTopIcon.style.opacity = '1';
    }, 10);
  } else {
    scrollTopIcon.style.opacity = '0';
    setTimeout(() => {
      if (window.pageYOffset <= 300) {
        scrollTopIcon.style.display = 'none';
      }
    }, 300);
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (window.pageYOffset > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
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

// Updated Enquire Now to trigger login modal
document.querySelectorAll('.enquire-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const modal = document.getElementById('loginModal');
    const closeBtn = modal.querySelector('.close');

    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);

    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeBtn.click();
      }
    });
  });
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