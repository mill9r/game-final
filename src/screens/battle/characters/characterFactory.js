import {Character} from "./character";
import {getRandomInt} from "../helper";
import {Hero} from "./hero";

const PATH_TO_ZOMBIE_IMG = '../screens/images/zombie';
const START_X_POSITION_ZOMBIE = 840;
const START_Y_POSITION_ZOMBIE = 460;
const ZOMBIE_HTML_PAGE_NAME_ID = 'zombieName';
const ZOMBIE_HTML_PAGE_HEALTH_LINE_ID = 'zombie';
const ZOMBIE_HTML_PAGE_HEALTH_AMOUNT_ID = 'zombieHealth';
const ZOMBIE_PARTS_RANGE = 3;

const PATH_TO_HERO_IMG = '../screens/images';
const START_X_POSITION_HERO = 100;
const START_Y_POSITION_HERO = 460;
const HERO_HTML_PAGE_NAME_ID = 'heroName';
const HERO_HTML_PAGE_HEALTH_LINE_ID = 'hero';
const HERO_HTML_PAGE_HEALTH_AMOUNT_ID = 'heroHealth';
const HERO_EYE_X_POSITION = 59;
const HERO_EYE_Y_POSITION = 25;
const HERO_EYES_WIDTH = 8;
const HERO_EYES_HEIGHT = 14;
const HERO_EYES_SHIFT = 10;

class characterFactory {
    create(type) {
        if (type === 'zombie') {
            const zombieParts = ['leftArm', 'legs', 'torso', 'rightArm', 'weapon', 'head'];
            zombieParts.forEach((value, i) => {
                if (value !== 'leftArm' && value !== 'rightArm') {
                    zombieParts[i] = value + getRandomInt(ZOMBIE_PARTS_RANGE)
                }
            });
            const zombieCharacter = new Character(ZOMBIE_HTML_PAGE_NAME_ID, ZOMBIE_HTML_PAGE_HEALTH_LINE_ID, ZOMBIE_HTML_PAGE_HEALTH_AMOUNT_ID);
            zombieCharacter.setSketchedObject(zombieParts, START_X_POSITION_ZOMBIE, START_Y_POSITION_ZOMBIE, PATH_TO_ZOMBIE_IMG);
            return zombieCharacter;
        }
        if (type === 'hero') {
            const heroParts = ['leftArm', 'legs', 'torso', 'weapon', 'rightArm', 'head', 'hair',];
            const person = new Hero(HERO_HTML_PAGE_NAME_ID, HERO_HTML_PAGE_HEALTH_LINE_ID, HERO_HTML_PAGE_HEALTH_AMOUNT_ID, HERO_EYES_WIDTH, HERO_EYES_HEIGHT, HERO_EYES_SHIFT, HERO_EYE_X_POSITION, HERO_EYE_Y_POSITION);
            person.setSketchedObject(heroParts, START_X_POSITION_HERO, START_Y_POSITION_HERO, PATH_TO_HERO_IMG);
            return person;
        }
    }
}

export {characterFactory}