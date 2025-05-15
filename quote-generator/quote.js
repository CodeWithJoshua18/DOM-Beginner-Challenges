document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelector("#new-quote");
    let quote = document.querySelector(".quote");
    let person = document.querySelector(".person");

    let quotes = [
        {
            quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            person: "Nelson Mandela"
        },
        {
            quote: "The only limit to our realization of tomorrow is our doubts of today.",
            person: "Franklin D. Roosevelt"
        },
        {
            quote: "Life is what happens when you're busy making other plans.",
            person: "John Lennon"
        },
        {
            quote: "Get busy living or get busy dying.",
            person: "Stephen King"
        },
        {
            quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
            person: "Brian Tracy"
        },
        {
            quote: "Believe you can and you're halfway there.",
            person: "Theodore Roosevelt"
        },
        {
            quote: "The future belongs to those who believe in the beauty of their dreams.",
            person: "Eleanor Roosevelt"
        },
        {
            quote: "It does not matter how slowly you go as long as you do not stop.",
            person: "Confucius"
        }
    ];

    btn.addEventListener('click', function () {
        let random = Math.floor(Math.random() * quotes.length);
        quote.innerText = quotes[random].quote;
        person.innerText = quotes[random].person;
    });
});
