'use strict'

// var LENGTH = 4;
// var gMaxNum = SIZE;
var gNums = [];
// var gMat = [];
var gNextNum = 1;
var gStartTime = 0;
var gGameOn = false;
var gCurrNum = null;
var gGameInterval = 0;
// debuggr;

var gLevels = [{
    name: 'Beginner',
    LENGTH: 4

},
{
    name: 'Medium',
    LENGTH: 5
},
{
    name: 'Expert',
    LENGTH: 6
}
];
var gLevel;
var gIdx;


function playGame(i) {
    // if in the middle of the game- player press on one of the levels buttons - restart the game
    if (gGameOn) restart();

    gLevel = gLevels[i];
    var size = gLevel.LENGTH ** 2;
    // var elLevelName = document.querySelector('.level-name');
    // elLevelName.innerText = 'Beginner';
    gNums = initRandomNums(size);
    // gMat = initMatrix(gNums);
    printMat();
    gGameInterval = setInterval(updateClock, 50);
    var elTdsTable = document.querySelector('.nums-table');
    if (i === 0) elTdsTable.classList.add('beginner');
    else if (i === 1) elTdsTable.classList.add('medium');
    else if (i === 2) elTdsTable.classList.add('expert');
    gIdx = i;


}


function updateClock() {
    var elClock = document.querySelector('.clock');
    if (gGameOn) {
        elClock.innerText = (Date.now() - gStartTime) / 1000;
    } else elClock.innerText = '';
}

function cellClicked(elClickedNum) {
    var num = +elClickedNum.innerText;
    // num = +num;  // string to number
    if (num === gNextNum) {
        //only if it correct
        elClickedNum.classList.add('clicked');
        gNextNum++;
        if (num === 1) {
            gStartTime = Date.now();
            gGameOn = true;
        }
        if (num === gLevel.LENGTH ** 2) {
            gGameOn = false;
            clearInterval(gGameInterval);
            whenGameOver();
            // setTimeout('playGame(gIdx)', 3000);
            // playGame(gIdx);
        }
    }
}

function removeGameOver() {
    var elGameOver = document.querySelector('.game-over-container');
    elGameOver.classList.remove('game-over');
}

function whenGameOver() {
    var elGameOver = document.querySelector('.game-over-container');
    var strHTML = '<div class="game-over">Game Over</div>';
    strHTML += '<button class="restart" onclick="restart(this)">Restart</button>'
    elGameOver.innerHTML = strHTML;
    console.log(strHTML);

    elGameOver.classList.add('game-over');
}

function restart(elBtn) {
    removeGameOver();
    updateClock();
    // start a new game:
    gNextNum = 1;
    gStartTime = 0;
    gGameOn = false;
    gCurrNum = null;
    gGameInterval = 0;
    playGame(gIdx);
}


function printMat() {
    var elTblNums = document.querySelector('.nums-table');
    var strHTML = '';
    for (var i = 0; i < gLevel.LENGTH; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < gLevel.LENGTH; j++) {
            var cell = drawNum()
            strHTML += ' <td onclick="cellClicked(this)"> ' + cell + ' </td>\n '
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML);
    elTblNums.innerHTML = strHTML;
}


function drawNum() {
    return gNums.pop();
}

