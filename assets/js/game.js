/*
    2C = two of clubs
    2D = two of diamonds
    2H = two of hearts
    2S = two of spades
 */
// global instances
const typeOfCards = ['C','D','H','S'];
const specialCards = ['A','J','Q','K'];

let deck = [];

let playerPoints = 0;
let player2Points = 0;
let turnPlayerObj = {
    turnPlayer1: true,
    turnPlayer2: true
};


// references HTML 
const buttonNewGame = document.querySelector('#buttonNewGame');
const buttonGetCard = document.querySelector('#buttonGetCard');
const buttonStopCards = document.querySelector('#buttonStopCards');

const showPoints = document.getElementsByTagName('small');

const playerCards = document.getElementById('player-cards');
const player2Cards = document.getElementById('player2-cards');



// Events
buttonGetCard.addEventListener('click', () => {
    turn();
    });

buttonStopCards.addEventListener('click', () => {
    stopTurn()
});


// functions:

// turn 
const turn = () => {
    let cardObtained = getCard();
    if(turnPlayerObj.turnPlayer1 === true || turnPlayerObj.turnPlayer2 !== true) {
        playerPoints += getValueCard(cardObtained)
        showPoints[0].innerText = playerPoints;
        createCard(cardObtained, playerCards);
    turnPlayerObj.turnPlayer1 = !turnPlayerObj.turnPlayer1;
    } else if(turnPlayerObj.turnPlayer2 === true || turnPlayerObj.turnPlayer1 !== true) {
        player2Points += getValueCard(cardObtained)
        showPoints[1].innerText = player2Points;
        createCard(cardObtained, player2Cards);
        turnPlayerObj.turnPlayer1 = !turnPlayerObj.turnPlayer1;
    }
    if(player2Points > 21 || playerPoints > 21) {
        buttonGetCard.disabled = true
        isWin();
    } 
    stopTurn()
}

// stop turn
const stopTurn = () => {
    if(turnPlayerObj.turnPlayer1 === true && playerCards.childElementCount > 0) {
        turnPlayerObj.turnPlayer1 = false;
        Object.freeze(turnPlayerObj);
    } else if(turnPlayerObj.turnPlayer2 === true && player2Cards.childElementCount > 0) {
        turnPlayerObj.turnPlayer2 = false;
        Object.freeze(turnPlayerObj);
    } 
}

// create new deck for the players
const createDeck = () => {
    for(let i = 2; i <= 10; i++) {
        for(let type of typeOfCards) {
            deck.push(`${i}${type}`);
        }
    }
    for(let type of typeOfCards) {
        for(let special of specialCards) {
            deck.push(`${special}${type}`)
        }
    } // add special cards to the deck

    deck = _.shuffle(deck); // underscore library --> Shuffle the deck randomly
}
createDeck();

// get a card
let deckCopy = Array.from(deck); // In this case, i prefer mantain deck integrity throughout the game. 


const getCard = () => (deckCopy.length !== 0) ? deckCopy.shift() : console.error("There aren't more cards in the deck");
/* alternative code: 
    const getCard = () => {
        if(deckCopy.length === 0) {
            throw "There aren't more cards in the deck";
        } 
        return deckCopy.shift() 
    }
*/

const getValueCard = (card) => {
    let cardValue = card.substring(0, card.length - 1); // getValueCard(2k) --> output: 2,  getValueCard(10c) --> outout: 10, getValueCard(AC) --> output: A
    return isNaN(cardValue) ? (cardValue === 'A' ? 11 : 10) : Number(cardValue);

    // (cardValue === 'A') ? 11 : 10; in blackJack only the letter "A" with other letter, worth 11. The other letters worth 10.
    //  Number(cardValue); alternative --> points = cardValue * 1 // this convert to string in a number. 
    /* 
        console.log(getValueCard('AD')) // 11
        console.log(getValueCard('2D')) // 2
        console.log(getValueCard('KH')) // 10 
    */
}
// Card element 
const createCard = (cardNumber, containerPlayerOrPlayer2) => {
    let card = document.createElement('img');
    card.classList.add('card');
    card.src = `assets/desk/${cardNumber}.png`;
    card.alt = `ImageOfCard:${cardNumber}`;
    containerPlayerOrPlayer2.appendChild(card);
}

// function Win
const isWin = () => {
    setTimeout( () => {
        if (player2Points === playerPoints && player2Points > 0 && playerPoints > 0) {
            alert('Draw')
        } else if(player2Points > 21 && playerPoints <= 21) {
            alert('Player 1 Win') 
        } else if(playerPoints > 21 && player2Points <= 21) {
            alert('Player 2 Win');
        } 
    }, 200)
    } 
