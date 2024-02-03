/*
    2C = two of clubs
    2D = two of diamonds
    2H = two of hearts
    2S = two of spades
 */
const typeOfCards = ['C','D','H','S'];
const specialCards = ['A','J','Q','K'];

let deck = [];

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
    console.log(deck);
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
    let points = 0;
    let cardValue = card.substring(0, card.length - 1); // getValueCard(2k) --> output: 2,  getValueCard(10c) --> outout: 10, getValueCard(AC) --> output: A
    if(isNaN(cardValue)) {
        console.log("Isn't a number");
    }
    else {
        points = Number(cardValue); // alternative --> points = cardValue * 1 // this convert to string in a number. 
    }
    return cardValue
}