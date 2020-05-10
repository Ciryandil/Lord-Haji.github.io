var colorList = [];

var resetButton = document.getElementById("reset");
var message = document.getElementById("trymessage");

var easyButton = document.getElementById("easyBtn");
var hardButton = document.getElementById("hardBtn");

var colorDisplay = document.getElementById("wincolor");
var squares = document.getElementsByClassName("square");

var easyMode = false;

for (var i = 0; i < 6; i++) {
    colorList.push("rgb(" + selectRandom(256) + ", " + selectRandom(256) + ", " + selectRandom(256) + ")");
}

var winColor = colorList[selectRandom(colorList.length - 1)];
colorDisplay.textContent = winColor;

resetButton.addEventListener("click", resetGame);

startGame();

easyButton.addEventListener("click", function () {
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    // colorList = [];
    // for (var i = 0; i < 3; i++) {
    //     colorList.push("rgb(" + selectRandom(256) + ", " + selectRandom(256) + ", " + selectRandom(256) + ")");
    // }
    // document.querySelector("h1").style.backgroundColor = null;
    // colorDisplay.textContent = winColor;
    // winColor = colorList[selectRandom(colorList.length - 1)];
    easyMode = true;
    resetGame();
});

hardButton.addEventListener("click", function () {
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    easyMode = false;
    resetGame();
});


function startGame() {
    if (!easyMode) {
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colorList[i];
            squares[i].style.display = "block";
            squares[i].addEventListener("click", function () {
                if (this.style.backgroundColor == winColor) {
                    message.textContent = "Correct!";
                    message.style.color = "#32CD32"
                    document.querySelector("h1").style.backgroundColor = winColor;
                    resetButton.textContent = "Play Again?";
                    changeAll();
                } else {
                    this.style.backgroundColor = null;
                    message.textContent = "Try Again";
                    message.style.color = "#FF7B00";
                }
            });
        }
    }
    else {
        for (var i = 0; i < squares.length; i++) {
            if(i < 3) {
                squares[i].style.backgroundColor = colorList[i];
                squares[i].addEventListener("click", function () {
                    if (this.style.backgroundColor == winColor) {
                        message.textContent = "Correct!";
                        document.querySelector("h1").style.backgroundColor = winColor;
                        resetButton.textContent = "Play Again?";
                        changeAll();
                    } else {
                        this.style.backgroundColor = null;
                        message.textContent = "Try Again";
                    }
                });
            }
            else {
                 squares[i].style.display = "none";
            }
        }
    }
}

function changeAll() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = winColor;
    }
}

function resetGame() {
    colorList = [];
    for (var i = 0; i < (!easyMode ? 6 : 3 ); i++) {
        colorList.push("rgb(" + selectRandom(256) + ", " + selectRandom(256) + ", " + selectRandom(256) + ")");
    }
    message.textContent = "";
    resetButton.textContent = "New Colors";
    document.querySelector("h1").style.backgroundColor = null;
    colorDisplay.textContent = winColor;
    winColor = colorList[selectRandom(colorList.length - 1)];
    startGame();
}


function selectRandom(max) {
    return Math.floor(Math.random() * max);
}
