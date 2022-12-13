const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const catx = canvas.width / 2;
const caty = canvas.height / 2;
const mouthRadius = 50;
const ballRadius = 10;

function startPosition() {

    if (Math.floor(Math.random()*10) <=0.5){
        return Math.floor(Math.random() * (catx - (mouthRadius+ballRadius) - ballRadius*2) + ballRadius*2)
    }
    else { 
        return Math.floor(Math.random() * (canvas.width - ballRadius*2 - (catx+mouthRadius+ballRadius)) + (catx+mouthRadius+ballRadius))
    }
}



let x = startPosition();
let y = ballRadius;
let dx = 0;
let dy = -2;
let speed = 1.0;



const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

function drawCatMouth() {
    ctx.beginPath();
    ctx.arc(catx, caty, mouthRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawCatMouth();
    x += dx;
    y += dy;
    //make the food disappear when it hits the mouth
    if (x > (catx - mouthRadius)  && x < (catx + mouthRadius) && y < (caty + mouthRadius) && y > (caty - mouthRadius)) {
        x = startPosition();
        y = 20; 
        speed += 0.001;
        dx = 0;     
        dy = -dy*speed;
        
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        }
        
    if (y + dy < ballRadius) {
        dy = -dy;
        } 
    else if (y + dy > canvas.height - ballRadius) {
        
        if (x > (paddleX - ballRadius)  && x < (paddleX + paddleWidth + ballRadius)) //ie the food hits the paddle
         {
              dy = -dy;
              if (dx > 0) // food is moving right
              {dx += Math.sqrt(x - paddleX) / 5}

              else if (dx < 0) // food is moving left
              {dx -= Math.sqrt((paddleX + paddleWidth) -x) / 5}

              else if (dx == 0 && x < paddleX + paddleWidth/2) //food drops straight down on paddle left
              {dx -= speed * Math.sqrt((paddleX + paddleWidth) -x) / 5} //food goes left

              
              else if (dx == 0 && x > paddleX + paddleWidth/2) //food drops straight down on paddle right
              {dx += speed * Math.sqrt(x - paddleX) / 5 } //food goes right
              
              
            } 
        else {
              alert("GAME OVER");
              document.location.reload();
              clearInterval(interval);
            }
          }


    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } 
    else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
        }
    }  
    
const interval = setInterval(draw, 10);