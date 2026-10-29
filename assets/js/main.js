/**
 * Photography Studio Main JavaScript Engine
 */
// Force page scroll position to top on reload/transition
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. MOBILE MENU NAVIGATION & STICKY NAVBAR
    // -------------------------------------------------------------
    const navbar = document.querySelector('.studio-navbar');
    const hamburger = document.getElementById('btn-hamburger');
    const navMenu = document.getElementById('studio-nav-menu');

    // Sticky scrolling navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                navMenu.classList.remove('active');
                hamburger.querySelectorAll('span')[0].style.transform = 'none';
                hamburger.querySelectorAll('span')[1].style.opacity = '1';
                hamburger.querySelectorAll('span')[2].style.transform = 'none';
            } else {
                navMenu.classList.add('active');
                hamburger.querySelectorAll('span')[0].style.transform = 'translateY(8px) rotate(45deg)';
                hamburger.querySelectorAll('span')[1].style.opacity = '0';
                hamburger.querySelectorAll('span')[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            }
        });
    }

    // Mobile Dropdown Toggle Handler
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                const parentLi = toggle.parentElement;
                const menu = parentLi.querySelector('.dropdown-menu');
                if (menu) {
                    const isOpen = parentLi.classList.contains('open');
                    if (!isOpen) {
                        e.preventDefault();
                        document.querySelectorAll('.nav-item.dropdown').forEach(li => li.classList.remove('open'));
                        parentLi.classList.add('open');
                    }
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 2. PORTFOLIO FILTER & MASONRY INTERACTION
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-filter');

                // Active Class Toggles
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter Animation
                portfolioCards.forEach(card => {
                    const cardCats = card.getAttribute('data-categories').split(' ');
                    if (category === 'all' || cardCats.includes(category)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.85)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 3. LIGHTBOX PREVIEW MODAL
    // -------------------------------------------------------------
    const lightboxModal = document.getElementById('studio-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-display-img');
    const lightboxClose = document.getElementById('btn-lightbox-close');
    const lightboxPrev = document.getElementById('btn-lightbox-prev');
    const lightboxNext = document.getElementById('btn-lightbox-next');
    let currentImageIndex = 0;
    const lightboxSrcs = [];

    // Gathers links for lightbox
    const lightboxCards = document.querySelectorAll('.portfolio-card[data-lightbox]');
    lightboxCards.forEach((card, index) => {
        const img = card.querySelector('.portfolio-card-img');
        if (img) {
            lightboxSrcs.push(img.src);
            card.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox(img.src);
            });
        }
    });

    function openLightbox(src) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    if (lightboxPrev && lightboxNext) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + lightboxSrcs.length) % lightboxSrcs.length;
            lightboxImg.src = lightboxSrcs[currentImageIndex];
        });
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % lightboxSrcs.length;
            lightboxImg.src = lightboxSrcs[currentImageIndex];
        });
    }

    // Keyboard controls for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    });

    // -------------------------------------------------------------
    // 4. TESTIMONIAL SLIDER INTERACTION
    // -------------------------------------------------------------
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.getElementById('btn-testimonial-prev');
    const nextTestimonialBtn = document.getElementById('btn-testimonial-next');
    let currentTestimonialIndex = 0;

    function showTestimonial(index) {
        if (testimonials.length === 0) return;
        testimonials.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
            }
        });
    }

    if (prevTestimonialBtn && nextTestimonialBtn && testimonials.length > 0) {
        showTestimonial(currentTestimonialIndex);
        prevTestimonialBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        });
        nextTestimonialBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        });
    }

    // -------------------------------------------------------------
    // 5. SESSION BOOKING MOCK SYSTEM
    // -------------------------------------------------------------
    const bookingForm = document.getElementById('booking-session-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedPackage = document.getElementById('booking-package').value;
            const selectedDate = document.getElementById('booking-date').value;
            const selectedTime = document.getElementById('booking-time').value;

            // Simple redirect mock
            alert(`Booking successfully initiated!\n\nPackage: ${selectedPackage}\nDate: ${selectedDate} at ${selectedTime}\n\nRedirecting to secure payment portal...`);
            window.location.href = 'login.html?auth=true';
        });
    }

    // -------------------------------------------------------------
    // 6. CONTACT ENQUIRY VALIDATION
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-studio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your request has been received. Our creative representative will get in touch with you within 24 hours!');
            contactForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 7. INTERACTIVE FAQ ACCORDION
    // -------------------------------------------------------------
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const card = trigger.parentElement;
            const content = card.querySelector('.faq-content');
            const icon = trigger.querySelector('.transition-icon');
            
            const isActive = card.classList.contains('active');
            
            // Collapse all other FAQ cards
            document.querySelectorAll('.faq-item-card').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = '0';
                const itemIcon = item.querySelector('.transition-icon');
                if (itemIcon) {
                    itemIcon.style.transform = 'none';
                }
            });
            
            if (!isActive) {
                card.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 8. BACK TO TOP BUTTON DYNAMIC INJECTION
    // -------------------------------------------------------------
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'btn-back-to-top';
    backToTopBtn.className = 'btn-back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
