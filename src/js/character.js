import {loadImage} from "./utils";

class Character {

    constructor(leftArm, legs, torso, rightArm, head, hair, charX, charY) {
        this.leftArm = loadImage(leftArm);
        this.legs = loadImage(legs);
        this.torso = loadImage(torso);
        this.rightArm = loadImage(rightArm);
        this.head = loadImage(head);
        this.hair = loadImage(hair);
        this.charX = charX;
        this.charY = charY;
    }
}


export {Character}



