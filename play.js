let ticTacToe = JSON.parse(localStorage.getItem("TIC-TAC-TOE_GAME")) || [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]; // return a parsed array from the browser's local storage or an empty array with strings

const boxes = document.querySelector("#boxes");

const winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; // winning combinations in the tic-tac-toe game.

let Oturn = JSON.parse(localStorage.getItem("Oturn"));

const winningMessage = document.querySelector("#win-message");

// create div elements with the arrays
ticTacToe.map((box, id) => {
  const playBox = document.createElement("div");
  playBox.className = "box";
  playBox.id = id;
  playBox.setAttribute("data-id", id);
  playBox.innerHTML = ticTacToe[id];
  if (playBox.innerHTML == "X") playBox.classList.add("orange");
  if (playBox.innerHTML == "O") playBox.classList.add("blue");
  boxes.append(playBox);
});

const box = document.querySelectorAll(".box");

box.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML != "") return;

    if (!Oturn) {
      box.classList.add("orange");
      box.innerHTML = "X";
      ticTacToe[box.id] = "X";
      localStorage.setItem("TIC-TAC-TOE_GAME", JSON.stringify(ticTacToe));
      if (checkWinning("orange")) {
        winningMessage.innerHTML = "X wins!";
      }
      Oturn = !Oturn;
      localStorage.setItem("Oturn", JSON.stringify(Oturn));
      setTimeout(() => {
        clearBoxes();
      }, 5000);
    } else {
      box.classList.add("blue");
      box.innerHTML = "O";
      ticTacToe[box.id] = "O";
      localStorage.setItem("TIC-TAC-TOE_GAME", JSON.stringify(ticTacToe));
      if (checkWinning("blue")) {
        winningMessage.innerHTML = "O wins!";
      }
      Oturn = !Oturn;
      localStorage.setItem("Oturn", JSON.stringify(Oturn));
      setTimeout(() => {
        clearBoxes();
      }, 5000);
    }
  });
});

function clearBoxes() {
  if (!ticTacToe.includes("")) {
    if (!checkWinning("blue") && !checkWinning("orange"))
      winningMessage.innerHTML = "Draw!";
    setTimeout(() => {
      clear();
    }, 1000);
  }

  if (checkWinning("blue") || checkWinning("orange")) {
    clear();
  }
}

function checkWinning(currentClass) {
  return winningPossibilities.some((row) => {
    return row.every((id) => {
      return box[id].classList.contains(currentClass);
    });
  });
}

function clear() {
  ticTacToe = ["", "", "", "", "", "", "", "", ""];
  box.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("orange", "blue");
    localStorage.removeItem("TIC-TAC-TOE_GAME");
  });

  setTimeout(() => {
    winningMessage.innerHTML = "";
  }, 50);
}
