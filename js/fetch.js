"use strict";


async function fetchBook(searchterms) {
    const bookData = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
            searchterms +
            "&key=AIzaSyDh0KfqPFEslm8mZInmTgAUbAY0KgSNsbs",
    );
    
    // convert Json -> into JS obj
    const bookJson = await bookData.json();
    return bookJson;
}

async function makeBookObj(searchTerms) {
    const bookJsonfromFetch = await fetchBook(searchTerms);
    // store the items object from json (reference due to it being object)
    // This benefits looping and that looping is for storing them into empty array therefore, I can render the informtation on DOM
    const items = bookJsonfromFetch.items;
    let newArrTitle = [];
    let newArrDes = [];

    items.forEach((item) => {
        // accessing the object information of json data i got so i can push them into newArrTitle emtpry array
        newArrTitle.push(item.volumeInfo.title);
    });

    const newArrAuthors = items.map((item) => {
        return item.volumeInfo.authors;
    });
    const newArrImgLinks = items.map((item) => item.volumeInfo.imageLinks);

    items.map((item) => {
        newArrDes.push(item.volumeInfo.description);
    });

    const bookDetails = {
        // making an object with new arrays filed with new information of book data
        title: newArrTitle,
        authors: newArrAuthors,
        imglink: newArrImgLinks,
        description: newArrDes,
    };
    return bookDetails;
}

export { fetchBook, makeBookObj };
