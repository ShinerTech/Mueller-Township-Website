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
    // Basic check for exact match or current directory match
    if (link.getAttribute('href') === currentPath || 
        (currentPath !== '/' && link.getAttribute('href').includes(currentPath.split('/')[1]))) {
      link.classList.add('active');
    }
  });
});
