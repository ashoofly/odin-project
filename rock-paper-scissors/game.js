const options = ["rock", "paper", "scissors"];

function computerPlay() {
  return options[Math.floor(Math.random()*options.length)];
}

function playRound(playerChoice, computerSelection) {
  const playerSelection = playerChoice.toLowerCase();

  let result = `${playerSelection} VS ${computerSelection}`

  if (playerSelection == computerSelection) {
    console.log(`${result}: tie`);
    return [0, 0];

  } else if (playerSelection == "rock") {
    if (computerSelection == "scissors") {
      console.log(`${result}: win`);
      return [1, 0]

    } else if (computerSelection == "paper") {
      console.log(`${result}: loss`);
      return [0, 1];
    }  
  } else if (playerSelection == "scissors") {
    if (computerSelection == "rock") {
      console.log(`${result}: loss`);
      return [0, 1];

    } else if (computerSelection == "paper") {
      console.log(`${result}: win`);
      return [1, 0];
    }
  } else if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      console.log(`${result}: win`);
      return [1, 0];

    } else if (computerSelection == "scissors") {
      console.log(`${result}: loss`);
      return [0, 1];
    }
  }
}

function isGameOver(scores) {
  return scores[0] >=3 || scores[1] >= 3;
}

function game() {
  let scores = [0, 0];
  let i = 0;
  while (!isGameOver(scores)) {
    i++;
    let playerChoice = prompt("Rock, paper, or scissors?");
    const computerSelection = computerPlay();
    let roundScore = playRound(playerChoice, computerSelection);
    scores[0] += roundScore[0];
    scores[1] += roundScore[1];
    console.log(`\nRound ${i}: You: ${scores[0]}. Computer: ${scores[1]}`);
  }
  console.log(`Final number of rounds: ${i}`);
  console.log(`Final score:`);
  console.log(`\nYou: ${scores[0]}. Computer: ${scores[1]}`);
}

game();
