let player = document.getElementsByClassName("player")
let target = document.getElementsByClassName("target")
let playerDirection
let isGameStart = false
let repeater
let score = 0
let highScore = 0
let snekSpeed
// let tailPos = []
// let tailLength = 0

let randPlayerX
let randPlayerY
let randTargetX
let randTargetY

function randomizer() {
    const randomDirection = Math.floor(Math.random() * 4)
    randPlayerX = (Math.floor(Math.random() * 14) + 3) * 10
    randPlayerY = (Math.floor(Math.random() * 14) + 3) * 10
    randTargetX = Math.floor(Math.random() * 20) * 10
    randTargetY = Math.floor(Math.random() * 20) * 10

    if (randomDirection == 0) playerDirection = "right"
    else if (randomDirection == 1) playerDirection = "up"
    else if (randomDirection == 2) playerDirection = "left"
    else if (randomDirection == 3) playerDirection = "down"
}

function randomTargetOnly() {
    randTargetX = Math.floor(Math.random() * 20) * 10
    randTargetY = Math.floor(Math.random() * 20) * 10
    target[0].style.top = `${randTargetX}` + 'px'
    target[0].style.left = `${randTargetY}` + 'px'
}

function gameOver() {
    console.log('Wadaw')
    isGameStart = false
    clearTimeout(repeater)
    if (highScore < score) {
        highScore = score
        document.getElementById("highScore").innerHTML = `${highScore}`
    }
    document.getElementById("startButton").style.display = "block"
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        playerDirection = 'left'
    }
    else if (event.keyCode == 38) {
        playerDirection = 'up'
    }
    else if (event.keyCode == 39) {
        playerDirection = 'right'
    }
    else if (event.keyCode == 40) {
        playerDirection = 'down'
    }
})

function movement(pos) {
    let playerPos = document.getElementById("player")
    let targetPos = document.getElementById("target")

    let current
    if (playerDirection == "left" || playerDirection == "right") {
        if (playerPos.style.left == "") {
            current = 0;
        }
        else {
            current = parseFloat(playerPos.style.left)
            // if (playerDirection == 'right') if (current > 180) gameOver()
            // if (playerDirection == 'left') if (current < 10) gameOver()
        }
        if (playerDirection == 'right') playerPos.style.left = (current + pos) + "px"
        if (playerDirection == 'left') playerPos.style.left = (current - pos) + "px"
    }
    else if (playerDirection == "up" || playerDirection == "down") {
        if (playerPos.style.top == "") {
            current = 0;
        }
        else {
            current = parseFloat(playerPos.style.top)
            // if (playerDirection == 'down') if (current > 180) gameOver()
            // if (playerDirection == 'up') if (current < 10) gameOver()
        }
        if (playerDirection == 'down') playerPos.style.top = (current + pos) + "px"
        if (playerDirection == 'up') playerPos.style.top = (current - pos) + "px"
    }

    if (parseFloat(playerPos.style.top) > 190 || parseFloat(playerPos.style.top) < 0 ||
        parseFloat(playerPos.style.left) > 190 || parseFloat(playerPos.style.left) < 0)
        gameOver()

    if (playerPos.style.left == targetPos.style.left &&
        playerPos.style.top == targetPos.style.top) {
        score += 1
        randomTargetOnly()
        if (score % 2 == 0) {
            if (snekSpeed >= 70) snekSpeed -= 20
            console.log(snekSpeed)
        }
    }

    document.getElementById("score").innerHTML = `${score}`
    if (isGameStart) repeater = setTimeout(function () { movement(pos) }, snekSpeed)
}

function startGame() {
    randomizer()

    snekSpeed = 200
    
    score = 0

    player[0].style.top = `${randPlayerX}` + 'px'
    player[0].style.left = `${randPlayerY}` + 'px'
    target[0].style.top = `${randTargetX}` + 'px'
    target[0].style.left = `${randTargetY}` + 'px'

    isGameStart = !isGameStart
    movement(10)
    document.getElementById("startButton").style.display = "none"
}



