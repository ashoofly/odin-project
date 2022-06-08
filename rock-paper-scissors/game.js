const options = ["rock", "paper", "scissors"];
const results = ["loss", "win", "tie"];
const text = [
  "Rock crushes Scissors.",
  "Paper covers Rock.",
  "Scissors cuts Paper.", 
  "tie"
]
const choices = document.querySelector('#choices');
const running_score = document.querySelector('#running_score');
const roundResult = document.querySelector('#round_result');
const roundResultText = document.querySelector('#round_result_text');
const buttonsDiv = document.querySelector('#buttons');
const roundHistory = document.querySelector('#round_history');
const finalResult = document.querySelector('#final_result');

let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;
let firstRound = true;
renderChoices();

function resetGame() {
  roundNumber = 0;
  playerScore = 0;
  computerScore = 0;
  renderCurrentScore();
  removeAllChildren(finalResult);
  removeAllChildren(roundHistory);
  clearRoundResults();

  renderChoices();
  incrementRound();
}

function startNewRound() {
  clearRoundResults();
  renderCurrentScore();
  renderChoices();
  incrementRound();
}

function clearRoundResults() {
  removeAllChildren(roundResult);
  removeAllChildren(roundResultText);
}

function renderRoundButton() {
  const roundButton = document.createElement('button');
  roundButton.setAttribute('id', 'round-button');
  roundButton.textContent = 'Again';
  roundButton.style.backgroundColor = 'purple';
  buttons.appendChild(roundButton);

  roundButton.addEventListener('click', function() {
    startNewRound();
    roundButton.parentNode.removeChild(roundButton);
  });
}

function renderPlayAgainButton() {
  const playAgain = document.createElement('button');
  playAgain.setAttribute('id', 'play-again');
  playAgain.textContent = 'Play Again';
  playAgain.style.backgroundColor = 'blue';
  buttons.appendChild(playAgain);

  playAgain.addEventListener('click', function() {
    resetGame();
    playAgain.parentNode.removeChild(playAgain);
  })
}

function renderRoundHeader() {
  const header = document.querySelector('#header');
  removeAllChildren(header);

  const roundDisplay = document.createElement('h1');
  roundDisplay.textContent = 'Round ';
  const span = document.createElement('span');
  span.setAttribute('id', 'round_number');
  roundDisplay.appendChild(span);
  header.appendChild(roundDisplay);  
  return span;
}

function renderCard(choice) {
  const div = document.createElement('div');
  div.classList.add("card-div");
  const card = document.createElement('img');
  card.classList.add("weapon-img");
  card.setAttribute('id', choice);
  card.setAttribute('src', `images/${choice}.png`);
  div.appendChild(card);
  return div;
}

function renderChoices() {
  const rock = renderCard('rock');
  const paper = renderCard('paper');
  const scissors = renderCard('scissors');

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

    if (firstRound) {
      weapon.addEventListener('click', function() {
        incrementRound();
        firstRound = false;
      });
    }

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

function renderResult(playerSelection, computerSelection, result, resultText) {
  removeAllChildren(choices);
  removeAllChildren(running_score);

  const playerCol = createGameCol('Player', playerScore, playerSelection, results[result[0]]);
  const versusCol = createVSCol();
  const computerCol = createGameCol('Computer', computerScore, computerSelection, results[result[1]]);
  
  roundResult.appendChild(playerCol);
  roundResult.appendChild(versusCol);
  roundResult.appendChild(computerCol);

  renderRoundWinnerText(playerSelection, computerSelection, result, resultText);
  renderRoundHistory(playerSelection, computerSelection, result);

  if (!isGameOver()) {
    renderRoundButton();
  } else {
    renderPlayAgainButton();
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

function renderCurrentScore() {
  const playerScoreHeading = document.createElement('h2');
  playerScoreHeading.classList.add('scoreHeading');
  playerScoreHeading.textContent = `Player:`;
  playerScoreSpan = document.createElement('span');
  playerScoreSpan.classList.add("score");
  playerScoreSpan.textContent = playerScore;
  playerScoreHeading.appendChild(playerScoreSpan);

  const computerScoreHeading = document.createElement('h2');
  computerScoreHeading.classList.add('scoreHeading');
  computerScoreHeading.textContent = `Computer:`;
  computerScoreSpan = document.createElement('span');
  computerScoreSpan.classList.add("score");
  computerScoreSpan.textContent = computerScore;
  computerScoreHeading.appendChild(computerScoreSpan);

  running_score.appendChild(playerScoreHeading);
  running_score.appendChild(computerScoreHeading);
}

function renderRoundHistory(playerSelection, computerSelection, result) {
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

function highlightResult(card, result) {
  const cardImage = card.querySelector('img');
  cardImage.classList.add(result);
}

function createGameCol(whichPlayer, score, selection, result) {
  const gameCol = document.createElement('div');
  gameCol.classList.add("game-col");

  const scoreHeading = document.createElement('h2');
  scoreHeading.textContent = `${whichPlayer}:`;
  const scoreSpan = document.createElement('span');
  scoreSpan.classList.add("score");
  scoreSpan.textContent = score;
  scoreHeading.appendChild(scoreSpan);
  gameCol.appendChild(scoreHeading);

  const resultCard = renderCard(selection);
  highlightResult(resultCard, result);
  gameCol.appendChild(resultCard);

  return gameCol;
}

function createVSCol() {
  const spaceCol = document.createElement('div');
  spaceCol.classList.add("game-col");
  const spaceHeading = document.createElement('h2');
  spaceHeading.textContent = " ";
  spaceCol.appendChild(spaceHeading);
  const cardSpacer = document.createElement('h1');
  cardSpacer.classList.add("card-spacer");
  cardSpacer.textContent = "VS."
  spaceCol.appendChild(cardSpacer);
  return spaceCol
}

function incrementRound() {
  roundNumber++;
  let roundDisplay = document.querySelector('#round_number');
  if (!roundDisplay) {
    roundDisplay = renderRoundHeader();
  }
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

function getRoundResultFromPlayerPerspective(result) {
  if (result[1] == 1) {
    return "loss";
  } else if (result[0] == 1) {
    return "win";
  } else if (result[0] == 2) {
    return "tie";
  }
}

function playRound(playerChoice, computerSelection) {
  const playerSelection = playerChoice.toLowerCase();

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

function isGameOver() {
  if (playerScore < 3 && computerScore < 3) return false;
  let winner;
  if (playerScore >=3) {
    winner = 'Player';
  } else if (computerScore >=3) {
    winner = 'Computer';
  }
  const finalResultText = document.createElement('h1');
  finalResultText.textContent = `${winner} WINS the game!`;
  finalResult.appendChild(finalResultText);

  return true;
}
