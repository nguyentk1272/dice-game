"use strict";
// Thiết lập Elements
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

let scores, currentScore, activePlayer, playing;
//Điều kiện bắt đầu
scores = [0, 0];
let playeractive = 0;
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add("hidden");
let score = 0;
playing = true;
//Hàm đổi người chơi
const switchPlayer = function () {
  document.querySelector(`#current--${playeractive}`).textContent = 0;
  playeractive = playeractive === 0 ? 1 : 0;
  score = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
//Tung xúc sắc
btnRoll.addEventListener("click", function () {
  if (playing) {
    //random số trên xúc sắc
    const temp = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${temp}.png`;
    if (temp !== 1) {
      score = score + temp;
      document.querySelector(`#current--${playeractive}`).textContent = score;
    } else {
      //Nếu random trúng số 1 thì đổi người chơi
      switchPlayer();
    }
  }
});
//Cộng điểm và kiểm tra điểm
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[playeractive] += score;
    document.querySelector(`#score--${playeractive}`).textContent =
      scores[playeractive];
    if (scores[playeractive].textContent >= 100) {
      //win game khi điểm >= 100
      playing = false;
      playeractive = playeractive === 0 ? 1 : 0;
      document
        .querySelector(`.player--${playeractive}`)
        .classList.add("player--winner");
      dice.classList.add("hidden");
    } else {
      //Nếu điểm < 100 thì đổi người chơi
      switchPlayer();
    }
  }
});
btnReset.addEventListener("click", function () {
  document
    .querySelector(`.player--${playeractive}`)
    .classList.remove("player--winner");
  playeractive = 0;
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  score0.textContent = 0;
  score1.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add("hidden");
  playing = true;
});
