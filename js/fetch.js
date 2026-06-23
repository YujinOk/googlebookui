"use strict";

async function fetchBook(searchterms) {
    const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
            encodeURIComponent(searchterms),
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}

async function makeBookObj(searchTerms) {
    const data = await fetchBook(searchTerms);
    if (!data.items?.length) throw new Error("No results found.");

    return data.items.slice(0, 6).map((item) => {
        const info = item.volumeInfo ?? {};
        return {
            title:       info.title ?? "Unknown Title",
            authors:     info.authors?.join(", ") ?? "Unknown Author",
            imglink:     (info.imageLinks?.thumbnail ?? "").replace("http://", "https://"),
            description: info.description ?? "No description available.",
        };
    });
}

export { makeBookObj };
