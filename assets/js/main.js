

'use strict';

// Mobile sidebar dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    const navbarPlaceholder = document.querySelector('.navbar-placeholder');
    let headerHeight = header ? header.offsetHeight : 0;

    // Handle resize
    window.addEventListener('resize', function () {
        headerHeight = header ? header.offsetHeight : 0;
        if (header && header.classList.contains('sticky')) {
            navbarPlaceholder.style.height = headerHeight + 'px';
        }
    });

    // Handle scroll
    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;
        
        if (header && navbarPlaceholder) {
            if (currentScrollY > headerHeight) {
                header.classList.add('sticky');
                navbarPlaceholder.classList.add('sticky');
                navbarPlaceholder.style.height = headerHeight + 'px';
            } else {
                header.classList.remove('sticky');
                navbarPlaceholder.classList.remove('sticky');
                navbarPlaceholder.style.height = '0';
            }
        }
    });

    // Mobile nav elements
    const navbarCollapse = document.getElementById('navbarContent');
    const navbarBackdrop = document.querySelector('.navbar-backdrop');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarClose = document.querySelector('.navbar-close');
    
    // Only run mobile nav code if elements exist
    if (navbarCollapse && navbarBackdrop) {
        function openNavbar() {
            navbarCollapse.classList.add('show');
            navbarBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        function closeNavbar() {
            navbarCollapse.classList.remove('show');
            navbarBackdrop.classList.remove('show');
            document.body.style.overflow = '';
            
            // Close all dropdowns when closing navbar
            document.querySelectorAll('.dropdown-menu-custom').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.nav-item.dropdown-hover').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
        
        // Toggle button click
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (navbarCollapse.classList.contains('show')) {
                    closeNavbar();
                } else {
                    openNavbar();
                }
            });
        }
        
        // Close button
        if (navbarClose) {
            navbarClose.addEventListener('click', function(e) {
                e.preventDefault();
                closeNavbar();
            });
        }
        
        // Backdrop click
        if (navbarBackdrop) {
            navbarBackdrop.addEventListener('click', function(e) {
                e.preventDefault();
                closeNavbar();
            });
        }
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                closeNavbar();
            }
        });
        
        // ===============================================
        // SIDEBAR DROPDOWN TOGGLE - Pure JavaScript
        // ===============================================
        
        // Target all dropdown toggles within the sidebar
        const dropdownToggles = document.querySelectorAll('.sidebar-nav .dropdown-toggle, .sidebar-nav .nav-item.dropdown-hover > .nav-link');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const isMobileView = window.innerWidth < 992;
                const isSidebarOpen = navbarCollapse.classList.contains('show');
                if (href === '#' || isMobileView || isSidebarOpen) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }

                // Only handle if sidebar is open (mobile sidebar mode)
                if (isSidebarOpen || isMobileView) {
                    // Find parent dropdown item
                    const parentDropdown = this.closest('.nav-item.dropdown-hover') || this.closest('.nav-item.dropdown');
                    if (!parentDropdown) return;

                    const dropdownMenu = parentDropdown.querySelector('.dropdown-menu-custom');
                    const isActive = parentDropdown.classList.contains('active');

                    // Close all other dropdowns first
                    document.querySelectorAll('.sidebar-nav .nav-item.dropdown-hover, .sidebar-nav .nav-item.dropdown').forEach(item => {
                        if (item !== parentDropdown) {
                            item.classList.remove('active');
                            const menu = item.querySelector('.dropdown-menu-custom');
                            if (menu) menu.classList.remove('show');
                        }
                        const otherToggle = item.querySelector('.dropdown-toggle, .nav-link.dropdown-toggle');
                        if (otherToggle) {
                            otherToggle.classList.remove('active');
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Toggle current dropdown
                    if (!isActive) {
                        parentDropdown.classList.add('active');
                        if (dropdownMenu) dropdownMenu.classList.add('show');
                        this.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    } else {
                        parentDropdown.classList.remove('active');
                        if (dropdownMenu) dropdownMenu.classList.remove('show');
                        this.classList.remove('active');
                        this.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
        
        // Click on regular nav links should close navbar
        const navLinks = document.querySelectorAll('.sidebar-nav .navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if it's NOT a dropdown toggle
                if (!this.classList.contains('dropdown-toggle') && 
                    !this.closest('.nav-item.dropdown') &&
                    window.innerWidth < 992) {
                    // Small delay to allow navigation
                    setTimeout(() => {
                        closeNavbar();
                    }, 100);
                }
            });
        });

        // Click on dropdown items should close navbar and navigate
        const dropdownItems = document.querySelectorAll('.sidebar-nav .dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // Close navbar but allow navigation
                if (window.innerWidth < 992 && href && href !== '#') {
                    setTimeout(() => {
                        closeNavbar();
                    }, 100);
                }
            });
        });
        
        // ===============================================
        // DESKTOP HOVER SUPPORT (Optional)
        // ===============================================
        
        // Enable hover on desktop only
        if (window.innerWidth >= 992) {
            const dropdownItems = document.querySelectorAll('.sidebar-nav .nav-item.dropdown-hover');
            
            dropdownItems.forEach(item => {
                const toggle = item.querySelector('.dropdown-toggle, .nav-link');
                const menu = item.querySelector('.dropdown-menu-custom');
                
                if (toggle && menu) {
                    // Mouse enter - show dropdown
                    item.addEventListener('mouseenter', function() {
                        if (window.innerWidth >= 992) {
                            item.classList.add('active');
                            menu.classList.add('show');
                            toggle.classList.add('active');
                            toggle.setAttribute('aria-expanded', 'true');
                        }
                    });
                    
                    // Mouse leave - hide dropdown
                    item.addEventListener('mouseleave', function() {
                        if (window.innerWidth >= 992) {
                            item.classList.remove('active');
                            menu.classList.remove('show');
                            toggle.classList.remove('active');
                            toggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
            });
        }
    }
});

// ===============================================
// COUNTER ANIMATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-box h3');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  if ('IntersectionObserver' in window) {
    const section = document.querySelector('.counter-section');
    if (section) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    } else {
      animateCounters();
    }
  } else {
    setTimeout(animateCounters, 1000);
  }
});

