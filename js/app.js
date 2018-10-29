/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random Number
        var dice = Math.floor((Math.random() * 6) + 1);
        var diceTwo = Math.floor((Math.random() * 6) + 1);
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        var diceTwoDOM = document.querySelector('.dice-two');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'img/dice-' + diceTwo + '.png';

        // 3 Reset score if there are two consecutuive 6 by the player
        if (((lastDice === 6 && dice === 6) && (lastDiceTwo === 6 && diceTwo === 6)) || (dice === 1 || diceTwo === 1)) {

            nextPlayer();

        // 4. Update the round score IF the rolled number was NOT a 1  or a double six consecutively
        } else if (dice !== 1 && diceTwo !== 1)  {
            roundScore = roundScore + dice + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {

        // Next Player Function
            nextPlayer();
            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
        }

        lastDice === dice;
        lastDiceTwo === diceTwo;
        
    }

})

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {

        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;


        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        //Check if player won the game
        var input = Number(document.getElementById('form-value').value);
        var winningScore;
        // 0, null, '', are all coerced to false

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

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Prayer 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



















/*
document.querySelector('#current-' + activePlayer).textContent = dice;

var x = document.querySelector('#score-0').textContent;
console.log(x);
*/