let player = document.getElementsByClassName("player") // Get player class details
let tails = document.getElementsByClassName("tails") // Get tails class details
let tail = document.getElementsByClassName("tail") // Get tail class details
let target = document.getElementsByClassName("target") // Get target class details
let playerDirection // Initiate Player Direction
let isGameStart = false // Initiate the game not started yet
let repeater // Initiate repeater
let score = 0 // Initiate score with 0
let highScore = 0 // Initiate high score with 0 and change every gameover
let snekSpeed // Initiate first snake speed
let tailPos // Collecting the tail and head position
let furthestTail // Initiate the furthest tail

// Initiate random number with X and Y axis for each player and target
let randPlayerX 
let randPlayerY
let randTargetX
let randTargetY

// Generate a random for position
function randomizer() {
    const randomDirection = Math.floor(Math.random() * 4)
    randPlayerX = (Math.floor(Math.random() * 13) + 4) * 10
    randPlayerY = (Math.floor(Math.random() * 13) + 4) * 10
    randTargetX = Math.floor(Math.random() * 20) * 10
    randTargetY = Math.floor(Math.random() * 20) * 10

    tailPos = [] // Empty array with push for head and tail position later
    tailPos.push([randPlayerX, randPlayerY])

    if (randomDirection == 0) {
        playerDirection = "right"
        tailPos.push([randPlayerX - 10, randPlayerY])
        tailPos.push([randPlayerX - 20, randPlayerY])
    }
    else if (randomDirection == 1) {
        playerDirection = "up"
        tailPos.push([randPlayerX, randPlayerY + 10])
        tailPos.push([randPlayerX, randPlayerY + 20])
    }
    else if (randomDirection == 2) {
        playerDirection = "left"
        tailPos.push([randPlayerX + 10, randPlayerY])
        tailPos.push([randPlayerX + 20, randPlayerY])
    }
    else if (randomDirection == 3) {
        playerDirection = "down"
        tailPos.push([randPlayerX, randPlayerY - 10])
        tailPos.push([randPlayerX, randPlayerY - 20])
    }

    tails[0].innerHTML = `<div class="tail" id="tail"></div><div class="tail" id="tail"></div>` // To make tail visible
}

// Run every player achieve the target
function randomTargetOnly() {
    randTargetX = Math.floor(Math.random() * 20) * 10
    randTargetY = Math.floor(Math.random() * 20) * 10
    target[0].style.top = `${randTargetX}` + 'px'
    target[0].style.left = `${randTargetY}` + 'px'
}

// If eat it self or out of bound
function gameOver() {
    isGameStart = false
    clearTimeout(repeater)
    if (highScore < score) {
        highScore = score
        document.getElementById("highScore").innerHTML = `${highScore}`
    }
    document.getElementById("startButton").style.display = "block"
}

// Direction play
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37 && playerDirection != 'right') { // Turn Left
        playerDirection = 'left'
    }
    else if (event.keyCode == 38 && playerDirection != 'down') { // Turn Up
        playerDirection = 'up'
    }
    else if (event.keyCode == 39 && playerDirection != 'left') { // Turn Right
        playerDirection = 'right'
    }
    else if (event.keyCode == 40 && playerDirection != 'up') { // Turn Down
        playerDirection = 'down'
    }
})

// Loop to make snek move
function movement(pos) {
    // Get id to change position and for if condition
    let playerPos = document.getElementById("player") 
    let targetPos = document.getElementById("target")

    let currentTail

    let current // Current head snek position
    if (playerDirection == "left" || playerDirection == "right") {
        if (playerPos.style.left == "") {
            current = 0;
        }
        else {
            current = parseFloat(playerPos.style.left)
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
        }
        if (playerDirection == 'down') playerPos.style.top = (current + pos) + "px"
        if (playerDirection == 'up') playerPos.style.top = (current - pos) + "px"
    }

    // To determine tail position follow head
    for (let i = tailPos.length - 1; i > 0; i--) {
        tailPos[i][0] = tailPos[i - 1][0]
        tailPos[i][1] = tailPos[i - 1][1]
    }

    // To make tail move alongside with head
    for (let i = 0; i < tail.length; i++) {
        currentTail = tail[i]
        currentTail.style.left = tailPos[i + 1][0] + "px"
        currentTail.style.top = tailPos[i + 1][1] + "px"
    }

    // Defeat condition: Out of bounds
    if (parseFloat(playerPos.style.top) > 190 || parseFloat(playerPos.style.top) < 0 ||
        parseFloat(playerPos.style.left) > 190 || parseFloat(playerPos.style.left) < 0) {
            document.getElementById("condition").innerHTML = "Out of Bound!"
            gameOver()
        }

    // Acquire Score condition
    if (playerPos.style.left == targetPos.style.left &&
        playerPos.style.top == targetPos.style.top) {
        score += 1
        randomTargetOnly()
        if (score % 2 == 0) {
            if (snekSpeed >= 50) snekSpeed -= 20
        }

        furthestTail = tailPos[tailPos.length - 1].slice()

        tails[0].innerHTML += `<div class="tail" id="tail">`
        tailPos.push(furthestTail)
        tail[tail.length - 1].style.left = furthestTail[0] + "px"
        tail[tail.length - 1].style.top = furthestTail[1] + "px"
    }

    // Defeat condition: Eat by itself
    for (let i = 0; i < tail.length; i++) {
        if (playerPos.style.left == tail[i].style.left && playerPos.style.top == tail[i].style.top) {
            document.getElementById("condition").innerHTML = "You have eat yourself!"
            gameOver()
        }
    }

    tailPos[0][0] = parseFloat(playerPos.style.left)
    tailPos[0][1] = parseFloat(playerPos.style.top)

    document.getElementById("score").innerHTML = `${score}`
    if (isGameStart) repeater = setTimeout(function () { movement(pos) }, snekSpeed)
}

// Reset / play game
function startGame() {
    randomizer()

    snekSpeed = 200 // 0.2 Seconds

    score = 0

    player[0].style.top = `${randPlayerY}` + 'px'
    player[0].style.left = `${randPlayerX}` + 'px'
    target[0].style.top = `${randTargetY}` + 'px'
    target[0].style.left = `${randTargetX}` + 'px'

    for (let i = 0; i < tail.length; i++) {
        tail[i].style.left = tailPos[i + 1][0] + 'px'
        tail[i].style.top = tailPos[i + 1][1] + 'px'
    }

    isGameStart = !isGameStart
    movement(10)
    document.getElementById("condition").innerHTML = ""
    document.getElementById("startButton").style.display = "none"
}



