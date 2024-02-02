/*
    2C = two of clubs
    2D = two of diamonds
    2H = two of hearts
    2S = two of spades
 */
const typeOfCards = ['C','D','H','S'];
const specialsCards = ['A','J','Q','K'];

let desk = [];

const createDesk = () => {
    for(let i = 2; i <= 10; i++) {
        for(let type of typeOfCards) {
            desk.push(`${i}${type}`);
        }
    }
    for(let type of typeOfCards) {
        for(let special of specialsCards) {
            desk.push(`${special}${type}`)
        }
    }

    console.log(desk);
}
createDesk();