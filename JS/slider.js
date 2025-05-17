// Slider functionality for the WWE website

document.addEventListener('DOMContentLoaded', function() {
    // Function to create sliders
    function createSlider(sliderSelector, options = {}) {
        const sliderContainer = document.querySelector(sliderSelector);
        if (!sliderContainer) return;

        const slides = sliderContainer.children;
        if (slides.length <= 1) return;

        // Default options
        const defaultOptions = {
            autoplay: true,
            autoplaySpeed: 5000,
            showDots: true,
            showArrows: true,
            slidesToShow: 1
        };

        // Merge default options with provided options
        const sliderOptions = {...defaultOptions, ...options};
        
        // Calculate how many slides to show based on viewport width
        let slidesToShow = sliderOptions.slidesToShow;
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 992 && slidesToShow > 2) {
            slidesToShow = 2;
        }

        // Create slider wrapper
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        sliderContainer.parentNode.insertBefore(sliderWrapper, sliderContainer);
        sliderWrapper.appendChild(sliderContainer);

        // Add slider class to container
        sliderContainer.classList.add('slider-container');

        // Set initial state
        let currentSlide = 0;
        let slideWidth = 100 / slidesToShow;
        let touchStartX = 0;
        let touchEndX = 0;

        // Create controls container
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'slider-controls';
        sliderWrapper.appendChild(controlsContainer);

        // Create navigation arrows
        if (sliderOptions.showArrows) {
            const prevButton = document.createElement('button');
            prevButton.className = 'slider-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.setAttribute('aria-label', 'Previous slide');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'slider-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.setAttribute('aria-label', 'Next slide');
            
            controlsContainer.appendChild(prevButton);
            controlsContainer.appendChild(nextButton);
            
            prevButton.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
            
            nextButton.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }

        // Create navigation dots
        if (sliderOptions.showDots) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            controlsContainer.appendChild(dotsContainer);
            
            for (let i = 0; i < slides.length - slidesToShow + 1; i++) {
                const dot = document.createElement('button');
                dot.className = i === 0 ? 'slider-dot active' : 'slider-dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
            }
        }

        // Function to go to a specific slide
        function goToSlide(index) {
            // Handle looping
            if (index < 0) {
                index = slides.length - slidesToShow;
            } else if (index > slides.length - slidesToShow) {
                index = 0;
            }
            
            currentSlide = index;
            updateSlider();
        }

        // Function to update slider position and controls
        function updateSlider() {
            // Update slider position
            sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Update dots
            if (sliderOptions.showDots) {
                const dots = controlsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }
        }

        // Set up autoplay
        let autoplayInterval;
        
        function startAutoplay() {
            if (sliderOptions.autoplay) {
                autoplayInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, sliderOptions.autoplaySpeed);
            }
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Add touch support for mobile devices
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                goToSlide(currentSlide + 1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                goToSlide(currentSlide - 1);
            }
        }

        // Pause autoplay on hover
        sliderWrapper.addEventListener('mouseenter', stopAutoplay);
        sliderWrapper.addEventListener('mouseleave', startAutoplay);

        // Apply styles to the slider
        const style = document.createElement('style');
        style.textContent = `
            .slider-wrapper {
                position: relative;
                overflow: hidden;
                margin-bottom: 20px;
            }
            
            .slider-container {
                display: flex;
                transition: transform 0.5s ease;
                width: ${100 * (slides.length / slidesToShow)}%;
            }
            
            .slider-container > * {
                flex: 0 0 ${slideWidth}%;
                padding: 0 10px;
                box-sizing: border-box;
            }
            
            .slider-controls {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
            }
            
            .slider-prev, .slider-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--primary-red);
                color: var(--primary-white);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                z-index: 1;
                transition: background-color 0.3s, transform 0.3s;
            }
            
            .slider-prev {
                left: 10px;
            }
            
            .slider-next {
                right: 10px;
            }
            
            .slider-prev:hover, .slider-next:hover {
                background-color: var(--secondary-red);
                transform: translateY(-50%) scale(1.1);
            }
            
            .slider-dots {
                display: flex;
                justify-content: center;
                gap: 8px;
            }
            
            .slider-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: var(--light-gray);
                border: none;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.3s;
            }
            
            .slider-dot.active {
                background-color: var(--primary-red);
            }
            
            .slider-dot:hover {
                transform: scale(1.2);
            }
            
            @media (max-width: 767px) {
                .slider-prev, .slider-next {
                    width: 30px;
                    height: 30px;
                    font-size: 0.8rem;
                }
                
                .slider-container > * {
                    flex: 0 0 100%;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize slider
        updateSlider();
        startAutoplay();

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate how many slides to show
            let newSlidesToShow = sliderOptions.slidesToShow;
            if (window.innerWidth < 768) {
                newSlidesToShow = 1;
            } else if (window.innerWidth < 992 && newSlidesToShow > 2) {
                newSlidesToShow = 2;
            }
            
            // Only update if slidesToShow changed
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                slideWidth = 100 / slidesToShow;
                
                // Update styles
                document.head.removeChild(style);
                style.textContent = `
                    .slider-wrapper {
                        position: relative;
                        overflow: hidden;
                        margin-bottom: 20px;
                    }
                    
                    .slider-container {
                        display: flex;
                        transition: transform 0.5s ease;
                        width: ${100 * (slides.length / slidesToShow)}%;
                    }
                    
                    .slider-container > * {
                        flex: 0 0 ${slideWidth}%;
                        padding: 0 10px;
                        box-sizing: border-box;
                    }
                    
                    .slider-controls {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 20px;
                    }
                    
                    .slider-prev, .slider-next {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: var(--primary-red);
                        color: var(--primary-white);
                        border: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                        z-index: 1;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    
                    .slider-prev {
                        left: 10px;
                    }
                    
                    .slider-next {
                        right: 10px;
                    }
                    
                    .slider-prev:hover, .slider-next:hover {
                        background-color: var(--secondary-red);
                        transform: translateY(-50%) scale(1.1);
                    }
                    
                    .slider-dots {
                        display: flex;
                        justify-content: center;
                        gap: 8px;
                    }
                    
                    .slider-dot {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: var(--light-gray);
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    
                    .slider-dot.active {
                        background-color: var(--primary-red);
                    }
                    
                    .slider-dot:hover {
                        transform: scale(1.2);
                    }
                    
                    @media (max-width: 767px) {
                        .slider-prev, .slider-next {
                            width: 30px;
                            height: 30px;
                            font-size: 0.8rem;
                        }
                        
                        .slider-container > * {
                            flex: 0 0 100%;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                // Reset current slide if necessary
                if (currentSlide > slides.length - slidesToShow) {
                    currentSlide = slides.length - slidesToShow;
                }
                
                // Update dots if needed
                if (sliderOptions.showDots) {
                    const dotsContainer = controlsContainer.querySelector('.slider-dots');
                    dotsContainer.innerHTML = '';
                    
                    for (let i = 0; i < slides.length - slidesToShow + 1; i++) {
                        const dot = document.createElement('button');
                        dot.className = i === currentSlide ? 'slider-dot active' : 'slider-dot';
                        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                        dotsContainer.appendChild(dot);
                        
                        dot.addEventListener('click', () => {
                            goToSlide(i);
                        });
                    }
                }
                
                updateSlider();
            }
        });
    }

    // Initialize sliders
    createSlider('.champions-slider', {
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3
    });

    // Initialize other sliders if they exist
    const sliders = [
        { selector: '.top-matches-slider', options: { slidesToShow: 3 } },
        { selector: '.testimonials-slider', options: { autoplaySpeed: 6000 } }
    ];

    sliders.forEach(slider => {
        if (document.querySelector(slider.selector)) {
            createSlider(slider.selector, slider.options);
        }
    });
});