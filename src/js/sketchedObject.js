import {loadImage} from "./utils";

class SketchedObject {
    constructor(object, charX, charY, path) {
        this.index = 0;
        this.objSize = object.length;
        this.object = object.map((value, index) => {
                index++;
                return loadImage(value, path);
            }
        );
        this.charX = charX;
        this.charY = charY;
        this.breathAmt = 0;
        this.breathDirection = 1;
    }

    set(xPoint, yPoint) {
        this.charX = xPoint;
        this.charY = yPoint;
    }
}


export {SketchedObject}



