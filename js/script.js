$('.hamburger').click(function () {

    var $this = $(this);

    if ($this.hasClass('is-active')) {
        $('.fsmenu, .logo').removeClass('is-active');
        $('.fsmenu, .logo').addClass('close-menu');
        $('body').toggleClass('nav-open');
        // After 2 seconds, make the element none
        setTimeout(function () {
            document.querySelector('.fsmenu').style.display = 'none';
        });
    } else {
        $('.fsmenu, .logo').removeClass('close-menu');
        $('.fsmenu, .logo').addClass('is-active');
        document.querySelector('.fsmenu').style.display = 'block';
        $('body').toggleClass('nav-open');
    };
    $this.toggleClass('is-active');
});

$('#page-1-right-blog').on("click", function () {
    $('html, body').css({
        overflow: 'hidden'
    });
    $('#page-1-blog-section').addClass('blog-active');
    $('#page-1-right-blog').addClass('blog-button-active');
});


$('#page-1-right-blog').on("mouseleave", function () {
    // Allow Scrolling HTML or Body
    $('html, body').css({
        overflow: 'unset'
    });
    closeTimeout = setTimeout(function () {
        $('#page-1-blog-section').css('right', '');
        $('#page-1-right-blog').css('right', '');
        $('#page-1-blog-section').addClass('blog-inactive');
        $('#page-1-blog-section').removeClass('blog-active');
        $('#page-1-right-blog').addClass('blog-button-inactive');
        $('#page-1-right-blog').removeClass('blog-button-active');
        $('#page-1-right-blog-scroll-text').text('BLOG.');
        $('#page-1-right-blog-scroll-text').removeClass('active');
    }, 200); // Delay closing for 200 milliseconds
});

$('#page-1-blog-section').on("mouseenter", function () {
    // Prevent Scrolling HTML or Body
    $('html, body').css({
        overflow: 'hidden'
    });
    clearTimeout(closeTimeout); // Clear the timeout to prevent closing
});

$('#page-1-blog-section').on("mouseleave", function () {
    // Allow Scrolling HTML or Body
    $('html, body').css({
        overflow: 'unset'
    });
    closeTimeout = setTimeout(function () {
        $('#page-1-blog-section').css('right', '');
        $('#page-1-right-blog').css('right', '');
        $('#page-1-blog-section').addClass('blog-inactive');
        $('#page-1-blog-section').removeClass('blog-active');
        $('#page-1-right-blog').addClass('blog-button-inactive');
        $('#page-1-right-blog').removeClass('blog-button-active');
        $('#page-1-right-blog-scroll-text').text('BLOG.');
        $('#page-1-right-blog-scroll-text').removeClass('active');
    }, 200); // Delay closing for 200 milliseconds
});



window.addEventListener("load", () => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".mag-wrapper",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true
        }
    })
        .to(".mag-img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
        })
        .to(
            ".mag-section.hero",
            {
                scale: 1.1,
                transformOrigin: "center center",
                ease: "power1.inOut"
            },
            "<"
        ).to(
            ".banner-section",
            {
                opacity: 1,
                ease: "power1.inOut"
            },
            "<"
        );
});


var swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    effect: 'fade',
    // initialSlide: 2,
    loop: true,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev'
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function () {
            var index = this.activeIndex;

            var target = $('.product-slider__item').eq(index).data('target');

            $('.product-img__item').removeClass('active');
            $('.product-img__item#' + target).addClass('active');
        }
    }

});

swiper.on('slideChange', function () {
    var index = this.activeIndex;

    var target = $('.product-slider__item').eq(index).data('target');

    $('.product-img__item').removeClass('active');
    $('.product-img__item#' + target).addClass('active');

    if (swiper.isEnd) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    } else {
        $('.next').removeClass('disabled');
    }

    if (swiper.isBeginning) {
        $('.prev').addClass('disabled');
    } else {
        $('.prev').removeClass('disabled');
    }
});

function navto(pageElement) {
    // After 1 second, close the menu
    setTimeout(function () {
        $('.hamburger').click();
    }, 500);
    pageElement = document.getElementById(pageElement);
    var positionX = 0,
        positionY = 0;

    while (pageElement != null) {
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo({ top: positionY, left: positionX, behavior: 'smooth', block: "center" });
    }
}


