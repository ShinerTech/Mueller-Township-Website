/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
      mainNav.classList.toggle('show');
      const icon = this.querySelector('i');
      if (mainNav.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Initialize Swiper (if present on page)
  const swiperElement = document.querySelector('.swiper-container');
  if (swiperElement && typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // Set active link based on current URL
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Normalize paths for comparison
    const normalizedCurrentPath = currentPath.replace(/\/$/, '');
    const normalizedHref = href.replace(/\/$/, '');
    
    // Exact match for active page
    if (normalizedHref === normalizedCurrentPath) {
      link.classList.add('active');
    }
    // Special case: homepage should match both '/' and '/index.htm'
    else if (normalizedCurrentPath === '/index.htm' && normalizedHref === '/') {
      link.classList.add('active');
    }
    // Special case: homepage should match '/index.htm' exactly
    else if (normalizedCurrentPath === '/index.htm' && normalizedHref === '/index.htm') {
      link.classList.add('active');
    }
  });
});
