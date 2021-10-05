"use strict";

async function getBook(searchterms) {
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
    // .then((response) => respo nse.json())
    // .then((result) => {
    //     // this.setState({ books: result.items })
    //     // bookData.push(result);
    //     // console.log(result.items);
    //     bookData = result.items.map((book) => {
    //         return book.volumeInfo.title;
    //     });
    //     console.log(bookData);
    //     return bookData;
    // });
    // .then((bookTitle) => {
    //     console.log(bookTitle);
    //     // document.querySelector("a").innerText = bookTitle[0];
    // });
}

export { getBook };
