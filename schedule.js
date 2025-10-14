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
  
