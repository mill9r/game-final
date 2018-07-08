import {Character} from "./character";
import {getRandomInt} from "./utils";

const PATH_TO_ZOMBIE_IMG = 'img/zombie';
const START_X_POSITION = 840;
const START_Y_POSITION = 460;
const ZOMBIE_HTML_PAGE_NAME_ID = 'zombieName';
const ZOMBIE_HTML_PAGE_HEALTH_LINE_ID = 'zombie';
const ZOMBIE_HTML_PAGE_HEALTH_AMOUNT_ID = 'zombieHealth';

class ZombieFactory {
    create() {
        const zombie = ['leftArm', 'legs', 'torso', 'rightArm', 'weapon', 'head'];
        zombie.forEach((value, i) => {
            if (value !== 'leftArm' && value !== 'rightArm') {
                zombie[i] = value + getRandomInt(3)
            }
        });
        return new Character(zombie, START_X_POSITION, START_Y_POSITION, PATH_TO_ZOMBIE_IMG, ZOMBIE_HTML_PAGE_NAME_ID, ZOMBIE_HTML_PAGE_HEALTH_LINE_ID, ZOMBIE_HTML_PAGE_HEALTH_AMOUNT_ID);
    }
}

export {ZombieFactory}