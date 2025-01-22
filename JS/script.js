// Configuração inicial
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
let score = 0;
let cards = [];
let flippedCards = [];
let matchedCards = [];

// Definir os valores das cartas
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Criar as cartas
function createCards() {
    const cardArray = [...cardValues, ...cardValues];
    cardArray.sort(() => 0.5 - Math.random());

    cardArray.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        cards.push(card);
    });
}

// Virar a carta
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    // Verificar se as cartas viradas são iguais
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Verificar se as cartas combinam
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        score++;
        matchedCards.push(card1, card2);
        scoreDisplay.textContent = score;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        alert('Você ganhou! Parabéns!');
    }
}

// Reiniciar o jogo
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    flippedCards = [];
    matchedCards = [];

    cards.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '';
    });

    grid.innerHTML = '';
    createCards();
}

restartButton.addEventListener('click', restartGame);

createCards();