// ===============================================
// TESTIMONIAL SLIDER
// ===============================================

let testimonialCurrentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

if (testimonialSlides.length > 0) {
  const totalTestimonialSlides = Math.ceil(testimonialSlides.length / 3);

  function moveTestimonialSlide(direction) {
    testimonialCurrentSlide += direction;
    if (testimonialCurrentSlide >= totalTestimonialSlides) testimonialCurrentSlide = 0;
    if (testimonialCurrentSlide < 0) testimonialCurrentSlide = totalTestimonialSlides - 1;
    
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
      slider.style.transform = `translateX(-${testimonialCurrentSlide * 100}%)`;
    }
  }

  setInterval(() => moveTestimonialSlide(1), 5000);
}

// ===============================================
// SLIDING IMAGES
// ===============================================

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider img");
  
  if (slides.length > 0) {
    let current = 0;
    const total = slides.length;

    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[current].classList.add("active");

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % total;
      slides[current].classList.add("active");
    }, 4000);
  }
});

// ===============================================
// SCROLL ANIMATIONS
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animates = entry.target.querySelectorAll('.animate');
                    animates.forEach(el => el.classList.add('animate'));
                    
                    const contactLeft = entry.target.querySelector('.contact-left');
                    const contactRight = entry.target.querySelector('.contact-right');
                    
                    if (contactLeft) contactLeft.classList.add('slide-in-left');
                    if (contactRight) contactRight.classList.add('slide-in-right');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(contactSection);
    }
});

// ===============================================
// FOOTER PARALLAX EFFECT
// ===============================================

document.addEventListener('mousemove', function(e) {
    const footer = document.querySelector('.footer-parallax-bg');
    if (footer) {
        const rect = footer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (mouseX - centerX) / centerX * 10;
        const moveY = (mouseY - centerY) / centerY * 10;
        footer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ===============================================
// PREVENT PAGE JUMP ON HREF="#"
// ===============================================

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

/* =====================================================
   WHY BOOTSTRAP COLLAPSE CONFLICTS WITH DROPDOWN:
   
   1. Bootstrap's collapse plugin uses the same trigger elements 
      (data-bs-toggle="collapse") for both collapse and dropdown.
   
   2. When you have data-bs-toggle="dropdown" on an element inside
      a collapse container, Bootstrap may interpret the click as
      a collapse trigger instead of a dropdown trigger.
   
   3. The navbar-collapse uses JavaScript to toggle the show class,
      but your dropdown also needs to toggle classes independently.
   
   4. SOLUTION: We used pure JavaScript to handle the dropdown 
      separately from Bootstrap's collapse, with proper event 
      propagation control (stopPropagation) to prevent conflicts.
   
   5. By using .closest() to find parent elements and controlling
      event flow, we ensure dropdown toggles work without triggering
      the navbar collapse behavior.
   ===================================================== */

// ===============================================
// TOP PERFORMERS CAROUSEL FUNCTIONALITY - REMOVED
// Now using smooth marquee for both IIT and NEET sections
// ===============================================


