const WIDTH = 900,
  HEIGHT = 600,
  BALL_SPEED = Math.sqrt(8),
  BALL_RADIUS = 10,
  PADDLE_WIDTH = 75,
  PADDLE_HEIGHT = 10,
  BRICK_ROW_COUNT = 5,
  BRICK_COLUMN_COUNT = 10,
  BRICK_WIDTH = 75,
  BRICK_HEIGHT = 20,
  BRICK_PADDING = 10,
  BRICK_OFFSET_TOP = 30,
  BRICK_OFFSET_LEFT = 30,
  COLORS = ["#00CC66", "#D90368", "#F1C40F", "#F75C03", "#2274A5"];

let paddleX = (WIDTH - PADDLE_WIDTH) / 2,
  ballPositionX = paddleX + PADDLE_WIDTH / 2,
  ballPositionY = HEIGHT - BALL_RADIUS - PADDLE_HEIGHT,
  addX = -2,
  addY = -2,
  rightPressed = false,
  leftPressed = false,
  score = 0,
  bricks = [];

window.onload = () => {
  let canvas = document.getElementById("canvas");
  canvas.width = 900;
  canvas.height = 600;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1, color: COLORS[r] };
    }
  }
};

const draw = () => {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  collisionDetection();
  drawBricks();
  drawScore();
  let ratio = BALL_SPEED / Math.sqrt(Math.pow(addX, 2) + Math.pow(addY, 2));
  ballPositionX += ratio * addX;
  ballPositionY += ratio * addY;
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
    addX = Math.sign(addX) * -getRandomAddition();
  }
  if (ballPositionY + addY < BALL_RADIUS) {
    addY = Math.sign(addY) * -getRandomAddition();
  } else if (ballPositionY + addY > canvas.height - BALL_RADIUS) {
    if (ballPositionX > paddleX && ballPositionX < paddleX + PADDLE_WIDTH) {
      addY = Math.sign(addY) * -getRandomAddition();
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }
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

const drawBricks = () => {
  let ctx = canvas.getContext("2d");
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        let brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const collisionDetection = () => {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      let brick = bricks[c][r];
      if (
        ballPositionX > brick.x &&
        ballPositionX < brick.x + BRICK_WIDTH &&
        ballPositionY > brick.y &&
        ballPositionY < brick.y + BRICK_HEIGHT
      ) {
        if (brick.status == 1) {
          addY = Math.sign(addY) * -getRandomAddition();
          brick.status = 0;
          score++;
          if (score == BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
};

const drawScore = () => {
  let ctx = canvas.getContext("2d");
  ctx.font = "16px Arial";
  ctx.fillStyle = "#2274A5";
  ctx.fillText("Score: " + score, 8, 20);
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

const getRandomAddition = () => {
  return Math.floor(Math.random() * 3) + 1;
};

let interval = setInterval(draw, 10);
