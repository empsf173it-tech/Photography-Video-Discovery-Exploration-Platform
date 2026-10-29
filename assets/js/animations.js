/**
 * Photography Studio - Motion Design Engine
 * GSAP + CSS Entrance & Scroll Triggers
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    } else {
        initCSSFallbackAnimations();
    }

    function initGSAPAnimations() {
        // Registers ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Content reveals (Page Load)
        gsap.fromTo('.hero-reveal', 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.2
            }
        );

        // Split hero photo reveals
        gsap.from('.editorial-hero-image-frame img', {
            clipPath: 'inset(0% 100% 0% 0%)',
            scale: 1.1,
            duration: 1.6,
            ease: 'power4.inOut',
            delay: 0.1
        });

        // GSAP Scroll Trigger for standard cards and fade-ups (excluding timeline panels to avoid conflicts)
        const fadeUpElements = Array.from(document.querySelectorAll('.reveal-fade-up'))
                                    .filter(el => !el.classList.contains('timeline-panel'));
        fadeUpElements.forEach(el => {
            gsap.fromTo(el, 
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: 'power3.out'
                }
            );
        });

        // Counters Count-Up Animation
        const counterStats = document.querySelectorAll('.counter-num');
        counterStats.forEach(stat => {
            const targetVal = parseInt(stat.getAttribute('data-target') || '0', 10);
            gsap.fromTo(stat, 
                { textContent: 0 }, 
                {
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 90%'
                    },
                    textContent: targetVal,
                    duration: 2.2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    stagger: 1
                }
            );
        });

        // Timeline slide in trigger (using explicit fromTo for both X, Y and opacity)
        const timelinePanels = document.querySelectorAll('.timeline-panel');
        timelinePanels.forEach(panel => {
            const isLeft = panel.parentElement.classList.contains('timeline-item') && !panel.parentElement.querySelector('.timeline-item:nth-child(even)');
            gsap.fromTo(panel, 
                { x: isLeft ? -50 : 50, y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 85%'
                    },
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                }
            );
        });
    }

    function initCSSFallbackAnimations() {
        // Fallback using Intersection Observer for standard fadeups
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Handle counter fallback
                    if (entry.target.classList.contains('counter-num')) {
                        runCounterFallback(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-fade-up, .counter-num, .timeline-panel').forEach(el => {
            el.classList.add('reveal-fade-up');
            observer.observe(el);
        });
    }

    function runCounterFallback(el) {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let current = 0;
        const duration = 2000; // 2s
        const stepTime = Math.abs(Math.floor(duration / target));
        const timer = setInterval(() => {
            current += 1;
            el.textContent = current;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }
});
