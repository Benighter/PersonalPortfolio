// Hamburger menu functionality
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

// Header background change on scroll
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// Mobile menu item click handling
menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});

// Projects carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const projectItems = document.querySelectorAll('.project-item');
    const totalProjects = projectItems.length - 3; // Subtract the duplicated items

    let currentIndex = 0;
    let itemWidth = projectItems[0].offsetWidth + 30; // 30px for gap

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function nextSlide() {
        if (currentIndex < totalProjects) {
            currentIndex++;
            updateCarousel();
        } else {
            // Smooth return to start
            currentIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Smooth jump to end
            currentIndex = totalProjects - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 50);
        }
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-scroll functionality
    let autoScrollInterval = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', () => autoScrollInterval = setInterval(nextSlide, 5000));

    // Touch swiping for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
        autoScrollInterval = setInterval(nextSlide, 5000);
    });

    // Adjust carousel on window resize
    window.addEventListener('resize', () => {
        itemWidth = projectItems[0].offsetWidth + 30;
        updateCarousel();
    });

    // View More button functionality
    const viewMoreButtons = document.querySelectorAll('.view-more');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// About section interactivity
document.addEventListener('DOMContentLoaded', function() {
    const jobTitle = document.querySelector('#about .job-title');
    const aboutText = document.querySelector('#about .about-text');
    const downloadButton = document.querySelector('#download-resume');

    jobTitle.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });

    jobTitle.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });

    aboutText.addEventListener('mouseover', function() {
        this.style.fontWeight = '500';
    });

    aboutText.addEventListener('mouseout', function() {
        this.style.fontWeight = '300';
    });

    // Simplified resume download functionality
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            // The default action (download) will proceed
            console.log('Initiating resume download');
        });
    }
});

// Skills carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#skills .carousel-container');
    const prevButton = document.querySelector('#skills .prev');
    const nextButton = document.querySelector('#skills .next');
    const skillItems = document.querySelectorAll('#skills .skill-item');
    const modal = document.querySelector('.skill-modal');
    const modalContent = document.querySelector('.skill-modal-content');
    const closeModal = document.querySelector('.close-modal');

    let currentIndex = 0;
    const totalItems = skillItems.length;
    let itemWidth = skillItems[0].offsetWidth + 30; // 30px for gap
    let itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function nextSlide() {
        if (currentIndex < totalItems - itemsPerView) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    function getSkillDescription(skillName) {
        const descriptions = {
            'Angular': 'Angular is a powerful TypeScript-based framework for building scalable single-page applications. It provides robust dependency injection, comprehensive routing, form handling, and seamless integration with other web technologies.',
            'Typescript': 'TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional types, classes, and modules, enabling developers to write more robust and maintainable code with enhanced IDE support.',
            'Git': 'Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It allows collaborative development, branching strategies, and comprehensive code history tracking.',
            'Python': 'Python is a versatile, high-level programming language known for its readability and wide-ranging applications. It excels in web development, data science, machine learning, automation, and scientific computing.',
            'Teaching': 'Teaching involves effectively communicating complex technical concepts, designing engaging learning experiences, and mentoring individuals to develop their skills and understanding in various domains.'
        };
        return descriptions[skillName] || 'No detailed description available.';
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-skill');
        const skillPercentage = parseInt(item.getAttribute('data-percentage'));
        const progressBar = item.querySelector('.skill-progress');
        const percentageDisplay = item.querySelector('.skill-percentage');
        const readMoreBtn = item.querySelector('.read-more-btn');

        // Set initial percentage display
        percentageDisplay.innerHTML = `${skillPercentage}%`;

        // Animate skill progress and percentage on hover
        item.addEventListener('mouseenter', () => {
            progressBar.style.width = `${skillPercentage}%`;
            progressBar.style.opacity = '1';
            progressBar.style.visibility = 'visible';
            animateValue(percentageDisplay, 0, skillPercentage, 500);
        });

        // Reset progress bar and display original percentage when not hovering
        item.addEventListener('mouseleave', () => {
            progressBar.style.width = '0%';
            progressBar.style.opacity = '0';
            progressBar.style.visibility = 'hidden';
            percentageDisplay.innerHTML = `${skillPercentage}%`;
        });

        // Open modal on "Read More" click
        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(skillName, skillPercentage);
        });
    });

    function openModal(skillName, percentage) {
        const modalTitle = document.getElementById('modal-skill-title');
        const modalPercentage = document.querySelector('.modal-skill-percentage');
        const modalProgress = document.querySelector('.modal-skill-progress');
        const modalDescription = document.getElementById('modal-skill-description');

        modalTitle.textContent = skillName;
        modalPercentage.textContent = `${percentage}%`;
        modalDescription.textContent = getSkillDescription(skillName);

        modal.classList.add('active');

        // Animate the progress bar and percentage
        setTimeout(() => {
            modalProgress.style.width = `${percentage}%`;
            modalProgress.style.opacity = '1';
            modalProgress.style.visibility = 'visible';
            animateValue(modalPercentage, 0, percentage, 1000);
        }, 100);
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        // Reset modal progress bar when closing
        const modalProgress = document.querySelector('.modal-skill-progress');
        modalProgress.style.width = '0%';
        modalProgress.style.opacity = '0';
        modalProgress.style.visibility = 'hidden';
    }

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        itemWidth = skillItems[0].offsetWidth + 30;
        itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
        updateCarousel();
    });

    // Touch swiping for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
});

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', null);
    }
});