// ===============================
// HERO SLIDESHOW
// ===============================

const slides = document.querySelectorAll(".hero-slider img");

let currentSlide = 0;

function showNextSlide(){

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    slides[currentSlide].classList.add("active");

}

setInterval(showNextSlide, 4000);

// ===============================
// STORY SLIDESHOW
// ===============================

const storySlides = document.querySelectorAll(".story-slider img");

let currentStory = 0;

function showNextStory(){

    storySlides[currentStory].classList.remove("active-story");

    currentStory++;

    if(currentStory >= storySlides.length){

        currentStory = 0;

    }

    storySlides[currentStory].classList.add("active-story");

}

setInterval(showNextStory, 4500);
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
