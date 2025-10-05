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
});

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



