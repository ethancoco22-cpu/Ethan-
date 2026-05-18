/* =============================================
   PORTFOLIO EC — MAIN JS
============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. NAVBAR SCROLL ───────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // ─── 2. MOBILE MENU ─────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // ─── 3. ACTIVE NAV LINK ─────────────────────
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (navLink) {
                if (scrollPos >= top && scrollPos < bottom) {
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ─── 4. TIMELINE SCROLL ANIMATION ───────────
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));

    // ─── 5. SECTOR CARDS ANIMATION ──────────────
    const sectorCards = document.querySelectorAll('.sector-card');

    const sectorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                sectorObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectorCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        sectorObserver.observe(card);
    });

    // ─── 6. SKILL CATEGORIES ANIMATION ──────────
    const skillCats = document.querySelectorAll('.skill-category');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillCats.forEach(cat => {
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(25px)';
        cat.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        skillObserver.observe(cat);
    });

    // ─── 7. LANGUAGE BAR ANIMATION ──────────────
    const languageBars = document.querySelectorAll('.language-progress');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = targetWidth; }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    languageBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.dataset.width = originalWidth;
        bar.style.width = '0%';
        barObserver.observe(bar);
    });

    // Fix: restore width on observe
    const barObserver2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, 300);
                barObserver2.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    languageBars.forEach(bar => barObserver2.observe(bar));

    // ─── 8. ABOUT STATS COUNTER ─────────────────
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const num = parseFloat(text);

                if (!isNaN(num) && !text.includes('/')) {
                    animateCounter(el, 0, num, 1200, text.replace(num.toString(), ''));
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    // ─── 9. CONTACT FORM ────────────────────────
    const contactForm = document.getElementById('contactForm');
    const formNotice = document.getElementById('formNotice');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showNotice('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotice('Veuillez saisir une adresse email valide.', 'error');
                return;
            }

            // Simulate send (no backend)
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            setTimeout(() => {
                showNotice('✅ Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
                contactForm.reset();
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            }, 1500);
        });
    }

    function showNotice(msg, type) {
        formNotice.textContent = msg;
        formNotice.className = 'form-notice ' + type;
        setTimeout(() => {
            formNotice.textContent = '';
            formNotice.className = 'form-notice';
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ─── 10. SMOOTH SCROLL ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── 11. TYPING EFFECT (hero subtitle) ──────
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const words = ['Marketing Digital', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Email Marketing'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let baseText = 'Expert en acquisition digitale multi-canaux · ';

        heroSubtitle.innerHTML = baseText + '<span class="typed"></span>';
        const typedEl = heroSubtitle.querySelector('.typed');

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            if (typedEl) typedEl.textContent = currentWord.substring(0, charIndex);

            let delay = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }

            setTimeout(typeEffect, delay);
        }

        // Start after hero animation
        setTimeout(typeEffect, 1500);
    }

    // ─── 12. PARALLAX BLOBS ─────────────────────
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xRatio = (clientX / window.innerWidth - 0.5) * 2;
        const yRatio = (clientY / window.innerHeight - 0.5) * 2;

        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        const blob3 = document.querySelector('.blob-3');

        if (blob1) blob1.style.transform = `translate(${xRatio * 20}px, ${yRatio * 15}px)`;
        if (blob2) blob2.style.transform = `translate(${xRatio * -15}px, ${yRatio * -10}px)`;
        if (blob3) blob3.style.transform = `translate(${xRatio * 10}px, ${yRatio * 20}px)`;
    });

    // Initial active nav
    updateActiveNav();
});
