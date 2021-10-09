import { fetchBook, makeBookObj } from "./fetch.js";
// Return order:  Fetch(searchTerm) => makeBookObj(searchTerm) => Render(value from the user search bar)
// Call order: Render('happy poter')=> makeBookObj(searchTerm) => Fetch(searchTerm)

const slideImg = document.querySelectorAll(".slides__img");
const thumbNailImg = document.querySelectorAll(".thumbnail__img");
const searchBtn = document.querySelector("#navbar__search__Btn");
const title = document.querySelectorAll(".title");
const authors = document.querySelectorAll(".author");
const description = document.querySelectorAll(".des");

async function renderBook(searchTerms) {
    const infoBooks = await makeBookObj(searchTerms);
    console.log(infoBooks);
    slideImg.forEach((item, index) => {
        item.setAttribute("src", infoBooks.imglink[index].thumbnail);
        // Looping through the slideImg current item and index of that slideImg array - by accessing index of imglink array in order to grab the url from thumbnail
    });
    thumbNailImg.forEach((item, index) => {
        item.setAttribute("src", infoBooks.imglink[index].thumbnail);
    });

    title.forEach((book, index) => {
        book.innerText = `Title: ${infoBooks.title[index]}`;
    });
    authors.forEach((book, index) => {
        book.innerText = `Author: ${infoBooks.authors[index]}`;
    });
}

searchBtn.addEventListener("click", () => {
    const search = document.querySelector(".navbar__search").value;
    renderBook(search);
});
