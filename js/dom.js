import { makeBookObj } from "./fetch.js";

// Core DOM refs
const slideImg    = document.querySelectorAll(".slides__img");
const thumbImg    = document.querySelectorAll(".thumbnail__img");
const searchInput = document.querySelector(".navbar__search");
const searchBtn   = document.querySelector("#navbar__search__Btn");
const titleEls    = document.querySelectorAll(".title");
const authorEls   = document.querySelectorAll(".author");
const searchError   = document.getElementById("searchError");
const carouselSpinner = document.querySelector(".carousel__spinner");

// Modal refs — looked up lazily to avoid crashing module init if HTML changes
const modal = document.getElementById("bookModal");

let currentBooks = [];

// ── Modal ──────────────────────────────────────────────────────────────────

function openModal(book) {
    if (!modal) return;
    modal.querySelector(".modal__cover").src         = book.imglink;
    modal.querySelector(".modal__cover").alt         = book.title;
    modal.querySelector(".modal__title").textContent = book.title;
    modal.querySelector(".modal__author").textContent = book.authors;
    modal.querySelector(".modal__description").textContent = book.description;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
}

function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
}

// Use event delegation so we don't crash if buttons are missing at init
document.addEventListener("click", (e) => {
    if (e.target.closest(".modal__close") || e.target.matches(".modal__backdrop")) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
});

// Book grid cards → open modal
document.querySelectorAll(".books").forEach((card, index) => {
    card.addEventListener("click", () => {
        if (currentBooks[index]) openModal(currentBooks[index]);
    });
});

// Carousel "More info" buttons → open modal
// Use delegation instead of NodeList cloning to avoid replaceWith errors
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".myModalBtn");
    if (!btn) return;
    const slides = document.querySelectorAll(".slides");
    const index  = [...slides].findIndex((slide) => slide.contains(btn));
    if (index !== -1 && currentBooks[index]) {
        e.stopPropagation();
        openModal(currentBooks[index]);
    }
});

// ── Search ─────────────────────────────────────────────────────────────────

async function renderBook(searchTerms) {
    if (!searchTerms.trim()) return;

    searchError.hidden = true;
    searchBtn.disabled = true;
    carouselSpinner.hidden = false;
    slideImg.forEach((img) => { img.style.opacity = "0.15"; });

    try {
        const books = await makeBookObj(searchTerms);
        currentBooks = books;

        books.forEach((book, index) => {
            if (slideImg[index]) {
                slideImg[index].src   = book.imglink;
                slideImg[index].alt   = book.title;
                slideImg[index].style.opacity = "1";
            }
            if (thumbImg[index]) {
                thumbImg[index].src = book.imglink;
                thumbImg[index].alt = book.title;
            }
            if (titleEls[index])  titleEls[index].textContent  = book.title;
            if (authorEls[index]) authorEls[index].textContent = book.authors;
        });

        slideImg.forEach((img) => { img.style.opacity = "1"; });

    } catch (err) {
        slideImg.forEach((img) => { img.style.opacity = "1"; });
        console.error("Search failed:", err);
        searchError.textContent = err.message.includes("No results")
            ? "No books found — try a different search term."
            : `Search failed: ${err.message}`;
        searchError.hidden = false;
    } finally {
        carouselSpinner.hidden = true;
        searchBtn.disabled = false;
    }
}

function doSearch() {
    renderBook(searchInput.value);
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
});
