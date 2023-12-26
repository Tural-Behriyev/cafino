
(function () {
  ("use strict");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * search btn - menu btn
   */
  let searchBtnNav = document.querySelector("#search-btn-nav");
  let searchBtn = document.querySelector("#search-btn");
  let searchForm = document.querySelector(".header .search-form");

  searchBtn.onclick = () => {
    searchBtn.classList.toggle("fa-times");
    searchForm.classList.toggle("active");
    menuBtn.classList.remove("fa-times");
    navbar.classList.remove("active");
  };

  searchBtnNav.onclick = () => {
    searchBtn.classList.toggle("fa-times");
    searchForm.classList.toggle("active");
    menuBtn.classList.remove("fa-times");
    navbar.classList.remove("active");
  };

  let menuBtn = document.querySelector("#menu-btn");
  let navbar = document.querySelector(".header .navbar");

  menuBtn.onclick = () => {
    menuBtn.classList.toggle("fa-times");
    navbar.classList.toggle("active");
    searchBtn.classList.remove("fa-times");
    searchForm.classList.remove("active");
  };

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }



  /*----------------------
     Menu Carousel
 -----------------------*/

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 15,
    nav: true,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  });

  /**
   * Menu isotope and filter
   */
  window.addEventListener("load", () => {
    let menuContainer = select(".menu-container");
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: ".menu-item",
        layoutMode: "fitRows",
      });

      let menuFilters = select(".menu-flters div", true);

      on(
        "click",
        ".menu-flters div",
        function (e) {
          e.preventDefault();
          menuFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          menuIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          menuIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 5,
      },
    },
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Bloq slider
   */
  new Swiper(".bloq-slider", {
    speed: 600,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  new Swiper(".slides-3", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();



$(document).ready(function () {
  var scrollTop = 0;
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 100) {
      $("#header").addClass("scrolled-nav");
    } else if (scrollTop < 100) {
      $("#header").removeClass("scrolled-nav");
    }
  });
});





  /**
   * Back to top button
   */
  let mybutton = document.getElementById("myBtn");
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }



  // window.addEventListener("load", navbarlinksActive);
  // onscroll(document, navbarlinksActive);
  // const scrollto = (el) => {
  //   let header = select("#header");
  //   let offset = header.offsetHeight;
  //   let elementPos = select(el).offsetTop;
  //   window.scrollTo({
  //     top: elementPos - offset,
  //     behavior: "smooth",
  //   });
  // };

    /**
   * Menu Detalils
   */
  // new Swiper(".products-slider", {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   slidesPerView: "auto",
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 2,
  //       spaceBetween: 40,
  //     },
  //     480: {
  //       slidesPerView: 3,
  //       spaceBetween: 60,
  //     },
  //     640: {
  //       slidesPerView: 4,
  //       spaceBetween: 80,
  //     },
  //     992: {
  //       slidesPerView: 2,
  //       spaceBetween: 120,
  //     },
  //   },
  // });