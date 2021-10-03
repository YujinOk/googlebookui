"strict";
let bookData = [];
const searchTerms = "murder";
async function getBook() {
    // 1. made googlebooks API key
    // 2. found the fetch code lines
    // 3. found a way to get array of data from the json
    // 4. then tried to push it into empty global array but it did not work because it is async which took a long time to figure out.
    // 5. but the problem now is that I cant access the bookData outside of the .then
    // 6. I don't know how to fix this!
    // 7. how 'space' works in search terms?
    // 8. able to change/ display diff text via DOM but not outside of the {.then hell}

    fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
            searchTerms +
            "&key=AIzaSyDh0KfqPFEslm8mZInmTgAUbAY0KgSNsbs",
    )
        .then((response) => response.json())
        .then((result) => {
            // this.setState({ books: result.items })
            // bookData.push(result);
            // console.log(result.items);
            bookData = result.items.map((book) => {
                return book.volumeInfo.title;
            });
            return bookData;
        })
        .then((bookTitle) => {
            console.log(bookTitle);
            // document.querySelector("a").innerText = bookTitle[0];
        });
}
getBook();
// fetch(
//     "https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDh0KfqPFEslm8mZInmTgAUbAY0KgSNsbs",
// )
//     .then((response) => response.json())
//     .then((result) => {
//         // this.setState({ books: result.items })
//         // bookData.push(result);
//         // console.log(result.items);
//         bookData = result.items.map((book) => {
//             return book.volumeInfo.title;
//         });
//         return bookData;
//     })
//     .then((bookTitle) => {
//         console.log(bookTitle);
//     });
console.log(bookData);
// console.log(bookData);
// const bookList = [];
// bookList.push(bookData[0]);
// console.log(bookList);
// bookData.items.forEach((book) => {
//     console.log(book.volumeInfo.authors);
// });
