function loadImages(sources, callback) {
    let images = {};
    let loadedImages = 0;
    let numImages = 0;
    // get num of sources
    for(let src in sources) {
      numImages++;
    }
    for(let src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

const sources = {
    turkey_leg: 'assets/poultry-leg.256x256.png', 
    cat_face: 'assets/cat-face.svg', 
    happy_cat: 'assets/smiling-cat-face-with-heart-eyes.svg',
    sad_cat: 'assets/crying-cat-face.svg',
    christophe: 'assets/very-hungry-cat.jpg'
}

//preloader function for image files


let score = 0;
let lives = 9;
let emoji = document.querySelector('#emoji');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const catx = canvas.width / 2;
const caty = canvas.height / 2;
const mouthRadius = 50;
const ballRadius = 20;

ctx.font = "48px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";
ctx.fillText('Press Enter to start', catx, caty)

function catFace(face) {
    if (face === 'happy') {emoji.innerHTML = `<img src= ${sources.happy_cat} />`;}

    else if (face === 'sad') {emoji.innerHTML = `<img src= ${sources.sad_cat} />`;

console.log('sad')}

    setTimeout(
        ()=>{ 
            emoji.innerHTML = `<img src= ${sources.cat_face} />`;
        }, 1000
        )
}



function startPosition() {

    if (Math.random()<=0.5){
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
beginGame = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", gameStart, false )

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

function drawTurkey(img) {

    ctx.drawImage(img, x, y, ballRadius, ballRadius);

}

  
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

function drawCatMouth(img) {
    ctx.drawImage(img, catx-mouthRadius*4, caty-mouthRadius*4, mouthRadius*8, mouthRadius*8);
  }


  function gameStart(e) {
    if (e.key === "Enter" && beginGame === false) {
      beginGame = true;
    
    
    loadImages(sources, function(images) {

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCatMouth(images.christophe);
    drawTurkey(images.turkey_leg);
    drawPaddle();
    
    x += dx;
    y += dy;
    //make the food disappear when it hits the mouth
    if (x > (catx - mouthRadius)  && x < (catx + mouthRadius) && y < (caty + mouthRadius) && y > (caty - mouthRadius)) {
        score += 1;
        document.querySelector('#total').innerHTML = score;
        catFace('happy');
        x = startPosition();
        y = 20; 
        speed += 0.002;
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
        
        if (x >= (paddleX - ballRadius)  && x < (paddleX + paddleWidth + ballRadius)) //ie the food hits the paddle
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
        else if (lives > 0) {
            catFace('sad');
            lives -= 1;
            document.querySelector('#lives').innerHTML = lives;
            x = startPosition();
            y = 20; 
            dx = 0;     
            dy = -dy;
        }
        else if (lives == 0) {
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
}
)

} }