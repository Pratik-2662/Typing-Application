const API_URL = 'http://api.quotable.io/random';
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
let socreDisplay = document.getElementById('socreDisplay');
let score = 0;
let response;

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let allCorrect = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            allCorrect = false;
        }
        else if (character == characterSpan.innerText) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.add('correct');

        }
        else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            allCorrect = false;
        }
    })
    if (allCorrect) {
        renderNewQuote();
        score += 10;
        socreDisplay.innerHTML = score;
    }
})


function getRandomQuote() {
    response = fetch(API_URL)
        .then(response => response.json())
        .then(data => data.content)
    return response;
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    if (response) {
        quoteDisplay.innerHTML = '';
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span');
            characterSpan.innerText = character;
            quoteDisplay.appendChild(characterSpan);
        });
    }
    quoteInput.value = null;

}
renderNewQuote();