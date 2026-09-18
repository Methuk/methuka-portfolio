
// ================= GAME SETUP =================

// The symbols we want to match
const symbols = ["🐍", "🚗", "⚽", "🚀", "💻", "🎮", "🧠", "🌎"];

// Get the HTML elements
const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const restartButton = document.getElementById("restart");
const winMessage = document.getElementById("win-message");


// ================= GAME VARIABLES =================

// Stores the cards
let cards = [];

// Stores the first card clicked
let firstCard = null;

// Stores the second card clicked
let secondCard = null;

// Stops the player clicking while cards are being checked
let locked = false;

// Counts the number of moves
let moves = 0;

// Counts matched pairs
let pairs = 0;


// ================= SHUFFLE =================

function shuffle(array) {

    // Goes through the array backwards
    for (let i = array.length - 1; i > 0; i--) {

        // Pick a random position
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the cards
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


// ================= CREATE GAME =================

function createGame() {

    // Clear the board
    gameBoard.innerHTML = "";

    // Reset variables
    moves = 0;
    pairs = 0;

    firstCard = null;
    secondCard = null;
    locked = false;

    // Reset display
    movesDisplay.textContent = "0";
    pairsDisplay.textContent = "0 / 8";
    winMessage.textContent = "";


    // Create two copies of every symbol
    cards = [...symbols, ...symbols];

    // Shuffle the cards
    shuffle(cards);


    // Create each card
    cards.forEach(function(symbol) {

        const card = document.createElement("button");

        card.classList.add("card");

        card.textContent = "?";

        card.dataset.symbol = symbol;

        // When clicked
        card.addEventListener("click", function() {
            flipCard(card);
        });

        // Add card to board
        gameBoard.appendChild(card);
    });
}


// ================= FLIP CARD =================

function flipCard(card) {

    // Don't allow clicking if the board is locked
    if (locked) {
        return;
    }

    // Don't allow clicking the same card twice
    if (card === firstCard) {
        return;
    }

    // Don't allow clicking an already matched card
    if (card.classList.contains("matched")) {
        return;
    }


    // Show the symbol
    card.textContent = card.dataset.symbol;

    card.classList.add("revealed");


    // If this is the first card
    if (firstCard === null) {

        firstCard = card;

        return;
    }


    // Otherwise this is the second card
    secondCard = card;

    moves++;

    movesDisplay.textContent = moves;


    // Check whether they match
    checkMatch();
}


// ================= CHECK MATCH =================

function checkMatch() {

    const match =
        firstCard.dataset.symbol === secondCard.dataset.symbol;


    if (match) {

        // The cards match
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        pairs++;

        pairsDisplay.textContent = pairs + " / 8";

        resetCards();


        // Check if the player has won
        if (pairs === 8) {

            winMessage.textContent =
                "🎉 You won in " + moves + " moves!";
        }

    } else {

        // Lock the board temporarily
        locked = true;

        // Hide the cards after 800ms
        setTimeout(function() {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");

            resetCards();

        }, 800);
    }
}


// ================= RESET CARDS =================

function resetCards() {

    firstCard = null;

    secondCard = null;

    locked = false;
}


// ================= RESTART =================

restartButton.addEventListener("click", function() {

    createGame();

});


// Start the game when the page loads
createGame();

