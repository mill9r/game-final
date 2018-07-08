import {loadImage} from "../helper";

class SketchedObject {
    constructor(objectParticles, charX, charY, path) {
        this.index = 0;
        this.objSize = objectParticles.length;
        this.completeObject = objectParticles.map((value, index) => {
                index++;
                return loadImage(value, path);
            }
        );
        this.charX = charX;
        this.charY = charY;
    }

    setPosition(xPoint, yPoint) {
        this.charX = xPoint;
        this.charY = yPoint;
    }

    getObject() {
        return this.completeObject;
    }

    getCharX() {
        return this.charX;
    }

    getCharY() {
        return this.charY;
    }

}


export {SketchedObject}



