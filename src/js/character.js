import {loadImage} from "./utils";

class Character {

    constructor(leftArm, legs, torso, rightArm, head, hair, charX, charY,path) {
        this.leftArm = loadImage(leftArm,path);
        this.legs = loadImage(legs,path);
        this.torso = loadImage(torso,path);
        this.rightArm = loadImage(rightArm,path);
        this.head = loadImage(head,path);
        this.hair = loadImage(hair,path);
        this.charX = charX;
        this.charY = charY;
    }

    set(field,func,time) {
        this[field].onload = setInterval(func,time);
    }
}


export {Character}



