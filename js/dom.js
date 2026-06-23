import { makeBookObj } from "./fetch.js";

console.log("dom.js loaded");

const slideImg    = document.querySelectorAll(".slides__img");
const thumbImg    = document.querySelectorAll(".thumbnail__img");
const searchInput = document.querySelector(".navbar__search");
const searchBtn   = document.querySelector("#navbar__search__Btn");
const titleEls    = document.querySelectorAll(".title");
const authorEls   = document.querySelectorAll(".author");
const modalBtn    = document.querySelectorAll(".myModalBtn");
const modalText   = document.querySelectorAll(".myModalText");
const searchError = document.getElementById("searchError");

// Modal elements
const modal       = document.getElementById("bookModal");
const modalCover  = modal.querySelector(".modal__cover");
const modalTitle  = modal.querySelector(".modal__title");
const modalAuthor = modal.querySelector(".modal__author");
const modalDesc   = modal.querySelector(".modal__description");
const modalClose  = modal.querySelector(".modal__close");
const backdrop    = modal.querySelector(".modal__backdrop");

// Cached book data for the modal (set after search)
let currentBooks = [];

function openModal(book) {
    modalCover.src = book.imglink;
    modalCover.alt = book.title;
    modalTitle.textContent  = book.title;
    modalAuthor.textContent = book.authors;
    modalDesc.textContent   = book.description;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
});

// Wire up book grid cards to open modal
document.querySelectorAll(".books").forEach((card, index) => {
    card.addEventListener("click", () => {
        const book = currentBooks[index];
        if (book) openModal(book);
    });
});

async function renderBook(searchTerms) {
    if (!searchTerms.trim()) return;

    searchError.hidden = true;
    slideImg.forEach((img) => { img.style.opacity = "0.3"; });

    try {
        const books = await makeBookObj(searchTerms);
        currentBooks = books;

        books.forEach((book, index) => {
            if (slideImg[index]) {
                slideImg[index].src = book.imglink;
                slideImg[index].alt = book.title;
                slideImg[index].style.opacity = "1";
            }
            if (thumbImg[index]) {
                thumbImg[index].src = book.imglink;
                thumbImg[index].alt = book.title;
            }
            if (titleEls[index])  titleEls[index].textContent  = book.title;
            if (authorEls[index]) authorEls[index].textContent = book.authors;
        });

        // Replace old inline description toggle with modal trigger
        modalBtn.forEach((btn, index) => {
            const book = books[index];
            if (!book) return;
            const newBtn = btn.cloneNode(true);
            btn.replaceWith(newBtn);
            newBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openModal(book);
            });
        });

        // Clear any leftover description text
        modalText.forEach((el) => { el.textContent = ""; });

    } catch (err) {
        slideImg.forEach((img) => { img.style.opacity = "1"; });
        console.error("Search error:", err);
        searchError.textContent = err.message === "No results found."
            ? "No books found — try a different search term."
            : `Search failed: ${err.message}`;
        searchError.hidden = false;
    }
}

function doSearch() {
    renderBook(searchInput.value);
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
});
