let box = document.querySelectorAll("td");
let Turn = document.querySelector(".player-turn");
let playerWon = document.querySelector(".player-won");
let restart = document.querySelector(".restart");
let gameover = false;
let combos = ["abc", "def", "ghi", "adg", "beh", "cfi", "aei", "ceg"];
let playerTurn = "O";
let player1Combo = "";
let player2Combo = "";
box.forEach((btn) => {
  btn.addEventListener("click", btnClick);
});
function btnClick(event) {
  if (gameover) return;
  let isEmpty = event.target.textContent == "" ? true : false;
  if (!isEmpty) return;
  let SlotId = event.target.id;
  // console.log(event.target.id)
  if (playerTurn == "X") {
    event.target.textContent = "X";
    player2Combo += SlotId;
  }
  if (playerTurn == "O") {
    event.target.textContent = "O";
    player1Combo += SlotId;
  }
  playerTurn = playerTurn == "X" ? "O" : "X";
  Turn.textContent = "Player Turn : " + playerTurn;
  checkWinner();
}

function combination(targetStr) {
  let matchFound = false;
  let matchCombo = "";
  combos.forEach((combo) => {
    let tempMatch = true;
    for (let i = 0; i < combo.length; i++) {
      if (!targetStr.includes(combo[i])) {
        tempMatch = false;
        break;
      }
    }
    if (tempMatch) {
      matchFound = true;
      matchCombo = combo;
      return;
    }
  });
  return [matchFound, matchCombo];
}

function checkWinner() {
  if (combination(player1Combo)[0]) {
    playerWon.classList.remove("hide");
    playerWon.textContent = "O Player Won !";
    highLightTiles(combination(player1Combo)[1]);
    gameover = true;
  } else if (combination(player2Combo)[0]) {
    playerWon.classList.remove("hide");
    playerWon.textContent = "X Player Won !";
    highLightTiles(combination(player2Combo)[1]);
    gameover = true;
  } else if (checkDraw()) {
    playerWon.classList.remove("hide");
    playerWon.textContent = "It's a tie !";

    gameover = true;
  }
}
function highLightTiles(str) {
  let letters = str.split("");
  letters.forEach((letter) => {
    let element = document.querySelector(`#${letter}`);
    element.classList.add("highlight");
  });
}
function checkDraw() {
  let result = true;
  box.forEach((btn) => {
    if (btn.textContent == "") {
      result = false;
      return;
    }
  });
  return result;
}
restart.addEventListener("click", reset);
function reset() {
  box.forEach((btn) => {
    btn.textContent = "";
    player1Combo = "";
    player2Combo = "";
    playerTurn = "O";
    gameover = false;
    playerWon.classList.add("hide");
    restart.classList.add("hide");
    btn.classList.remove("highlight");
  });
}
