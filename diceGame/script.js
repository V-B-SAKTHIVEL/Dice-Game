//Help Section
const helpBtn = document.querySelector('.help');
const backfilter = document.querySelector('.backfilter');
const helpWindow = document.querySelector('.help-window');
const closeBtn = document.querySelector('.closeBtn');

const openModal = function () {
  helpWindow.classList.remove('hidden');
  backfilter.classList.remove('hidden');
};
const closeModal = function () {
  helpWindow.classList.add('hidden');
  backfilter.classList.add('hidden');
};
helpBtn.addEventListener('click', function () {
  if (!helpBtn.classList.contains('hidden')) {
    openModal();
  }
});
closeBtn.addEventListener('click', function () {
  closeModal();
});

//Variables
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('.score--0');
const score1 = document.querySelector('.score--1');
const current0 = document.querySelector('.cscore--0');
const current1 = document.querySelector('.cscore--1');
const newGameBtn = document.getElementById('newGame');
const roll = document.getElementById('rollDice');
const holdBtn = document.getElementById('holdGame');
const diceEl = document.querySelector('.diceImg');

let currentScore, activePlayer, scores, playing;
score0.textContent = score1.textContent = 0;
diceEl.classList.add('hidden');

//Functions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  current0.textContent = current1.textContent = 0;
  score0.textContent = score1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.querySelector(`.cscore--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

roll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.cscore--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', function () {
  init();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
