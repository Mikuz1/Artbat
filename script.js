// === MOBILE MENU TOGGLE ===
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const isActive = mainNav.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isActive);
    const icon = navToggle.querySelector('i');
    if (icon) {
      if (isActive) {
        icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
      } else {
        icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    }
  });

  const navLinksInMenu = mainNav.querySelectorAll('a.nav-link, a.nav-logo-link');
  navLinksInMenu.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        navToggle.click();
      }
    });
  });

} else {
  console.error('Mobile navigation elements not found (toggle or nav container).');
}

// === SCROLL INDICATOR SMOOTH SCROLL ===
const scrollLink = document.querySelector('.scroll-indicator[href="#next-section"]');
if (scrollLink) {
  scrollLink.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    let targetElement = null;
    try {
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        targetElement = document.querySelector(targetId);
      }
    } catch(error) { console.error("Error finding scroll target:", error); }

    if(targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
      console.warn("Scroll target element '" + targetId + "' not found. Scrolling down instead.");
    }
  });
}

// === ACTIVE NAVIGATION LINK HIGHLIGHTING ===
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav > a.nav-link, .main-nav > a.nav-logo-link');

    navLinks.forEach(link => { link.classList.remove('active-link'); });

    let foundActive = false;
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active-link');
            foundActive = true;
        }
    });

    if (!foundActive && currentPath === '/') {
        const logoLink = document.querySelector('.main-nav > a.nav-logo-link[href="/"]');
        if (logoLink) {
            logoLink.classList.add('active-link');
        }
    }
});