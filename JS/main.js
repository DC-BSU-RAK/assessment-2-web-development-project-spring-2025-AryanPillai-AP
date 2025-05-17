// Main JavaScript functionality for the WWE website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!event.target.closest('#main-nav') && !event.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
            }
        }
    });

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in-element');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Add fade-in class to elements that should animate
    const addFadeInClass = function() {
        const elementsToAnimate = [
            '.featured-card', 
            '.brand-item', 
            '.champion-card',
            '.superstar-card',
            '.championship-card',
            '.highlight-card',
            '.title-card',
            '.review-card',
            '.match-card'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.classList.contains('fade-in-element')) {
                    element.classList.add('fade-in-element');
                }
            });
        });
    };

    // Initialize animations
    addFadeInClass();
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Handle the back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Apply styles to the back-to-top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-red);
            color: var(--primary-white);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 999;
            box-shadow: var(--shadow-md);
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background-color: var(--secondary-red);
            transform: translateY(-5px);
        }
        
        @media (max-width: 767px) {
            .back-to-top {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    // Add placeholder images if real images are missing
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Skip if the image has a valid src and it's loaded successfully
        if (img.complete && img.naturalHeight !== 0) {
            return;
        }
        
        // Add error handler for images
        img.onerror = function() {
            const fileName = img.src.split('/').pop();
            
            // If it's a logo
            if (fileName.includes('logo')) {
                img.src = 'https://via.placeholder.com/150x100/242424/FFFFFF?text=WWE+Logo';
            } 
            // If it's a wrestler
            else if (fileName.includes('champion') || fileName.includes('superstar') || 
                    fileName.includes('wrestler') || fileName.includes('profile')) {
                img.src = 'https://via.placeholder.com/300x300/242424/FFFFFF?text=Superstar';
            }
            // If it's a championship belt
            else if (fileName.includes('title') || fileName.includes('belt') || 
                    fileName.includes('championship')) {
                img.src = 'https://via.placeholder.com/300x150/242424/FFD700?text=Championship';
            }
            // Generic image
            else {
                img.src = 'https://via.placeholder.com/300x200/242424/FFFFFF?text=WWE+Image';
            }
        };
        
        // Force the error handler to run if the image was already broken
        if (img.complete && img.naturalHeight === 0) {
            img.onerror();
        }
    });

    // Enhance focus styles for accessibility
    const style2 = document.createElement('style');
    style2.textContent = `
        :focus {
            outline: 3px solid var(--primary-red);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style2);
});