function scrollProgressBar() {
    var getMax = function () {
        return $(document).height() - $(window).height();
    };

    var getValue = function () {
        return $(document).scrollTop();
    };

    var progressBar = $(".progress-bar"),
        max = getMax(),
        value,
        width;

    var getWidth = function () {
        // Calculate width in percentage
        value = getValue();
        width = (value / max) * 100;
        width = width + "%";
        return width;
    };

    var setWidth = function () {
        progressBar.css({ width: getWidth() });
    };

    $(document).on("scroll", setWidth);
    $(window).on("resize", function () {
        // Need to reset max
        max = getMax();
        setWidth();
    });
}

$(document).ready(function () {
    scrollProgressBar();
    var __sf = $(".sponsorsFooter ul span");
    var __sf_cont = $(".sponsorsFooter ul");
    var __title = $("#sponsorTitle");

    __sf.mouseenter(function () {
        $(this).addClass('hover');
        __sf_cont.addClass('enter');
        var __setTitle = $(this).attr("data-group-title");
        __title.html(__setTitle);
    }).mouseleave(function () {
        $(this).removeClass('hover');
        __sf_cont.removeClass('enter');
        var __setTitle = $(__title).attr("data-default-title");
        __title.html(__setTitle);
    });
});

// Set the event date - July 2, 2025
const eventDate = new Date('July 2, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = '<h2>The Event Has Started!</h2>';
    }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to avoid delay
updateCountdown();

// institution
document.addEventListener('DOMContentLoaded', () => {
// Function to check if element is in viewport    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
 // Function to animate elements when they come into view   
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-right, .slide-in');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.style.animation = 'none';
                element.offsetHeight;
                element.style.animation = null;
                element.classList.add('animated');
            }
        });
    };

  // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
  // Initial check for elements in viewport    
    animateOnScroll();

  // Parallax effect for the image
    const institutionImage = document.querySelector('.institution-image');
    if (institutionImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (isInViewport(institutionImage)) {
                institutionImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
        });
    }
});

// who are we
document.addEventListener('DOMContentLoaded', () => {
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .slide-in');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.style.animation = 'none';
                element.offsetHeight;
            element.style.animation = null;
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.boxShadow = '0 8px 24px rgba(0, 127, 255, 0.15)';
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
});
});
});

// Feature data
const features = [
    {
        title: "Precision Propulsion",
        description: "Think of it as having a supercharged engine that's both powerful and efficient. Our 15 kW motor gives you instant response when you need it, while using less energy - like having a sports car that's also great on fuel!",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
    },
    {
        title: "Eco-Smart Cockpit",
        description: "We've built the cockpit using special materials from nature - balsa wood and flax fiber. It's like having a super-strong, lightweight shell that's also kind to the environment. Plus, it absorbs bumps and vibrations for a smoother ride!",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/></svg>`
    },
    {
        title: "Advanced AR Navigation",
        description: "Imagine having a heads-up display like in video games, but for real boating! Our AR glasses show you everything you need to know - speed, navigation, and warnings - right in front of your eyes, so you can focus on the water ahead.",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 8-4 8H6l-4-8 4-8Z"/><path d="M12 7v4"/><path d="M12 15h.01"/></svg>`
    },
    {
        title: "Power Distribution Unit",
        description: "Our advanced power system is like having a smart home for your boat's electricity. It manages power efficiently and safely, with 60% less wiring mess. Plus, it's waterproof and built tough for marine conditions!",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/></svg>`
    },
    {
        title: "Advanced Safety System",
        description: "Think of this as your boat's guardian angel. It constantly watches for any electrical problems and instantly responds to keep you safe. It's like having a highly trained safety expert on board at all times!",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`
    },
    {
        title: "Smart Performance Tracking",
        description: "Just like a fitness tracker for your boat! It monitors everything from energy use to system health, helping you understand how your boat is performing and when it might need attention - no technical expertise required!",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
    }
];

