const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let isGameOver = false;
let birdY = 250;
let velocityY = 4;
let gravity = 0.25;    // CAÍDA MÁS LENTA
let jumpForce = -6;   // SALTO MÁS SUAVE
let score = 0;
let pipeX = 900;
let pipeGap = 250;
let pipeTopHeight = 200;

let pipeSpeed = 4; // velocidad normal

function gameLoop() {
    if (isGameOver) return;
  // Física del pájaro
  velocityY += gravity;
  birdY += velocityY;
  bird.style.top = birdY + "px";

  // Rotar el pájaro según velocidad
  const maxRotation = 25; // grados
  let rotation = velocityY * 3; // ajustar factor de multiplicación
  if (rotation > maxRotation) rotation = maxRotation;
  if (rotation < -maxRotation) rotation = -maxRotation;
  bird.style.transform = `rotate(${rotation}deg)`;

  // Mover tubos usando pipeSpeed
  pipeX -= pipeSpeed;
  pipeTop.style.right = (400 - pipeX) + "px";
  pipeBottom.style.right = (400 - pipeX) + "px";

  // Resetear tubos cuando salen de pantalla
  if (pipeX < -60) {
    pipeX = 500;
    pipeTopHeight = Math.floor(Math.random() * 250) + 100;
    pipeTop.style.height = pipeTopHeight + "px";
    pipeBottom.style.height = (600 - pipeTopHeight - pipeGap) + "px";
    score++;
    scoreDisplay.textContent = score;
  }

  // Colisiones
  const birdRect = bird.getBoundingClientRect();
  const topRect = pipeTop.getBoundingClientRect();
  const bottomRect = pipeBottom.getBoundingClientRect();

  if (
  (birdRect.right > topRect.left && birdRect.left < topRect.right && birdRect.top < topRect.bottom) ||
  (birdRect.right > bottomRect.left && birdRect.left < bottomRect.right && birdRect.bottom > bottomRect.top) ||
  birdY > 570 || birdY < 0
) {
  isGameOver = true;
  finalScore.textContent = `Puntos: ${score}`;
  gameOverScreen.style.display = "flex";
  return; // Detiene el loop
}

  requestAnimationFrame(gameLoop);
}

// Salto
function jump() {
  velocityY = jumpForce;
}

function resetGame() {
  birdY = 250;
  velocityY = 0;
  pipeX = 700;  // aquí no pipeSpeed sino posición inicial fija
  score = 0;
  scoreDisplay.textContent = score;
  
  // Generar altura aleatoria para el primer tubo superior
  pipeTopHeight = Math.floor(Math.random() * 250) + 100;
  
  // Ajustar alturas de tubos usando pipeGap
  pipeTop.style.height = pipeTopHeight + "px";
  pipeBottom.style.height = (600 - pipeTopHeight - pipeGap) + "px";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

document.addEventListener("click", jump);

document.addEventListener("DOMContentLoaded", () => {
  const modoInfiernoBtn = document.getElementById("modoInfiernoBtn");

  const modos = [
    {
      nombre: "Normal",
      pipeSpeed: 4,
      pipeGap: 250,
      jumpForce: -7,
      color: "#2a9d8f"
    },
    {
      nombre: "Difícil",
      pipeSpeed: 7,
      pipeGap: 200,
      jumpForce: -5,
      color: "#f4a261"
    },
    {
      nombre: "Infierno",
      pipeSpeed: 10,
      pipeGap: 180,
      jumpForce: -5,
      color: "#ff0015ff"
    }
  ];

  let modoActual = 0;

  if (modoInfiernoBtn) {
    modoInfiernoBtn.addEventListener("click", () => {
      modoActual = (modoActual + 1) % modos.length;
      const modo = modos[modoActual];

      pipeSpeed = modo.pipeSpeed;
      pipeGap = modo.pipeGap;
      jumpForce = modo.jumpForce;

      modoInfiernoBtn.textContent = `Modo: ${modo.nombre}`;
      modoInfiernoBtn.style.backgroundColor = modo.color;
    });

    // Inicializar botón
    modoInfiernoBtn.textContent = `Modo: ${modos[modoActual].nombre}`;
    modoInfiernoBtn.style.backgroundColor = modos[modoActual].color;
  }
});

restartBtn.addEventListener("click", () => {
  isGameOver = false;
  gameOverScreen.style.display = "none";
  resetGame();
  gameLoop(); // reinicia el loop
});



gameLoop();

document.getElementById("backToLobbyBtn").addEventListener("click", () => {
  window.location.href = "../../index.html"; 
});
