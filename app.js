document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS library for scroll animations
    AOS.init({
        duration: 1000,
        once: true,
    });

    const nav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // --- Navbar Scroll Effect ---
    const handleNavbarScroll = () => {
        if (window.scrollY > heroSection.offsetHeight - 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);

    // --- Theme Toggler ---
    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggleBtn.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    };
    themeToggleBtn.addEventListener('click', handleThemeToggle);

    // --- Prefers-color-scheme Check ---
    const setInitialTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light-mode');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };
    setInitialTheme();

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - nav.offsetHeight,
                    behavior: 'smooth'
                });

                if (nav.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(nav, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // --- Simple Typing Effect for Subtitle ---
    const titles = [
        "Software Developer",
        "Web Developer",
        "API Developer",
    ];
    let titleIndex = 0;
    let charIndex = 0;
    const typedTextPlaceholder = document.getElementById("typed-text-placeholder");
    
    function typeTitle() {
        const currentTitle = titles[titleIndex];
        if (charIndex < currentTitle.length) {
            typedTextPlaceholder.textContent += currentTitle.charAt(charIndex);
            charIndex++;
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(deleteTitle, 1500); // Pause before deleting
        }
    }

    function deleteTitle() {
        if (charIndex > 0) {
            typedTextPlaceholder.textContent = typedTextPlaceholder.textContent.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteTitle, 50);
        } else {
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, 500); // Pause before typing the next title
        }
    }

    // Start the animation
    typeTitle();

      const downloadResumeBtn = document.getElementById("downloadResumeBtn");

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevents the default action of the link

            const fileUrl = downloadResumeBtn.getAttribute("href");
            const fileName = "MuhammadAalyan_Resume.pdf"; // The desired file name

            const a = document.createElement("a");
            a.style.display = "none";
            a.href = fileUrl;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
});