const options = ["rock", "paper", "scissors"];
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');

const roundNumber = document.querySelector('#round_number');
const playerScore = document.querySelector('#player_score');
const computerScore = document.querySelector('#computer_score');
const roundResult = document.querySelector('#round_result');
const finalResult = document.querySelector('#final_result');

function incrementRound() {
  roundNumber.textContent = parseInt(roundNumber.textContent) + 1;
}

function incrementPlayerScore() {
  const newScore = parseInt(playerScore.textContent) + 1;
  playerScore.textContent = newScore;
  isGameOver('Player', newScore);
}

function incrementComputerScore() {
  const newScore = parseInt(computerScore.textContent) + 1;
  computerScore.textContent = newScore;
  isGameOver('Computer', newScore);
}

function computerPlay() {
  return options[Math.floor(Math.random()*options.length)];
}

rockBtn.addEventListener('click', function(e) {
  playRound('rock', computerPlay());
  incrementRound();
});

paperBtn.addEventListener('click', function(e) {
  playRound('paper', computerPlay());
  incrementRound();
});

scissorsBtn.addEventListener('click', function(e) {
  playRound('scissors', computerPlay());
  incrementRound();
});


function playRound(playerChoice, computerSelection) {
  const playerSelection = playerChoice.toLowerCase();

  let result = `${playerSelection} VS ${computerSelection}`

  if (playerSelection == computerSelection) {
    roundResult.textContent = `${result}: tie`;

  } else if (playerSelection == "rock") {
    if (computerSelection == "scissors") {
      roundResult.textContent = `${result}: win`;
      incrementPlayerScore();

    } else if (computerSelection == "paper") {
      roundResult.textContent = `${result}: loss`;
      incrementComputerScore();
    }  
  } else if (playerSelection == "scissors") {
    if (computerSelection == "rock") {
      roundResult.textContent = `${result}: loss`;
      incrementComputerScore();

    } else if (computerSelection == "paper") {
      roundResult.textContent = `${result}: win`;
      incrementPlayerScore();
    }
  } else if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      roundResult.textContent = `${result}: win`;
      incrementPlayerScore();

    } else if (computerSelection == "scissors") {
      roundResult.textContent = `${result}: loss`;
      incrementComputerScore();
    }
  }
}

function isGameOver(player, score) {
  if (score >=5) {
    finalResult.textContent = `${player} WINS!!!`;
  }
}
