import {Character} from "./character";
import {redraw, addCanvas} from "./utils";


const fps = 30;
const milliseconds = 1000;
const hero = ['leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair'];
const heroEyes = {'left':47,'right':68};
const person = new Character(hero, 245, 185, 'img');
const position = [[40, -42], [0, 0], [0, -50], [-15, -42], [-10, -125], [-37, -138]];
const gameField = 'gameField';
const heroId = 'canvasHero';
const heroContainer = addCanvas(heroId, 490, 270, gameField);
setInterval(redraw.bind(null, person, position, heroContainer,heroEyes), milliseconds / fps);
//TODO try to use class
// person.set('hair',redraw, [person, position,'canvasHero', 490, 270,'canvasDiv'],milliseconds / fps);

const zombiePosition = [[-10,-42],[0,0],[25,-50],[20,-42],[-10,-125]];
const zombie = ['leftArm', 'legs', 'torso', 'rightArm', 'head'];
const zombieEyes = {'left':10,'right':68};
const zombiePerson = new Character(zombie, 245, 185,'img/zombie');
const zombieId = 'canvasZombie';
const zombieContainer = addCanvas(zombieId, 490, 270, gameField);
setInterval(redraw.bind(null, zombiePerson, zombiePosition, zombieContainer,zombieEyes), milliseconds / fps);
// zombiePerson.set('head',redraw(zombiePerson,zombiePosition,'canvasZombie',490,270,'canvasDiv'),1000/fps);


var Ball = function() {

    var x = 0,
        y = 0,
        speed = 0,
        direction = 1,
        rollTimer,
        dirty = false,
        diameter = 20,
        color = "#DD3333",
        highlightColor = "#fa6565";

    rollTimer = setInterval(updateRoll, 1000/25);

    function roll(pSpeed, pDirection){
        speed = pSpeed;
        if(pDirection){
            direction = pDirection;
        }

    }
    function stop() {
        speed = 0;
    }
    function updateRoll() {
        x += direction * speed;
    }
    function draw(context) {

        var centerX = x,
            centerY = y + (diameter + 10)/2 - 2,
            width = (diameter + 30),
            height = 6;

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.bezierCurveTo(centerX-width/2,centerY-height/2,
            centerX-width/2,centerY+height/2,
            centerX,centerY+height/2);
        context.bezierCurveTo(centerX+width/2,centerY+height/2,
            centerX+width/2,centerY-height/2,
            centerX,centerY-height/2);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(x, y - (diameter + 10)/2);
        context.arc(x,y,(diameter + 10)/2,0,2*Math.PI,false);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(x, y - diameter/2);
        context.arc(x,y,diameter/2,0,2*Math.PI,false);
        context.fillStyle = color;
        context.fill();
        context.closePath();

        centerX = x + 3;
        centerY = y - 3;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX,centerY,diameter/3/2,0,2*Math.PI,false);
        context.fillStyle = highlightColor;
        context.fill();
        context.closePath();
    }
    function getX(){
        return x;
    }
    function setX(pX){
        x = pX;
    }
    function getY(){
        return y;
    }
    function setY(pY){
        y = pY;
    }
    return {
        getX:getX,
        setX:setX,
        getY:getY,
        setY:setY,
        roll:roll,
        draw:draw,
        stop:stop
    };
}

var canvasWidth = 490, canvasHeight = 220;

var ball = new Ball();
ball.setX(canvasWidth);
ball.setY(200);
ball.roll(speed, -1);
displayList.push(ball);