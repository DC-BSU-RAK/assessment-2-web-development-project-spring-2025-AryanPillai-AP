// Roster functionality for WWE brand pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize roster filtering
    initRosterFilter();

    // Function to initialize roster filtering
    function initRosterFilter() {
        const filterButtons = document.querySelectorAll('.roster-filter .filter-btn');
        const superstarCards = document.querySelectorAll('.superstar-card');
        
        if (!filterButtons.length || !superstarCards.length) return;

        // Show all superstars initially
        filterSuperstars('all');

        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter superstars
                filterSuperstars(filterValue);
            });
        });

        // Function to filter superstars
        function filterSuperstars(category) {
            superstarCards.forEach(card => {
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

    // Add animation to roster cards
    function animateRosterCards() {
        const cards = document.querySelectorAll('.superstar-card');
        
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

    // Initialize roster card animations
    animateRosterCards();

    // Add styles for roster card animations
    const style = document.createElement('style');
    style.textContent = `
        .superstar-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .superstar-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .superstar-card:nth-child(3n+1) {
            transition-delay: 0.1s;
        }
        
        .superstar-card:nth-child(3n+2) {
            transition-delay: 0.3s;
        }
        
        .superstar-card:nth-child(3n+3) {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);

    // Add additional interaction to superstar cards
    const superstarCards = document.querySelectorAll('.superstar-card');
    
    superstarCards.forEach(card => {
        // Add click functionality to view more details
        card.addEventListener('click', function() {
            const superstarName = this.querySelector('h3').textContent;
            const superstarImage = this.querySelector('img').src;
            const superstarNickname = this.querySelector('p').textContent;
            
            showSuperstarModal(superstarName, superstarImage, superstarNickname);
        });
    });

    // Function to show superstar modal
    function showSuperstarModal(name, image, nickname) {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        const modalImage = document.createElement('div');
        modalImage.className = 'modal-image';
        modalImage.innerHTML = `<img src="${image}" alt="${name}">`;
        
 const superstars = {
  "Cody Rhodes": {
    nickname: "The American Nightmare",
    brand: "Raw",
    signatureMove: "Cross Rhodes, Cody Cutter",
    championships: "WWE Champion, Intercontinental Champion, Tag Team Champion",
    bio: "Cody Rhodes is a second-generation WWE Superstar and the son of Dusty Rhodes. He returned to WWE to finish his story and capture the WWE Championship."
  },
  "Seth Rollins": {
    nickname: "The Visionary",
    brand: "Raw",
    signatureMove: "Curb Stomp, Pedigree",
    championships: "World Heavyweight Champion, Universal Champion, Tag Team Champion",
    bio: "Seth Rollins is one of the most decorated Superstars in WWE history, known for his charisma, in-ring ability, and unforgettable moments."
  },
  "Gunther": {
    nickname: "The Ring General",
    brand: "Raw",
    signatureMove: "Powerbomb, Chop Barrage",
    championships: "Intercontinental Champion (longest-reigning), NXT UK Champion",
    bio: "Gunther is known for his dominant, hard-hitting style and is the longest-reigning Intercontinental Champion in WWE history."
  },
  "CM Punk": {
    nickname: "The Best in the World",
    brand: "Raw",
    signatureMove: "GTS (Go to Sleep)",
    championships: "WWE Champion, World Heavyweight Champion",
    bio: "CM Punk is a rebellious icon who returned to WWE after nearly a decade away, reigniting his mission to prove he's still the best in the world."
  },
  "Becky Lynch": {
    nickname: "The Man",
    brand: "Raw",
    signatureMove: "Dis-Arm-Her, Manhandle Slam",
    championships: "Raw Women's Champion, SmackDown Women's Champion, NXT Women's Champion",
    bio: "Becky Lynch is a trailblazer in women's wrestling and the first woman to main event WrestleMania. She continues to lead the charge in WWE."
  },
  "Liv Morgan": {
    nickname: "Liv Forever",
    brand: "Raw",
    signatureMove: "Oblivion",
    championships: "SmackDown Women's Champion, Women's Tag Team Champion",
    bio: "Liv Morgan is an underdog fan favorite who has fought her way to championship gold through determination and heart."
  },
  "Rhea Ripley": {
    nickname: "The Eradicator",
    brand: "Raw",
    signatureMove: "Riptide, Prism Lock",
    championships: "Women's World Champion, NXT Women's Champion",
    bio: "Rhea Ripley is a dominant powerhouse. She is known for her intense style and commanding presence."
  },
  "Iyo Sky": {
    nickname: "The Genius of the Sky",
    brand: "Raw",
    signatureMove: "Moonsault, Over the Moonsault",
    championships: "WWE Women's Champion, NXT Women's Champion, Tag Team Champion",
    bio: "Iyo Sky is one of the most gifted high-flyers in WWE. She has held multiple championships and wowed crowds with her aerial offense."
  },
  "The Judgement Day": {
    nickname: "—",
    brand: "Raw",
    signatureMove: "Various (Finn Bálor – Coup de Grâce)",
    championships: "Tag Team Champions",
    bio: "The Judgment Day is a powerful faction featuring Finn Bálor, Liv Morgan, Carlito, and Dominik Mysterio. They dominate Raw with strength and intimidation."
  },
  "The New Day": {
    nickname: "—",
    brand: "Raw",
    signatureMove: "Midnight Hour, Trouble in Paradise (Kofi), Big Ending (Big E)",
    championships: "Multiple-time Tag Team Champions",
    bio: "The New Day (Kofi Kingston, Xavier Woods, and Big E) are one of the most decorated and beloved tag teams in WWE history, known for their positivity and teamwork."
  },
  "Roman Reigns": {
    nickname: "The Tribal Chief",
    brand: "SmackDown",
    signatureMove: "Spear, Guillotine",
    championships: "Undisputed WWE Universal Champion, Tag Team Champion",
    bio: "Roman Reigns leads The Bloodline and is one of WWE’s most dominant champions. With an iconic reign as Universal Champion, he demands acknowledgment."
  },
  "LA Knight": {
    nickname: "The Megastar",
    brand: "SmackDown",
    signatureMove: "BFT (Blunt Force Trauma)",
    championships: "United States Champion",
    bio: "LA Knight is a fast-rising star known for his charisma and catchphrases. With crowd support and sharp mic skills, he’s quickly become a fan favorite. YEAH!"
  },
  "Drew McIntyre": {
    nickname: "The Scottish Warrior",
    brand: "Raw",
    signatureMove: "Claymore Kick, Future Shock DDT",
    championships: "WWE Champion, Intercontinental Champion, Tag Team Champion",
    bio: "Drew McIntyre is a powerful competitor who carried WWE through the pandemic era and seeks to reclaim world championship gold."
  },
  "Kevin Owens": {
    nickname: "KO",
    brand: "SmackDown",
    signatureMove: "Stunner, Pop-up Powerbomb",
    championships: "Universal Champion, Intercontinental Champion, Tag Team Champion",
    bio: "Kevin Owens is a fierce brawler with a passion for fighting and loyalty to his allies. He is a fan-favorite who always brings intensity."
  },
  "Bianca Belair": {
    nickname: "The EST of WWE",
    brand: "SmackDown",
    signatureMove: "KOD (Kiss of Death), 450 Splash",
    championships: "Raw Women's Champion, SmackDown Women's Champion",
    bio: "Bianca Belair is a dominant athlete known for her strength, speed, and confidence. She continues to raise the bar in women's wrestling."
  },
  "Chelsea Green": {
    nickname: "The Hot Mess",
    brand: "SmackDown",
    signatureMove: "I'm Prettier",
    championships: "Women's Tag Team Champion, Women's United States Champion",
    bio: "Chelsea Green is brash, bold, and always ready to stir things up. She brings drama and chaos wherever she goes."
  },
  "Alexa Bliss": {
    nickname: "Five Feet of Fury",
    brand: "Raw",
    signatureMove: "Twisted Bliss, DDT",
    championships: "Raw Women's Champion, SmackDown Women's Champion, Women's Tag Team Champion",
    bio: "Alexa Bliss blends charisma with ruthlessness. She's a multiple-time champion and a standout performer in WWE's women's division."
  },
  "Tiffany Stratton": {
    nickname: "The Center of the Universe",
    brand: "SmackDown",
    signatureMove: "Prettiest Moonsault Ever",
    championships: "NXT Women's Champion, Women's Champion",
    bio: "Tiffany Stratton is a rising star with glam and grit. She's making waves in WWE with her athleticism and confidence."
  },
  "Fraxiom": {
    nickname: "—",
    brand: "SmackDown",
    signatureMove: "High-flying combo attacks",
    championships: "NXT Tag Team Champions",
    bio: "Fraxiom is a mysterious and dynamic competitor bringing speed and unpredictability to the WWE landscape."
  },
  "Street Profits": {
    nickname: "—",
    brand: "SmackDown",
    signatureMove: "Sky High Frog Splash (Ford), Spinebuster (Dawkins)",
    championships: "Raw, SmackDown, and NXT Tag Team Champions",
    bio: "The Street Profits (Montez Ford and Angelo Dawkins) bring unmatched energy and charisma to the ring. They’ve held tag titles across all WWE brands."
  }
};


const data = superstars[name]; // Lookup superstar info

const modalInfo = document.createElement('div');
modalInfo.className = 'modal-info';

modalInfo.innerHTML = `
  <h2>${name}</h2>
  <p class="nickname">${data.nickname}</p>
  <div class="superstar-stats">
    <div class="stat-item">
      <span class="stat-label">Brand:</span>
      <span class="stat-value">${data.brand}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Signature Move:</span>
      <span class="stat-value">${data.signatureMove}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Championships:</span>
      <span class="stat-value">${data.championships}</span>
    </div>
  </div>
  <p class="bio">${data.bio}</p>
`;


        // Assemble modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalImage);
        modalContent.appendChild(modalInfo);
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

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
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
            display: flex;
            flex-direction: column;
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
        
        .modal-image {
            width: 100%;
            height: 300px;
            overflow: hidden;
        }
        
        .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .modal-info {
            padding: var(--spacing-lg);
        }
        
        .modal-info h2 {
            margin-bottom: var(--spacing-xs);
            color: var(--primary-black);
        }
        
        .modal-info .nickname {
            font-style: italic;
            color: var(--gray);
            margin-bottom: var(--spacing-md);
        }
        
        .superstar-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
            border-top: 1px solid var(--light-gray);
            border-bottom: 1px solid var(--light-gray);
            padding: var(--spacing-md) 0;
        }
        
        .stat-item {
            display: flex;
            flex-direction: column;
        }
        
        .stat-label {
            font-weight: 700;
            color: var(--primary-red);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .stat-value {
            color: var(--dark-gray);
        }
        
        .bio {
            line-height: 1.6;
        }
        
        @media (min-width: 768px) {
            .modal-content {
                flex-direction: row;
            }
            
            .modal-image {
                width: 40%;
                height: auto;
            }
            
            .modal-info {
                width: 60%;
            }
        }
        
        @media (max-width: 767px) {
            .modal-image {
                height: 200px;
            }
            
            .superstar-stats {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(modalStyle);

    // Update cursor for superstar cards to indicate they're clickable
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .superstar-card {
            cursor: pointer;
        }
    `;
    document.head.appendChild(cursorStyle);
});