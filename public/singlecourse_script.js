document.addEventListener('DOMContentLoaded', function () {
  /* ===========================
     HEADER MOBILE NAVIGATION
  ============================ */
  const mobileNavToggle = document.querySelector('.header-scope .header-scope-mobile-nav-toggle');
  const navMenu = document.querySelector('.header-scope .header-scope-nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileNavToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  /* ===========================
     FIXED BANNER SCROLL BEHAVIOR
  ============================ */
  const banner = document.querySelector('.banner-scope-fixed-banner-container');
  let lastScroll = 0;

  if (banner) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      // Hide banner as you scroll down past its height
      if (currentScroll > window.innerHeight * 0.45) {
        banner.style.position = 'absolute';
        banner.style.top = `${window.innerHeight * 0.45 + currentScroll - (window.innerHeight * 0.45)}px`;
      } else {
        banner.style.position = 'fixed';
        banner.style.top = 'var(--header-height)';
      }
      lastScroll = currentScroll;
    });
  }

  /* ===========================
     BANNER "VIEW ALL" BUTTON
  ============================ */
  const viewBtn = document.querySelector('.banner-scope .banner-scope-view-all-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('"View Art Works" button clicked!');
    });
  }

  /* ===========================
     ACADEMIC COURSES BUTTONS
  ============================ */
  const allButtons = document.querySelectorAll('.art-scope .btn');
  if (allButtons.length > 0) {
    allButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Button clicked: "${event.target.textContent}"`);
      });
    });
  }

  /* ===========================
     VMV SECTION ANIMATIONS
  ============================ */
  const vmvCards = document.querySelectorAll('.vmv-scope .vmv-card');
  if (vmvCards.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    vmvCards.forEach((card) => observer.observe(card));
  }

  /* ===========================
     UPCOMING BATCH BUTTONS
  ============================ */
  const enrollButtons = document.querySelectorAll('.batch-scope .btn-enroll');
  if (enrollButtons.length > 0) {
    enrollButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const cardTitle = button.closest('.batch-card').querySelector('h3').textContent;
        console.log(`"Enroll Now" button clicked for: ${cardTitle}`);
      });
    });
  }
});


/* ===========================
   COURSE CURRICULUM TOGGLE
============================ */

   document.addEventListener('DOMContentLoaded', () => {
            
      // --- Intersection Observer for Scroll Animation ---
      
      // Select all the cards
      const cards = document.querySelectorAll('.cc-courses-card');

      // Set up the observer options
      const observerOptions = {
          root: null, // observes intersections relative to the viewport
          rootMargin: '0px',
          threshold: 0.2 // trigger when 20% of the item is visible
      };

      // Create the observer
      const cardObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // If the card is in view, add the 'visible' class
                  entry.target.classList.add('cc-courses-card--visible');
                  // Stop observing this card once it's visible
                  observer.unobserve(entry.target);
              }
          });
      }, observerOptions);

      // Observe each card
      cards.forEach(card => {
          cardObserver.observe(card);
      });


      // --- Modal Functionality ---
      
      const modalOverlay = document.getElementById('cc-course-modal');
      const modalCloseBtn = document.getElementById('cc-modal-close-btn');
      const learnMoreBtns = document.querySelectorAll('.cc-courses-button');

      const modalTitle = document.getElementById('cc-modal-title');
      const modalPrice = document.getElementById('cc-modal-price');
      const modalDetails = document.getElementById('cc-modal-details');

      // Function to open the modal
      const openModal = (e) => {
          // Find the parent card content
          const cardContent = e.target.closest('.cc-courses-content');
          
          // Get the data from the card
          const title = cardContent.querySelector('.cc-courses-title').innerText;
          const price = cardContent.querySelector('.cc-courses-price').innerText;
          const details = cardContent.querySelector('.cc-courses-details').innerHTML; // Get HTML to keep line breaks

          // Populate the modal
          modalTitle.innerText = title;
          modalPrice.innerText = price;
          modalDetails.innerHTML = details;
          
          // Show the modal
          modalOverlay.classList.add('cc-modal-overlay--visible');
      };

      // Function to close the modal
      const closeModal = () => {
          modalOverlay.classList.remove('cc-modal-overlay--visible');
      };

      // Add event listeners
      learnMoreBtns.forEach(btn => {
          btn.addEventListener('click', openModal);
      });

      modalCloseBtn.addEventListener('click', closeModal);
      
      // Also close modal if overlay is clicked
      modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
              closeModal();
          }
      });

  });

  
/* ===========================
   CONTACT SECTION
============================ */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Simple "Fade in on Scroll" Animation
     * Uses IntersectionObserver for good performance.
     */
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to "fade-in"
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Find all elements with the "fade-in" class and observe them
    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach(el => {
        observer.observe(el);
    });


    /**
     * Form Submission Handler
     * Prevents the page from reloading and shows a confirmation.
     */
    const contactForm = document.getElementById('contact-page__form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent the default form submission (which reloads the page)
            event.preventDefault();

            // Show a simple confirmation message
            alert('Thank you for your message! We will be in touch soon.');

            // Clear the form fields
            contactForm.reset();
        });
    }

});

/* =========================== gallery section ============================ */
// script.js
const items = document.querySelectorAll('.cad-gallery-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
});

items.forEach(item => {
  item.style.animationPlayState = 'paused';
  observer.observe(item);
});


/* ===========================
   SINGLE COURSE
============================ */

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    
    // Get all the elements we need to work with
    const toggleBtn = document.getElementById("single-course-toggle-btn");
    const dots = document.getElementById("single-course-dots");
    const moreText = document.getElementById("single-course-more-text");

    // Check if all elements actually exist before adding a listener
    if (toggleBtn && dots && moreText) {
        
        toggleBtn.addEventListener("click", function() {
            // Check if the extra text is currently hidden
            if (dots.style.display === "none") {
                // If it's visible, hide it
                dots.style.display = "inline";
                moreText.style.display = "none";
                toggleBtn.textContent = "Read More";
            } else {
                // If it's hidden, show it
                dots.style.display = "none";
                moreText.style.display = "inline";
                toggleBtn.textContent = "Read Less";
            }
        });

    } else {
        // Log an error if elements are missing, makes debugging easier
        console.error("Could not find all 'single-course' elements for the Read More toggle.");
    }
});