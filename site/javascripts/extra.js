// RhamaaCMS Documentation - Custom JavaScript

// Enhance search experience
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy button feedback
    document.querySelectorAll('.md-clipboard').forEach(button => {
        button.addEventListener('click', function() {
            const originalTitle = this.getAttribute('title');
            this.setAttribute('title', 'Copied!');
            
            setTimeout(() => {
                this.setAttribute('title', originalTitle);
            }, 2000);
        });
    });

    // Add external link indicators
    document.querySelectorAll('.md-content a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Table of contents highlight
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.md-nav__link').forEach(link => {
                    link.classList.remove('md-nav__link--active');
                });
                
                const activeLink = document.querySelector(`.md-nav__link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('md-nav__link--active');
                }
            }
        });
    }, observerOptions);

    // Observe all headings
    document.querySelectorAll('.md-typeset h1[id], .md-typeset h2[id], .md-typeset h3[id]').forEach(heading => {
        observer.observe(heading);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to close search
    if (e.key === 'Escape') {
        const searchForm = document.querySelector('.md-search');
        if (searchForm) {
            searchForm.classList.remove('md-search--active');
        }
    }
});
