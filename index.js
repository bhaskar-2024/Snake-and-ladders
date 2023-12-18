const player1 = document.querySelector("#player1");
const resetButton = document.querySelector("#resetButton");
const startButton = document.querySelector("#startButton");
const player2 = document.querySelector("#player2");

const player3 = document.querySelector("#player3");

const player4 = document.querySelector("#player4");
const pbuttons = document.querySelectorAll("#pbutton");
const winningPlayer = document.querySelector("#winningPlayer");
const dice1 = document.querySelector("#dice1");
const dice2 = document.querySelector("#dice2");
const dice3 = document.querySelector("#dice3");
const dice4 = document.querySelector("#dice4");
let dices = document.querySelectorAll(".dice");

let p1pos = 1;
let p3pos = 1;
let p2pos = 1;
let p4pos = 1;
let bottom = 0;
let reverse = false;
turn = 0;
function randomnumber() {
  return Math.floor(Math.random() * 6 + 1);
}
function checkReverse(p1pos) {
  if (
    (p1pos > 10 && p1pos <= 20) ||
    (p1pos > 30 && p1pos <= 40) ||
    (p1pos > 50 && p1pos <= 60) ||
    (p1pos > 70 && p1pos <= 80) ||
    p1pos > 90
  )
    return true;
  return false;
}
function checkLadder(p1pos)
{
  if(p1pos === 4) return 14;
  if(p1pos === 9) return 31;
  if(p1pos === 20) return 38;
  if(p1pos === 28) return 84;
  if(p1pos === 40) return 59;
  if(p1pos === 63) return 81;
  if(p1pos === 71) return 91;
  return p1pos;
}
function checkSnakes(p1pos)
{
  if(p1pos === 17) return 7;
  if(p1pos === 54) return 34;
  if(p1pos === 62) return 18;
  if(p1pos === 64) return 60;
  if(p1pos === 87) return 24;
  if(p1pos === 93) return 73;
  if(p1pos === 95) return 75;
  if(p1pos === 99) return 78;
  return p1pos;
}
function victory(pNo)
{   
    winningPlayer.innerText = `Player ${pNo}`;
   for(let button of pbuttons)
   {
    button.disabled = true;
    button.style.backgroundColor = "";
   }
   
}
function resetGame()
{
   p1pos = 1;
 p3pos = 1;
 p2pos = 1;
 p4pos = 1;
 bottom = 0;
 reverse = false;
 winningPlayer.innerText = "";
 for(let button of pbuttons)
 {
  button.style.backgroundColor = "";
  button.disabled = true;
 }
 player1.style.left = "";
 player2.style.left = "";
 player3.style.left = "";
 player4.style.left = "";
 player1.style.right = "";
 player2.style.right = "";
 player3.style.right = "";
 player4.style.right = "";
 player1.style.bottom = "";
 player2.style.bottom = "";
 player3.style.bottom = "";
 player4.style.bottom = "";
}
function startGame()
{
  for(let button of pbuttons)
   button.disabled = false;
}
function playGame(p1pos , player, playerButton,pNo) {
  let diceNo = randomnumber();
  turn = (turn+1)%4;
  for(let i = 0; i<4; i++)
  { 
    if(i === turn)
    {
      pbuttons[i].disabled = false;
      pbuttons[i].style.backgroundColor = "rgba(244, 168, 81, 0.865)";
    }
    
    else
    {
      pbuttons[i].disabled = true;
      pbuttons[i].style.backgroundColor = "";
    }
  }
  dices[pNo-1].innerText=diceNo;
  console.log("dice face", diceNo);
  p1pos += diceNo;
  p1pos = checkLadder(p1pos);
  p1pos = checkSnakes(p1pos);
  if(p1pos == 100)
  {
    victory(pNo);
  }
  if(p1pos > 100)
  p1pos -= diceNo;
  if (p1pos % 10 === 0) bottom = Math.floor(p1pos / 10) - 1;
  else bottom = Math.floor(p1pos / 10);
  let newLeft;
  if (p1pos % 10 === 0) {
    newLeft = 9;
  } else {
    let bt = bottom;
    if (bottom === 0) bt += 1;
    newLeft = (p1pos % (10 * bt)) - 1;
  }
  console.log("newLeft", newLeft);
  player.style.bottom = `${bottom * 10 + 2}%`;
  let reverse = checkReverse(p1pos);
  
    if (reverse === false) {
      player.style.right = "";
      player.style.left = `${newLeft * 10 + 2}%`;
    } else {
      player.style.left = "";
      player.style.right = `${newLeft * 10 + 2}%`;
    }
   
  return p1pos;
}
pbuttons[0].addEventListener("click", ()=>{
  p1pos = playGame(p1pos,player1,pbuttons[0],1);
});
pbuttons[1].addEventListener("click", ()=>{
  p2pos = playGame(p2pos,player2,pbuttons[1],2);
});
pbuttons[2].addEventListener("click", ()=>{
  p3pos = playGame(p3pos,player3,pbuttons[2],3);
});
pbuttons[3].addEventListener("click", ()=>{
  p4pos = playGame(p4pos,player4,pbuttons[3],4);
});
resetButton.addEventListener("click",resetGame);
startButton.addEventListener("click",startGame);
