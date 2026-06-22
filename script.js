"use strict";

let slideIndex = 1;

function plusSlides(step) {
    showSlides(slideIndex + step);
}

function currentSlide(n) {
    showSlides(n);
}

function showSlides(n) {
    const slides = document.querySelectorAll(".slides");

    if (n > slides.length) slideIndex = 1;
    else if (n < 1)        slideIndex = slides.length;
    else                   slideIndex = n;

    slides.forEach((slide) => { slide.style.display = "none"; });
    slides[slideIndex - 1].style.display = "block";
}

showSlides(slideIndex);
