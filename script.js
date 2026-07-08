// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#achievements">Achievements</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.about-card, .skills-card, .tools-card, .certification-card, ' +
        '.project-card, .growth-card, .testimonial-card, .certificate-card, ' +
        '.personal-card, .detail-card, .skills-category, .tool-card, ' +
        '.seo-card, .result-item, .ad-platform-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Stats Counter Animation
    const statsSection = document.querySelector('.hero-stats');
    let hasAnimated = false;

    const animateStats = () => {
        if (hasAnimated) return;

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasM = text.includes('M');
            let target = parseInt(text.replace(/[^0-9]/g, ''));

            if (hasM) {
                target = 50; // For 50M+
            }

            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }

                let displayValue = Math.floor(current);
                if (hasM) displayValue += 'M';
                if (hasPlus) displayValue += '+';

                stat.textContent = displayValue;
            }, stepTime);
        });

        hasAnimated = true;
    };

    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill Tags Hover Animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Tool Items Tooltip
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        const tooltip = item.getAttribute('title');
        if (tooltip) {
            item.addEventListener('mouseenter', function(e) {
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'tooltip';
                tooltipEl.textContent = tooltip;
                tooltipEl.style.cssText = `
                    position: absolute;
                    background: #1a1a1a;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                `;
                document.body.appendChild(tooltipEl);

                const rect = this.getBoundingClientRect();
                tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2) + 'px';
                tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 8 + 'px';

                this.tooltipEl = tooltipEl;
            });

            item.addEventListener('mouseleave', function() {
                if (this.tooltipEl) {
                    this.tooltipEl.remove();
                }
            });
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Add active link styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--text-primary);
        }

        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    // Enhanced Parallax Effect on Hero Section
    const heroParallax = document.querySelector('.hero-parallax');
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const bgShapes = document.querySelectorAll('.bg-shape');

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768 && heroParallax) {
            const scrolled = window.pageYOffset;
            const heroHeight = heroParallax.offsetHeight;

            if (scrolled < heroHeight) {
                // Parallax effect on elements with data-parallax attribute
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });

                // Parallax on floating marketing icons
                floatingIcons.forEach((icon, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const direction = index % 2 === 0 ? 1 : -1;
                    icon.style.transform = `translateY(${scrolled * speed * direction}px) rotate(${scrolled * 0.02 * direction}deg)`;
                });

                // Parallax on background shapes
                bgShapes.forEach((shape, index) => {
                    const speed = 0.03 + (index * 0.01);
                    shape.style.transform = `translate(${scrolled * speed * (index % 2 === 0 ? 1 : -1)}px, ${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
                });

                // Fade out hero content on scroll
                const opacity = Math.max(0, 1 - (scrolled / (heroHeight * 0.8)));
                const heroMain = document.querySelector('.hero-main');
                if (heroMain) {
                    heroMain.style.opacity = opacity;
                }
            }
        }
    });

    // Mouse move parallax effect on floating tags
    const heroCenter = document.querySelector('.hero-center');
    if (heroCenter && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const floatingTags = document.querySelectorAll('.floating-tag');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (e.clientX - centerX) / centerX;
            const moveY = (e.clientY - centerY) / centerY;

            floatingTags.forEach((tag, index) => {
                const speed = 10 + (index * 5);
                const x = moveX * speed;
                const y = moveY * speed;
                tag.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Subtle movement on background icons
            floatingIcons.forEach((icon, index) => {
                const speed = 5 + (index * 2);
                const x = moveX * speed * (index % 2 === 0 ? 1 : -1);
                const y = moveY * speed * (index % 2 === 0 ? 1 : -1);
                icon.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Form Validation (if contact form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form handling logic here
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Loading Animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);

    console.log('Portfolio website loaded successfully!');
});
