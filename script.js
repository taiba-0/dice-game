'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const bg = document.querySelector('.player')

// Starting Conditions
let score, currentScore, activePlayer, playing, win;

//Initializing Function
const init = function(){
    
    score = [0, 0];
    currentScore = 0; // start Current Score
    activePlayer = 0;
    playing = true;

    //setting score to zero
    score0EL.textContent = 0;
    score1EL.textContent = 0;

    //setting current score to zero
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    //settings players
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
    //setting active player to player 1
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    //hidding dice
    diceEL.classList.add('hidden');
    
};


init();




//Switch player
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    
    // 2. Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if(dice !== 1){
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else {
        // Next player's turn
        switchPlayer();
    }

    }
    
});

//Hold Button functionality
btnHold.addEventListener('click', function(){
    if(playing){
        // Add current score to active player's score
        score[activePlayer] += currentScore;
        // score[1] = score[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    

        // Check if player's score is >= 100 
        if (score[activePlayer]>=20 ){

            playing = false;
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
            document.querySelector('.name').textContent = "🎉WINNER!🎉";
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');

            diceEL.classList.add('hidden');
            

        }else{
            //switch to next player
           switchPlayer();
        }

    }

});

//New Game Button functionality
btnNew.addEventListener('click', init);
