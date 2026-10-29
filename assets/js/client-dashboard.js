/**
 * Client Portal, Dashboard & Gallery Systems (UI Mockups)
 */
document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. MOCK AUTHENTICATION & DASHBOARD SWITCHER
    // -------------------------------------------------------------
    const loginForm = document.getElementById('login-form-container');
    const demoLoginBtn = document.getElementById('btn-demo-login');
    const signupForm = document.getElementById('signup-form-container');
    const clientDashboard = document.getElementById('client-dashboard-workspace');

    // Automatically load dashboard if query params specify authenticated state
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'true' && clientDashboard && loginForm) {
        loginForm.classList.add('d-none');
        clientDashboard.classList.remove('d-none');
    }

    if (demoLoginBtn && loginForm && clientDashboard) {
        demoLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulating successful login transition
            loginForm.style.opacity = '0';
            setTimeout(() => {
                loginForm.classList.add('d-none');
                clientDashboard.classList.remove('d-none');
                clientDashboard.style.opacity = '0';
                setTimeout(() => {
                    clientDashboard.style.opacity = '1';
                    clientDashboard.style.transition = 'opacity 0.6s ease';
                }, 50);
            }, 400);
        });
    }

    // -------------------------------------------------------------
    // 2. DASHBOARD TAB SYSTEM
    // -------------------------------------------------------------
    const sidebarLinks = document.querySelectorAll('.dashboard-menu-link');
    const dashboardPanels = document.querySelectorAll('.dashboard-tab-panel');

    if (sidebarLinks.length > 0 && dashboardPanels.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetTab = link.getAttribute('data-tab');
                if (!targetTab) return; // Allow normal link redirection (e.g. Logout)
                
                e.preventDefault();

                // Toggle active menu class
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show target panel
                dashboardPanels.forEach(panel => {
                    if (panel.id === `${targetTab}-tab-panel`) {
                        panel.classList.remove('d-none');
                    } else {
                        panel.classList.add('d-none');
                    }
                });
                
                // Reset scroll position to top
                window.scrollTo(0, 0);
            });
        });
    }

    // Dashboard Interaction Hooks (UI notifications)
    const cancelSessionBtn = document.querySelector('.btn-cancel-session-mock');
    if (cancelSessionBtn) {
        cancelSessionBtn.addEventListener('click', () => {
            showToast('Session Cancellation Request sent to Studio Support.');
            cancelSessionBtn.textContent = 'Cancellation Pending';
            cancelSessionBtn.disabled = true;
            cancelSessionBtn.classList.replace('btn-outline-danger', 'btn-outline-secondary');
        });
    }

    const saveSettingsForm = document.getElementById('settings-mock-form');
    if (saveSettingsForm) {
        saveSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Profile and notification preferences updated successfully.');
        });
    }

    // -------------------------------------------------------------
    // 3. CLIENT PORTFOLIO GALLERY PASSCODE
    // -------------------------------------------------------------
    const passcodeLock = document.getElementById('gallery-lock-overlay');
    const galleryView = document.getElementById('unlocked-client-gallery');
    const passcodeInput = document.getElementById('gallery-passcode');
    const passcodeSubmit = document.getElementById('btn-gallery-unlock');
    const passcodeError = document.getElementById('gallery-unlock-error');

    if (passcodeLock && galleryView && passcodeSubmit && passcodeInput) {
        passcodeSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const enteredCode = passcodeInput.value.trim();

            if (enteredCode === 'client2026') {
                passcodeLock.style.opacity = '0';
                setTimeout(() => {
                    passcodeLock.classList.add('d-none');
                    galleryView.classList.remove('d-none');
                    galleryView.style.opacity = '0';
                    setTimeout(() => {
                        galleryView.style.opacity = '1';
                        galleryView.style.transition = 'opacity 0.6s ease';
                    }, 50);
                }, 400);
            } else {
                passcodeError.classList.remove('d-none');
                passcodeInput.value = '';
                passcodeError.textContent = 'Incorrect passcode. Try client2026 for demo access.';
            }
        });
    }

    // -------------------------------------------------------------
    // 4. FAVORITES & ALBUM DOWNLOAD TRIGGERS
    // -------------------------------------------------------------
    const heartBtns = document.querySelectorAll('.btn-gallery-heart');
    const favoriteBadge = document.getElementById('gallery-favorites-badge');
    let favoritesCount = 0;

    if (heartBtns.length > 0) {
        heartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const icon = btn.querySelector('i');
                const isFavorited = icon.classList.contains('fas');
                
                if (isFavorited) {
                    icon.className = 'far fa-heart';
                    favoritesCount = Math.max(0, favoritesCount - 1);
                } else {
                    icon.className = 'fas fa-heart text-danger';
                    favoritesCount += 1;
                }

                if (favoriteBadge) {
                    favoriteBadge.textContent = favoritesCount;
                    if (favoritesCount > 0) {
                        favoriteBadge.classList.remove('d-none');
                    } else {
                        favoriteBadge.classList.add('d-none');
                    }
                }
            });
        });
    }

    const btnDownloadAlbum = document.getElementById('btn-download-album');
    if (btnDownloadAlbum) {
        btnDownloadAlbum.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Initializing download of high-resolution WebP photographs...');
        });
    }

    // -------------------------------------------------------------
    // 5. TOAST NOTIFICATION HELPER
    // -------------------------------------------------------------
    function showToast(message) {
        // Create Toast wrapper if not exists
        let toastContainer = document.getElementById('studio-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'studio-toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.style.cssText = `
            background-color: var(--color-primary, #1F2937);
            color: var(--color-surface, #FFFFFF);
            border-left: 4px solid var(--color-accent, #D4AF37);
            padding: 1rem 1.5rem;
            border-radius: 4px;
            font-family: var(--font-alt, 'Manrope', sans-serif);
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        `;
        toast.innerHTML = message;
        toastContainer.appendChild(toast);

        // Entrance
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 50);

        // Exit
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // -------------------------------------------------------------
    // 4. DASHBOARD SIDEBAR DRAWER SYSTEM (MOBILE & TAB)
    // -------------------------------------------------------------
    const sidebarToggle = document.getElementById('btn-dashboard-sidebar-toggle');
    const sidebarCol = document.querySelector('.dashboard-sidebar-col');
    const sidebarBackdrop = document.getElementById('dashboard-sidebar-backdrop');
    const sidebarMenuLinks = document.querySelectorAll('.dashboard-sidebar-menu a');

    if (sidebarToggle && sidebarCol && sidebarBackdrop) {
        const toggleSidebar = () => {
            sidebarCol.classList.toggle('active');
            sidebarBackdrop.classList.toggle('active');
        };

        const closeSidebar = () => {
            sidebarCol.classList.remove('active');
            sidebarBackdrop.classList.remove('active');
        };

        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarBackdrop.addEventListener('click', closeSidebar);

        // Close sidebar when a tab link is clicked
        sidebarMenuLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }
});
