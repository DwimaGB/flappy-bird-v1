import { updateBird, flyUp, birdPosition, birdSpawn, getBirdSize } from "./bird.js";
import { createObstacle, obstaclesArray, displayObstacle, updateObstacle, obstacleInterval, getObstaclePosition, getObstacleSize, score } from "./obstacle.js";

const scoreText = document.getElementById('score');
const highScoreText = document.getElementById('high-score');
const start = document.querySelector('.start');
const gameOverText = document.querySelector('.game-over-text');


let delta;
let lastRender;
let obstacleSpawn;
let diffObstacleSpawn;

function main(time) {
    const id = window.requestAnimationFrame(main);

    if (!lastRender) {
        lastRender = time;
        return;
    }
    delta = time - lastRender;
    lastRender = time;

    if (!obstacleSpawn) {
        obstacleSpawn = time;
        return;
    }

    diffObstacleSpawn = time - obstacleSpawn;

    if (diffObstacleSpawn > obstacleInterval) {
        createObstacle();
        obstacleSpawn = time;
    }


    updateBird(delta);
    updateObstacle(delta);
    displayObstacle();

    if (gameOver()) {
        gameOverText.classList.toggle('hide');
        setTimeout(gameStartAgain, 200);
        window.cancelAnimationFrame(id);
    }
}


window.addEventListener('keydown', flyUp);

function gameStart() {
    start.classList.add('hide');
    createObstacle();
    displayObstacle();
    birdSpawn();
    window.requestAnimationFrame(main);
}

window.addEventListener('keydown', () => {
    gameStart();
}, { once: true })


function gameOver() {
    return (birdPosition().bottom - 18.5 > innerHeight || birdPosition().top < 0 || checkCollision())

}

// hardcoded value of position to conpensate with the image size
function checkCollision() {

    if (birdPosition().left > getObstaclePosition(obstaclesArray[0].obstacles).right) {
        scoreText.innerText = score.score;
        return;
    }

    if (birdPosition().left + getBirdSize() - 5 > getObstaclePosition(obstaclesArray[0].obstacles).right + getObstacleSize() && birdPosition().top < getObstaclePosition(obstaclesArray[0].topObstacle).bottom) {
        return true;
    }

    if (birdPosition().left + getBirdSize() - 5 > getObstaclePosition(obstaclesArray[0].obstacles).right + getObstacleSize() && birdPosition().bottom - 18.5 > getObstaclePosition(obstaclesArray[0].bottomObstacle).top) {
        return true;
    }

}


function gameStartAgain() {
    window.addEventListener('keydown', evt => {
        if (evt.code !== 'Space') return;

        if(score.score > score.highscore){
            score.highscore = score.score;
            highScoreText.innerText = score.highscore-1;
        }
        score.score = 1;
        scoreText.innerText = 0;
        gameOverText.classList.toggle('hide');
        lastRender = null;
        obstacleSpawn = null;
        for (let i = 0; i < obstaclesArray.length; i++) {
            obstaclesArray[i].obstacles.remove();

        }
        obstaclesArray.splice(0, obstaclesArray.length);
        
        createObstacle();
        displayObstacle();
        birdSpawn();
        window.requestAnimationFrame(main);

    }, { once: true })

}
