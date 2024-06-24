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

// Click a button automatically on start after 0.5 seconds
setTimeout(function () {
    document.getElementById("crowdfunding-btn").click();
}, 200)

/*document.getElementById("do-crowdfund").onclick = function () {
    // Open new tab
    window.open("https://milaap.org/fundraisers/support-team-sea-sakthi-3/deeplink?deeplink_type=paytm", "_blank");
}*/

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

CountDownTimer('07/01/2024 01:00 AM', 'days-countdown');

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
  }`;

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