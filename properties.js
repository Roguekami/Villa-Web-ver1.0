document.addEventListener("DOMContentLoaded", function () {
  const filterLinks = document.querySelectorAll(
    ".property-nav-pills .nav-link"
  );
  const propertyCards = document.querySelectorAll(".property-card");
  const resultCount = document.getElementById("resultCount");
  const propertiesGrid = document.getElementById("propertiesGrid");

  // Function to update results counter
  function updateResultsCounter(count) {
    resultCount.textContent = count;
  }

  // Function to filter properties
  function filterProperties(category) {
    let visibleCount = 0;

    propertyCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        // Show card
        card.classList.remove("hiding");
        card.classList.add("showing");
        setTimeout(() => {
          card.style.display = "block";
        }, 50);
        visibleCount++;
      } else {
        // Hide card
        card.classList.add("hiding");
        card.classList.remove("showing");
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });

    // Update counter after animation
    setTimeout(() => {
      updateResultsCounter(visibleCount);
    }, 350);
  }

  // Function to update active nav link
  function updateActiveNavLink(activeLink) {
    filterLinks.forEach((link) => {
      link.classList.remove("active");
    });
    activeLink.classList.add("active");
  }

  // Add click event listeners to filter links
  filterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const filter = this.getAttribute("data-filter");

      // Update active state
      updateActiveNavLink(this);

      // Add loading state briefly for better UX
      propertiesGrid.style.opacity = "0.7";

      setTimeout(() => {
        // Filter properties
        filterProperties(filter);

        // Remove loading state
        propertiesGrid.style.opacity = "1";
      }, 100);
    });
  });

  // Initialize with "Show All" active
  filterProperties("all");

  // Add smooth scrolling to property cards
  propertyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("hiding")) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Add keyboard navigation support
  filterLinks.forEach((link, index) => {
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (index + 1) % filterLinks.length;
        filterLinks[nextIndex].focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = index === 0 ? filterLinks.length - 1 : index - 1;
        filterLinks[prevIndex].focus();
      }
    });
  });
});

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("hiding")) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all property cards
document.querySelectorAll(".property-card").forEach((card) => {
  observer.observe(card);
});

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


