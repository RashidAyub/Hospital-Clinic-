/**
 * ============================================================================
 * PREMIUM HOSPITAL & CLINIC — GSAP SCROLL ANIMATIONS & COUNTERS
 * Powered by GSAP 3 & ScrollTrigger
 * ============================================================================
 */

(function () {
  'use strict';

  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded.');
    return;
  }

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // If reduced motion is requested, reveal all stat numbers immediately
    initCounterDirect();
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollTriggers();
    initStatsCounter();
  });

  // 1. Hero Entrance Timeline
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-content .section-tag', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2
    })
    .from('.hero-headline', {
      opacity: 0,
      y: 35,
      duration: 1,
      stagger: 0.15
    }, '-=0.5')
    .from('.hero-lead', {
      opacity: 0,
      y: 25,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-cta-group .btn', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.7
    }, '-=0.5')
    .from('.hero-trust-metrics', {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, '-=0.4')
    .from('.floating-telemetry-card', {
      opacity: 0,
      scale: 0.85,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6');
  }

  // 2. Section ScrollTriggers
  function initScrollTriggers() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Quick Action Bar
    gsap.from('.action-strip-card .action-item', {
      scrollTrigger: {
        trigger: '.quick-action-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });

    // About Section
    gsap.from('.about-main-img-wrap', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%'
      },
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.about-floating-experience', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%'
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 0.3,
      ease: 'back.out(1.5)'
    });

    gsap.from('.about-content > *', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Services Cards Stagger
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Technology Cards
    gsap.from('.tech-card', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Doctors Cards
    gsap.from('.doctor-card', {
      scrollTrigger: {
        trigger: '.doctors-grid',
        start: 'top 80%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Pricing Cards
    gsap.from('.pricing-card', {
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power2.out'
    });

    // Contact Panel & Form
    gsap.from('.contact-info-panel', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%'
      },
      opacity: 0,
      x: -30,
      duration: 0.9,
      ease: 'power2.out'
    });

    gsap.from('.booking-form-wrap', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%'
      },
      opacity: 0,
      x: 30,
      duration: 0.9,
      ease: 'power2.out'
    });
  }

  // 3. Animated Statistics Counters
  function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number');
    if (!statElements.length) return;

    let hasRun = false;

    const runCounters = () => {
      if (hasRun) return;
      hasRun = true;

      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = target === 50 ? 'K+' : (target === 99 ? '%' : '+');
        const duration = 2000;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.innerText = Math.floor(current) + suffix;
        }, stepTime);
      });
    };

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '.stats-strip',
        start: 'top 85%',
        onEnter: runCounters
      });
    } else {
      // Fallback Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounters();
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });

      const statsStrip = document.querySelector('.stats-strip');
      if (statsStrip) observer.observe(statsStrip);
    }
  }

  function initCounterDirect() {
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = target === 50 ? 'K+' : (target === 99 ? '%' : '+');
      el.innerText = target + suffix;
    });
  }

})();
