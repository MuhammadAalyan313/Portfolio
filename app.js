document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,  
        once: true,     
    });

    const nav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');
    const themeToggleBtn = document.getElementById('theme-toggle');

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight - 100) { 
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');  
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggleBtn.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();  

            const targetId = this.getAttribute('href').substring(1);  
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - nav.offsetHeight,  
                    behavior: 'smooth'  
                });

                if (nav.classList.contains('show')) {  
                    const bsCollapse = new bootstrap.Collapse(nav, { toggle: false });
                    bsCollapse.hide();
                }
            }
        });
    });

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.remove('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});