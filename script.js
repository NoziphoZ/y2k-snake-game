
// Get the canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Score
const scoreText = document.getElementById("score");

// Buttons
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Game settings
const box = 20;
const rows = canvas.width / box;

// Variables
let snake;
let food;
let score;
let direction;
let game;

// Start game
function startGame() {

    snake = [
        {x:10, y:10},
        {x:9, y:10},
        {x:8, y:10}
    ];

    direction = "RIGHT";

    score = 0;
    scoreText.textContent = score;

    createFood();

    clearInterval(game);
    game = setInterval(drawGame, 120);
}

// Create food
function createFood(){

    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * rows)
    };

}

// Draw everything
function drawGame(){

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);

    // Draw snake
    for(let i=0;i<snake.length;i++){

        if(i==0){
            ctx.fillStyle="lime";
        }
        else{
            ctx.fillStyle="cyan";
        }

        ctx.fillRect(
            snake[i].x * box,
            snake[i].y * box,
            box,
            box
        );

    }

    // Current head
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Move
    if(direction=="LEFT") headX--;
    if(direction=="RIGHT") headX++;
    if(direction=="UP") headY--;
    if(direction=="DOWN") headY++;

    // Wall collision
    if(
        headX<0 ||
        headY<0 ||
        headX>=rows ||
        headY>=rows
    ){
        gameOver();
        return;
    }

    // Self collision
    for(let i=0;i<snake.length;i++){

        if(
            headX==snake[i].x &&
            headY==snake[i].y
        ){
            gameOver();
            return;
        }

    }

    // New head
    let newHead = {
        x:headX,
        y:headY
    };

    // Eat food
    if(headX==food.x && headY==food.y){

        score++;
        scoreText.textContent=score;

        createFood();

    }else{

        snake.pop();

    }

    snake.unshift(newHead);

}

// Keyboard
document.addEventListener("keydown",function(event){

    if(event.key=="ArrowLeft" && direction!="RIGHT"){
        direction="LEFT";
    }

    if(event.key=="ArrowRight" && direction!="LEFT"){
        direction="RIGHT";
    }

    if(event.key=="ArrowUp" && direction!="DOWN"){
        direction="UP";
    }

    if(event.key=="ArrowDown" && direction!="UP"){
        direction="DOWN";
    }

});

// Mobile buttons
function changeDirection(dir){

    if(dir=="left" && direction!="RIGHT"){
        direction="LEFT";
    }

    if(dir=="right" && direction!="LEFT"){
        direction="RIGHT";
    }

    if(dir=="up" && direction!="DOWN"){
        direction="UP";
    }

    if(dir=="down" && direction!="UP"){
        direction="DOWN";
    }

}

// Game over
function gameOver(){

    clearInterval(game);

    alert("Game Over!\n\nYour Score: " + score);

}

// Buttons
startBtn.addEventListener("click",startGame);

restartBtn.addEventListener("click",startGame);