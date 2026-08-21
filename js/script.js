/* ===========================================
    1. WEDDING DATE CONFIGURATION
=========================================== */
const weddingDate = new Date(2026, 11, 27, 13, 0, 0);
const TARGET_WEDDING_DATE = weddingDate.getTime();


/* ===========================================
    2. IMMEDIATE GLOBAL AUTO-TRANSLATE
=========================================== */
// Run instantly to catch elements as soon as they render in the DOM
(function () {
    const userLang = navigator.language || navigator.userLanguage || "en";

    let clickText = "Click to Open...";
    let weddingTitleText = "WE'RE GETTING MARRIED";
    let foreverText = "forever starts soon";
    let daysText = "Days";
    let hoursText = "Hours";
    let minutesText = "Minutes";
    let secondsText = "Seconds";
    let messageText = "We are so grateful to have you in our lives. Thank you for being a vital part of our journey and for sharing this special moment with us.";
    let btnText = "View Invitation";

    if (userLang.startsWith('el')) {
        clickText = "ΚΑΝΤΕ ΚΛΙΚ ΓΙΑ ΑΝΟΙΓΜΑ...";
        weddingTitleText = "ΠΑΝΤΡΕΥΟΜΑΣΤΕ";
        foreverText = "το παντοτινό ξεκινά σύντομα";
        daysText = "Ημέρες";
        hoursText = "Ώρες";
        minutesText = "Λεπτά";
        secondsText = "Δευτερόλεπτα";
        messageText = "Είμαστε τόσο ευγνώμονες που σας έχουμε στη ζωή μας. Σας ευχαριστούμε που είστε ένα σημαντικό κομμάτι του ταξιδιού μας και που μοιράζεστε αυτή την ξεχωριστή στιγμή μαζί μας.";
        btnText = "Προβολή Πρόσκλησης";
    } else if (userLang.startsWith('tl') || userLang.startsWith('fil')) {
        clickText = "I-click para Buksan...";
        weddingTitleText = "KAMI AY MAGPAPAKASAL";
        foreverText = "magsisimula na ang walang hanggan";
        daysText = "Araw";
        hoursText = "Oras";
        minutesText = "Minuto";
        secondsText = "Segundo";
        messageText = "Lubos kaming nagpapasalamat na bahagi kayo ng aming buhay. Salamat sa pagiging mahalagang bahagi ng aming paglalakbay at sa pagbabahagi ng espesyal na sandaling ito kasama namin.";
        btnText = "Tingnan ang Imbitasyon";
    }

    function applyImmediateTranslations() {
        const clickEl = document.getElementById("txt-click");
        const titleEl = document.getElementById("txt-wedding-title");
        const foreverEl = document.getElementById("txt-forever");
        const dEl = document.getElementById("txt-days");
        const hEl = document.getElementById("txt-hours");
        const mEl = document.getElementById("txt-minutes");
        const sEl = document.getElementById("txt-seconds");
        const msgElement = document.getElementById("welcome-message");
        const invitationButton = document.querySelector(".btn");

        if (clickEl) clickEl.textContent = clickText;
        if (titleEl) titleEl.textContent = weddingTitleText;
        if (foreverEl) foreverEl.textContent = foreverText;
        if (dEl) dEl.textContent = daysText;
        if (hEl) hEl.textContent = hoursText;
        if (mEl) mEl.textContent = minutesText;
        if (sEl) sEl.textContent = secondsText;
        if (msgElement) msgElement.textContent = messageText;
        if (invitationButton) invitationButton.textContent = btnText;
    }

    // Try applying immediately, and also listen for DOMContentLoaded just in case
    applyImmediateTranslations();
    document.addEventListener("DOMContentLoaded", applyImmediateTranslations);
})();


/* ===========================================
    3. ENVELOPE & SMOOTH TRANSITION
=========================================== */
const envelope = document.getElementById("envelope");
const invitationButton = document.querySelector(".btn");
const bgMusic = document.getElementById('bg-music');
const musicContainer = document.getElementById('music-player-container');
const vinylDisc = document.getElementById('vinyl-disc');

let opened = false;

if (envelope && invitationButton) {
    invitationButton.style.pointerEvents = "none";
    invitationButton.style.opacity = "0";
    invitationButton.style.transition = "opacity 1s ease-in-out";

    function handleEnvelopeOpen(e) {
        if (opened) return;
        
        if (e.type === 'touchend') {
            e.preventDefault();
        }

        opened = true;
        envelope.classList.add("open");

        if (bgMusic) {
            bgMusic.play().catch(error => console.log("Audio play blocked or failed:", error));
            if (musicContainer) {
                musicContainer.classList.add('playing');
            }
        }

        setTimeout(() => {
            invitationButton.style.pointerEvents = "auto";
            invitationButton.style.opacity = "1";
        }, 7000); 
    }

    envelope.addEventListener("click", handleEnvelopeOpen);
    envelope.addEventListener("touchend", handleEnvelopeOpen, { passive: false });

    invitationButton.addEventListener("mouseenter", () => {
        invitationButton.style.transform = "translateY(-3px)";
    });

    invitationButton.addEventListener("mouseleave", () => {
        invitationButton.style.transform = "translateY(0)";
    });

    invitationButton.addEventListener("click", function (e) {
        e.preventDefault(); 
        const targetUrl = this.getAttribute("href");

        if (bgMusic) {
            bgMusic.play().catch(error => console.log("Audio play blocked or failed:", error));
        }

        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    });
}

