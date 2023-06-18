const restartBtn = document.querySelector("#restart");
const continueBtn = document.querySelector("#continue");
const playBtn = document.querySelector("#play");

if (
  localStorage.getItem("TIC-TAC-TOE_GAME") != null ||
  localStorage.getItem("Oturn") != null
) {
  restartBtn.classList.add("show");
  continueBtn.classList.add("show");
  playBtn.className = "hide";
}

restartBtn.onclick = () => {
  localStorage.clear();
};
