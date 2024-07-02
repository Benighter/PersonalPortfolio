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
