// Reviews page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize reviews filtering
    initReviewsFilter();
    
    // Initialize star rating selector in review form
    initStarRating();
    
    // Initialize review form submission
    initReviewForm();
    
    // Initialize load more functionality
    initLoadMore();

    // Function to initialize reviews filtering
    function initReviewsFilter() {
        const filterButtons = document.querySelectorAll('.review-filters .filter-btn');
        const reviewCards = document.querySelectorAll('.review-card');
        
        if (!filterButtons.length || !reviewCards.length) return;

        // Show all reviews initially
        filterReviews('all');

        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter reviews
                filterReviews(filterValue);
            });
        });

        // Function to filter reviews
        function filterReviews(category) {
            reviewCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
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

    // Function to initialize star rating selector
    function initStarRating() {
        const ratingStars = document.querySelectorAll('.rating-select i');
        
        if (!ratingStars.length) return;

        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Highlight stars up to the hovered one
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                // Restore original state
                ratingStars.forEach(s => {
                    if (s.classList.contains('active')) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Set active stars
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
                
                // Store the rating value (for form submission)
                document.querySelector('.rating-select').setAttribute('data-selected-rating', rating);
            });
        });
    }

    // Function to initialize review form submission
    function initReviewForm() {
        const reviewForm = document.getElementById('review-form');
        
        if (!reviewForm) return;

        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('review-name').value;
            const event = document.getElementById('review-event').value;
            const ratingSelector = document.querySelector('.rating-select');
            const rating = ratingSelector.getAttribute('data-selected-rating') || '0';
            const reviewText = document.getElementById('review-text').value;
            
            // Validate form
            if (!name || !event || rating === '0' || !reviewText) {
                showNotification('Please fill in all fields and select a rating', 'error');
                return;
            }
            
            // Create new review (in a real app, this would be sent to a server)
            addNewReview(name, event, rating, reviewText);
            
            // Clear form
            reviewForm.reset();
            ratingSelector.querySelectorAll('i').forEach(star => {
                star.classList.remove('active', 'fas');
                star.classList.add('far');
            });
            ratingSelector.removeAttribute('data-selected-rating');
            
            // Show success message
            showNotification('Your review has been submitted', 'success');
        });
    }

    // Function to add a new review to the page
    function addNewReview(name, event, rating, text) {
        // Create new review element
        const reviewsContainer = document.querySelector('.community-reviews');
        const newReview = document.createElement('div');
        newReview.className = 'user-review';
        
        // Get current date
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
        
        // Generate stars HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        // Set review HTML
        newReview.innerHTML = `
            <div class="user-avatar">
                <img src="images/user-avatar-new.png" alt="User Avatar">
            </div>
            <div class="user-review-content">
                <div class="user-review-header">
                    <h4>${name}</h4>
                    <div class="user-rating">
                        ${starsHtml}
                        <span>${rating}/5</span>
                    </div>
                </div>
                <h5>${event}</h5>
                <p>${text}</p>
                <div class="review-date">${formattedDate}</div>
            </div>
        `;
        
        // Add new review to the container
        const firstReview = reviewsContainer.querySelector('.user-review');
        reviewsContainer.insertBefore(newReview, firstReview);
        
        // Add animation
        newReview.style.opacity = '0';
        newReview.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            newReview.style.opacity = '1';
            newReview.style.transform = 'translateY(0)';
        }, 10);
    }

    // Function to show notification message
    function showNotification(message, type = 'info') {
        // Check if notification container exists, create if not
        let notifContainer = document.querySelector('.notification-container');
        
        if (!notifContainer) {
            notifContainer = document.createElement('div');
            notifContainer.className = 'notification-container';
            document.body.appendChild(notifContainer);
            
            // Add styles for notifications
            const notifStyle = document.createElement('style');
            notifStyle.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .notification {
                    padding: 15px 20px;
                    border-radius: 4px;
                    color: white;
                    font-weight: 500;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    min-width: 300px;
                    max-width: 400px;
                    transition: all 0.3s ease;
                    transform: translateX(100%);
                    opacity: 0;
                }
                
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .notification-icon {
                    margin-right: 10px;
                    font-size: 1.2rem;
                }
                
                .notification-message {
                    flex: 1;
                }
                
                .notification-close {
                    cursor: pointer;
                    margin-left: 10px;
                }
                
                .notification.info {
                    background-color: #3498db;
                }
                
                .notification.success {
                    background-color: #2ecc71;
                }
                
                .notification.error {
                    background-color: #e74c3c;
                }
                
                @media (max-width: 767px) {
                    .notification-container {
                        top: 10px;
                        right: 10px;
                        left: 10px;
                    }
                    
                    .notification {
                        min-width: unset;
                        max-width: unset;
                        width: 100%;
                    }
                }
            `;
            document.head.appendChild(notifStyle);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        // Add notification to container
        notifContainer.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
        
        function closeNotification(notif) {
            notif.classList.remove('show');
            setTimeout(() => {
                notifContainer.removeChild(notif);
            }, 300);
        }
    }

    // Function to initialize load more functionality
    function initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading delay (in a real app, this would be an API call)
            setTimeout(() => {
                // Load more reviews
                loadMoreReviews();
                
                // Reset button state
                this.innerHTML = 'Load More Reviews';
                this.disabled = false;
            }, 1000);
        });
    }

    // Function to load more reviews
    function loadMoreReviews() {
        const reviewsGrid = document.querySelector('.reviews-grid');
        
        if (!reviewsGrid) return;
        
        // Sample data for additional reviews (in a real app, this would come from an API)
        const additionalReviews = [
            {
                category: 'ppv',
                image: 'images/elimination-chamber-review.png',
                title: 'Elimination Chamber 2024',
                rating: 3.5,
                description: 'A solid premium live event with some standout matches, but the main event failed to deliver.',
                date: 'February 18, 2024'
            },
            {
                category: 'raw',
                image: 'images/raw-review2.png',
                title: 'Monday Night Raw - October 21, 2024',
                rating: 4,
                description: 'An excellent episode with multiple high-quality matches and compelling story developments.',
                date: 'October 22, 2024'
            },
            {
                category: 'smackdown',
                image: 'images/smackdown-review2.png',
                title: 'Friday Night SmackDown - October 18, 2024',
                rating: 3,
                description: 'A somewhat lackluster episode with few memorable moments, though the main event was solid.',
                date: 'October 19, 2024'
            }
        ];
        
        // Create and add new review cards
        additionalReviews.forEach(review => {
            const stars = getStarsHTML(review.rating);
            
            const newReview = document.createElement('div');
            newReview.className = 'review-card';
            newReview.setAttribute('data-category', review.category);
            newReview.style.opacity = '0';
            newReview.style.transform = 'translateY(20px)';
            
            newReview.innerHTML = `
                <div class="review-card-image">
                    <img src="${review.image}" alt="${review.title}">
                    <span class="review-category ${review.category}">${getCategoryName(review.category)}</span>
                </div>
                <div class="review-card-content">
                    <h3>${review.title}</h3>
                    <div class="rating">
                        <span class="stars">
                            ${stars}
                        </span>
                        <span class="rating-score">${review.rating}/5</span>
                    </div>
                    <p>${review.description}</p>
                    <div class="review-meta-bottom">
                        <span class="review-date">${review.date}</span>
                        <a href="#" class="read-more">Read More</a>
                    </div>
                </div>
            `;
            
            reviewsGrid.appendChild(newReview);
            
            // Animate new review card
            setTimeout(() => {
                newReview.style.opacity = '1';
                newReview.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Function to get stars HTML based on rating
        function getStarsHTML(rating) {
            let html = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    html += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= rating) {
                    html += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    html += '<i class="far fa-star"></i>';
                }
            }
            return html;
        }
        
        // Function to get category display name
        function getCategoryName(category) {
            switch (category) {
                case 'ppv':
                    return 'Premium Live Event';
                case 'raw':
                    return 'Raw';
                case 'smackdown':
                    return 'SmackDown';
                case 'nxt':
                    return 'NXT';
                default:
                    return 'WWE';
            }
        }
    }

    // Enhanced interaction for review cards
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        // Scale effect on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click functionality to view full review
        const readMoreLink = card.querySelector('.read-more');
        
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const title = card.querySelector('h3').textContent;
                const rating = card.querySelector('.rating-score').textContent;
                const category = card.querySelector('.review-category').textContent;
                const image = card.querySelector('img').src;
                
                showFullReviewModal(title, rating, category, image);
            });
        }
    });

    // Function to show full review modal
    function showFullReviewModal(title, rating, category, image) {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content review-modal';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        // Create full review content
        modalBody.innerHTML = `
            <div class="review-header">
                <h2>${title}</h2>
                <div class="review-meta-info">
                    <span class="review-category-badge">${category}</span>
                    <div class="rating">
                        <span class="stars">
                            ${getRatingStars(rating)}
                        </span>
                        <span class="rating-score">${rating}</span>
                    </div>
                    <span class="review-date">October 29, 2024</span>
                </div>
            </div>
            
            <div class="review-image">
                <img src="${image}" alt="${title}">
            </div>
            
            <div class="review-content">
                <p>This is a placeholder for the full review content. In a real implementation, this would contain the complete review text with detailed analysis of the event or show.</p>
                
                <p>The review would typically cover various aspects such as match quality, storyline developments, crowd reactions, production value, and overall entertainment value.</p>
                
                <h3>Match Ratings</h3>
                
                <div class="match-ratings-table">
                    <div class="match-rating-row">
                        <div class="match-name">Opening Match</div>
                        <div class="match-rating-stars">
                            <span class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <i class="far fa-star"></i>
                            </span>
                            <span>3.5/5</span>
                        </div>
                    </div>
                    <div class="match-rating-row">
                        <div class="match-name">Mid-Card Championship Match</div>
                        <div class="match-rating-stars">
                            <span class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </span>
                            <span>4.5/5</span>
                        </div>
                    </div>
                    <div class="match-rating-row">
                        <div class="match-name">Tag Team Match</div>
                        <div class="match-rating-stars">
                            <span class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </span>
                            <span>3/5</span>
                        </div>
                    </div>
                    <div class="match-rating-row">
                        <div class="match-name">Main Event</div>
                        <div class="match-rating-stars">
                            <span class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </span>
                            <span>5/5</span>
                        </div>
                    </div>
                </div>
                
                <h3>Pros</h3>
                <ul>
                    <li>Excellent in-ring action throughout the show</li>
                    <li>Strong character development for several superstars</li>
                    <li>Surprising and well-executed ending</li>
                    <li>Great crowd reactions enhancing the atmosphere</li>
                </ul>
                
                <h3>Cons</h3>
                <ul>
                    <li>Some segments felt unnecessarily long</li>
                    <li>A few missed opportunities in storyline progression</li>
                    <li>Production issues in one match</li>
                </ul>
                
                <h3>Conclusion</h3>
                <p>Overall, this was a strong showing that advanced multiple storylines and delivered excellent in-ring action. While not perfect, the positives far outweighed the negatives, making this a must-watch for WWE fans.</p>
                
                <div class="review-author">
                    <img src="images/reviewer-avatar.png" alt="Reviewer">
                    <div>
                        <h4>Review by: John Smith</h4>
                        <p>Senior Wrestling Analyst</p>
                    </div>
                </div>
            </div>
            
            <div class="user-comments-section">
                <h3>Fan Comments</h3>
                <div class="comment-form">
                    <textarea placeholder="Share your thoughts on this review..."></textarea>
                    <button class="btn btn-primary">Submit Comment</button>
                </div>
                <div class="comments-list">
                    <div class="comment">
                        <img src="images/user-avatar.png" alt="User">
                        <div>
                            <h4>Michael Thompson <span>October 30, 2024</span></h4>
                            <p>I completely agree with this review. The main event was absolutely incredible and possibly the match of the year!</p>
                        </div>
                    </div>
                    <div class="comment">
                        <img src="images/user-avatar2.png" alt="User">
                        <div>
                            <h4>Sarah Johnson <span>October 29, 2024</span></h4>
                            <p>I thought the opening match deserved at least 4 stars. The technical wrestling was top notch and the crowd was really into it.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Assemble modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modalOverlay.appendChild(modalContent);
        
        // Add modal to the document
        document.body.appendChild(modalOverlay);
        
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);
        
        // Close modal when clicking close button or outside the modal
        closeButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        function closeModal() {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Helper function to generate stars HTML from rating string
    function getRatingStars(ratingText) {
        const rating = parseFloat(ratingText);
        let html = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                html += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }
        
        return html;
    }

    // Add modal styles
    const reviewModalStyle = document.createElement('style');
    reviewModalStyle.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: var(--primary-white);
            border-radius: var(--border-radius-md);
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .modal-overlay.active .modal-content {
            transform: translateY(0);
            opacity: 1;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: var(--primary-red);
            color: var(--primary-white);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1;
            transition: background-color 0.3s ease;
        }
        
        .modal-close:hover {
            background-color: var(--secondary-red);
        }
        
        .review-modal .modal-body {
            padding: 0;
        }
        
        .review-header {
            padding: var(--spacing-lg);
            border-bottom: 1px solid var(--light-gray);
        }
        
        .review-header h2 {
            margin-bottom: var(--spacing-sm);
        }
        
        .review-meta-info {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: var(--spacing-md);
        }
        
        .review-category-badge {
            display: inline-block;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: var(--border-radius-sm);
            color: var(--primary-white);
            background-color: var(--primary-red);
        }
        
        .review-date {
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .review-image {
            width: 100%;
            height: 400px;
            overflow: hidden;
        }
        
        .review-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .review-content {
            padding: var(--spacing-lg);
        }
        
        .review-content p {
            margin-bottom: var(--spacing-md);
            line-height: 1.6;
        }
        
        .review-content h3 {
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-md);
            padding-bottom: var(--spacing-xs);
            border-bottom: 2px solid var(--light-gray);
        }
        
        .match-ratings-table {
            margin-bottom: var(--spacing-lg);
        }
        
        .match-rating-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-sm) 0;
            border-bottom: 1px dashed var(--light-gray);
        }
        
        .match-rating-row:last-child {
            border-bottom: none;
        }
        
        .match-name {
            font-weight: 600;
        }
        
        .match-rating-stars {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .match-rating-stars .stars {
            color: var(--gold);
        }
        
        .review-content ul {
            margin-bottom: var(--spacing-lg);
            padding-left: var(--spacing-lg);
        }
        
        .review-content ul li {
            margin-bottom: var(--spacing-sm);
        }
        
        .review-author {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-top: var(--spacing-xl);
            padding-top: var(--spacing-md);
            border-top: 1px solid var(--light-gray);
        }
        
        .review-author img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .review-author h4 {
            margin-bottom: var(--spacing-xs);
        }
        
        .review-author p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .user-comments-section {
            padding: var(--spacing-lg);
            background-color: var(--secondary-white);
            border-top: 1px solid var(--light-gray);
        }
        
        .user-comments-section h3 {
            margin-bottom: var(--spacing-lg);
        }
        
        .comment-form {
            margin-bottom: var(--spacing-lg);
        }
        
        .comment-form textarea {
            width: 100%;
            height: 100px;
            padding: var(--spacing-sm);
            border: 1px solid var(--light-gray);
            border-radius: var(--border-radius-sm);
            margin-bottom: var(--spacing-sm);
            font-family: var(--font-body);
            resize: vertical;
        }
        
        .comments-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .comment {
            display: flex;
            gap: var(--spacing-md);
        }
        
        .comment img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .comment h4 {
            margin-bottom: var(--spacing-xs);
            font-size: 1rem;
        }
        
        .comment h4 span {
            font-weight: 400;
            font-size: 0.8rem;
            color: var(--gray);
            margin-left: var(--spacing-sm);
        }
        
        .comment p {
            margin: 0;
            font-size: 0.9rem;
        }
        
        @media (max-width: 767px) {
            .review-meta-info {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-sm);
            }
            
            .review-image {
                height: 200px;
            }
            
            .review-author {
                flex-direction: column;
                align-items: flex-start;
                text-align: center;
            }
            
            .match-rating-row {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-xs);
            }
            
            .comment {
                flex-direction: column;
            }
            
            .comment img {
                width: 40px;
                height: 40px;
            }
        }
    `;
    document.head.appendChild(reviewModalStyle);
});