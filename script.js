"use strict";
let slideIndex = 1;

// Next/previous controls
function plusSlides(parameter) {
    showSlides((slideIndex = parameter + slideIndex));
}

// Thumbnail image controls
function currentSlide(parameter) {
    showSlides((slideIndex = parameter));
}

function showSlides(parameter) {
    let i;
    let slides = document.getElementsByClassName("slides");

    if (parameter > slides.length) {
        slideIndex = 1;
    }
    //  in order to keep the slides within the length of slides array (6)
    if (parameter < 1) {
        slideIndex = slides.length;
    }
    // in order to hide previous image, preventing from displaying all images at once
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // slides[5].style.display="block" => display!
    slides[slideIndex - 1].style.display = "block";
}
showSlides(slideIndex);
