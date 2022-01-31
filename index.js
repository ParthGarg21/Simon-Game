let sequence = [];
let idx = 0;
let level = 0;
let currScore = 0;
let maxScore = 0;
let buttons = ["green", "red", "yellow", "blue"];
let allBtns = $(".btn");

// function to generate the next button

function nextBtnGenerator() {
  maxScore = Math.max(maxScore, currScore);
  level++;
  $("h1").text("Level : " + level);
  $(".curr-score").text("Your Score : " + currScore);
  $(".high-score").text("High Score : " + maxScore);
  idx = 0;

  let ran = Math.floor(4 * Math.random());
  let currBtn = buttons[ran];
  sequence.push(currBtn);

  let btn = $("#" + currBtn);
  btn.addClass("pop");

  playSound(currBtn);
  setTimeout(() => {
    btn.removeClass("pop");
  }, 300);
}

// function to handle when the wrong button is pressed

function wrongAns() {
  sequence = [];
  idx = 0;
  level = 0;
  currScore = 0;
  let body = $("body");
  body.addClass("redAlert");
  allBtns.addClass("pop");
  setTimeout(() => {
    allBtns.removeClass("pop");
    body.removeClass("redAlert");
  }, 400);

  let audio = new Audio("sounds/wrong.mp3");
  audio.play();

  let h1 = $("h1");
  h1.text("Game Over! Press Any Key to Restart !");
}

// function to play the sound

function playSound(currBtn) {
  let audio = new Audio("sounds/" + currBtn + ".mp3");
  audio.play();
}

// clicking on button handler

allBtns.on("click", handleClick);

function handleClick() {
  let currBtn = this.getAttribute("id");
  this.classList.add("click");

  setInterval(() => {
    this.classList.remove("click");
  }, 300);

  if (sequence.length === 0 || currBtn !== sequence[idx]) {
    wrongAns();
    return;
  }

  playSound(currBtn);
  idx++;

  setTimeout(() => {
    if (idx == sequence.length) {
      currScore += 100;
      nextBtnGenerator();
    }
  }, 500);
}

// initial press when game is about to start or is over.
$(document).on("keydown", handlePress);

function handlePress() {
  if (sequence.length === 0) {
    nextBtnGenerator();
  }
}
