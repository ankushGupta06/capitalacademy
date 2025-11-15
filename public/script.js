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
  if (banner) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > window.innerHeight * 0.45) {
        banner.style.position = 'absolute';
        banner.style.top = `${currentScroll}px`;
      } else {
        banner.style.position = 'fixed';
        banner.style.top = 'var(--header-height)';
      }
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
  allButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(`Button clicked: "${event.target.textContent}"`);
    });
  });

  /* ===========================
     VMV SECTION ANIMATIONS
  ============================ */
  const vmvCards = document.querySelectorAll('.vmv-scope .vmv-card');
  if (vmvCards.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    vmvCards.forEach(card => observer.observe(card));
  }

  /* ===========================
     UPCOMING BATCH BUTTONS
  ============================ */
  const enrollButtons = document.querySelectorAll('.batch-scope .btn-enroll');
  enrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cardTitle = button.closest('.batch-card').querySelector('h3').textContent;
      console.log(`"Enroll Now" clicked for: ${cardTitle}`);
    });
  });

  /* ===========================
     COURSE CARDS ANIMATION
  ============================ */
  const courseCards = document.querySelectorAll('.cc-courses-card');

  if (courseCards.length > 0) {
    const courseObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cc-courses-card--visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    courseCards.forEach(card => courseObserver.observe(card));
  }

  /* ===========================
     COURSE CURRICULUM MODAL
  ============================ */
  // const modalOverlay = document.getElementById('cc-course-modal');
  // const modalCloseBtn = document.getElementById('cc-modal-close-btn');
  // const learnMoreBtns = document.querySelectorAll('.cc-courses-button');

  // const modalTitle = document.getElementById('cc-modal-title');
  // const modalPrice = document.getElementById('cc-modal-price');
  // const modalDetails = document.getElementById('cc-modal-details');

  // const openModal = (e) => {
  //   const cardContent = e.target.closest('.cc-courses-content');

  //   modalTitle.innerText = cardContent.querySelector('.cc-courses-title').innerText;
  //   modalPrice.innerText = cardContent.querySelector('.cc-courses-price').innerText;
  //   modalDetails.innerHTML = cardContent.querySelector('.cc-courses-details').innerHTML;

  //   modalOverlay.classList.add('cc-modal-overlay--visible');
  // };

  // const closeModal = () => {
  //   modalOverlay.classList.remove('cc-modal-overlay--visible');
  // };

  // learnMoreBtns.forEach(btn => btn.addEventListener('click', openModal));
  // if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // if (modalOverlay) {
  //   modalOverlay.addEventListener('click', (e) => {
  //     if (e.target === modalOverlay) closeModal();
  //   });
  // }

  /* ===========================
     CONTACT PAGE FORM SUBMIT
  ============================ */
  const contactForm = document.getElementById('contact-page__form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          alert('Thank you! We will contact you soon.');
          contactForm.reset();
        } else {
          alert('Something went wrong.');
        }
      } catch (error) {
        alert('Server error. Try again later.');
      }
    });
  }

/* ===========================
   CONTACT PAGE SCROLL REVEAL
============================ */
// document.addEventListener("DOMContentLoaded", () => {
//   const fadeElements = document.querySelectorAll(".fade-in");

//   const observer = new IntersectionObserver((entries, obs) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         obs.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.2 });

//   fadeElements.forEach(el => observer.observe(el));
// });



  /* ===========================
     GALLERY ANIMATE ON SCROLL
  ============================ */
  const galleryItems = document.querySelectorAll('.cad-gallery-item');
  if (galleryItems.length > 0) {
    const galleryObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    });

    galleryItems.forEach(item => {
      item.style.animationPlayState = 'paused';
      galleryObserver.observe(item);
    });
  }

  /* ===========================
     SINGLE COURSE "READ MORE"
  ============================ */
  const toggleBtn = document.getElementById("single-course-toggle-btn");
  const dots = document.getElementById("single-course-dots");
  const moreText = document.getElementById("single-course-more-text");

  if (toggleBtn && dots && moreText) {
    toggleBtn.addEventListener("click", function () {
      if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        toggleBtn.textContent = "Read More";
      } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        toggleBtn.textContent = "Read Less";
      }
    });
  }

}); // END DOMContentLoaded