function initFeatures() {
    const featuresGrid = document.getElementById('featuresGrid');
    
    features.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        card.innerHTML = `
            <div class="feature-icon">
                ${feature.icon}
            </div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        `;
        
        featuresGrid.appendChild(card);
        
        // Animate cards on scroll
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Smooth scroll
document.querySelector('.scroll-button').addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', initFeatures);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

function showGallery(id) {
    document.getElementById('gallery2024').classList.add('hidden');
    document.getElementById('gallery2023').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
}














function open_source() {
    window.location.href = "https://kumaragurudtsteam-my.sharepoint.com/:f:/g/personal/jonattan_22ad_kct_ac_in/Ekzabbui-k1PrrkBmYQ8v8sBQ2Qsh3MNRayQvvGBpSZckw?e=ywUWiw"
}




// Word Count, crowdfunding
var words = document.getElementsByClassName('dsctitle')[0];
var global_words = words.innerText;
// Remove new line characters
global_words = global_words.replace(/\n/g, '');
function reduceWordCount(count) {
    var words_count = global_words.split(' ');
    // Remove new line characters
    for (var i = 0; i < words_count.length; i++) {
        words_count[i] = words_count[i].replace(/\n/g, '');
    }
    var new_words = '';
    // Trim last word with count
    for (var i = 0; i < words_count.length - count; i++) {
        new_words += words_count[i] + ' ';
    }
    new_words += '...';
    words.innerText = new_words;
}
function listenwindowsize() {
    // Get size of the screen
    var width = window.innerWidth;
    if (width <= 780) {
        reduceWordCount(160);
    }
    // If the screen is less than 768px
    else if (width <= 1000) {
        reduceWordCount(120);
    }
    // If the screen is less than 1024px
    else if (width <= 1300) {
        reduceWordCount(50);
    }
    else {
        words.innerText = global_words;
    }
} listenwindowsize();
// Listen to the window resize event
window.addEventListener('resize', listenwindowsize);

MicroModal.init({
    openTrigger: 'data-micromodal-trigger',
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true, debugMode: true
});


// Team Members Data
const teamMembers = [
    {
        id: 1,
        name: "Naveen Murugesan",
        designation: "Team Manager",
        image: "./assets/members/naveen.jpg",
        linkedinUrl: "https://www.linkedin.com/in/naveen-murugesh-t-0b0670309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        id: 2,
        name: "Kamalika Venugopal",
        designation: "Lead operation",
        image: "./assets/members/kamalikka.jpg",
        linkedinUrl: "https://www.linkedin.com/in/kamalikka-venugopal-b7549125a/"
    },
    {
        id: 3,
        name: "Athish clements",
        designation: "Lead energy system",
        image: "./assets/members/athish.jpg",
        linkedinUrl: "https://www.linkedin.com/in/athish-clements-t-589891276/d"
    },
    {
        id: 4,
        name: "Jonattan S",
        designation: "Lead embedded system",
        image: "./assets/members/jonattan.jpg",
        linkedinUrl: "https://www.linkedin.com/in/jonattans/"
    },
    {
        id: 5,
        name: "Krithesh S",
        designation: "Lead software and integration",
        image: "./assets/members/krithesh.jpg",
        linkedinUrl: "https://www.linkedin.com/in/krithesh-sudhakar/"
    },
    {
        id: 6,
        name: "Dev Aanandh M",
        designation: "Lead Material science",
        image: "./assets/members/dev.jpg",
        linkedinUrl: "https://www.linkedin.com/in/dev-aanandh-474644241/"
    },
    {
        id: 7,
        name: "Dhanu Malayan",
        designation: "Lead Electricals and Integration",
        image: "./assets/members/dhanu.jpg",
        linkedinUrl: "https://www.linkedin.com/in/dhanu-malayan-ab91bb277/"
    },
    {
        id: 8,
        name: "Raghav A",
        designation: "Analyst Manufacturing and Integration",
        image: "./assets/members/raghav.jpg",
        linkedinUrl: "https://www.linkedin.com/in/raghav-anandkumar-2b113a303/"
    },
    {
        id: 9,
        name: "Sharan B",
        designation: "Analyst Energy system",
        image: "./assets/members/sharan.jpg",
        linkedinUrl: "https://www.linkedin.com/in/sharan-balasubramaniam-977b49293/"
    },
    {
        id: 10,
        name: "Manoj N",
        designation: "Analyst Embedded system",
        image: "./assets/members/anoj.jpg",
        linkedinUrl: "https://www.linkedin.com/in/manoj-n-866708283/"
    },
    {
        id: 11,
        name: "Divya Dharshini S",
        designation: "Analyst Electrical System",
        image: "./assets/members/divya.jpg",
        linkedinUrl: "https://www.linkedin.com/in/divya-dharshini-s-0790b8290/"
    },
    {
        id: 12,
        name: "Harshavarthan V",
        designation: "Analyst Software and Integration",
        image: "./assets/members/harsha.jpg",
        linkedinUrl: "https://www.linkedin.com/in/harshavarthan-venkatesan-76737b290/"
    },
    {
        id: 13,
        name: "Monisha V",
        designation: "Executive social media and outreach ",
        image: "./assets/members/monisha.jpg",
        linkedinUrl: "https://www.linkedin.com/in/monisha-veluswamy-03bb4a16b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        id: 14,
        name: "Midun Karthik",
        designation: "Executive Sponsorship",
        image: "./assets/members/midun.jpg",
        linkedinUrl: "https://www.linkedin.com/in/midun-karthik/"
    },
    {
        id: 15,
        name: "Nithya Sri C R",
        designation: "Executive marketting and media",
        image: "./assets/members/nithya.jpg",
        linkedinUrl: "https://www.linkedin.com/in/nithya-sri-c-r-ab201b333/"
    },
    {
        id: 16,
        name: "Hariharan S M",
        designation: "Executive logistics and supply chain",
        image: "./assets/members/das.jpg",
        linkedinUrl: "https://www.linkedin.com/in/naveen-murugesh-t-0b0670309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
];

// LinkedIn Icon SVG
const linkedinIconSVG = `
    <svg class="linkedin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
    </svg>
`;

// Function to create team member HTML
function createTeamMemberHTML(member) {
    return `
        <div class="team-member">
            <!-- Profile Image -->
            <div class="profile-section">
                <div class="profile-image-wrapper">
                    <img src="${member.image}" alt="${member.name}" class="profile-image">
                </div>
            </div>

            <!-- Member Info -->
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-designation">${member.designation}</p>
            </div>

            <!-- LinkedIn Button -->
            <a href="${member.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-btn">
                ${linkedinIconSVG}
                LinkedIn
            </a>
        </div>
    `;
}

// Function to render all team members
function renderTeamMembers() {
    const teamGrid = document.getElementById('teamGrid');
    
    if (teamGrid) {
        const teamHTML = teamMembers.map(member => createTeamMemberHTML(member)).join('');
        teamGrid.innerHTML = teamHTML;
    }
}

// Initialize the team page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderTeamMembers();
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add loading animation
    const teamContainer = document.querySelector('.team-container');
    if (teamContainer) {
        teamContainer.style.opacity = '0';
        teamContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            teamContainer.style.transition = 'all 0.6s ease';
            teamContainer.style.opacity = '1';
            teamContainer.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Optional: Add intersection observer for scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe team member cards
    document.querySelectorAll('.team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Call scroll animations after a short delay
setTimeout(addScrollAnimations, 500);

/*
// Click a button automatically on start after 0.5 seconds
setTimeout(function () {
    document.getElementById("crowdfunding-btn").click();
}, 200)

/*document.getElementById("do-crowdfund").onclick = function () {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
}*/
/*
document.getElementById("do-crowdfund").addEventListener('pointerdown', function () {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
});

document.getElementById("read-more-btn").onclick = function () {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
}

/*document.getElementById("crowdfund-maq").onclick = function () {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
}*/
/*
function open_milaap() {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
}


function CountDownTimer(dt, id) {
    var end = new Date(dt);
    var now = new Date();
    var distance = end - now;

    var _day = 1000 * 60 * 60 * 24;

    if (distance < 0) {
        document.getElementById(id).innerHTML = '0';
        return;
    }
    var days = Math.floor(distance / _day);
    document.getElementById(id).innerHTML = days;

}

CountDownTimer('07/01/2024 01:00 AM', 'days-countdown');

function navto(pageElement) {
    // After 1 second, close the menu
    setTimeout(function () {
        $('.hamburger').click();
    }, 500);
    pageElement = document.getElementById(pageElement);
    var positionX = 0,
        positionY = 0;

    while (pageElement != null) {
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo({ top: positionY, left: positionX, behavior: 'smooth', block: "center" });
    }
}

// Word Count, crowdfunding
var words = document.getElementsByClassName('dsctitle')[0];
var global_words = words.innerText;
// Remove new line characters
global_words = global_words.replace(/\n/g, '');
function reduceWordCount(count) {
    var words_count = global_words.split(' ');
    // Remove new line characters
    for (var i = 0; i < words_count.length; i++) {
        words_count[i] = words_count[i].replace(/\n/g, '');
    }
    var new_words = '';
    // Trim last word with count
    for (var i = 0; i < words_count.length - count; i++) {
        new_words += words_count[i] + ' ';
    }
    new_words += '...';
    words.innerText = new_words;
}
function listenwindowsize() {
    // Get size of the screen
    var width = window.innerWidth;
    if (width <= 1000) {
        reduceWordCount(120);
    }
    // If the screen is less than 1024px
    else if (width <= 1300) {
        reduceWordCount(50);
    }
    else {
        words.innerText = global_words;
    }
} listenwindowsize();
// Listen to the window resize event
window.addEventListener('resize', listenwindowsize);


function CountDownTimer(dt, id) {
    var end = new Date(dt);
    var now = new Date();
    var distance = end - now;

    var _day = 1000 * 60 * 60 * 24;

    if (distance < 0) {
        document.getElementById(id).innerHTML = '0';
        return;
    }
    var days = Math.floor(distance / _day);
    document.getElementById(id).innerHTML = days;

}

CountDownTimer('07/01/2024 01:00 AM', 'days-countdown');*/

/*
(function () {
    var content, contentWidth, jankMyShit, keyframes, marquee, style, totalWidth, width;

    marquee = document.getElementById('marquee');

    content = marquee.querySelector('.marquee-content');

    width = marquee.clientWidth;

    contentWidth = content.offsetWidth;

    totalWidth = width + contentWidth;

    keyframes = `@keyframes scroll-marquee {
    0% {transform:translate3d(${totalWidth}px,0px,0px);}
    100% {transform:translate3d(0px,0px,0px);}
};

    style = document.createElement('style');

    style.id = 'scroll-marquee-style';

    style.innerHTML = keyframes;

    document.head.appendChild(style);

    content.style.animation = "scroll-marquee 10s linear infinite";

    // periodic interruption for {duration} ms
    rff = function (interval, duration) {
        var rvv;
        rvv = function () {
            var end, now, results;
            now = Date.now();
            end = now + duration;
            results = [];
            while (now < end) {
                results.push(now = Date.now());
            }
            return results;
        };
        return setInterval(rvv, duration);
    };

    rff(500, 250);

}).call(this); */

baguetteBox.run('.tz-gallery');
document.addEventListener('DOMContentLoaded', () => {
    const teamText = document.getElementById('teamText');
    const yaliContainer = document.getElementById('yaliContainer');
    const yaliNumber = document.getElementById('yaliNumber');
    const tamilYali = document.getElementById('tamilYali');
    const introContainer = document.querySelector('.intro-container');
    const mainContent = document.getElementById('mainContent');

    const fullText = 'Team Sea Sakthi';
    let currentIndex = 0;

    // Type out team text
    const typeText = () => {
        if (currentIndex < fullText.length) {
            teamText.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeText, 100);
        } else {
            // Fade out team text after typing
            setTimeout(() => {
                teamText.classList.add('fade-out');
                setTimeout(() => {
                    teamText.style.display = 'none';
                    showYali();
                }, 500);
            }, 500);
        }
    };

    // Show YALI with changing numbers
    const showYali = () => {
        yaliContainer.classList.remove('hidden');
        yaliContainer.classList.add('visible');
        
        let count = 1;
        const numberInterval = setInterval(() => {
            count++;
            yaliNumber.textContent = count + '.0';
            
            if (count >= 4) {
                clearInterval(numberInterval);
                setTimeout(() => {
                    yaliContainer.classList.add('fade-out');
                    setTimeout(() => {
                        yaliContainer.style.display = 'none';
                        showTamilYali();
                    }, 500);
                }, 500);
            }
        }, 500);
    };

    // Show Tamil YALI and slide out
    const showTamilYali = () => {
        tamilYali.classList.remove('hidden');
        tamilYali.classList.add('visible');
        
        setTimeout(() => {
            introContainer.classList.add('slide-out');
            setTimeout(() => {
                introContainer.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 1000);
        }, 1500);
    };

    // Start the sequence
    typeText();
});

// Data for global alumni
const globalAlumni = [
    {
        id: 1,
        name: 'Sanaa M',
        position: 'UCL-London',
        imageUrl: './assets/alumni/yali1_member8.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/sanaa-m-a52b7119b/'
    },
    {
        id: 2,
        name: 'Gerontius Leo L',
        position: 'Chalmers University',
        imageUrl: './assets/alumni/yali2_member1.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/gerontius-leo-l-61b938171/'
    },
    {
        id: 3,
        name: 'Anjana Prasad',
        position: 'Collins Aerospace',
        imageUrl: './assets/alumni/yali2_member2.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/anjana-prasad3101/'
    },
    {
        id: 4,
        name: 'Anandh B',
        position: 'KTH Royal Institute-Stockholm',
        imageUrl: './assets/alumni/yali2_member3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/anandh-balasubramani/'
    },
    {
        id: 5,
        name: 'Naveen V',
        position: 'ABB',
        imageUrl: './assets/alumni/yali2_member5.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/naveen-veluswamy-446457213/'
    },
    {
        id: 6,
        name: 'Yuga Barathi',
        position: 'Team Blue Rising',
        imageUrl: './assets/alumni/yali3_member1.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/yugabharathi-m/'
    },
    {
        id: 7,
        name: 'Jairish R',
        position: 'Team Blue Rising',
        imageUrl: './assets/alumni/yali3_member3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/jairish-rajan/'
    },
    {
        id: 8,
        name: 'Rogith Raj S',
        position: 'Team Blue Rising',
        imageUrl: './assets/alumni/yali3_member4.jpg',
        linkedinUrl: 'https://linkedin.com/in/example'
    }
];

// Data for past members
const pastMembers = {
    yali1: [
        {
        id: 1,
        name: 'Mohan R',
        position: 'Bosch',
        imageUrl: './assets/alumni/yali1_member1.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/mohan-ravi/'
        },
        {
        id: 2,
        name: 'Kishore Krisna S',
        position: 'Cameron',
        imageUrl: './assets/alumni/yali1_member2.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/kishore-krisna-s-b9818a1b8/'
        },
        {
        id: 3,
        name: 'Manav R Samant',
        position: 'Shell',
        imageUrl: './assets/alumni/yali1_member3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/manavsamant/'
        },
        {
        id: 4,
        name: 'Vekash S',
        position: 'Aivar Innovations',
        imageUrl: './assets/alumni/yali1_member4.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/vekash-s-148068162/'
        },
        {
        id: 5,
        name: 'Barathraj M',
        position: 'Quindl Technologies',
        imageUrl: './assets/alumni/yali1_member5.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/bharathraj-m/'
        },
        {
        id: 6,
        name: 'Sanaa M',
        position: 'UCL-London',
        imageUrl: './assets/alumni/yali1_member8.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/sanaa-m-a52b7119b/'
        }
    ],
    yali2: [
        {
        id: 1,
        name: 'Gerontius Leo L',
        position: 'Chalmers University',
        imageUrl: './assets/alumni/yali2_member1.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/gerontius-leo-l-61b938171/'
        },
        {
        id: 2,
        name: 'Anjana Prasad',
        position: 'Collins Aerospace',
        imageUrl: './assets/alumni/yali2_member2.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/anjana-prasad3101/'
        },
        {
        id: 3,
        name: 'Anandh B',
        position: 'KTH Royal Institute-Stockholm',
        imageUrl: './assets/alumni/yali2_member3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/anandh-balasubramani/'
        },
        {
        id: 4,
        name: 'Vikash S',
        position: 'Hochschule Stralsund-Germany',
        imageUrl: './assets/alumni/yali2_member4.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/vikash-sakthivel-7b983420a/'
        },
        {
        id: 5,
        name: 'Naveen V',
        position: 'ABB',
        imageUrl: './assets/alumni/yali2_member5.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/naveen-veluswamy-446457213/'
        },
        {
        id: 6,
        name: 'Swamninathan C',
        position: 'KCT',
        imageUrl: './assets/alumni/yali2_member4.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/swaminathan-chandramouli-a99463201/'
        },
        {
        id: 7,
        name: 'SSneha Nagarajan',
        position: 'Team Aura',
        imageUrl: './assets/alumni/yali2_member9.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/sneha-nagarajan-93242b232/'
        }
    ],
    yali3: [
        {
        id: 1,
        name: 'Yuga Barathi',
        position: 'Mechatronics Engineering',
        imageUrl: './assets/alumni/yali3_member1.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/yugabharathi-m/'
        },
        {
        id: 2,
        name: 'Kaushik V Subra',
        position: 'Civil Engineering',
        imageUrl: './assets/alumni/yali3_member2.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/kaushik-subraa-136992103/'
        },
        {
        id: 3,
        name: 'Jairish R',
        position: 'Mechatronics Engineering',
        imageUrl: './assets/alumni/yali3_member3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/jairish-rajan/'
        },
        {
        id: 4,
        name: 'Rogith Raj S',
        position: 'Electronics and Communication Engineering',
        imageUrl: './assets/alumni/yali3_member4.jpg',
        linkedinUrl: 'https://linkedin.com/in/rogith-raj'
        },
        {
        id: 5,
        name: 'Mukilan S',
        position: 'Electronics and Communication Engineering',
        imageUrl: './assets/alumni/yali3_member5.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/mukilan1104/'
        },
        {
        id: 6,
        name: 'Shri Sanjanaa SE',
        position: 'Artificial Intelligence and Data Science',
        imageUrl: './assets/alumni/yali3_member6.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/shri-sanjanaa-s-e-65b13a226/'
        },
        {
        id: 7,
        name: 'Hemalatha V',
        position: 'Electronics and Instrumentation engineering',
        imageUrl: './assets/alumni/yali3_member7.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/hemalatha-venkataramanan-696676215/'
        },
        {
        id: 8,
        name: 'Roshan Manoj',
        position: 'Information science and engineering',
        imageUrl: './assets/alumni/yali3_member8.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/roshanmanoj/'
        },
        {
        id: 9,
        name: 'Mahipooja M',
        position: 'Bsc Psycology',
        imageUrl: './assets/alumni/yali3_member9.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/mahipoojaa-m-52b431254/'
        }
    ]
};

// Function to create an alumni card
function createAlumniCard(alumni) {
    return `
    <div class="alumni-card">
    <div class="card-content">
    <div class="image-container">
    <img src="${alumni.imageUrl}" alt="${alumni.name}">
    </div>
    <h3>${alumni.name}</h3>
    <p>${alumni.position}</p>
    <a href="${alumni.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    LinkedIn
    </a>
    </div>
    </div>
    `;
}

// Function to render global alumni
function renderGlobalAlumni() {
    const container = document.querySelector('.alumni-grid');
    if (container) {
        container.innerHTML = globalAlumni.map(alumni => createAlumniCard(alumni)).join('');
    }
}

// Function to render past members
function renderPastMembers(batch) {
    const container = document.getElementById(batch);
    if (container) {
        const batchMembers = pastMembers[batch];
        container.innerHTML = `
        <div class="alumni-grid">
        ${batchMembers.map(alumni => createAlumniCard(alumni)).join('')}
        </div>
        `;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Render global alumni
    renderGlobalAlumni();
    
    // Toggle past members section
    const toggleBtn = document.getElementById('togglePastMembers');
    const pastMembersSection = document.getElementById('pastMembers');
    
    if (toggleBtn && pastMembersSection) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = pastMembersSection.classList.contains('hidden');
            pastMembersSection.classList.toggle('hidden');
            toggleBtn.textContent = isHidden ? 'Hide Past Members' : 'View Past Members';
            
            if (isHidden) {
                pastMembersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Batch selection functionality
    const batchButtons = document.querySelectorAll('.batch-btn');
    const batchContainers = document.querySelectorAll('.batch-container');
    
    batchButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            batchButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all batch containers
            batchContainers.forEach(container => {
                if (container) {
                    container.style.display = 'none';
                }
            });
            
            // Show selected batch container and render its content
            const selectedBatch = button.getAttribute('data-batch');
            const selectedContainer = document.getElementById(selectedBatch);
            if (selectedContainer) {
                selectedContainer.style.display = 'block';
                renderPastMembers(selectedBatch);
            }
        });
    });
    
    // Initialize first batch
    renderPastMembers('yali1');
    
    // Add hover effect to alumni cards
    const alumniCards = document.querySelectorAll('.alumni-card');
    alumniCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});





