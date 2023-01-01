let stepCount = 0
let moveCount = 0
let zicZacCount = 0
let zicZacStepCount = 0

export default function superAlgrithmChoice(snakeBody) {

  let steps = ["Finding end", "Going to corner", "Turning Right Once", "ZicZacing...", "Going to corner", "Going to corner", "Going to corner", "Going to corner"]
  let zicZacSteps = ["Counting Forward Moves", "Turning Left Once", "Turning Left Twice", "Counting Backward Moves", "Turning Right Once", "Turning Right Twice"]

  if (stepCount == 3) {
    console.log(zicZacSteps[zicZacStepCount])
  } else {
    console.log(steps[stepCount])
  }

  if (stepCount == 0) {
    findEnd(snakeBody)
  } else if (stepCount == 1) {
    findCorner(snakeBody)
  } else if (stepCount == 2) {
    turnRight(snakeBody)
    stepCount++
  } else if (stepCount == 3) {
    if (zicZacCount < 18) {
      if(zicZacStepCount == 0) {
        countingMoves(snakeBody)
      } else if (zicZacStepCount == 1) {
        turnLeft(snakeBody)
        zicZacStepCount++
      } else if (zicZacStepCount == 2) {
        turnLeft(snakeBody)
        zicZacStepCount++
        zicZacCount++
        console.log("ZICZACCOUNT: " + zicZacCount)
      } else if (zicZacStepCount == 3) {
        countingMoves(snakeBody)
      } else if (zicZacStepCount == 4) {
        turnRight(snakeBody)
        zicZacStepCount++
      } else if (zicZacStepCount == 5) {
        turnRight(snakeBody)
        zicZacStepCount = 0
        zicZacCount++
        console.log("ZICZACCOUNT: " + zicZacCount)
      }
    } else {
      zicZacCount = 0
      stepCount++
    }
  

  } else if (stepCount == 4) {
    findCorner(snakeBody)
  } else if (stepCount == 5) {
    findCorner(snakeBody)
  } else if (stepCount == 6) {
    findCorner(snakeBody)
  } else if (stepCount == 7) {
    turnRight(snakeBody)
    stepCount = 3
  }
}

function atEnd (snakeBody) {
  if (snakeBody[0].x == 1 || snakeBody[0].y == 1 || snakeBody[0].x == window.gridsize || snakeBody[0].y == window.gridsize) {
    return true
  } else {
    return false
  }
}

function atCorner (snakeBody) {
  if ((snakeBody[0].x == 1 && snakeBody[0].y == 1) || (snakeBody[0].x == 1 && snakeBody[0].y == window.gridsize) || (snakeBody[0].x == window.gridsize && snakeBody[0].y == 1) || (snakeBody[0].x == 20 && snakeBody[0].y == window.gridsize)) {
    return true 
  } else {
    return false 
  }
}

function turnRight (){
  if (window.inputDirection.x == 1) {
    window.inputDirection = { x: 0, y: -1 }
  } else if (window.inputDirection.x == -1) {
    window.inputDirection = { x: 0, y: 1 }
  } else if (window.inputDirection.y == 1) {
    window.inputDirection = { x: 1, y: 0 }
  } else if (window.inputDirection.y == -1) {
    window.inputDirection = { x: -1, y: 0 }
  }
}

function turnLeft (){
  if (window.inputDirection.x == 1) {
    window.inputDirection = { x: 0, y: 1 }
  } else if (window.inputDirection.x == -1) {
    window.inputDirection = { x: 0, y: -1 }
  } else if (window.inputDirection.y == 1) {
    window.inputDirection = { x: -1, y: 0 }
  } else if (window.inputDirection.y == -1) {
    window.inputDirection = { x: 1, y: 0 }
  }
}

function findEnd(snakeBody) {
  if (atEnd(snakeBody)) {
    turnRight()
    stepCount++
  }
}


function findCorner(snakeBody) {
  if (atCorner(snakeBody)) {
    turnRight()
    stepCount++
  }
}

function countingMoves(snakeBody) {
  if (moveCount < window.gridsize-4) { 
    moveCount++
  } else {
    moveCount = 0
    zicZacStepCount++
  }
}
