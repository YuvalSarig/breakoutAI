const WIDTH = 900,
  HEIGHT = 600,
  BALL_RADIUS = 10,
  BRICK_WIDTH = 100,
  BRICK_HEIGHT = 30,
  PADDLE_WIDTH = 75,
  PADDLE_HEIGHT = 10;

let ballPositionX = 500,
  ballPositionY = 500,
  addX = 2,
  addY = 2,
  paddleX = (WIDTH - PADDLE_WIDTH) / 2,
  rightPressed = false,
  leftPressed = false;

window.onload = () => {
  let canvas = document.getElementById("canvas");
  canvas.width = 900;
  canvas.height = 600;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  setInterval(draw, 10);
};

const draw = () => {
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  ballPositionX += addX;
  ballPositionY += addY;
};

const drawBall = () => {
  let ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(ballPositionX, ballPositionY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  if (
    ballPositionX + addX > canvas.width - BALL_RADIUS ||
    ballPositionX + addX < BALL_RADIUS
  ) {
    addX = -addX;
  }
  if (
    ballPositionY + addY > canvas.height - BALL_RADIUS ||
    ballPositionY + addY < BALL_RADIUS
  ) {
    addY = -addY;
  } 
//   else if (ballPositionY + dy > canvas.height - BALL_RADIUS) {
//     if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
//       dy = -dy;
//     } else {
//       alert("GAME OVER");
//       document.location.reload();
//       clearInterval(interval); // Needed for Chrome to end game
//     }
//   }
};

const drawPaddle = () => {
  let ctx = canvas.getContext("2d");
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + PADDLE_WIDTH > canvas.width) {
      paddleX = canvas.width - PADDLE_WIDTH;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const keyDownHandler = (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
};
