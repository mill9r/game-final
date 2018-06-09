import {SketchedObject} from "./sketchedObject";
import {redrawCharacter, addCanvas, clearCanvas, isCanvasSupported, getRandomInt, drawMagic} from "./utils";

const _ = require('lodash');

// alert('Is canvas supported? ' + isCanvasSupported());

const fps = 30;
const fieldWidth = 1000;
const fieldHeight = 800;
const highFPS = 35;
const milliseconds = 1000;
const hero = ['leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair'];
const heroEyes = {'xPox': 59, 'yPos': 25};
const person = new SketchedObject(hero, 290, 460, 'img');
const position = [[40, 8], [0, 50], [0, 0], [-12, -3], [0, -80], [-28, -96]];
const clearHeroArea = [260, 360, 135, 180];
const gameField = 'gameField';
const heroId = 'canvasHero';
const gameContainer = addCanvas(heroId, fieldWidth, fieldHeight, gameField);
setInterval(redrawCharacter.bind(null, person, position, gameContainer, clearHeroArea, heroEyes), milliseconds / fps);

const zombiePosition = [[-40, 8], [-25, 50], [0, 0], [-1, 2], [-30, -80]];
const zombie = ['leftArm', 'legs', 'torso', 'rightArm', 'head'];
const clearZombiArea = [638, 360, 135, 180];
// const zombieEyes = {'xPox':-3, 'yPos': 25};
const zombiePerson = new SketchedObject(zombie, 686, 460, 'img/zombie');
setInterval(redrawCharacter.bind(null, zombiePerson, zombiePosition, gameContainer, clearZombiArea), milliseconds / fps);


const lightning = ['lightning_1', 'lightning_2', 'lightning_3'];
const light = new SketchedObject(lightning, 680, 270, 'img/magic');
const clearLightningArea = [680,270,50,100];
const lightningPosition = [0, 0];
setInterval(drawMagic.bind(null, light, gameContainer, lightningPosition,clearLightningArea), milliseconds / fps);


function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var context = gameContainer.getContext('2d');

gameContainer.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(gameContainer, evt);
    var message = 'Mouse position: x = ' + Math.round(mousePos.x) + ', y = ' + Math.round(mousePos.y);
    writeMessage(gameContainer, message);
}, false);
