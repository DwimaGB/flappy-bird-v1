
const game = document.getElementById('gameContainer');

const obstacleGap = 160;
const obstacleMinimumHeight = 30;
const obstacleMaximumHeight = innerHeight-obstacleGap-obstacleMinimumHeight;

const obstacleVelocity = 0.2;
export const obstacleInterval = 2000;

export const obstaclesArray = [];

export let score = {highscore: 0, score: 1};

export function updateObstacle(delta){
    for(let obstacle of obstaclesArray){
        setObstaclePosition(obstacle.obstacles, getObstacleRight(obstacle.obstacles)+obstacleVelocity*delta);
    
    }
    removeObstacles();
}   

export function createObstacle(){

    const obstacles = document.createElement('div');
    const topObstacle = document.createElement('div')
    const bottomObstacle = document.createElement('div')
    const obstacleTopHeight = randomNum(obstacleMinimumHeight, obstacleMaximumHeight);
    
    obstacles.classList.add('obstacles');
    topObstacle.classList.add('obstacle', 'obstacle-top');
    bottomObstacle.classList.add('obstacle', 'obstacle-bottom');

    obstaclesArray.push({obstacles, topObstacle, bottomObstacle, obstacleTopHeight});
}

export function displayObstacle(){
    const currentObstacle = obstaclesArray[obstaclesArray.length-1];
    const parentObstacle = currentObstacle.obstacles;

    parentObstacle.appendChild(currentObstacle.topObstacle);
    parentObstacle.appendChild(currentObstacle.bottomObstacle);
    
    game.appendChild(parentObstacle);
    setObstacleTopHeight(parentObstacle, currentObstacle.obstacleTopHeight);
    setObstacleGap(parentObstacle);

    
}


export function setObstacleGap(obstacle){
    obstacle.style.setProperty('--obstacle-gap', obstacleGap);
}

export function getObstaclePosition(obstacle){
    return obstacle.getBoundingClientRect();
}

export function getObstacleSize(){
    const left = getObstaclePosition(obstaclesArray[0].obstacles).left;
    const right = getObstaclePosition(obstaclesArray[0].obstacles).right;
    return left-right;
}

function removeObstacles(){
    for(let i=0; i<obstaclesArray.length; i++){
        if(getObstaclePosition(obstaclesArray[i].obstacles).right < 0){
            obstaclesArray[i].obstacles.remove();
            obstaclesArray.splice(i, 1);
            i--;
            score.score += 1;
        }
    }

}

function setObstaclePosition(obstacle, value){
    obstacle.style.setProperty('right', `${value}px`);
}


function setObstacleTopHeight(obstacle, value){
    obstacle.style.setProperty('--obstacle-top-height', value);
}



function getObstacleRight(obstacle){
    return parseFloat(getComputedStyle(obstacle).right);
    
}


function randomNum(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

