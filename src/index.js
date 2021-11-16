const url = "https://zenquotes.io/api/quotes";


fetch(url)
    .then(response => response.json())
    .then(renderZenCards);

fucntion 