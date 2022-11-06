let x = ""

for (let i = 0; i < 9; i++) {
    x = x + `<div class=\"box\" id=${i + 1} onclick=\"myFunction(${i + 1})\"></div>`;
}

document.getElementById("mainBoard").innerHTML = x

const boxes = document.getElementsByTagName("div")

let isCircleTurn = 0

let isFilled = []

let xFilled = []
let oFilled = []

let boxFilled = 0

for (let i = 1; i < boxes.length; i++) {
    isFilled.push(false)
    xFilled.push(false)
    oFilled.push(false)
}

function myFunction(id) {
    if (!isFilled[id - 1] && boxFilled < boxes.length - 1) {
        if (isCircleTurn === 0) {
            document.getElementById(`${id}`).innerHTML = "X"
            document.getElementById('isTurn').innerHTML = "Turn: Circle"
            isCircleTurn = 1
            xFilled[id - 1] = true
        }
        else {
            document.getElementById(`${id}`).innerHTML = "O"
            document.getElementById('isTurn').innerHTML = "Turn: Cross"
            isCircleTurn = 0
            oFilled[id - 1] = true
        }
        isFilled[id - 1] = true
        boxFilled++
        check()
    }


    if (boxFilled == boxes.length - 1) {
        document.getElementById('isTurn').innerHTML = "Game end"
    }

}

function check() {
    console.log(xFilled)
    if ((xFilled[0] && xFilled[1] && xFilled[2]) ||
        (xFilled[3] && xFilled[4] && xFilled[5]) ||
        (xFilled[6] && xFilled[7] && xFilled[8]) ||
        (xFilled[0] && xFilled[3] && xFilled[6]) ||
        (xFilled[1] && xFilled[4] && xFilled[7]) ||
        (xFilled[2] && xFilled[5] && xFilled[8]) ||
        (xFilled[0] && xFilled[4] && xFilled[8]) ||
        (xFilled[2] && xFilled[4] && xFilled[6])) {
        document.getElementById('isWinning').innerHTML = "X Wins!"
        boxFilled = 9
    }
    else 
    if ((oFilled[0] && oFilled[1] && oFilled[2]) ||
        (oFilled[3] && oFilled[4] && oFilled[5]) ||
        (oFilled[6] && oFilled[7] && oFilled[8]) ||
        (oFilled[0] && oFilled[3] && oFilled[6]) ||
        (oFilled[1] && oFilled[4] && oFilled[7]) ||
        (oFilled[2] && oFilled[5] && oFilled[8]) ||
        (oFilled[0] && oFilled[4] && oFilled[8]) ||
        (oFilled[2] && oFilled[4] && oFilled[6])) {
        document.getElementById('isWinning').innerHTML = "O Wins!"
        boxFilled = 9
    }
}

function resetGame() {
    window.location.reload()
}