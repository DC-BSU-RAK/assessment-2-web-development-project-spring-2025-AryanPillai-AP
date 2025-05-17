// Titles page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize title filtering
    initTitleFilter();
    
    // Initialize timeline tabs
    initTimelineTabs();

    // Function to initialize title filtering
    function initTitleFilter() {
        const filterButtons = document.querySelectorAll('.title-filters .filter-btn');
        const titleCards = document.querySelectorAll('.title-card');
        
        if (!filterButtons.length || !titleCards.length) return;

        // Show all titles initially
        filterTitles('all');

        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter titles
                filterTitles(filterValue);
            });
        });

        // Function to filter titles
        function filterTitles(category) {
            titleCards.forEach(card => {
                if (category === 'all' || 
                    card.getAttribute('data-brand') === category || 
                    card.getAttribute('data-type') === category) {
                    // Show card with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide card with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    // Function to initialize timeline tabs
    function initTimelineTabs() {
        const timelineTabs = document.querySelectorAll('.timeline-tab');
        const timelineContents = document.querySelectorAll('.timeline-content');
        
        if (!timelineTabs.length || !timelineContents.length) return;

        // Add click event to timeline tabs
        timelineTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                timelineTabs.forEach(tab => tab.classList.remove('active'));
                timelineContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get timeline ID
                const timelineId = this.getAttribute('data-timeline');
                
                // Show corresponding timeline content
                document.getElementById(`${timelineId}-timeline`).classList.add('active');
            });
        });
    }

    // Add animation to title cards
    function animateTitleCards() {
        const cards = document.querySelectorAll('.title-card');
        
        if (!cards.length) return;
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Initialize title card animations
    animateTitleCards();

    // Add styles for title card animations
    const style = document.createElement('style');
    style.textContent = `
        .title-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease, display 0s 0.5s;
        }
        
        .title-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .title-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .title-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .title-card:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
});