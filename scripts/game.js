let lastRenderTime = 0
let snakeSpeed = 2
const gameBoard = document.getElementById("game-board")
const snakeBody = [{ x: 11, y: 11 }]
let inputDirection = { x: 0, y: 0 }
let lastInputDirection
let appleExists = false
let applePosition = {x: 0, y: 0}
let newSegment = false
let gameScore = 0
let gameOver = false

let AIChoice

const AIChoices = [
  "Up",
  "Down",
  "Left",
  "Right"
]


function main(currentTime) {
  checkIfLost()
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.reload()
    }
    return 
  }
  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

  if (secondsSinceLastRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime

  randomAIChoice()

  update()
  draw(gameBoard)
  

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





  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y

  if (snakeBody[0].x == applePosition.x && snakeBody[0].y == applePosition.y) {
    console.log("APPLE EATEN")
    gameScore += 1
    snakeSpeed += 1
    document.getElementById("game-score").innerHTML= gameScore
    newSegment = true
    
    appleExists = false
  }

  if (appleExists == false) {
    let randX = Math.floor(Math.random()*21)+1
    let randY = Math.floor(Math.random()*21)+1
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
  if (snakeBody[0].x <= 0 || snakeBody[0].x >= 21 || snakeBody[0].y <= 0 || snakeBody[0].y >= 21) {
    gameOver = true
  }
  
  for (let i = snakeBody.length - 1; i > 0; i--) {
    if (snakeBody[i].x == snakeBody[0].x && snakeBody[i].y == snakeBody[0].y) {
      gameOver = true
    }
  }
}


window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (inputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case "ArrowDown":
      if (inputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case "ArrowLeft":
      if (inputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case "ArrowRight":
      if (inputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

function randomAIChoice () {

AIChoice = AIChoices[Math.floor(Math.random() * 4)]

  

  if (AIChoice == "Up") {
    inputDirection = { x: 0, y: 1 }
  } else if (AIChoice == "Down") {
    inputDirection = { x: 0, y: -1 }
  } else if (AIChoice == "Left") {
    inputDirection = { x: -1, y: 0 }
  } else if (AIChoice == "Right") {
    inputDirection = { x: 1, y: 0 }
  }
}