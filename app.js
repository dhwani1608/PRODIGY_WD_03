let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let play_friend = document.querySelector(".play-with-friend");
let ai = document.querySelector(".AI-opponent");

let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

count = 0;
play_friend.addEventListener("click", () => {
  ai.style.display = "none";
  play_friend.style.display = "none";
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        document.getElementById("move-1").style.display = "inherit";
        document.getElementById("move-2").style.display = "none";
        box.innerText = "O";
        box.style.color = "#D81E5B";
        turnO = false;
      } else {
        document.getElementById("move-2").style.display = "inherit";
        document.getElementById("move-1").style.display = "none";
        box.innerText = "X";
        box.style.color = "#15616D";
        turnO = true;
      }
      count = count + 1;
      box.disabled = true;
      checkWinner();
    });
  });
});

turnO = true;
count =0;
ai.addEventListener("click", () => {
  document.querySelector("h3").style.display = "inherit";
  ai.style.display = "none";
  play_friend.style.display = "none";
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      document.querySelector("h3").style.display = "none";
      if (turnO) {
        box.innerText = "O";
        box.style.color = "#D81E5B";
        turnO = false;
      }
      else{
        box.style.color = "#15616D";
      }
    computer();
      count = count + 1;
      box.disabled = true;
      checkWinner();
    });
  });
});

const computer = () => {
  let play = Math.floor(Math.random() * boxes.length);
    if(boxes[play].innerText === ""){
      boxes[play].innerText = "X";
      console.log(play);
      turnO = true;
    }
    else{
      computer();
    }
}

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
      } else if (count == 9) {
        msg.innerText = "Draw!! Play Again:)";
        msgContainer.classList.remove("hide");
        disableBoxes();
      }
    }
  }
};

newGame.addEventListener("click", () => {
  document.getElementById("move-1").style.display = "none";
  document.getElementById("move-2").style.display = "none";
  ai.style.display = "block";
  play_friend.style.display = "block";
  resetGame();
});

reset.addEventListener("click", () => {
  document.getElementById("move-1").style.display = "none";
  document.getElementById("move-2").style.display = "none";
  resetGame();
});
