
'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    const navbarPlaceholder = document.querySelector('.navbar-placeholder');
    let headerHeight = header.offsetHeight;

    window.addEventListener('resize', function () {
        headerHeight = header.offsetHeight;
        if (header.classList.contains('sticky')) {
            navbarPlaceholder.style.height = `${headerHeight}px`;
        }
    });

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY > headerHeight) {
            header.classList.add('sticky');
            navbarPlaceholder.classList.add('sticky');
            navbarPlaceholder.style.height = `${headerHeight}px`;
        } else {
            header.classList.remove('sticky');
            navbarPlaceholder.classList.remove('sticky');
            navbarPlaceholder.style.height = '0';
        }
    });

    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');
                document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                    item.classList.remove('active');
                });
                if (!isActive) {
                    parent.classList.add('active');
                }
            }
        });
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-box h3');
  const speed = 200; // Animation speed

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

  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const section = document.querySelector('.counter-section');
    if (section) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect(); // Run animation only once
          }
        },
        { threshold: 0.1 } // Lowered threshold for mobile
      );
      observer.observe(section);
    } else {
      // Fallback if section is not found
      animateCounters();
    }
  } else {
    // Fallback for browsers without IntersectionObserver
    setTimeout(animateCounters, 1000); // Trigger after 1 second
  }
});

    // ----testimonial----
    let testimonialCurrentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalTestimonialSlides = Math.ceil(testimonialSlides.length / 3); // Adjust for 3 slides per view

function moveTestimonialSlide(direction) {
  testimonialCurrentSlide += direction;
  if (testimonialCurrentSlide >= totalTestimonialSlides) testimonialCurrentSlide = 0;
  if (testimonialCurrentSlide < 0) testimonialCurrentSlide = totalTestimonialSlides - 1;
  document.querySelector('.testimonial-slider').style.transform = `translateX(-${testimonialCurrentSlide * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveTestimonialSlide(1), 5000);



// .............sliding images..................

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider img");
  let current = 0;
  const total = slides.length;

  // Add 'active' class to the first image
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slides[current].classList.add("active");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % total;
    slides[current].classList.add("active");
  }, 4000);
});

// JavaScript to trigger animations on scroll
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.animate').forEach(el => {
                            el.classList.add('animate');
                        });
                        entry.target.querySelector('.contact-left').classList.add('slide-in-left');
                        entry.target.querySelector('.contact-right').classList.add('slide-in-right');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(document.querySelector('#contact'));
        });

        document.addEventListener('mousemove', function(e) {
    const footer = document.querySelector('.footer-parallax-bg');
    const rect = footer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (mouseX - centerX) / centerX * 10;
    const moveY = (mouseY - centerY) / centerY * 10;
    footer.style.transform = `translate(${moveX}px, ${moveY}px)`;
});   