let AIChoice
 
const AIChoices = [
  "Up",
  "Down",
  "Left",
  "Right"
]

export default function randomAIChoice () {
  AIChoice = AIChoices[Math.floor(Math.random() * 4)]
  if (AIChoice == "Up") {
    window.inputDirection = { x: 0, y: 1 }
  } else if (AIChoice == "Down") {
    window.inputDirection = { x: 0, y: -1 }
  } else if (AIChoice == "Left") {
    window.inputDirection = { x: -1, y: 0 }
  } else if (AIChoice == "Right") {
    window.inputDirection = { x: 1, y: 0 }
  }
}