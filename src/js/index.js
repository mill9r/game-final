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
