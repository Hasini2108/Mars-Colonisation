// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Header scroll effect
    function handleScroll() {
      if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
        header.classList.remove('header-transparent');
      } else {
        header.classList.remove('header-scrolled');
        header.classList.add('header-transparent');
      }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
      mobileNav.classList.toggle('active');
      
      // Update aria-expanded attribute
      const isExpanded = mobileNav.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      
      // Update button text for screen readers
      const icon = mobileMenuBtn.querySelector('i');
      if (isExpanded) {
        icon.className = 'fas fa-times';
        mobileMenuBtn.setAttribute('aria-label', 'Close menu');
      } else {
        icon.className = 'fas fa-bars';
        mobileMenuBtn.setAttribute('aria-label', 'Open menu');
      }
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Initialize header state
    handleScroll();
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
      });
    });
  });