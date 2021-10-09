"use strict";

async function fetchBook(searchterms) {
    // 1. made googlebooks API key
    // 2. found the fetch code lines
    // 3. found a way to get array of data from the json
    // 4. then tried to push it into empty global array but it did not work because it is async which took a long time to figure out.
    // 5. but the problem now is that I cant access the bookData outside of the .then
    // 6. I don't know how to fix this!
    // 7. how 'space' works in search terms?
    // 8. able to change/ display diff text via DOM but not outside of the {.then hell}

    const bookData = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
            searchterms +
            "&key=AIzaSyDh0KfqPFEslm8mZInmTgAUbAY0KgSNsbs",
    );

    const bookJson = await bookData.json();
    return bookJson;
}
async function makeBookObj(searchTerms) {
    const bookJsonfromFetch = await fetchBook(searchTerms);
    // store the items object from json (reference due to it being object)
    // This benefits looping and that looping is for storing them into empty array therefore, I can render the informtation on DOM
    const items = bookJsonfromFetch.items;
    let newArrTitle = [];
    let newArrAuthors = [];
    let newArrImgLinks = [];

    items.forEach((item) => {
        // accessing the object information of json data i got so i can push them into newArrTitle emtpry array
        newArrTitle.push(item.volumeInfo.title);
    });
    console.log(newArrTitle);

    newArrAuthors = items.map((item) => {
        return item.volumeInfo.authors;
    });
    newArrImgLinks = items.map((item) => item.volumeInfo.imageLinks);

    console.log(newArrImgLinks);
    const bookDetails = {
        // making an object with new arrays filed with new information of book data
        title: newArrTitle,
        authors: newArrAuthors,
        imglink: newArrImgLinks,
    };
    return bookDetails;
}

export { fetchBook, makeBookObj };
