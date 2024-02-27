(() => {
    'use strict'
    /*
        2C = two of clubs
        2D = two of diamonds
        2H = two of hearts
        2S = two of spades
     */
    // global instances
    const   typeOfCards = ['C','D','H','S'], 
            specialCards = ['A','J','Q','K'];
    
    let deck = [], 
        playersPoint = [],
        playersTurn = [],
        playersStopTurn = [];
    
    // references HTML 
    const titleBlackJack = document.querySelector('.title-blackjack');
    
    const buttonNewGame = document.querySelector('#buttonNewGame'),
        buttonGetCard = document.querySelector('#buttonGetCard'),
        buttonStopCards = document.querySelector('#buttonStopCards'),
        sectionPlayesrContainer = document.querySelector('.section-players-container');
        // showPoints = document.getElementsByTagName('small'),
    
    

    
    
    
    // Events
    buttonNewGame.addEventListener('click', () => {
        newGame();
    })
    buttonGetCard.addEventListener('click', () => {
        turn();
        });
    
    buttonStopCards.addEventListener('click', () => {
        stopTurn();
    });
    
    
    // functions:
    
    // intialize Game 
    const initializeGame = (numPlayers = 2) => {
        deck = createDeck();
        for(let i = 0; i < numPlayers; i++) {
            playersPoint.push(0);
            playersTurn.push(false);
            playersStopTurn.push(false);
        }
        playersTurn[0] = true;
        createPlayers(numPlayers, playersPoint);
    }
    // createPlayer
    const createPlayers = (numPlayers, playersPoint) => {
        for(let i = 0; i < numPlayers; i++) {
            let divFather = document.createElement('div'),
                divCol = document.createElement('div'),
                h1Element = document.createElement('h1'),
                divRow = document.createElement('div');
            
            sectionPlayesrContainer.appendChild(divFather);
            divFather.appendChild(divCol);
            divCol.appendChild(h1Element);
            divCol.appendChild(divRow);            
    
            divFather.classList.add('row', 'container', 'mt-4');
            divCol.classList.add('col');
            h1Element.classList.add('title-player',`title-player${i + 1}`)
            divRow.classList.add('row', 'player-container-cards');
            divRow.setAttribute('id', 'player-cards');
    
            h1Element.innerText = `Player ${[i + 1]} - ${playersPoint[i]}`;
            
        }
        /*
                <div class="row container">
                    <div class="col">
                        <h1>Player - <small>0</small></h1>
                        <div class="row" id="player-cards">
                            #### 3D ####
                        </div>
                    </div>
                </div>
        */
    }

    // turn 
    const turn = () => {
        let titlePlayers = Array.from(document.querySelectorAll('.title-player'));
        let arrayPlayerContainerCards = Array.from(document.querySelectorAll('.player-container-cards'));
        
        let cardObtained = getCard();
        let playerIndexTurn = playersTurn.findIndex( (player) => player === true );
        let nextIndex = ((playerIndexTurn + 1) < playersTurn.length) ? playerIndexTurn + 1 : 0;

        playersPoint[playerIndexTurn] += getValueCard(cardObtained);
        titlePlayers[playerIndexTurn].innerText =  `Player ${[playerIndexTurn + 1]} - ${playersPoint[playerIndexTurn]}`;
        createCard(cardObtained, arrayPlayerContainerCards[playerIndexTurn]); 
        console.log('index actual:', playerIndexTurn);
        console.log('index siguiente:', nextIndex);

        if(playersPoint[nextIndex] < 21 && playersStopTurn[nextIndex] === false) {
            console.log('true')

            passTurn(playerIndexTurn, nextIndex);
        } else {

            if(playersPoint.every((point) => point >= 21) || playersStopTurn.every((stop) => stop === true) ) {
                return buttonGetCard.disabled = true;
            }
            let validIndex = findValidIndex(nextIndex, playerIndexTurn, playersPoint, playersStopTurn, j = 1)
            passTurn(playerIndexTurn, validIndex);
        }
    }
    // 
    let j = 1;
    function findValidIndex(nextIndex, playerIndexTurn, playersPoint, playersStopTurn) {
        console.log(j)
        let i = (playerIndexTurn + j) % playersPoint.length;
        if (playersPoint[i] >= 21 || playersStopTurn[i] === true) {
            j++
            return findValidIndex(nextIndex, playerIndexTurn, playersPoint, playersStopTurn);
        } else {
            return i;
        }
    }

    // pass turn
    const passTurn = (indexCurrentTurn, nextIndex) => {
        playersTurn[indexCurrentTurn] = false;
        playersTurn[nextIndex] = true;
        return playersTurn;
    }

    // function stopTurn 
    const stopTurn = () => {
        let playerIndexTurn = playersTurn.findIndex( (player) => player === true );
        let nextIndex = ((playerIndexTurn + 1) < playersTurn.length) ? playerIndexTurn + 1 : 0;
        playersStopTurn[playerIndexTurn] = true;
        passTurn(playerIndexTurn, nextIndex)
        return playersTurn;
    } 
    
    
    // create new deck for the players
    const createDeck = () => {
        deck = [];
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
    
        return _.shuffle(deck); // underscore library --> Shuffle the deck randomly
    }
    
    
    // let deckCopy = Array.from(deck); // In this case, i prefer mantain deck integrity throughout the game. 
    
    // get a card
    const getCard = () => (deck.length !== 0) ? deck.shift() : console.error("There aren't more cards in the deck");
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
    const createCard = (cardNumber, container) => {
        let card = document.createElement('img');
        card.classList.add('card');
        card.src = `assets/desk/${cardNumber}.png`;
        card.alt = `ImageOfCard:${cardNumber}`;
        container.appendChild(card);
    }
    
    // function Win
    const isWin = () => {
        let player1Win = (player2Points > 21 && playerPoints <= 21) || (playerPoints <= 21 && playerPoints >  player2Points);
        let player2Win = (playerPoints > 21 && player2Points <= 21) || (player2Points <= 21 && playerPoints <  player2Points);
        let draw = (player2Points === playerPoints) && (player2Points > 0) && (playerPoints > 0);
    
        setTimeout( () => {
            if(draw) {
                titleBlackJack.innerText = "It's a Draw"
                alert('Draw')
            } else if(player1Win) {
                titleBlackJack.innerText = 'Player 1 is the Winner'
                alert('Player 1 Win') 
            } else if(player2Win) {
                titleBlackJack.innerText = 'Player 2 is the Winne'
                alert('Player 2 Win');
            } 
        }, 200)
        } 
    
        // function reset and start new game
        const newGame = () => {
            return(
                // deck = [],
                // deck = createDeck(),
                initializeGame(),
                playerPoints = 0, player2Points = 0,
                turnPlayerObj = {
                    turnPlayer1: true,
                    turnPlayer2: true,
                    stop1: false,
                    stop2: false
                }, 
                showPoints[0].innerText = 0,
                showPoints[1].innerText = 0,

                buttonGetCard.disabled = false
            )
        }
})();
