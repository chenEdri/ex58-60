'use strict'

console.log('Ex 60 Solution');

const TABLE_LENGTH = 10
const DEATH = '🪦'
const LIFE = '👼🏼'
const MAXGEN = 10

var gBoard = []
var gGenCnt = 2
makeFirstBoard()
var interID = setInterval(play, 1000)

function printBoard(gBoard) {
    console.table(gBoard)
}

function makeFirstBoard() {
    for (var i = 0; i < TABLE_LENGTH; i++) {
        gBoard.push([])
        for (var j = 0; j < TABLE_LENGTH; j++) {
            gBoard[i][j] = (Math.random() > 0.7) ? LIFE : DEATH
        }
    }
    printBoard(gBoard)
}
function runGeneration() {
    var nextGen = [...gBoard]
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        for (var j = 0; j < row.length; j++) {
            var neighborNum = getNeighbors(i, j)
            nextGen[i][j] = (neighborNum <= 2 || neighborNum >= 6) ?  DEATH : LIFE
        }
    }
    return nextGen
}

function getNeighbors(rowId, colId) {
    var neighborCnt = 0
    for (var i = rowId - 1; i <= rowId + 1; i++) {
        // if i is out of bounderies - go to the next i 
        if (i < 0 || i > gBoard.length - 1) continue;  //continue to the next i 

        for (var j = colId - 1; j <= colId + 1; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j > gBoard[0].length - 1) continue; // continue to the next j.

            if (i === rowId && j === colId) continue;

            if (gBoard[i][j] === LIFE) neighborCnt++;
        }
    }
    return neighborCnt
}
function isOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const col = gBoard[i][j];
            if (col === LIFE) return false
        }
    }
    return true
}

function play() {

    console.log('GENERATION  ', gGenCnt)
    gBoard = runGeneration()
    printBoard(gBoard)
    if (isOver()) {
        console.log('LIFE IS GONE ! !')
        clearInterval(interID)

    }
    gGenCnt++
}
