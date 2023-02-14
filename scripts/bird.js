const bird = document.getElementById('bird')

const BIRD_VELOCITY = 0.5;

const flyUpDuration = 100 ;
let flyDown = 100000; // good amount of high value, by default bird fly down

export function updateBird(delta){
    if(flyDown  < flyUpDuration){
        setTop(getTop() - BIRD_VELOCITY*delta);
    }else{
        setTop(getTop() + BIRD_VELOCITY*delta);
    }   
    flyDown += delta;
}
 
export function birdSpawn(){
    setTop(innerHeight/2);
}

export function flyUp(evt){
    if(evt.code != 'Space')return; 
    flyDown = 0;
}

export function birdPosition(){
    return bird.getBoundingClientRect();
}

export function getBirdSize(){
    return parseFloat(getComputedStyle(bird).getPropertyValue('--bird-size'));
}

export function getTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue('top'));
}

export function setTop(top){
    bird.style.setProperty('--bird-velocity', top);
}
