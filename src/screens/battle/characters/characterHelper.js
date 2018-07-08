import {getRandomInt,clearCanvas} from "../helper";

const _ = require('lodash');

const POSITIVE_BREATH_DIRECTION = 1;
const NEGATIVE_BREATH_DIRECTION = -1;
const MAX_BREATH = 2;
const BREATH_INCREMENT = 0.05;
const EYES_COLOR = 'black';
const EYES_SIZE_DIVIDER = 2;

export const redrawCharacter = (obj, position, context, clearArea, eyes) => {
    clearCanvas(context, ...clearArea);
    obj.getSketchedObject().getObject().forEach((value, i) => {
        if (value[1].includes('torso') || value[1].includes('legs')) {
            context.drawImage(value[0], obj.getSketchedObject().charX + position[i][0], obj.getSketchedObject().charY + position[i][1]);
        } else {
            breath(obj);
            context.drawImage(value[0], obj.getSketchedObject().charX + position[i][0], obj.getSketchedObject().charY + position[i][1] - obj.getBreathAmt());
        }
    });
    if (obj.getClassName() === 'Hero') {
        drawEyes(obj.getSketchedObject().charX + obj.getEyeXPosition(), obj.getSketchedObject().charY - obj.getEyeYPosition() - obj.getBreathAmt(), obj.getEyesWidth(), obj.getEyesHeight(), context); // Left Eye
        drawEyes(obj.getSketchedObject().charX + obj.getEyeXPosition() + obj.getEyesShift(), obj.getSketchedObject().charY - obj.getEyeYPosition() - obj.getBreathAmt(), obj.getEyesWidth(), obj.getEyesHeight(), context); // Right Eye
    }

};

export const subtractHealth = (element, currentValue, subTrck, person, secondIdPart) => {
    const value = document.getElementById(person + secondIdPart);
    currentValue -= subTrck;
    value.innerHTML = currentValue;
    element.style.width = currentValue + '%';
    return currentValue;
};

export const getCurrentHealth = person => {
    const value = document.getElementById(person);
    const width = value.style.width.replace('%', '');
    return Number(width);
};

export const revertPerson = name => {
    const revertedName = {'zombie': 'hero', 'hero': 'zombie'};
    return revertedName[name];
};


export const setNameAndLifeForPerson = (name, healthAmount, heroNameId, heroId, heroHealthId) => {
    const heroName = document.getElementById(heroNameId);
    heroName.innerHTML = name;
    const heroHealthLine = document.getElementById(heroId);
    heroHealthLine.style.width = healthAmount + '%';
    const heroHealth = document.getElementById(heroHealthId);
    heroHealth.innerHTML = healthAmount;
};

export const fillZombieLive = (healthAmount, zombieNameAdj, zombieNameType, zombieNameList, nameRange, zombieNameId, zombieId, zombieHealthId) => {
    const zombieName = createNewZombieName(nameRange, zombieNameAdj, zombieNameType, zombieNameList);
    setNameAndLifeForPerson(zombieName, healthAmount, zombieNameId, zombieId, zombieHealthId)

};

const createNewZombieName = (range, zombieNameAdj, zombieNameType, zombieNameList) => {
    const zombieName = _.concat(zombieNameAdj[getRandomInt(range)], zombieNameType[getRandomInt(range)], zombieNameList[getRandomInt(range)]);
    return '' + zombieName.join(' ');
};

export const fillHeroLive = (name, healthAmount, heroNameId, heroId, heroHealthId) => {
    setNameAndLifeForPerson(name, healthAmount, heroNameId, heroId, heroHealthId)
};

const breath = (obj) => {
    if (obj.breathDirection === POSITIVE_BREATH_DIRECTION) {
        obj.breathAmt -= BREATH_INCREMENT;
        if (obj.breathAmt < -MAX_BREATH) {
            obj.breathDirection = NEGATIVE_BREATH_DIRECTION;
        }
    } else {
        obj.breathAmt += BREATH_INCREMENT;
        if (obj.breathAmt > MAX_BREATH) {
            obj.breathDirection = POSITIVE_BREATH_DIRECTION;
        }
    }
};

const drawEyes = (centerX, centerY, width, height, context) => {

    context.beginPath();

    context.moveTo(centerX, centerY - height / EYES_SIZE_DIVIDER);

    context.bezierCurveTo(
        centerX + width / EYES_SIZE_DIVIDER, centerY - height / EYES_SIZE_DIVIDER,
        centerX + width / EYES_SIZE_DIVIDER, centerY + height / EYES_SIZE_DIVIDER,
        centerX, centerY + height / EYES_SIZE_DIVIDER);

    context.bezierCurveTo(
        centerX - width / EYES_SIZE_DIVIDER, centerY + height / EYES_SIZE_DIVIDER,
        centerX - width / EYES_SIZE_DIVIDER, centerY - height / EYES_SIZE_DIVIDER,
        centerX, centerY - height / EYES_SIZE_DIVIDER);

    context.fillStyle = EYES_COLOR;
    context.fill();
    context.closePath();
};