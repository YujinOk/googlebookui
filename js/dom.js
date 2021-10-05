import { getBook } from "./fetch.js";

// document.querySelector("a").innerText = bookTitle[0];
async function newGetBook(searchTerms) {
    const bookJson = await getBook(searchTerms);
    const items = bookJson.items;
    let newArrTitle = [];
    let newArrAuthors = [];
    let newArrImgLinks = [];

    items.forEach((item) => {
        newArrTitle.push(item.volumeInfo.title);
    });
    console.log(newArrTitle);

    newArrAuthors = items.map((item) => {
        return item.volumeInfo.authors;
    });
    newArrImgLinks = items.map((item) => item.volumeInfo.imageLinks);

    console.log(newArrImgLinks);
    const bookDetails = {
        title: newArrTitle,
        authors: newArrAuthors,
        imglink: newArrImgLinks,
    };
    return bookDetails;
}
// newGetBook();
const slideImg = document.querySelectorAll(".slides__img");
const thumbNailImg = document.querySelectorAll(".thumbnail__img");
// const search = document.querySelector(".search").value;
const searchBtn = document.querySelector("#searchBtn");
const title = document.querySelectorAll(".title");
const authors = document.querySelectorAll(".author");
const description = document.querySelectorAll(".des");

async function renderBook(searchTerms) {
    const infoBooks = await newGetBook(searchTerms);
    // console.log(infoBooks);
    slideImg.forEach((item, index) => {
        item.setAttribute("src", infoBooks.imglink[index].thumbnail);
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
renderBook();

searchBtn.addEventListener("click", () => {
    const search = document.querySelector(".search").value;
    renderBook(search);
});
