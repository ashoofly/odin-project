const options = ["rock", "paper", "scissors"];
const results = ["loss", "win", "tie"];
const text = [
  "Rock crushes Scissors.",
  "Paper covers Rock.",
  "Scissors cuts Paper.", 
  "tie"
]
const choices = document.querySelector('#choices');
const playerScoreSpan = document.querySelector('#playerScore');
const computerScoreSpan = document.querySelector('#computerScore');
const roundResult = document.querySelector('#round_result');
const roundResultText = document.querySelector('#round_result_text');
const buttonsDiv = document.querySelector('#buttons');
const playButton = document.querySelector('#play-button');
const roundHistory = document.querySelector('#round_history');
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
    clearRoundResults();
    renderChoices();
    roundButton.parentNode.removeChild(roundButton);
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
    updateScores();
    removeAllChildren(finalResult);
    incrementRound();
    clearRoundResults();
    renderChoices();
    removeElement(playAgain);
    removeAllChildren(roundHistory);
  })
}

function clearRoundResults() {
  removeAllChildren(roundResult);
  removeAllChildren(roundResultText);
}

function displayRound() {
  const header = document.querySelector('#header');
  removeAllChildren(header);

  const roundDisplay = document.createElement('h1');
  roundDisplay.textContent = 'Round ';
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

function updateScores() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function renderResult(playerSelection, computerSelection, result, resultText) {
  updateScores();
  removeAllChildren(roundResult);

  const playerImg = document.createElement('img');
  playerImg.setAttribute('src', `images/${playerSelection}.png`);
  playerImg.classList.add("weapon-img", results[result[0]]);
  roundResult.appendChild(playerImg);

  const cardSpacer = document.createElement('h1');
  cardSpacer.classList.add("card-spacer");
  cardSpacer.textContent = "VS."
  roundResult.appendChild(cardSpacer);

  const computerImg = document.createElement('img');
  computerImg.setAttribute('src', `images/${computerSelection}.png`);
  computerImg.classList.add("weapon-img", results[result[1]]);
  roundResult.appendChild(computerImg);

  renderRoundWinnerText(playerSelection, computerSelection, result, resultText);
  updateRoundHistory(playerSelection, computerSelection, result);

  if (!isGameOver()) {
    renderRoundButton();
  } else {
    renderPlayAgainButton();
  }
}

function getRoundResultFromPlayerPerspective(result) {
  if (result[1] == 1) {
    return "loss";
  } else if (result[0] == 1) {
    return "win";
  } else if (result[0] == 2) {
    return "tie";
  }
}

function renderRoundWinnerText(playerSelection, computerSelection, result, resultText) {
  const roundExplanation = document.createElement('h2');
  roundExplanation.textContent = resultText == "tie" ? `${capitalize(playerSelection)} ties ${capitalize(computerSelection)}.` : resultText;
  const roundWinnerTextElement = document.createElement('p');
  let roundWinnerText = "";
  if (getRoundResultFromPlayerPerspective(result) == "loss") {
    roundWinnerText = "Computer wins this round.";
  } else if (getRoundResultFromPlayerPerspective(result) == "win") {
    roundWinnerText = "You win this round!";
  } else if (getRoundResultFromPlayerPerspective(result) == "tie") {
    roundWinnerText = "No points this round.";
  }
  roundWinnerTextElement.textContent = roundWinnerText;
  roundResultText.appendChild(roundExplanation);
  roundResultText.appendChild(roundWinnerTextElement);
}

function playRound(playerChoice, computerSelection) {
  const playerSelection = playerChoice.toLowerCase();
  removeAllChildren(choices);

  if (playerSelection == computerSelection) {
    renderResult(playerSelection, computerSelection, [2, 2], text[3]);

  } else if (playerSelection == "rock") {
    if (computerSelection == "scissors") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0], text[0]);

    } else if (computerSelection == "paper") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1], text[1]);
    }  
  } else if (playerSelection == "scissors") {
    if (computerSelection == "rock") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1], text[0]);

    } else if (computerSelection == "paper") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0], text[2]);
    }
  } else if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      incrementPlayerScore();
      renderResult(playerSelection, computerSelection, [1, 0], text[1]);

    } else if (computerSelection == "scissors") {
      incrementComputerScore();
      renderResult(playerSelection, computerSelection, [0, 1], text[2]);
    }
  }
}

function updateRoundHistory(playerSelection, computerSelection, result) {
  let tableTitle = document.querySelector('#roundHistoryTitle');
  if (!tableTitle) {
    tableTitle = document.createElement('h3');
    tableTitle.setAttribute('id', 'roundHistoryTitle');
    tableTitle.textContent = 'Round History';
    roundHistory.appendChild(tableTitle);
  }
  let table = document.querySelector('#roundHistoryTable');
  if (!table) {
    table = createTableWithColumns('roundHistoryTable', 'Round', 'Player', 'Computer', 'Result', 'Score');
    roundHistory.appendChild(table);
  }
  let score = `${playerScore}-${computerScore}`;
  addRowToTable('roundHistoryTable', roundNumber, capitalize(playerSelection), capitalize(computerSelection), capitalize(getRoundResultFromPlayerPerspective(result)), score);
}

function isGameOver() {
  if (playerScore < 5 && computerScore < 5) return false;
  let winner;
  if (playerScore >=5) {
    winner = 'Player';
  } else if (computerScore >=5) {
    winner = 'Computer';
  }
  const finalResultText = document.createElement('h1');
  finalResultText.textContent = `${winner} WINS the game!`;
  finalResult.appendChild(finalResultText);

  return true;
}
