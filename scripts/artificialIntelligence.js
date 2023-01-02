// Initialize the model before the game starts
// In the choice selection function the following steps are taken
// 1. The state of the game is translated into a way that the model can understand
// 2. The model chooses the action to take
// 3. The model gets the corresponding reward for the action
// 4. The model updates its weights

// Maybe I have to call step 3 and 4 in the main method after the snake is moved

// const tf = require("@tensorflow/tfjs");

export function initiateAIModel() {
  window.model = tf.sequential();
  window.model.add(tf.layers.dense({ units: 64, inputShape: [100], activation: "relu" }));
  window.model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  window.model.add(tf.layers.dense({ units: 4, activation: "softmax" }));
  
  window.model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  window.gamma = 0.9;
  window.epsilon = 1.0;

  let done = false;
  console.log("Model initiated");
}

function getState(snakeBody, applePosition) {
  const state = [];

  let xValues = [];
  let yValues = [];
  for (let i = 0; i < snakeBody.length; i++) {
    xValues.push(snakeBody[i].x);
    yValues.push(snakeBody[i].y);
  }

  for (let i = 0; i < window.gridsize; i++) {
    for (let j = 0; j < window.gridsize; j++) {
      if (xValues.includes(j) && yValues.includes(i)) {
        state.push(1);
      } else if (applePosition.x === j && applePosition.y === i) {
        state.push(2);
      } else {
        state.push(0);
      }
    }
  }
  return state;
}


export function aIModelChoice(snakeBody, applePosition) {
  window.state = getState(snakeBody, applePosition);

  // console.log(state)
  let selectedAction

  if (Math.random() < window.epsilon) {
    // Choose a random action
    selectedAction = ["UP", "DOWN", "LEFT", "RIGHT"][Math.floor(Math.random() * 4)];
  } else {
    // Choose the action with the highest predicted reward
    const actionProbs = window.model.predict(tf.tensor2d([window.state])).dataSync();
    selectedAction = ["UP", "DOWN", "LEFT", "RIGHT"][tf.argMax(actionProbs).dataSync()[0]];
  }

  if (selectedAction == "UP" && window.inputDirection.x !== 0) {
    window.inputDirection = { x: 0, y: 1 }
  } else if (selectedAction == "DOWN" && window.inputDirection.x !== 0) {
    window.inputDirection = { x: 0, y: -1 }
  } else if (selectedAction == "LEFT" && window.inputDirection.y !== 0) {
    window.inputDirection = { x: -1, y: 0 }
  } else if (selectedAction == "RIGHT" && window.inputDirection.y !== 0) {
    window.inputDirection = { x: 1, y: 0 }
  }
}

export async function updateAIModel(snakeBody, applePosition, reward, done) {
  const nextState = getState(snakeBody, applePosition);
  let target = reward;
  if (!done) {
    // Predict the future discounted reward
    const futureReward = tf.max(window.model.predict(tf.tensor2d([window.state]))).dataSync()[0];
    target = reward + window.gamma * futureReward;
  }
  // Update the model
  const targetVec = window.model.predict(tf.tensor2d([window.state])).dataSync();
  targetVec[["UP", "DOWN", "LEFT", "RIGHT"].indexOf(window.inputDirection)] = target;
  await window.model.fit(tf.tensor2d([window.state]), tf.tensor2d([targetVec]));

  if (!done) {
    window.state = nextState;
  }

  window.epsilon *= 0.995;
}

// for (let episode = 0; episode < 1000; episode++) {
//   // Initialize the state
//   let state = getState(snake, food);
  
//   // Run the game until it's over
//   while (!done) {
//     // Choose an action
//     const action = chooseAction(state, epsilon);
    
//     // Move the snake
//     done = !moveSnake(snake, action);
    
//     // Update the state
//     const nextState = getState(snake, food);
    
//     // Update the model
//     if (done) {
//       await updateModel(state, action, -1, nextState, done);
//     } else {
//       await updateModel(state, action, 0, nextState, done);
//     }
    
//     // Set the state to be the next state
//   }
  
//   // Decrease the exploration rate
//   epsilon *= 0.995;
// }