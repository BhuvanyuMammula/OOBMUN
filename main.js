const video = document.getElementById("intro-video");
const scroll = document.querySelector(".scroll");
const heroContent = document.querySelector(".hero-content");
// GET OUT OF INSPECT COPYRIGHT LAWS APPLY
if (scroll) {
    scroll.style.opacity = "0";
    scroll.style.transition = "opacity 1s ease";
}

if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translate(-50%, -45%)";
    heroContent.style.transition =
        "opacity 1.5s ease, transform 1.5s ease";
}

if (video) {
    video.loop = false;

    setTimeout(() => {
        if (heroContent) {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translate(-50%, -50%)";
        }
    }, 700);

    video.addEventListener("ended", () => {
        video.pause();

        if (scroll) {
            scroll.style.opacity = "1";
        }
    });
}
    
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const isOpen = navLinks.classList.toggle("active");
        navToggle.classList.toggle("active");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        
        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        });
    });

    document.addEventListener("click", (e) => {
        if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }
    });
}

const heroSection = document.querySelector(".hero:not(.page-hero)");
const heroVideo = document.getElementById("intro-video");

if (heroSection) {
    let ticking = false;

    const updateHeroParallax = () => {
        const heroHeight = heroSection.offsetHeight;
        const progress = Math.min(window.scrollY / heroHeight, 1);

        if (heroVideo) {
            heroVideo.style.transform = `scale(${1 + progress * 0.02})`;
            heroVideo.style.opacity = `${1 - progress * 0.3}`;
        }

        if (heroContent) {
            heroContent.style.opacity = `${1 - progress * 1.2}`;
            heroContent.style.transform =
                `translate(-50%, calc(-50% + ${progress * 80}px))`;
        }

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateHeroParallax);
            ticking = true;
        }
    });
}

// Navbar Background
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Fade-in Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section:not(.countdown)").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

document.querySelectorAll(".card, .feature-content").forEach(el => {
    const siblings = Array.from(el.parentElement.children);
    const index = siblings.indexOf(el);

    el.style.transitionDelay = `${(index % 6) * 100}ms`;
    el.classList.add("hidden");
    observer.observe(el);
});

// =========================================
// PRODUCTION-GRADE FLIP COUNTDOWN LOGIC
// =========================================

const eventDate = new Date("October 31, 2026 08:00:00").getTime();

function setSingleDigit(elementId, newChar) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (el.innerText !== newChar) {
        const card = el.closest('.flip-card');
        if (card) {
            if (card.dataset.flipTimer1) clearTimeout(Number(card.dataset.flipTimer1));
            if (card.dataset.flipTimer2) clearTimeout(Number(card.dataset.flipTimer2));

            card.classList.remove('is-flipping');
            void card.offsetWidth;
            card.classList.add('is-flipping');

            const t1 = setTimeout(() => {
                el.innerText = newChar;
            }, 175);

            const t2 = setTimeout(() => {
                card.classList.remove('is-flipping');
            }, 350);

            card.dataset.flipTimer1 = String(t1);
            card.dataset.flipTimer2 = String(t2);
        } else {
            el.innerText = newChar;
        }
    }
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
        ['days1','days2','hours1','hours2','mins1','mins2','secs1','secs2'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerText = "0";
        });
        return;
    }

    const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const totalMins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const totalSecs = Math.floor((distance % (1000 * 60)) / 1000);

    const days = String(totalDays).padStart(2, '0');
    const hours = String(totalHours).padStart(2, '0');
    const mins = String(totalMins).padStart(2, '0');
    const secs = String(totalSecs).padStart(2, '0');

    const formattedDays = days.length > 2 ? days.slice(-2) : days;

    setSingleDigit("days1", formattedDays[0]);
    setSingleDigit("days2", formattedDays[1]);
    setSingleDigit("hours1", hours[0]);
    setSingleDigit("hours2", hours[1]);
    setSingleDigit("mins1", mins[0]);
    setSingleDigit("mins2", mins[1]);
    setSingleDigit("secs1", secs[0]);
    setSingleDigit("secs2", secs[1]);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        updateTimer();
        setInterval(updateTimer, 1000);
    });
} else {
    updateTimer();
    setInterval(updateTimer, 1000);
}

// =========================================
// REGISTRATION MODAL POPUP LOGIC
// =========================================

const modalOverlay = document.getElementById("registration-modal");
const modalCloseBtn = document.querySelector(".modal-close");
const modalConfirmBtn = document.querySelector(".modal-confirm-btn");
const openModalBtns = document.querySelectorAll(".hero-register-btn, .open-modal-btn");

function openRegistrationModal() {
    if (modalOverlay) {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeRegistrationModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// Automatically launch modal on contact.html load
if (modalOverlay) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(openRegistrationModal, 400);
        });
    } else {
        setTimeout(openRegistrationModal, 400);
    }
}

// Manual triggers via buttons
if (openModalBtns.length > 0) {
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openRegistrationModal();
        });
    });
}

// Dismiss controls
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeRegistrationModal);
if (modalConfirmBtn) modalConfirmBtn.addEventListener("click", closeRegistrationModal);

if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeRegistrationModal();
        }
    });
}
