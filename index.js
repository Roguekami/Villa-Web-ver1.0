// Preloader Script
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("mainContent");

  // Add a minimum loading time of 2 seconds for better UX
  setTimeout(function () {
    preloader.classList.add("fade-out");
    mainContent.classList.add("show");

    // Remove preloader from DOM after transition
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500);
  }, 2000);
});

// Accordion behavior for collapse elements
document.addEventListener("DOMContentLoaded", function () {
  // Get all collapse buttons
  const collapseButtons = document.querySelectorAll(
    '[data-bs-toggle="collapse"]'
  );

  // Get all collapse elements
  const collapseElements = document.querySelectorAll(".collapse");

  collapseButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Small delay to let Bootstrap handle the click first
      setTimeout(() => {
        // Get the target collapse element
        const targetId =
          this.getAttribute("data-bs-target") || this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        // Close all other collapse elements
        collapseElements.forEach((collapse) => {
          if (
            collapse !== targetElement &&
            collapse.classList.contains("show")
          ) {
            const bsCollapse = new bootstrap.Collapse(collapse, {
              toggle: false,
            });
            bsCollapse.hide();
          }
        });
      }, 10);
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('playButton');
  const videoFrame = document.getElementById('videoFrame');
  const videoIframe = document.getElementById('videoIframe');
  
  playButton.addEventListener('click', function() {
    // Add playing class to hide image and play button
    videoFrame.classList.add('playing');
    
    // Show and play the video
    videoIframe.style.display = 'block';
    
    // Optional: Add click outside to close functionality
    document.addEventListener('click', function closeVideo(e) {
      if (!videoFrame.contains(e.target)) {
        videoFrame.classList.remove('playing');
        videoIframe.style.display = 'none';
        // Reset iframe src to stop video
        const src = videoIframe.src;
        videoIframe.src = src.replace('&autoplay=1', '');
        document.removeEventListener('click', closeVideo);
      }
    });
  });
  
  // Alternative: Click on video frame itself to play
  videoFrame.addEventListener('click', function(e) {
    if (!videoFrame.classList.contains('playing')) {
      videoFrame.classList.add('playing');
      videoIframe.style.display = 'block';
    }
  });
});





function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = endValue; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for triggering animation when in view
function initCounters() {
    const counters = document.querySelectorAll('.count-number');
    const options = {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-to'));
                const animationSpeed = parseInt(element.getAttribute('data-speed')) || 2000;
                
                // Mark as animated to prevent re-animation
                element.classList.add('animated');
                
                // Start animation
                animateCounter(element, 0, targetValue, animationSpeed);
                
                // Stop observing this element
                observer.unobserve(element);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        initCounters();
    } else {
        const counters = document.querySelectorAll('.count-number');
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-to'));
            const animationSpeed = parseInt(counter.getAttribute('data-speed')) || 2000;
            animateCounter(counter, 0, targetValue, animationSpeed);
        });
    }
});

function triggerCounters() {
    const counters = document.querySelectorAll('.count-number:not(.animated)');
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-to'));
        const animationSpeed = parseInt(counter.getAttribute('data-speed')) || 2000;
        counter.classList.add('animated');
        animateCounter(counter, 0, targetValue, animationSpeed);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const topNav = document.getElementById("topNav");
  const mainNav = document.getElementById("mainNav");
  let lastScrollY = 0;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      // Any scroll past 100px - hide top nav, move main nav up
      topNav.classList.add("hide");
      mainNav.classList.add("move-up");
    } else {
      // At top of page - show both navs
      topNav.classList.remove("hide");
      mainNav.classList.remove("move-up");
    }

    lastScrollY = currentScrollY;
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (
      navbarCollapse &&
      navbarCollapse.classList.contains("show") &&
      !navbarCollapse.contains(event.target) &&
      !navbarToggler.contains(event.target)
    ) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  });

  // Close mobile menu when clicking on a nav link
  document
    .querySelectorAll(".navbar-nav .nav-link")
    .forEach(function (navLink) {
      navLink.addEventListener("click", function () {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });
});