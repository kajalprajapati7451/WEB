document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Property Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertiesGrid = document.getElementById('propertiesGrid');
    
    // Sample property data - in a real app, this would come from an API
    const properties = [
        {
            id: 1,
            title: 'Luxury Penthouse with Ocean View',
            location: 'Miami, FL',
            price: '$2,500,000',
            bedrooms: 3,
            bathrooms: 3.5,
            area: '2,800 sqft',
            type: 'apartment',
            image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 2,
            title: 'Modern Villa with Private Pool',
            location: 'Beverly Hills, CA',
            price: '$4,200,000',
            bedrooms: 5,
            bathrooms: 4,
            area: '4,500 sqft',
            type: 'villa',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 3,
            title: 'Charming Family Home in Suburbs',
            location: 'Austin, TX',
            price: '$850,000',
            bedrooms: 4,
            bathrooms: 2.5,
            area: '2,200 sqft',
            type: 'house',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 4,
            title: 'Downtown Loft with City Views',
            location: 'New York, NY',
            price: '$1,200,000',
            bedrooms: 2,
            bathrooms: 2,
            area: '1,800 sqft',
            type: 'apartment',
            image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 5,
            title: 'Luxury Office Space in Financial District',
            location: 'San Francisco, CA',
            price: '$3,500,000',
            bedrooms: 'N/A',
            bathrooms: 4,
            area: '5,000 sqft',
            type: 'commercial',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 6,
            title: 'Waterfront Mansion with Private Dock',
            location: 'Malibu, CA',
            price: '$8,750,000',
            bedrooms: 6,
            bathrooms: 7,
            area: '8,000 sqft',
            type: 'luxury',
            image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: true
        },
        {
            id: 7,
            title: 'Cozy Studio in Downtown',
            location: 'Chicago, IL',
            price: '$450,000',
            bedrooms: 1,
            bathrooms: 1,
            area: '600 sqft',
            type: 'apartment',
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: false
        },
        {
            id: 8,
            title: 'Historic Townhouse',
            location: 'Boston, MA',
            price: '$1,100,000',
            bedrooms: 3,
            bathrooms: 2.5,
            area: '2,400 sqft',
            type: 'house',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            featured: false
        }
    ];
    
    // Function to display properties
    function displayProperties(filter = 'all') {
        propertiesGrid.innerHTML = '';
        
        const filteredProperties = filter === 'all' 
            ? properties.filter(property => property.featured)
            : properties.filter(property => property.type === filter && property.featured);
        
        if (filteredProperties.length === 0) {
            propertiesGrid.innerHTML = '<p class="no-properties">No properties found matching your criteria.</p>';
            return;
        }
        
        filteredProperties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-badge">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</div>
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="property-price">${property.price}</div>
                    <div class="property-meta">
                        <div class="meta-item">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-vector-square"></i>
                            <span>${property.area}</span>
                        </div>
                    </div>
                    <button class="btn btn-outline view-details" data-id="${property.id}">View Details</button>
                </div>
            `;
            propertiesGrid.appendChild(propertyCard);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const propertyId = parseInt(this.getAttribute('data-id'));
                const property = properties.find(p => p.id === propertyId);
                showPropertyModal(property);
            });
        });
    }
    
    // Property Modal
    function showPropertyModal(property) {
        // Create modal HTML
        const modalHTML = `
            <div class="property-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-image">
                        <img src="${property.image.replace('300', '800')}" alt="${property.title}">
                    </div>
                    <div class="modal-body">
                        <h2>${property.title}</h2>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                        <div class="modal-price">${property.price}</div>
                        
                        <div class="modal-details">
                            <div class="detail-item">
                                <span>Type:</span>
                                <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                            </div>
                            <div class="detail-item">
                                <span>Bedrooms:</span>
                                <span>${property.bedrooms}</span>
                            </div>
                            <div class="detail-item">
                                <span>Bathrooms:</span>
                                <span>${property.bathrooms}</span>
                            </div>
                            <div class="detail-item">
                                <span>Area:</span>
                                <span>${property.area}</span>
                            </div>
                        </div>
                        
                        <p class="description">This beautiful property offers stunning views and premium amenities. 
                        Contact us today to schedule a viewing or to get more information about this listing.</p>
                        
                        <div class="modal-actions">
                            <button class="btn btn-primary schedule-viewing" data-id="${property.id}">
                                <i class="fas fa-calendar-alt"></i> Schedule Viewing
                            </button>
                            <button class="btn btn-outline contact-agent" data-id="${property.id}">
                                <i class="fas fa-envelope"></i> Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.classList.add('modal-open');
        
        // Add event listeners
        document.querySelector('.close-modal').addEventListener('click', closeModal);
        document.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        document.querySelector('.schedule-viewing').addEventListener('click', function() {
            const propertyId = parseInt(this.getAttribute('data-id'));
            showScheduleForm(propertyId);
        });
        
        document.querySelector('.contact-agent').addEventListener('click', function() {
            const propertyId = parseInt(this.getAttribute('data-id'));
            showContactForm(propertyId);
        });
    }
    
    function closeModal() {
        const modal = document.querySelector('.property-modal');
        if (modal) {
            modal.remove();
            document.body.classList.remove('modal-open');
        }
    }
    
    function showScheduleForm(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        
        const formHTML = `
            <div class="form-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <h2>Schedule a Viewing</h2>
                    <p>For: ${property.title}</p>
                    
                    <form id="scheduleForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input type="date" id="date" required>
                        </div>
                        <div class="form-group">
                            <label for="time">Preferred Time</label>
                            <input type="time" id="time" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Additional Notes</label>
                            <textarea id="message" rows="4"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Schedule Viewing</button>
                    </form>
                </div>
            </div>
        `;
        
        closeModal();
        document.body.insertAdjacentHTML('beforeend', formHTML);
        document.body.classList.add('modal-open');
        
        document.querySelector('.form-modal .close-modal').addEventListener('click', function() {
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
        
        document.querySelector('.form-modal .modal-overlay').addEventListener('click', function() {
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
        
        document.getElementById('scheduleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your viewing request has been submitted. An agent will contact you shortly to confirm.');
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
    }
    
    function showContactForm(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        
        const formHTML = `
            <div class="form-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <h2>Contact Agent</h2>
                    <p>About: ${property.title}</p>
                    
                    <form id="contactFormModal">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone">
                        </div>
                        <div class="form-group">
                            <label for="message">Your Message</label>
                            <textarea id="message" rows="4" required>I'm interested in the property at ${property.location} (${property.title}). Please send me more information.</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        `;
        
        closeModal();
        document.body.insertAdjacentHTML('beforeend', formHTML);
        document.body.classList.add('modal-open');
        
        document.querySelector('.form-modal .close-modal').addEventListener('click', function() {
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
        
        document.querySelector('.form-modal .modal-overlay').addEventListener('click', function() {
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
        
        document.getElementById('contactFormModal').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! An agent will contact you shortly.');
            document.querySelector('.form-modal').remove();
            document.body.classList.remove('modal-open');
        });
    }
    
    // Initialize with all featured properties
    displayProperties();
    
    // Filter properties when buttons are clicked
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter properties
            const filter = this.getAttribute('data-filter');
            displayProperties(filter);
        });
    });
    
    // View All Properties button
    document.querySelector('.view-all button').addEventListener('click', function() {
        // In a real app, this would load more properties or redirect to a full listings page
        alert('Loading all properties...');
        // For demo, just show all properties regardless of featured status
        propertiesGrid.innerHTML = '';
        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-badge">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</div>
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="property-price">${property.price}</div>
                    <div class="property-meta">
                        <div class="meta-item">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-vector-square"></i>
                            <span>${property.area}</span>
                        </div>
                    </div>
                    <button class="btn btn-outline view-details" data-id="${property.id}">View Details</button>
                </div>
            `;
            propertiesGrid.appendChild(propertyCard);
        });
        
        // Add event listeners to new view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const propertyId = parseInt(this.getAttribute('data-id'));
                const property = properties.find(p => p.id === propertyId);
                showPropertyModal(property);
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }
    
    function prevTestimonial() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    }
    
    prevBtn.addEventListener('click', function() {
        prevTestimonial();
        resetTestimonialInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextTestimonial();
        resetTestimonialInterval();
    });
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    // Initialize with first testimonial
    showTestimonial(0);
    startTestimonialInterval();
    
    // Light Gallery for image gallery
    if (document.querySelector('.gallery-grid')) {
        lightGallery(document.querySelector('.gallery-grid'), {
            selector: '.gallery-item',
            download: false,
            counter: false,
            getCaptionFromTitleOrAlt: false
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send this data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your newsletter service
            alert(`Thank you for subscribing with ${email}! You'll receive our latest property updates.`);
            this.reset();
        });
    }
    
    // Login/Register buttons (demo functionality)
    document.querySelector('.btn-outline').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Login form would appear here');
    });
    
    document.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Registration form would appear here');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Floating buttons toggle
    const floatingButtons = document.querySelector('.floating-buttons');
    
    if (floatingButtons) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                floatingButtons.style.display = 'flex';
            } else {
                floatingButtons.style.display = 'none';
            }
        });
        
        // Add click handlers for floating buttons
        document.querySelector('.call-btn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Calling our sales team...');
        });
        
        document.querySelector('.whatsapp-btn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening WhatsApp chat...');
        });
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            const formModal = document.querySelector('.form-modal');
            if (formModal) {
                formModal.remove();
                document.body.classList.remove('modal-open');
            }
        }
    });
})
    // Auth Popups Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const loginBtn = document.querySelector('.nav-buttons .btn-outline');
  const registerBtn = document.querySelector('.nav-buttons .btn-primary');
  const loginPopup = document.getElementById('loginPopup');
  const registerPopup = document.getElementById('registerPopup');
  const closeBtns = document.querySelectorAll('.close-btn');
  const switchForms = document.querySelectorAll('.switch-form');

  // Open Login Popup
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginPopup.classList.add('active');
  });

  // Open Register Popup
  registerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    registerPopup.classList.add('active');
  });

  // Close Popups
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      loginPopup.classList.remove('active');
      registerPopup.classList.remove('active');
    });
  });

  // Switch between forms
  switchForms.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');
      loginPopup.classList.remove('active');
      registerPopup.classList.remove('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Close when clicking outside
  [loginPopup, registerPopup].forEach(popup => {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
});
    // Floating buttons animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtns = document.querySelectorAll('.floating-btn');
    
    // Staggered animation
    floatingBtns.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.1}s`;
        
        // Hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(0)';
            this.style.opacity = '1';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-10px)';
            this.style.opacity = '0.9';
        });
    });
});
  document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.querySelector('.close-popup');
    
    // Click on image to show blur and button
    imageContainers.forEach(container => {
      container.addEventListener('click', function() {
        // Toggle active class for blur effect
        this.classList.toggle('active');
        
        // Only show popup if clicking the button
        if (!event.target.classList.contains('enquire-btn')) return;
        
        // Show login popup
        loginPopup.style.display = 'flex';
      });
    });
    
    // Close popup
    closePopup.addEventListener('click', function() {
      loginPopup.style.display = 'none';
    });
    
    // Close when clicking outside popup
    loginPopup.addEventListener('click', function(e) {
      if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
      }
    });
    
    // Form submission
    document.querySelector('.login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Login successful! Our team will contact you shortly.');
      loginPopup.style.display = 'none';
      
      // Reset all active image containers
      imageContainers.forEach(container => {
        container.classList.remove('active');
      });
    });
    
    // Enquire button click handlers
    document.querySelectorAll('.enquire-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the container click
        loginPopup.style.display = 'flex';
      });
    });
  });
  
