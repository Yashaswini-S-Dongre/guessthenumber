let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const darkToggle = document.getElementById("darkToggle");


const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 5 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 3 + 2,
      drift: Math.random() * 2 - 1
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;
    p.x += p.drift;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}


checkBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);
  attempts++;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "⛔ Enter a number between 1 and 100.";
    message.style.color = "orange";
    return;
  }

  if (guess === randomNumber) {
    message.textContent = `🎉 You guessed it! The number was ${randomNumber}`;
    message.style.color = "lightgreen";
    checkBtn.disabled = true;
    guessInput.disabled = true;
    createConfetti();
    animateConfetti();
  } else if (guess < randomNumber) {
    message.textContent = "📉 Too low!";
    message.style.color = "#f0ad4e";
  } else {
    message.textContent = "📈 Too high!";
    message.style.color = "#f0ad4e";
  }

  attemptsText.textContent = `Attempts: ${attempts}`;
});

restartBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessInput.value = "";
  message.textContent = "";
  attemptsText.textContent = "";
  checkBtn.disabled = false;
  guessInput.disabled = false;
  confettiParticles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
