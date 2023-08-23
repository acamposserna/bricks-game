// Get the canvas context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ball
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var ballColor = "#0095DD";

// Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleDx = 7;
var paddleColor = "#DD9500";

// Paddle movement
var rightPressed = false;
var leftPressed = false;
var leftKeyCode = 37;
var rightKeyCode = 39;

/**
 * Draw the ball at (x,y) coordinates.
 *
 * @param int x
 * @param int y
 */
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x) {
    ctx.beginPath();
    ctx.rect(x, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}
/**
 * This is the main function.
 *
 * Delete the canvas.
 * Draw the ball at (x,y) coordinates.
 * Draw the palette at
 */
function main() {
    // Delete canvas and draw all elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x, y);
    drawPaddle(paddleX);

    // Detect the ball collision against the walls and bounce
    if (x+dx < ballRadius || x+dx > canvas.width-ballRadius) dx = -dx;
    if (y+dy < ballRadius || y+dy > canvas.height-ballRadius) dy = -dy;

    // Update ball coordinate values
    x += dx;
    y += dy;

    // Palette movement
    if(rightPressed && paddleX < canvas.width-paddleWidth) paddleX += paddleDx;
    else if(leftPressed && paddleX > 0) paddleX -= paddleDx;
}

function keyDownHandler(ev) {
    if (ev.keyCode == leftKeyCode) leftPressed = true;
    else if (ev.keyCode == rightKeyCode) rightPressed = true;
}

function keyUpHandler(ev) {
    if (ev.keyCode == leftKeyCode) leftPressed = false;
    else if (ev.keyCode == rightKeyCode) rightPressed = false;
}

// Add Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Execute de main function every 20 ms
setInterval(main, 20);