const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

const gameContainer = document.getElementById("gameContainer");

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let food = null;
let score = 0;
let gameInterval = null;

function createFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
  } while (snake.some((segment) => segment.x === x && segment.y === y));
  food = { x, y };
}

function draw() {
  game.innerHTML = "";

  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x + 1;
    snakeElement.style.gridRowStart = segment.y + 1;
    snakeElement.classList.add("snake");
    game.appendChild(snakeElement);
  });

  if (food) {
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.classList.add("food");
    game.appendChild(foodElement);
  }
}

function moveSnake() {
  if (
    (nextDirection.x !== -direction.x || nextDirection.y !== -direction.y) &&
    (nextDirection.x !== 0 || nextDirection.y !== 0)
  ) {
    direction = nextDirection;
  }

  if (direction.x === 0 && direction.y === 0) return;

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (food && head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Puntaje: ${score}`;
    createFood();
  } else {
    snake.pop();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = `Puntaje: ${score}`;
  createFood();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    moveSnake();
    draw();
  }, 100);
}

function startGame() {
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameContainer.style.display = "block";
  resetGame();
}

function gameOver() {
  clearInterval(gameInterval);
  finalScore.textContent = `Tu puntaje: ${score}`;
  gameContainer.style.display = "none";
  gameOverScreen.style.display = "flex";
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      nextDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      nextDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      nextDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      nextDirection = { x: 1, y: 0 };
      break;
  }
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

document.getElementById("backToLobbyBtn").addEventListener("click", () => {
  window.location.href = "../../index.html"; 
});