if (vinylDisc) {
    vinylDisc.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicContainer.classList.add('playing');
        } else {
            bgMusic.pause();
            musicContainer.classList.remove('playing');
        }
    });
}


/* ===========================================
    4. DOM LOADED INITIALIZATION
=========================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- A. DYNAMIC NAVBAR LOADER & DRAWER EVENTS ---
    const placeholder = document.getElementById("navbar-placeholder");

    if (placeholder) {
        fetch("navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load navbar.");
                return response.text();
            })
            .then(html => {
                placeholder.innerHTML = html;
                initDrawerEvents();
                initNavbarScroll();
                highlightActivePage();
            })
            .catch(err => console.error("Error loading navbar:", err));
    } else {
        initDrawerEvents();
        initNavbarScroll();
        highlightActivePage();
    }

    // --- B. DYNAMIC COUNTDOWN TIMER ---
    const weddingDateConfig = new Date(2026, 11, 27, 13, 0, 0);
    const targetTime = weddingDateConfig.getTime();

    function updateCountdown() {
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const now = new Date().getTime();
        const timeDifference = targetTime - now;

        if (timeDifference <= 0) {
            daysEl.textContent = "000";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            clearInterval(timerInterval);
            return;
        }

        const totalSeconds = Math.floor(timeDifference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const remainingHours = totalHours % 24;
        const remainingMinutes = totalMinutes % 60;
        const remainingSeconds = totalSeconds % 60;

        daysEl.textContent = String(totalDays).padStart(3, "0");
        hoursEl.textContent = String(remainingHours).padStart(2, "0");
        minutesEl.textContent = String(remainingMinutes).padStart(2, "0");
        secondsEl.textContent = String(remainingSeconds).padStart(2, "0");
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    // --- C. HERO SCROLL REVEAL BUTTON ---
    const scrollBtn = document.getElementById("scrollBtn");
    const mainContent = document.getElementById("mainContent");

    if (scrollBtn && mainContent) {
        scrollBtn.addEventListener("click", () => {
            mainContent.classList.remove("content-hidden");
            
            const navbar = document.querySelector(".navbar");
            if (navbar) {
                navbar.classList.remove("transparent");
                navbar.classList.add("scrolled");
            }

            mainContent.scrollIntoView({ behavior: "smooth" });
        });
    }
});


/* ===========================================
    5. HELPER FUNCTIONS
=========================================== */

function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    const mainContent = document.getElementById("mainContent");
    if (!navbar) return;

    function updateNavbarStyle() {
        const isContentRevealed = mainContent && !mainContent.classList.contains("content-hidden");
        if (window.scrollY > 50 || isContentRevealed) {
            navbar.classList.remove("transparent");
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.add("transparent");
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbarStyle);
    updateNavbarStyle();
}

function initDrawerEvents() {
    const hamburgerBtn = document.querySelector(".hamburger") || document.getElementById("hamburger-btn") || document.getElementById("navToggle");
    const closeBtn = document.querySelector(".close-btn") || document.getElementById("close-btn") || document.getElementById("closeNav");
    const sideDrawer = document.querySelector(".side-drawer") || document.getElementById("side-drawer") || document.getElementById("navMenu");
    const navOverlay = document.querySelector(".nav-overlay") || document.getElementById("nav-overlay") || document.getElementById("menuBackdrop");
    const menuLinks = document.querySelectorAll(".menu-link, .drawer-links a, .nav-links a");
    const mainContent = document.getElementById("mainContent");

    function openDrawer() {
        sideDrawer?.classList.add("active");
        navOverlay?.classList.add("active");
    }

    function closeDrawer() {
        sideDrawer?.classList.remove("active");
        navOverlay?.classList.remove("active");
    }

    hamburgerBtn?.addEventListener("click", openDrawer);
    closeBtn?.addEventListener("click", closeDrawer);
    navOverlay?.addEventListener("click", closeDrawer);

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeDrawer();
            if (mainContent && mainContent.classList.contains("content-hidden")) {
                mainContent.classList.remove("content-hidden");
                const navbar = document.querySelector(".navbar");
                if (navbar) {
                    navbar.classList.remove("transparent");
                    navbar.classList.add("scrolled");
                }
            }
        });
    });
}

function highlightActivePage() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".drawer-links a, .nav-links a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
}

// --- D. GLOBAL CLICK FALLBACK FOR AUDIO ---
document.body.addEventListener('click', function playAudioOnce() {
    if (bgMusic && bgMusic.paused && vinylDisc) {
        bgMusic.play().then(() => {
            musicContainer.classList.add('playing');
            document.body.removeEventListener('click', playAudioOnce);
        }).catch(error => {
            console.log("Autoplay waiting for user interaction");
        });
    }
}, { once: true });