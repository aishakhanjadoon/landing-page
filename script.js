

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Custom Cursor Logic --- */
    const customCursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], .btn-discover, .menu-item-card, .blog-post-card, .menu-cat-btn, .social-links img'
    );

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hovered'));
    });

    /* --- 2. Hero Section Parallax/Mouse-move Effect --- */
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-visual-container .hero-image');

    if (heroSection && heroImage) {
        heroSection.addEventListener('mousemove', (e) => {
            const speed = 0.02;
            const x = (window.innerWidth / 2 - e.clientX) * speed;
            const y = (window.innerHeight / 2 - e.clientY) * speed;
            heroImage.style.transform = `translate(-50%, -50%) perspective(500px) rotateY(${x / 5}deg) rotateX(${-y / 5}deg) translate(${x}px, ${y}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImage.style.transform = `translate(-50%, -50%) perspective(500px) rotateY(0deg) rotateX(0deg) translate(0px, 0px)`;
        });
    }

    /* --- 3. Scroll-triggered Animations (IntersectionObserver) --- */
    const scrollRevealItems = document.querySelectorAll('.scroll-reveal-item');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollRevealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        if (item.classList.contains('delay-1')) item.style.transitionDelay = '0.1s';
        if (item.classList.contains('delay-2')) item.style.transitionDelay = '0.2s';
        if (item.classList.contains('delay-3')) item.style.transitionDelay = '0.3s';
        if (item.classList.contains('delay-4')) item.style.transitionDelay = '0.4s';
        if (item.classList.contains('delay-5')) item.style.transitionDelay = '0.5s';
        scrollObserver.observe(item);
    });

    /* --- 4. Menu Category Filtering --- */
    const menuCatButtons = document.querySelectorAll('.menu-cat-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');

    menuCatButtons.forEach(button => {
        button.addEventListener('click', () => {
            menuCatButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;

            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInItem 0.5s ease-out forwards';
                } else {
                    item.style.animation = 'fadeOutItem 0.3s ease-out forwards';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    const styleSheet = document.styleSheets[0];
    const fadeInItemKeyframes = `@keyframes fadeInItem {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }`;
    const fadeOutItemKeyframes = `@keyframes fadeOutItem {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }`;
    
    const ruleExists = (ruleName) => {
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            if (styleSheet.cssRules[i].name === ruleName) {
                return true;
            }
        }
        return false;
    };

    if (!ruleExists('fadeInItem')) {
        styleSheet.insertRule(fadeInItemKeyframes, styleSheet.cssRules.length);
    }
    if (!ruleExists('fadeOutItem')) {
        styleSheet.insertRule(fadeOutItemKeyframes, styleSheet.cssRules.length);
    }


    /* --- 5. Smooth Scrolling for Navigation --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted!');
            const formData = new FormData(this);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const submitBtn = this.querySelector('.btn-submit');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#8cb39d';
            submitBtn.style.cursor = 'default';
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.cursor = 'none';
                this.reset();
            }, 3000);
        });
    }


    const starTrailContainer = document.getElementById('star-trail-container');
    if (starTrailContainer) {
        const mainStar = document.createElement('div');
        mainStar.classList.add('main-star');
        starTrailContainer.appendChild(mainStar);

     
        let currentX = window.innerWidth / 2; 
        let currentY = window.scrollY + window.innerHeight / 2; 

     
        let targetX = currentX;
        let targetY = currentY;
        let lastMoveTime = 0;
        const moveInterval = 4000; 
        const stardustEmitFrequency = 50;
        const stardustLife = 1800; 

        let lastStardustEmitTime = 0;

      
        function setNewTarget() {
           
           
            targetX = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.15; 
            targetY = Math.random() * document.body.scrollHeight * 0.7 + document.body.scrollHeight * 0.15;

          
            mainStar.style.transform = `translate(${targetX - mainStar.offsetWidth / 2}px, ${targetY - mainStar.offsetHeight / 2}px)`;
        }

   
        function emitStardust(x, y) {
            const stardust = document.createElement('div');
            stardust.classList.add('stardust');
            starTrailContainer.appendChild(stardust);

            
            const angle = Math.random() * Math.PI * 2; 
            const distance = Math.random() * 20 + 5; 
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            stardust.style.left = `${x}px`;
            stardust.style.top = `${y}px`;

           
            stardust.style.setProperty('--dx', `${dx}px`);
            stardust.style.setProperty('--dy', `${dy}px`);

          
            void stardust.offsetWidth;

            stardust.style.animation = `fadeOutAndShrink ${stardustLife / 1000}s ease-out forwards`;

      
            setTimeout(() => {
                stardust.remove();
            }, stardustLife + 50); 
        }

     
        function animateStarTrail(currentTime) {
            if (!lastMoveTime || currentTime - lastMoveTime > moveInterval) {
                setNewTarget();
                lastMoveTime = currentTime;
            }

    
            if (currentTime - lastStardustEmitTime > stardustEmitFrequency) {
                const starRect = mainStar.getBoundingClientRect();
        
                const emitX = starRect.left + window.scrollX + mainStar.offsetWidth / 2;
                const emitY = starRect.top + window.scrollY + mainStar.offsetHeight / 2;
                emitStardust(emitX, emitY);
                lastStardustEmitTime = currentTime;
            }

          
            requestAnimationFrame(animateStarTrail);
        }

      
        requestAnimationFrame(animateStarTrail);


        mainStar.style.transform = `translate(${currentX - mainStar.offsetWidth / 2}px, ${currentY - mainStar.offsetHeight / 2}px)`;

     
        const updateContainerHeight = () => {
            starTrailContainer.style.height = `${document.body.scrollHeight}px`;
        };

     
        updateContainerHeight();
        window.addEventListener('resize', updateContainerHeight);
    }
});