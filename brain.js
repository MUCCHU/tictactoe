var state = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
var botMoves = 0;
var winner = -1;
var chance = 0;
var blockingPos = [-1, -1];
var botChance = 0;
var totmoves = 0;
function checkequalrows(row) {
  if (state[row][0] === state[row][1] && state[row][1] === state[row][2])
    return true;
  return false;
}
function checkequalcols(col) {
  if (state[0][col] === state[1][col] && state[1][col] === state[2][col])
    return true;
  return false;
}
function clearGrid() {
  state = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  botMoves = 0;
  winner = -1;
  chance = 0;
  blockingPos = [-1, -1];
  botChance = 0;
  totmoves = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      document.getElementById(
        (i + 1).toString() + (j + 1).toString()
      ).innerHTML = "";
    }
  }
  moveRandomCorner();
}
function checkifWon() {
  // console.log("in won")
  for (var i = 0; i < 3; i++) {
    // console.log("Checking" + i)
    // console.log(checkequalrows(i), checkequalcols(i))
    if (checkequalrows(i) && state[i][0] != -1) {
      winner = state[i][0];
      return true;
    } else if (checkequalcols(i) && state[0][i] != -1) {
      winner = state[0][i];
      return true;
    } else if (
      state[0][0] === state[1][1] &&
      state[1][1] === state[2][2] &&
      state[0][0] != -1
    ) {
      winner = state[1][1];
      return true;
    } else if (
      state[2][0] === state[1][1] &&
      state[1][1] === state[0][2] &&
      state[2][0] != -1
    ) {
      winner = state[1][1];
      return true;
    }
  }
  return false;
}
function checkifTie() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == -1) return false;
    }
  }
  return true;
}
function checkifabouttoWin(s) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == -1) {
        state[i][j] = s;
        if (checkifWon()) {
          state[i][j] = -1;
          blockingPos = [i, j];
          return true;
        }
        state[i][j] = -1;
      }
    }
  }
  blockingPos = [-1, -1];
  return false;
}
function moveRandomCorner() {
  // console.log("moving random corner");
  // console.log("Rnd corner")
  var corner = Math.floor(Math.random() * 4);
  // console.log(corner)
  switch (corner) {
    case 0:
      if (state[0][0] == -1)
        playMove(0, 0);
      else
        moveRandomCorner();
      break;
    case 1:
      if (state[0][2] == -1)
        playMove(0, 2);
      else
        moveRandomCorner();
      break;
    case 2:
      if (state[2][0] == -1)
        playMove(2, 0);
      else
        moveRandomCorner();
      break;
    case 3:
      if (state[2][2] == -1)
        playMove(2, 2);
      else
        moveRandomCorner();
      break;
  }
}
function randomMove() {
  // console.log("Random move");
  var rnd = Math.floor(Math.random() * 9);
  var row = Math.floor(rnd / 3);
  var col = rnd % 3;
  if (state[row][col] == -1)
    playMove(row, col);
  else
    randomMove();
}
function botsMove() {
  console.log("bot playin");
  ++botMoves;
  console.log(botMoves, botChance);
  if (checkifabouttoWin(botChance)) playMove(blockingPos[0], blockingPos[1]); //Winning Move
  else if (checkifabouttoWin((botChance + 1) % 2)) {
    console.log("Blocking a victory");
    playMove(blockingPos[0], blockingPos[1]);
  }
  else if (botMoves == 1 && botChance == 0) {
    console.log("Random  Corner move")
    moveRandomCorner();
  }
  else if (botChance == 0 && botMoves == 2) {
    console.log("Random  Corner move")

    moveRandomCorner();
  }
  else {
    console.log("Random move");
    randomMove();
  }
  // console.log("Bot ki chance hai");
}
function playMove(x, y) {
  // console.log("playing move")
  if (state[x][y] != -1) return;
  state[x][y] = chance;
  // if (checkifabouttoWin())
  //   alert("Player " + (chance ? "2" : "1") + " is about to win");
  chance = (chance + 1) % 2;
  // console.log(x.toString() + y.toString())
  document.getElementById((x + 1).toString() + (y + 1).toString()).innerHTML =
    chance
      ? '<img style="width: 100px; height: 100px;" src="./Images/x.png" id="11" onclick="handleClick(this.id)"/>'
      : '<img style="width: 100px; height: 100px;" src="./Images/o.png" id="11" onclick="handleClick(this.id)"/>';
  ++totmoves;
}
function handleClick(id) {
  // console.log("Hii", id);
  const x = parseInt(id[0]) - 1;
  const y = parseInt(id[1]) - 1;
  playMove(x, y);
  //   console.log(state[x][y]);
  if (checkifWon()) {
    alert(chance ? "Player 1 (X) Won" : "Player 2 (O) Won");
    clearGrid();
    return;
  }
  if (checkifTie() && !checkifWon()) {
    alert("Tie");
    clearGrid();
    return;
  }
  // console.log(state);
  // console.log(totmoves, totmoves%2, botChance);
  if (totmoves % 2 == botChance) {
    // console.log("in if")
    botsMove();
  }
  if (checkifWon()) {
    alert(chance ? "Bot (X) Won" : "Player 2 (O) Won");
    clearGrid();
    return;
  }
  if (checkifTie() && !checkifWon()) {
    alert("Tie");
    clearGrid();
    return;
  }
}

if (botChance == 0) botsMove();
