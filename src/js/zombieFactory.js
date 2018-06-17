import {SketchedObject} from "./sketchedObject";
import {getRandomInt} from "./utils";

class ZombieFactory {
    create() {
        const zombie = ['leftArm', 'legs', 'torso', 'rightArm', 'weapon', 'head'];
        zombie.forEach((value, i) => {
            if (value !== 'leftArm' && value !== 'rightArm') {
                zombie[i] = value + getRandomInt(3)
            }
        });
        return new SketchedObject(zombie, 0, 0, 'img/zombie');
    }
}
export {ZombieFactory}