/**
 * ============================================================================
 * PREMIUM HOSPITAL & CLINIC — MAIN APPLICATION SCRIPTS
 * Interactive UI, Navigation, Sliders, Form Validation, and Filters
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Sticky Header & Scrollspy
  initStickyHeader();

  // 2. Mobile Drawer Navigation
  initMobileNav();

  // 3. Department Service Filters
  initServiceFilters();

  // 4. Testimonial Carousel Slider
  initTestimonialSlider();

  // 5. FAQ Accordion
  initFaqAccordion();

  // 6. Interactive Appointment Booking Form
  initAppointmentForm();

  // 7. Doctor Quick-Book Triggers
  initDoctorBookingTriggers();

  // 8. Newsletter Subscription
  initNewsletterForm();
});

/* -------------------------------------------------------------------------
   1. STICKY HEADER & ACTIVE SCROLLSPY
   ------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow and backdrop transition
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scrollspy for active link
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* -------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const openBtn = document.getElementById('mobile-menu-open-btn');
  const closeBtn = document.getElementById('mobile-menu-close-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Close on outside click
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  // Close on link click
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* -------------------------------------------------------------------------
   3. DEPARTMENT SERVICE FILTERS
   ------------------------------------------------------------------------- */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Toggle active class
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   4. TESTIMONIAL CAROUSEL SLIDER
   ------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots-container');

  if (!slider || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    const dots = dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // Dots click
  dotsContainer?.addEventListener('click', (e) => {
    const dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    const index = parseInt(dot.getAttribute('data-index'), 10);
    if (!isNaN(index)) {
      currentIndex = index;
      updateSlider();
      resetAutoplay();
    }
  });

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  slider.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 40) {
      nextSlide();
      resetAutoplay();
    }
    if (touchEndX > touchStartX + 40) {
      prevSlide();
      resetAutoplay();
    }
  }

  startAutoplay();
}

/* -------------------------------------------------------------------------
   5. FAQ ACCORDION
   ------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   6. INTERACTIVE APPOINTMENT BOOKING FORM
   ------------------------------------------------------------------------- */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const toast = document.getElementById('form-toast-msg');
  const dateInput = document.getElementById('appointment-date');

  // Set minimum date to tomorrow
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', tomorrow);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('patient-name')?.value.trim();
    const phone = document.getElementById('patient-phone')?.value.trim();
    const email = document.getElementById('patient-email')?.value.trim();
    const dept = document.getElementById('appointment-dept')?.value;
    const date = document.getElementById('appointment-date')?.value;

    if (!name || !phone || !email || !dept || !date) {
      alert('Please fill in all required fields (Name, Phone, Email, Department, and Date).');
      return;
    }

    // Generate reference code
    const refCode = 'APX-' + Math.floor(100000 + Math.random() * 900000);

    if (toast) {
      toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <div><strong>Appointment Request Confirmed!</strong> (Ref: ${refCode})<br>Our patient concierge will contact ${email} within 15 minutes to verify your schedule.</div>`;
      toast.style.display = 'flex';
      toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();

    setTimeout(() => {
      if (toast) toast.style.display = 'none';
    }, 12000);
  });
}

/* -------------------------------------------------------------------------
   7. DOCTOR QUICK-BOOK TRIGGERS
   ------------------------------------------------------------------------- */
function initDoctorBookingTriggers() {
  const doctorBookButtons = document.querySelectorAll('.doctor-btn-book');
  const doctorSelect = document.getElementById('appointment-doctor');

  doctorBookButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.innerText.toLowerCase();
      if (doctorSelect) {
        if (text.includes('wright')) doctorSelect.value = 'dr-wright';
        else if (text.includes('elena') || text.includes('rostova')) doctorSelect.value = 'dr-rostova';
        else if (text.includes('marcus') || text.includes('vance')) doctorSelect.value = 'dr-vance';
        else if (text.includes('chen')) doctorSelect.value = 'dr-chen';
      }
    });
  });
}

/* -------------------------------------------------------------------------
   8. NEWSLETTER SUBSCRIPTION FORM
   ------------------------------------------------------------------------- */
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    if (input && input.value) {
      alert(`Thank you for subscribing! Medical updates will be sent to ${input.value}.`);
      newsletterForm.reset();
    }
  });
}
