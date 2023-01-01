let userChoice


window.addEventListener("keydown", e =>  {
  switch (e.key) {
    
    case "ArrowUp":
      if (window.inputDirection.y !== 0 || window.arrowAlreadyPressed) break
      userChoice = "Up"
      window.arrowAlreadyPressed = true
      break
    case "ArrowDown":
      if (window.inputDirection.y !== 0 || window.arrowAlreadyPressed) break
      userChoice = "Down"
      window.arrowAlreadyPressed = true
      break
    case "ArrowLeft":
      if (window.inputDirection.x !== 0 || window.arrowAlreadyPressed) break
      userChoice = "Left"
      window.arrowAlreadyPressed = true
      break
    case "ArrowRight":
      if (window.inputDirection.x !== 0 || window.arrowAlreadyPressed) break
      userChoice = "Right"
      window.arrowAlreadyPressed = true
      break
    }
  }
)


export default function checkUserChoice (){
  if (userChoice == "Up") {
    window.inputDirection = { x: 0, y: 1 }
  } else if (userChoice == "Down") {
    window.inputDirection = { x: 0, y: -1 }
  } else if (userChoice == "Left") {
    window.inputDirection = { x: -1, y: 0 }
  } else if (userChoice == "Right") {
    window.inputDirection = { x: 1, y: 0 }
  }
}