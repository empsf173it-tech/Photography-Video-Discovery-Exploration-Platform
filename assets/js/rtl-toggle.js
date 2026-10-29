// RTL Layout Direction Toggle Engine
(function() {
    const savedRtlMode = localStorage.getItem('rtl-mode');
    if (savedRtlMode === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const rtlToggleBtn = document.getElementById('rtl-toggle-btn');
    if (rtlToggleBtn) {
        // Initial button text sync
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        rtlToggleBtn.innerText = isRtl ? 'LTR' : 'RTL';

        rtlToggleBtn.addEventListener('click', () => {
            const currentRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (currentRtl) {
                document.documentElement.removeAttribute('dir');
                rtlToggleBtn.innerText = 'RTL';
                localStorage.setItem('rtl-mode', 'false');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                rtlToggleBtn.innerText = 'LTR';
                localStorage.setItem('rtl-mode', 'true');
            }
        });
    }
});
