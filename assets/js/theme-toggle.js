/**
 * Theme Toggle Handler
 * Manages Dark Mode using LocalStorage & Document Root Class Updates
 */
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const rootEl = document.documentElement;

    // Retrieve saved theme preference or default to light
    const currentTheme = localStorage.getItem('studio-theme') || 'light';
    
    if (currentTheme === 'dark') {
        rootEl.classList.add('dark-theme');
        updateIcon(true);
    } else {
        rootEl.classList.remove('dark-theme');
        updateIcon(false);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = rootEl.classList.contains('dark-theme');
            if (isDark) {
                rootEl.classList.remove('dark-theme');
                localStorage.setItem('studio-theme', 'light');
                updateIcon(false);
            } else {
                rootEl.classList.add('dark-theme');
                localStorage.setItem('studio-theme', 'dark');
                updateIcon(true);
            }
        });
    }

    function updateIcon(isDark) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (icon) {
            if (isDark) {
                icon.className = 'fas fa-sun'; // Show light toggle option
            } else {
                icon.className = 'fas fa-moon'; // Show dark toggle option
            }
        }
    }
});
