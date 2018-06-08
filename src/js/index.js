import {Character} from "./character";
import {redraw} from "./utils";

const fps = 30;
const hero = ['leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair'];
const person = new Character(hero, 245, 185,'img');
const position = [[40,-42],[0,0],[0,-50],[-15,-42],[-10,-125],[-37,-138]];
person.set('hair',redraw(person, position,'canvasHero', 490, 270,'canvasDiv'),1000 / fps);

const zombiePosition = [[-10,-42],[0,0],[25,-50],[20,-42],[-10,-125]];
const zombie = ['leftArm', 'legs', 'torso', 'rightArm', 'head'];
const zombiePerson = new Character(zombie, 245, 185,'img/zombie');
zombiePerson.set('head',redraw(zombiePerson,zombiePosition,'canvasZombie',490,270,'canvasDiv'),1000/fps);