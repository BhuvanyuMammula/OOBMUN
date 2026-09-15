const video = document.getElementById("intro-video");
const scroll = document.querySelector(".scroll");
const heroContent = document.querySelector(".hero-content");

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
        e.stopPropagation(); // Prevents instant closing on click
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
    if(!navbar) return;

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
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
    threshold:0.15
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

// Countdown Timer

const eventDate = new Date("October 31, 2026 08:00:00").getTime();

function updateTimer(){
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = eventDate - now;

    if(distance < 0){
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    // Helper function to update text and trigger the flip animation only when value changes
    function setDigit(element, newValue) {
        const formatted = String(newValue).padStart(2, '0');
        if (element.innerText !== formatted) {
            element.innerText = formatted;
            const card = element.closest('.flip-card');
            if (card) {
                card.classList.add('is-flipping');
                setTimeout(() => {
                    card.classList.remove('is-flipping');
                }, 400); // Matches CSS animation duration
            }
        }
    }

    setDigit(daysEl, days);
    setDigit(hoursEl, hours);
    setDigit(minutesEl, mins);
    setDigit(secondsEl, secs);
}

updateTimer();
setInterval(updateTimer, 1000);
