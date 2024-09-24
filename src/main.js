const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > canvas.width) {
        if (ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }

    if (ballX - ballRadius < 0) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function moveComputerPaddle() {
    const paddleCenter = computerPaddleY + paddleHeight / 2;
    if (paddleCenter < ballY - 35) {
        computerPaddleY += 6;
    } else if (paddleCenter > ballY + 35) {
        computerPaddleY -= 6;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawNet();
    drawRect(0, playerPaddleY, paddleWidth, paddleHeight, '#fff');
    drawRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight, '#fff');
    drawCircle(ballX, ballY, ballRadius, '#fff');
}

function gameLoop() {
    moveBall();
    moveComputerPaddle();
    draw();
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseY = event.clientY - rect.top - root.scrollTop;
    playerPaddleY = mouseY - paddleHeight / 2;
});

setInterval(gameLoop, 1000 / 60);
