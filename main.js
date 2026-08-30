
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
            heroVideo.style.transform = `scale(${1 + progress * 0.12})`;
            heroVideo.style.opacity = `${1 - progress * 0.5}`;
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

const timer = document.getElementById("timer");

const eventDate = new Date("November 13, 2026 07:30:00").getTime();

function updateTimer(){

if(!timer) return;

const now = new Date().getTime();

const distance = eventDate - now;

if(distance < 0){

timer.innerHTML = "Conference Has Begun";

return;

}

const days = Math.floor(distance / (1000 * 60 * 60 * 24));

const hours = Math.floor(
(distance % (1000 * 60 * 60 * 24)) /
(1000 * 60 * 60)
);

const mins = Math.floor(
(distance % (1000 * 60 * 60)) /
(1000 * 60)
);

const secs = Math.floor(
(distance % (1000 * 60)) /
1000
);

timer.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;

}

if(timer){

updateTimer();

setInterval(updateTimer,1000);

}
