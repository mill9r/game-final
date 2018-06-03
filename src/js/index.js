import {Character} from "./character";
import {redraw} from "./utils";

const fps = 30;
const body = ['leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair'];
const person = new Character(body, 245, 185,'img');
const position = [[40,-42],[0,0],[0,-50],[-15,-42],[-10,-125],[-37,-138]];
person.set('hair',redraw(person, position,'canvas', 490, 270),1000 / fps);
