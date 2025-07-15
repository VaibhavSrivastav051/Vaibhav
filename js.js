document.addEventListener('DOMContentLoaded', () => {

    /**
     * Initializes the typing animation effect in the hero section.
     */
    function setupTypingEffect() {
        const typingElement = document.getElementById('typing-effect');
        if (!typingElement) return;

        const stats = [
            "GPT-5 arriving summer 2025...",
            "Grok-4 with 1.7T parameters...",
            "Gemini 1.5 Pro: 2M token context...",
            "2,872 papers at CVPR 2025...",
            "AI cybersecurity market: $24.82B...",
            "AGI market to hit $116B by 2035..."
        ];

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        async function typingEffectLoop() {
            let statIndex = 0;
            while (true) {
                const currentStat = stats[statIndex];
                for (let i = 1; i <= currentStat.length; i++) {
                    typingElement.textContent = currentStat.substring(0, i);
                    await sleep(50);
                }
                await sleep(2000);
                for (let i = currentStat.length - 1; i >= 0; i--) {
                    typingElement.textContent = currentStat.substring(0, i);
                    await sleep(30);
                }
                await sleep(500);
                statIndex = (statIndex + 1) % stats.length;
            }
        }
        typingEffectLoop();
    }

    /**
     * Sets up IntersectionObservers to handle scroll-based animations:
     */
    function setupScrollObservers() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('#navbar ul li a');
        const mainSections = document.querySelectorAll('main section');

        // Observer for fading in sections
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => sectionObserver.observe(section));

        // Observer for active nav link highlighting
        const navLinkMap = new Map();
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href')?.substring(1);
            if (sectionId) navLinkMap.set(sectionId, link);
        });

        let currentActiveLink = document.querySelector('#navbar ul li a.active');
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newActiveLink = navLinkMap.get(entry.target.id);
                    if (newActiveLink && newActiveLink !== currentActiveLink) {
                        currentActiveLink?.classList.remove('active');
                        newActiveLink.classList.add('active');
                        currentActiveLink = newActiveLink;
                    }
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" });

        mainSections.forEach(section => {
            if (navLinkMap.has(section.id)) navObserver.observe(section);
        });
    }

    /**
     * Initializes the Particles.js background effect if the library is loaded.
     */
    function setupParticles() {
        const particlesElement = document.getElementById('particles-js');
        if (typeof particlesJS !== 'undefined' && particlesElement) {
            particlesJS(particlesElement.id, {
                "particles": { "number": { "value": 100, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#00ff00" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 2, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#00ff00", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" } },
                "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.7 } }, "push": { "particles_nb": 4 } } },
                "retina_detect": true
            });
        }
    }

    /**
     * Initializes the collapsible card (accordion) functionality.
     */
    function setupCollapsibleCards() {
        const collapsibleCards = document.querySelectorAll('.card.is-collapsible');
        collapsibleCards.forEach(card => {
            const header = card.querySelector('.card-header');
            const contentWrapper = card.querySelector('.card-content-wrapper');
            const contentInner = card.querySelector('.card-content-inner');

            header.addEventListener('click', () => {
                const isOpen = card.classList.contains('is-open');

                // Close all other open cards first
                collapsibleCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('is-open')) {
                        otherCard.classList.remove('is-open');
                        otherCard.querySelector('.card-content-wrapper').style.maxHeight = '0';
                    }
                });

                // Then, toggle the clicked card
                if (isOpen) {
                    contentWrapper.style.maxHeight = '0';
                } else {
                    contentWrapper.style.maxHeight = contentInner.scrollHeight + 'px';
                }
                card.classList.toggle('is-open');
            });
        });
    }

    // --- INITIALIZE ALL FEATURES ---
    setupTypingEffect();
    setupScrollObservers();
    setupParticles();
    setupCollapsibleCards();

});