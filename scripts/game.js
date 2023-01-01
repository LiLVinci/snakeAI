import superAlgrithmChoice from "./superAlgorythm.js"
import checkUserChoice from "./userChoiceMethod.js"
import randomAIChoice from "./randomAIChoice.js"

let lastRenderTime = 0
let snakeSpeed = 2
const gameBoard = document.getElementById("game-board")
let snakeBody
let appleExists = false
let applePosition = {x: 0, y: 0}
let newSegment = false
let gameScore = 0
let gameOver = false
window.arrowAlreadyPressed = false
let started = false
window.gridsize = 10


function randomStart() { 
  snakeBody = [{ x: Math.floor(Math.random()*(window.gridsize-3))+2, y: Math.floor(Math.random()*(window.gridsize-3))+2 }]

  const directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 }
  ]
  window.inputDirection = directions[Math.floor(Math.random() * 4)];


}


function main(currentTime) {
  if (started == false) {
    randomStart()
    started = true
  }
  checkIfLost()
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      snakeSpeed = 0
      window.reload()
    }
    return 
  }
  window.requestAnimationFrame(main)
  if (checkSameFrame(currentTime)) return
  window.arrowAlreadyPressed = false
  lastRenderTime = currentTime
  // THIS IS WHERE THE RANDOM CHOICE IS CALLED
  // randomAIChoice()

  superAlgrithmChoice(snakeBody)
  // checkUserChoice()

  update()
  draw(gameBoard)

}

function checkSameFrame(currentTime) {
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  return secondsSinceLastRender < 1 / snakeSpeed
}

window.requestAnimationFrame(main)

function update() {
  if (newSegment) {
    snakeBody.push({ x: 0, y: 0 })
    newSegment = false
  }
  for (let i = snakeBody.length - 2; i >= 0; i--) {

    snakeBody[i+1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += window.inputDirection.x
  snakeBody[0].y += window.inputDirection.y
  if (snakeBody[0].x == applePosition.x && snakeBody[0].y == applePosition.y) {
    console.log("APPLE EATEN")
    gameScore += 1
    snakeSpeed += 1
    document.getElementById("game-score").innerHTML= gameScore
    newSegment = true
    appleExists = false
  }
  if (appleExists == false) {
    let randX = Math.floor(Math.random()*window.gridsize)+1
    let randY = Math.floor(Math.random()*window.gridsize)+1
    // HERE ADD THAT IF X OR Y IS INCLUDED IN THE SNAKEBODY CALUCALTE AGAIN
    applePosition = {x: randX, y: randY}
    appleExists = true
  } 
}

function draw(gameBoard) {
  // console.log(gameBoard)
  gameBoard.innerHTML = ""
  if (appleExists) {
    const appleElement = document.createElement("div")
    appleElement.style.gridColumnStart = applePosition.x
    appleElement.style.gridRowEnd = -1 * applePosition.y
    appleElement.classList.add("apple-body")
    gameBoard.appendChild(appleElement)
  }
  snakeBody.forEach(element => {
    const snakeElement = document.createElement("div")
  
    snakeElement.style.gridColumnStart = element.x
    snakeElement.style.gridRowEnd = -1 * element.y
    snakeElement.classList.add("snake-body")
    gameBoard.appendChild(snakeElement)
  })
}


function checkIfLost() {
  if (snakeBody[0].x <= 0 || snakeBody[0].x > window.gridsize || snakeBody[0].y <= 0 || snakeBody[0].y > window.gridsize) {
    gameOver = true
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    if (snakeBody[i].x == snakeBody[0].x && snakeBody[i].y == snakeBody[0].y) {
      gameOver = true
    }
  }
}