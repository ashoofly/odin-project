const options = ["rock", "paper", "scissors"];
const results = ["loss", "win", "tie"];
const choices = document.querySelector('#choices');
const roundResult = document.querySelector('#round_result');
const buttonsDiv = document.querySelector('#buttons');
const playButton = document.querySelector('#play-button');
let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

playButton.addEventListener('click', function() {
  displayRound();
  resetChoices();
  playButton.parentNode.removeChild(playButton);
});

function renderRoundButton() {
  const roundButton = document.createElement('button');
  roundButton.setAttribute('id', 'round-button');
  roundButton.textContent = 'Again';
  roundButton.style.backgroundColor = 'purple';
  buttons.appendChild(roundButton);

  roundButton.addEventListener('click', function() {
    incrementRound();
    removeRoundResults();
    renderChoices();
    roundButton.parentNode.removeChild(roundButton);
  });
}

function removeRoundResults() {
  const weaponImages = document.querySelectorAll('.weapon-img');
  weaponImages.forEach((weaponImg) => {
    removeElement(weaponImg);
  });
}

function removeRoundButton() {
  const roundButton = document.querySelector('#round-button');
  removeElement(roundButton);
}

function renderPlayAgainButton() {
  const playAgain = document.createElement('button');
  playAgain.setAttribute('id', 'play-again');
  playAgain.textContent = 'Play Again';
  playAgain.style.backgroundColor = 'blue';
  buttons.appendChild(playAgain);

  playAgain.addEventListener('click', function() {
    roundNumber = 0;
    playerScore = 0;
    computerScore = 0;
    finalResult.textContent = '';
    incrementRound();
    removeAllChildren(roundResult);
    renderChoices();
    removeElement(playAgain);
  })

}

function displayRound() {
  const header = document.querySelector('#header');
  removeAllChildren(header);

  const roundDisplay = document.createElement('h2');
  roundDisplay.textContent = 'Round: ';
  const span = document.createElement('span');
  span.setAttribute('id', 'round_number');
  roundDisplay.appendChild(span);
  header.appendChild(roundDisplay);  
  incrementRound();
}

function resetChoices() {
  removeAllChildren(choices);
  renderChoices();
}

const finalResult = document.querySelector('#final_result');

function incrementRound() {
  roundNumber++;
  const roundDisplay = document.querySelector('#round_number');
  roundDisplay.textContent = roundNumber;
}

function incrementPlayerScore() {
  playerScore++;
}

function incrementComputerScore() {
  computerScore++;
}

function computerPlay() {
  return options[Math.floor(Math.random()*options.length)];
}

function renderChoices() {
  const rock = document.createElement('img');
  rock.classList.add("weapon-img");
  rock.setAttribute('id', 'rock');
  rock.setAttribute('src', `images/rock.png`);

  const paper = document.createElement('img');
  paper.classList.add("weapon-img");
  paper.setAttribute('id', 'paper');
  paper.setAttribute('src', `images/paper.png`);

  const scissors = document.createElement('img');
  scissors.classList.add("weapon-img");
  scissors.setAttribute('id', 'scissors');
  scissors.setAttribute('src', `images/scissors.png`);

  choices.appendChild(rock);
  choices.appendChild(paper);
  choices.appendChild(scissors);

  const weaponOpts = document.querySelectorAll('.weapon-img');
  weaponOpts.forEach((weapon) => {
    weapon.setAttribute('style', 'cursor: pointer;')

    weapon.addEventListener('mouseover', function() {
      weapon.classList.toggle('player-hover');
    });
  
    weapon.addEventListener('mouseout', function() {
      weapon.classList.toggle('player-hover');
    });
  });
  
  rock.addEventListener('click', function(e) {
    playRound('rock', computerPlay());
  });
  
  paper.addEventListener('click', function(e) {
    playRound('paper', computerPlay());
  });
  
  scissors.addEventListener('click', function(e) {
    playRound('scissors', computerPlay());
  });
}

function createGameCol(colHeader, colScore, resultId) {
  const col = document.createElement('div');
  col.classList.add('game-col');
  const h3 = document.createElement('h3');
  h3.classList.add('col-header');
  h3.textContent = `${colHeader}: ${colScore}`;
  col.appendChild(h3);
  const colResult = document.createElement('div');
  colResult.setAttribute('id', resultId);
  col.appendChild(colResult);
  roundResult.appendChild(col);
  return colResult;
}

function renderResult(playerSelection, computerSelection, result) {

  removeAllChildren(roundResult);

  const playerChoice = createGameCol('Player', playerScore, 'player');
  const computerChoice = createGameCol('Computer', computerScore, 'computer');

  const playerImg = document.createElement('img');
  playerImg.setAttribute('src', `images/${playerSelection}.png`);
  playerImg.classList.add("weapon-img", results[result[0]]);
  playerChoice.appendChild(playerImg);

  const computerImg = document.createElement('img');
  computerImg.setAttribute('src', `images/${computerSelection}.png`);
  computerImg.classList.add("weapon-img", results[result[1]]);
  computerChoice.appendChild(computerImg);

  if (!isGameOver()) {
    renderRoundButton();
  } else {
    renderPlayAgainButton();
  }
}

function playRound(playerChoice, computerSelection) {
  const playerSelection = playerChoice.toLowerCase();
  removeAllChildren(choices);

  if (playerSelection == computerSelection) {
    renderResult(playerSelection, computerSelection, [2, 2]);

  } else if (playerSelection == "rock") {
    if (computerSelection == "scissors") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0]);

    } else if (computerSelection == "paper") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1]);
    }  
  } else if (playerSelection == "scissors") {
    if (computerSelection == "rock") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1]);

    } else if (computerSelection == "paper") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0]);
    }
  } else if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0]);

    } else if (computerSelection == "scissors") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1]);
    }
  }
}

function isGameOver() {
  if (playerScore < 5 && computerScore < 5) return false;
  let winner;
  if (playerScore >=5) {
    winner = 'Player';
  } else if (computerScore >=5) {
    winner = 'Computer';
  }
  finalResult.textContent = `${winner} WINS!!!`;
  return true;
}
