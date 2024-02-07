/*
    2C = two of clubs
    2D = two of diamonds
    2H = two of hearts
    2S = two of spades
 */
const typeOfCards = ['C','D','H','S'];
const specialCards = ['A','J','Q','K'];

let deck = [];

let playerPoints = 0;
let cpuPoints = 0;
let turnPlayer = true;

// references HTML 
const buttonNewGame = document.querySelector('#buttonNewGame');
const buttonGetCard = document.querySelector('#buttonGetCard');
const buttonStopCards = document.querySelector('#buttonStopCards');

const showPoints = document.getElementsByTagName('small');

const playerCards = document.getElementById('player-cards');
const cpuCards = document.getElementById('computer-cards');



// Events
buttonGetCard.addEventListener('click', () => {
    if(turnPlayer === true) {
        playerPoints = turn(0, playerCards, playerPoints);
    } else {
        cpuPoints = turn(1, cpuCards, cpuPoints);
    }
});

// turn 
const turn = (indexShow, containerCards, points) => {
    let cardObtained = getCard();
    
    if(points < 21) {
        points += getValueCard(cardObtained);
        showPoints[indexShow].innerText = points;
        createCard(cardObtained, containerCards); 
    }  else {
        buttonGetCard.disabled = true; 
    }
    turnPlayer = !turnPlayer; 
    return points
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
const createCard = (cardNumber, containerPlayerOrCpu) => {
    let card = document.createElement('img');
    card.classList.add('card');
    card.src = `assets/desk/${cardNumber}.png`;
    card.alt = `ImageOfCard:${cardNumber}`;
    containerPlayerOrCpu.appendChild(card);
}