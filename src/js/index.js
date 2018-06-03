import {Character} from "./character";

const person = new Character('leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair', 245, 185);
person.redraw();
const redr = () => {
    setInterval(redraw,1000 / fps)
};