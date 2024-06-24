document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;
    let snake = [];
    let score = 0;
    let obstacles = [];
    let isGameOver = false; // Optional: track game over state

    (function setup() {
        snake = [ {x: 10 * scale, y: 10 * scale} ];
        let fruit = {
            x: Math.floor(Math.random() * rows) * scale,
            y: Math.floor(Math.random() * columns) * scale
        };
        let d = 'RIGHT';
        const speed = 100;
        generateObstacles();

        gameInterval = window.setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFruit();
            drawObstacles();
            checkObstacleCollision();
            moveSnake();
            drawSnake();
            if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
                score++;
                document.querySelector('.score').innerText = score;
                // Grow the snake by not removing its last segment
                // This assumes moveSnake normally removes the last segment
                fruit = {
                    x: Math.floor(Math.random() * rows) * scale,
                    y: Math.floor(Math.random() * columns) * scale
                };
                // Optionally, add a new segment manually if your moveSnake function does not handle this
            } else {
                // Remove the last segment of the snake if it hasn't eaten the fruit
                // This logic might be inside your moveSnake function
            }
        }, speed);

        function drawSnake() {
            ctx.fillStyle = "green"; // Change snake color here
            for (let i = 0; i < snake.length; i++) {
                ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
            }
        }

        function drawFruit() {
            ctx.fillStyle = "blue"; // Change fruit color here
            ctx.fillRect(fruit.x, fruit.y, scale, scale);
        }

                // Assuming moveSnake function definition is available
        function moveSnake() {
            if (!isGameOver) {
                // Create a new head based on the current direction
            const head = { x: snake[0].x, y: snake[0].y };
            if (d === 'RIGHT') head.x += scale;
            if (d === 'LEFT') head.x -= scale;
            if (d === 'UP') head.y -= scale;
            if (d === 'DOWN') head.y += scale;

            // Add the new head to the beginning of the snake array
            snake.unshift(head);

            // Check if snake eats the fruit
            if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
                score++;
                document.querySelector('.score').innerText = score;
                // Generate new fruit position
                fruit = {
                    x: Math.floor(Math.random() * rows) * scale,
                    y: Math.floor(Math.random() * columns) * scale
                };
                // Do not remove the last segment of the snake to make it grow
            } else {
                // Remove the last segment if the snake didn't eat a fruit
                snake.pop();
            }
            if (head.x < 0) {
                head.x = canvas.width - scale; // Adjust to appear on the right
            } else if (head.x >= canvas.width) {
                head.x = 0; // Adjust to appear on the left
            }
            if (head.y < 0) {
                head.y = canvas.height - scale; // Adjust to appear at the bottom
            } else if (head.y >= canvas.height) {
                head.y = 0; // Adjust to appear at the top
            }
            }
            
        }

        function generateObstacles() {
            for (let i = 0; i < 5; i++) {
                obstacles.push({
                    x: Math.floor(Math.random() * rows) * scale,
                    y: Math.floor(Math.random() * columns) * scale
                });
            }
        }

        function drawObstacles() {
            ctx.fillStyle = 'red'; // Example: obstacle color
            for (let obstacle of obstacles) {
                ctx.fillRect(obstacle.x, obstacle.y, scale, scale); // Assuming 'scale' is your grid size
            }
        }

        function checkObstacleCollision() {
            for (let obstacle of obstacles) {
                if (snake[0].x === obstacle.x && snake[0].y === obstacle.y) {
                    // Stop the game loop
                    window.clearInterval(gameInterval)
                    // Display game over message
                    alert("Game Over! Your score is: " + score);
                    isGameOver = true; // Step 2: Set game over state
                    return true; // Optional: return a value indicating the game is over
                }
            }
            return false; // Optional: return a value indicating the game is not over
        }

        document.onkeydown = function(event) {
            if (event.key === "ArrowLeft" && d !== 'RIGHT') {
                dx = -scale * 1;
                dy = 0;
                d = 'LEFT';
            } else if (event.key === "ArrowUp" && d !== 'DOWN') {
                dx = 0;
                dy = -scale * 1;
                d = 'UP';
            } else if (event.key === "ArrowRight" && d !== 'LEFT') {
                dx = scale * 1;
                dy = 0;
                d = 'RIGHT';
            } else if (event.key === "ArrowDown" && d !== 'UP') {
                dx = 0;
                dy = scale * 1;
                d = 'DOWN';
            }
        };

        let dx = scale * 1;
        let dy = 0;
    })();
});