function applyTheme() {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

window.addEventListener('load', () => {
    applyTheme();
});

export function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.theme = isDarkMode ? 'light' : 'dark';
    applyTheme();
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light';

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark';

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme');