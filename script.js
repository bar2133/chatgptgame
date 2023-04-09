// Initialize canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load assets
const birdImg = new Image();
birdImg.src = 'bird.png';

const pipeImg = new Image();
pipeImg.src = 'pipe.png';

// Set up game variables
let score = 0;
let birdY = canvas.height / 2;
let birdDY = 0;
let pipes = [];
let gameover = false;

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.drawImage(birdImg, 50, birdY);

    // Update bird position
    birdY += birdDY;
    birdDY += 0.5;

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x -= 2;

        // Check for collision with bird
        if (birdY < pipe.y + pipe.height && birdY + birdImg.height > pipe.y &&
            50 < pipe.x + pipe.width && 50 + birdImg.width > pipe.x) {
            gameover = true;
        }

        // Remove pipe if offscreen
        if (pipe.x + pipe.width < 0) {
            pipes.splice(i, 1);
            score++;
        } else {
            // Draw pipe
            ctx.drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
        }
    }

    // Generate new pipe
    if (pipes.length == 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        let pipeY = Math.random() * (canvas.height - 200) + 100;
        pipes.push({
            x: canvas.width,
            y: pipeY,
            width: 80,
            height: canvas.height - pipeY
        });
    }

    // Update score
    ctx.font = '30px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(score, 10, 50);

    // Check for game over
    if (birdY + birdImg.height > canvas.height || gameover) {
        clearInterval(intervalId);
    }
}

// Handle key events
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        birdDY = -10;
    }
});

// Start game loop
const intervalId = setInterval(gameLoop, 20);
