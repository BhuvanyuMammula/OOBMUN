// COMPLETE PRODUCTION LOGIC FOR main.js

const eventDate = new Date("October 31, 2026 08:00:00").getTime();

function setSingleDigit(elementId, newChar) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (el.innerText !== newChar) {
        const card = el.closest('.flip-card');
        if (card) {
            // Cancel pending timers when tab is backgrounded to prevent animation stutter
            if (card.dataset.flipTimer1) clearTimeout(Number(card.dataset.flipTimer1));
            if (card.dataset.flipTimer2) clearTimeout(Number(card.dataset.flipTimer2));

            card.classList.remove('is-flipping');
            void card.offsetWidth; // Force DOM reflow to restart CSS animation instantly
            card.classList.add('is-flipping');

            // Swap digit at the 3D fold midpoint (175ms)
            const t1 = setTimeout(() => {
                el.innerText = newChar;
            }, 175);

            // Remove CSS animation class upon completion (350ms)
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

    // Slice last two digits for days to maintain 2-card alignment
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

// Safely execute after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    updateTimer();
    setInterval(updateTimer, 1000);
});
