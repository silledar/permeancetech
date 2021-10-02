/**
* Template Name: Selecao - v4.3.0
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

$(function(){
  const url = 'https://script.google.com/macros/s/AKfycbwZADbUJWnUTTOBajw-DO0EHGA-D6qahvGJ4ahqN2YosRlBWy7rwfr264nVtBjIXw8B/exec'

  $('#submit-form').on('click', function(e) {
    e.preventDefault();
    if($('form#contact-form')[0].checkValidity()) {
      $.ajax({
        url: url,
        type: 'post',
        data: $('form#contact-form').serialize(),
        headers: {
          'Content-Type':  'application/json',
        },
        dataType: 'json',
        success: function (data) {
          $('form#contact-form').trigger("reset");
          $("#success-toast").toast('show');
        }
      });
    } else {
      $("form#contact-form")[0].reportValidity();
    }
  });

  const modalData = [
    {
      id: 0,
      title: "Managed IT Services",
      data: [
      "Round-the-clock & relentless technical support",
      "Proactive system monitoring service",
      "Patch management service",
      "Fixed costs",
      "Remote helpdesk & technical support sessions",
      "Server/workstation patching",
      "Backup maintenance service",
      "Monitoring and alerting of systems",
      "Email/Spam protection Service.",
      "Desktop optimization service.",
      "Application maintenance and deployment.",
      "Web and antivirus protection service",
      "Virus monitoring service"
      ]
    },
    {
      id: 1,
      title: "Cloud Solutions",
      data: [
      "Cloud readiness assessment",
      "Developing, customizing and migrating applications",
      "Roadmap for infrastructure management",
      "Performance optimization",
      "Security and Risk assessment",
      "Readiness Assessment",
      "Cloud-to-cloud movement",
      "Migration of workloads",
      "Validation and performance testing",
      "Disaster Recovery Management Services",
      "Cloud-based application monitoring",
      "Building an agile, cloud native platform",
      "Infrastructure optimization for better performance and cost savings",
      "Cloud governance and policy"

      ]
    },
    {
      id: 2,
      title: "End User Computing Solution",
      data: [
        "Product Selection",
        "Full Lifecycle PC Asset Management",
        "Email and collaboration services",
        "virtual desktops & applications Management",
        "Rights-based End User Services",
        "Deskside and Remote End User Support",
        "Wireless User Access Networks",
        "Mobile Device Asset Management",
        "Identity and Access Management",
        "Virtual Desktop Infrastructure",
        "End User Experience Monitoring"
      ]
    },
    {
      id: 3,
      title: "Network Solution",
      data: [
        "Network strategy and planning",
        "SD-WAN strategy and assessment",
        "Unified Communications",
        "Monitor & Troubleshoot Network Devices",
       " Upgradation if Network Devices"
      ]
    },
  ]

  const myModal = new bootstrap.Modal($('#myModal'), {
    keyboard: false
  })

  $('.openModal').click(function(){
    const dataIndex = +$(this).data('index');
    const modalDataObj = modalData.find(x => x.id === dataIndex);
    $('#myModal').find("#modalTitle").text(modalDataObj.title);
    $('#myModal').find("#modalBody").empty().append("<ul></ul>");
    modalDataObj.data.forEach((x, i) => {
      $('#myModal').find("#modalBody ul")
      .append('<li><i class="ri-check-double-line"></i>'+ x +'</li>');

      if(i === modalDataObj.data.length - 1) {
        myModal.toggle();
      }
    });
  });
});