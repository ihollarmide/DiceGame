// GAME RULES:

/*
    SINGLE DIE MODE

    Choose a player to go first.
    That player throws a die and scores as many points as the total shown on the die providing the die doesn’t roll a 1
    The player may continue rolling and accumulating points (but risk rolling a 1) or end his turn.
    If the player rolls a 1 his turn is over, he loses all points he accumulated that turn, and he passes the die to the next player.
    Play passes from player to player until a winner is determined.
    The first player to accumulate 100 or the defined winning points wins the game.

*/

/*
    DOUBLE DICE MODE

    This variant is the same as Pig, except two standard dice are rolled.
    If neither shows a 1, their sum is added to the turn total.
    If a single 1 is rolled, the player scores nothing and the turn ends.
    If two 1s are rolled, the player’s entire score is lost and their turn ends.
    Play passes from player to player until a winner is determined.
    The first player to accumulate 100 or the defined winning points wins the game.
*/

/*---------------------------------------------------------------------------------------------------------*/



/****************************************************************/
/* App name and Functionality: Single Page App with Modal Popups */
/****************************************************************/

// Click event variables

const playGamePopUp = document.querySelector('.game-question');
const rulesPopUp = document.querySelector('.rules-wrapper');
const gameIntroWrapper = document.querySelector('.games');
const fullBody = document.querySelector('.full');
const doubleGameBtn = document.querySelector('.game-double');
const singleGameBtn = document.querySelector('.game-single');
const gameMode = document.querySelector('.wrapper');
const homeBtn = document.querySelector('.btn-home');
const rulesBtn = document.querySelector('.btn-rules');

// "How do you play Pig" Pop up functionality
playGamePopUp.addEventListener('click', function(e){
    // Invoke displayRules()
    displayRules();

    e.preventDefault();
});

rulesBtn.addEventListener('click', function(e){

    gameMode.classList.remove('wrapper-active');
    gameIntroWrapper.classList.add('games-inactive');
    rulesPopUp.classList.add('rules-active');
    fullBody.classList.add('full-active');
    fullBody.removeAttribute('style');
    rulesPopUp.removeAttribute('style');
    e.preventDefault();
});

// To close the modal by clicking outside of it
fullBody.addEventListener('click', displayRules);

// To fire up Single Die mode functionality upon clicking
singleGameBtn.addEventListener('click', function(e){
    gameModal();
    singleDieMode();
    e.preventDefault();
})

// To fire up Double Dice mode functionality upon clicking
doubleGameBtn.addEventListener('click', function(e){
    gameModal();
    doubleDieMode();
    e.preventDefault();
})


homeBtn.addEventListener('click', function(){
    //  To return to homepage of the app
    location.href = 'index.html';
})

// Hold Button Functionality to add current score to total score and pass turn
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {

        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;


        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        //Check if player won the game Functionality

        // Get the value of input winning score by players
        let input = Number(document.getElementById('form-value').value);
        let winningScore;

        // 0, null, '', are  falsy values and are all coerced to false
        if (!input || input === 0) {
            winningScore = 100;
        } else {
            winningScore = input;
        }

        if (scores[activePlayer] >= winningScore) {

            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        
        } else {

            // Next Player Function
            nextPlayer();
        }

    }

});


// New Game Event Trigger to invoke the game initialization Function
document.querySelector('.btn-new').addEventListener('click', init);

// Next Player Functionality
function nextPlayer () {
    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';

}

// Rules Popup/Modal Function
function displayRules(){
    gameIntroWrapper.classList.toggle('games-inactive');
    rulesPopUp.classList.toggle('rules-active');
    fullBody.classList.toggle('full-active');
}

// Game Mode(Single Die or Double Dice Mode) Popup/Modal Function
function gameModal(){
    rulesPopUp.style.display = 'none';
    fullBody.style.display = 'none';
    gameMode.classList.toggle('wrapper-active');
    gameIntroWrapper.style.display = 'none';
}

/****************************/
/* Main Game Functionality */
/**************************/

// Initialized Variables
var scores, roundScore, activePlayer, gamePlaying;

// Game Initialization Function Called
init();

// Single Die Mode Function
function singleDieMode(){
    // Roll Event Trigger
    document.querySelector('.btn-roll').addEventListener('click', function() {

        if (gamePlaying) {
            // 1. Random Number
            // Formula: Math.random() * (max - min) + min;
            let rarerifyOne = Math.random() * (1.9 - 1.5) + 1.5
            let dice = Math.floor(Math.random() * (6 - rarerifyOne) + rarerifyOne);
            
            // 2. Display the result
            let diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'img/dice-' + dice + '.png';
            
            if (dice === 1) {
                // If a 1 is rolled, the player scores nothing and the turn ends.
                // Next Player Function
                alert('You rolled '+ dice);
                nextPlayer();
            } else {
                // If neither shows a 1, their sum is added to the turn total.
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }

        }
    
    })
}
// Double Die Mode Function
function doubleDieMode(){
    document.querySelector('.btn-roll').addEventListener('click', function() {

        if (gamePlaying) {
            // 1. Random Number
            // Formula: Math.random() * (max - min) + min;	
            let rarerifyOne = Math.random() * (1.9 - 1.5) + 1.5;
            let dice = Math.floor(Math.random() * (6 - rarerifyOne) + rarerifyOne);
            let diceTwo = Math.floor(Math.random() * (6 - rarerifyOne) + rarerifyOne);

            // 2. Display the result
            let diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'img/dice-' + dice + '.png';

            let diceTwoDOM = document.querySelector('.dice-two');
            diceTwoDOM.style.display = 'block';
            diceTwoDOM.src = 'img/dice-' + diceTwo + '.png';
    
            // 3 Reset score if there are two consecutive 6 by the player

            if ((dice === 1 && diceTwo !== 1) || (dice !== 1 && diceTwo === 1)) {
                // If a single 1 is rolled, the player scores nothing and the turn ends.
                // Next Player Function
                alert('You rolled '+ dice + ' and ' + diceTwo);
                nextPlayer();
            } else if (dice === 1 && diceTwo === 1){
                // If two 1s are rolled, the player’s entire score is lost and their turn ends.
                alert('You rolled '+ dice + ' and ' + diceTwo);
                scores.forEach(function(score) {
                    scores[activePlayer] = 0;
                });
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                // Next Player Function
                nextPlayer();
            } else {
                // If neither shows a 1, their sum is added to the turn total.
                roundScore = roundScore + dice + diceTwo;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }

        }
    
    })
}



// Game Initialization Function
function init() {
    // Game Initialization Function
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    // Reset the dice to not display
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';

    // Reset the scores to 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // No winner is set
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}