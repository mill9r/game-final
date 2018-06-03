import {Character} from "./character";
import {redraw} from "./utils";

const fps = 30;
const person = new Character('leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair', 245, 185,'img');
person.set('hair',redraw(person, 'canvas', 490, 270),1000 / fps);
