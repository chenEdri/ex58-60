'use strict'
console.log('ex59 - bingo! ')

// initialize nums array to get numbers from:
const NUMS_LENGTH = 100
var gNums

var gPlayers = [
  {
    name: 'miki',
    hitCounts: 0,
    board: createBingoBoard(Math.sqrt(NUMS_LENGTH)),
  },
  {
    name: 'shuki',
    hitCounts: 0,
    board: createBingoBoard(Math.sqrt(NUMS_LENGTH)),
  },
]

// interval for the game : time
var interval = setInterval(playBingo, 20)

//a. create board function : initialize the board for each user

function createBingoBoard(rowLength = 5) {
  // nums array for creating the board:
  resetNums()
  //start to build the table :
  var board = []
  for (var i = 0; i < rowLength; i++) {
    board.push([])
    for (var j = 0; j < rowLength; j++) {
      // adding random index from nums that points to a specific value that didn't got yet
      var randomIdx = getRandomInt(0, gNums.length - 1)
      board[i].push({ value: gNums[randomIdx], isHit: false })
      // removing the number from gNums to assure it won't pick again
      gNums.splice(randomIdx, 1)
    }
  }
  printBoard(board)
  resetNums()
  return board
}

// b. print board function: priniting the board to the console

function printBoard(board) {
  var boardNums = []
  for (var i = 0; i < board.length; i++) {
    boardNums.push([])
    for (var j = 0; j < board[i].length; j++) {
      boardNums[i].push(board[i][j].value)
      if (board[i][j].isHit) boardNums[i][j] += 'v'
    }
  }
  console.table(boardNums)
}

//c. play bingo function : the main function - works until one of the player wins. using an interval or while loop .
function playBingo() {
  var isVictory = false
  var calledNum = drawNum()
  // while (!isVictory){
  for (var i = 0; !isVictory && i < gPlayers.length; i++) {
    var player = gPlayers[i]
    markBoard(player, calledNum)
    isVictory = checkBingo(player)
    if (isVictory) {
      greetPlayer(player, 'all the board!')
      clearInterval(interval)
      //break
    }
    //}
  }
}

// b.i.1 draw num function: returns random number from the global array without duplications

function drawNum() {
  // option 1: numbers can be duplicated:
  //return getRandomInt(0, NUMS_LENGTH)

  // option 2: numbers cannot be duplicated:
  var randomIdx = getRandomInt(0, gNums.length - 1)
  var num = gNums.splice(randomIdx, 1)
  return num[0]
}

// d. markBoard function : mark a specific cell the player has the same value on his board and printing the board at the
function markBoard(player, calledNum) {
  var { board } = player
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      // check if there is a match between cell and calledNum :
      var currCell = board[i][j]
      //option 1: if we do not get out the number from global array - called numbers can be duplicated:
      //   if (calledNum === currCell.value && !currCell.isHit) {
      //     currCell.isHit = true
      //     hitCounts++
      //   }

      //option 2: if there is an global array - numbers cannot be duplicated
      if (calledNum === currCell.value) {
        currCell.isHit = true
        player.hitCounts++
        break
      }
    }
    //print the board:
    printBoard(board)
  }
}

//e. checkBingo function : check whether the player finished parts of the board and returns boolan wheather he finished all of it 

function checkBingo(player) {
  // without board checking:
  // return player.hitCounts === NUMS_LENGTH

  // with board checking :
  var { board } = player
  if (checkMainDiagonal(board)) greetPlayer(player, 'Main diagonal cpmpleted!')
  if (checkSecDiagonal(board))
    greetPlayer(player, 'Secondary diagonal cpmpleted!')
  for (var i = 0; i < board.length; i++) {
    if (checkRow(board, i)) greetPlayer(player, ' row- ' + i + ' cpmpleted!')
    if (checkCol(board, i)) greetPlayer(player, ' col- ' + i + ' cpmpleted!')
  }
  console.log('player.hitCounts', player.hitCounts)
  return player.hitCounts === NUMS_LENGTH
}

// h.3 greet player function : greet the player with the given accomplishment
function greetPlayer(player, accomplishment) {
  console.log(player.name + ' has completed the ' + accomplishment)
}

// e.2: resetNums function : initializing the global array gNums
function resetNums() {
  //initialize nums from 1 - 99:
  gNums = []
  for (var i = 1; i <= NUMS_LENGTH; i++) {
    gNums.push(i)
  }
}

// helper functions :

function checkRow(board, rowIdx) {
  for (let i = 0; i < board.length; i++) {
    if (!board[rowIdx][i].isHit) return false
  }
  return true
}

function checkCol(board, colIdx) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i][colIdx].isHit) return false
  }
  return true
}

function checkMainDiagonal(board) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i][i].isHit) return false
  }
  return true
}

function checkSecDiagonal(board) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i][board[i].length - 1 - i].isHit) return false
  }
  return true
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
