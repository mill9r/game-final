export const loadImage = (name, path) => {
    const img = new Image();
    img.src = `./src/${path}/${name}.png`;
    return [img, name];
};

export const addCanvas = (canvasId, width, height, div) => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', canvasId);
    const canvasDiv = document.getElementById(div);
    canvasDiv.appendChild(canvas);
    return canvas;
};

export const redrawCharacter = (obj, position, context, clearArea, eyes) => {
    clearCanvas(context, ...clearArea);
    console.log('Obj', obj);
    console.log('Sketch', obj.getSketchedObject());
    obj.getSketchedObject().completeObject.forEach((value, i) => {
        if (value[1].includes('torso') || value[1].includes('legs')) {
            context.drawImage(value[0], obj.getSketchedObject().charX + position[i][0], obj.getSketchedObject().charY + position[i][1]);
        } else {
            breath(obj);
            context.drawImage(value[0], obj.getSketchedObject().charX + position[i][0], obj.getSketchedObject().charY + position[i][1] - obj.getBreathAmt());
        }
    });
    if (eyes !== undefined) {
        drawEyes(obj.getSketchedObject().charX + eyes['xPos'], obj.getSketchedObject().charY - eyes['yPos'] - obj.getBreathAmt(), obj.getEyesWidth(), obj.getEyesHeight(), context); // Left Eye
        drawEyes(obj.getSketchedObject().charX + eyes['xPos'] + obj.getEyesShift(), obj.getSketchedObject().charY - eyes['yPos'] - obj.getBreathAmt(), obj.getEyesWidth(), obj.getEyesHeight(), context); // Right Eye
    }

};

const checkResult = (movementPoint, movementToPosition, direction) => {
    if (direction === 'negative') {
        return movementPoint > movementToPosition;
    }
    if (direction === 'positive') {
        return movementPoint < movementToPosition;
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

export const animateObject = (ctx, obj, dx, dy, width, height, subtract, explosion, incr, moveAxe, movementToPosition, direction) => {
    ctx.clearRect(dx - subtract, dy - subtract, width + subtract, height + subtract);  // clear canvas
    ctx.drawImage(obj.object[0][0], dx, dy);                                          // draw image at current position
    let movementPoint = moveAxe === 'dx' ? dx += incr : dy += incr;
    if (checkResult(movementPoint, movementToPosition, direction)) {
        requestAnimationFrame(animateObject.bind(null, ctx, obj, dx, dy, width, height, subtract, explosion, incr, moveAxe, movementToPosition, direction))  // loop
    } else {
        ctx.clearRect(dx - subtract, dy - subtract, width + subtract, height + subtract);
        makeExplosion(ctx, explosion, dx, dy, explosion.object[0][0].width, explosion.object[0][0].height)
    }
    return true;
};

const makeExplosion = (ctx, obj, dx, dy, width, height) => {
    const MULTIPLIER = 100;
    for (let i = 0; i < obj.object.length; i++) {
        setTimeout(createImage.bind(null, ctx, obj.object[i][0], dx, dy, width, height, MULTIPLIER * i), MULTIPLIER * i);
    }
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
    return zombieName.join(' ');
};

export const fillHeroLive = (name, healthAmount, heroNameId, heroId, heroHealthId) => {
    setNameAndLifeForPerson(name, healthAmount, heroNameId, heroId, heroHealthId)
};


const createImage = (ctx, img, dx, dy, width, height, time) => {
    ctx.drawImage(img, dx, dy);
    setTimeout(clearCanvas.bind(null, ctx, dx, dy, width, height), time);
};

const BACKGROUND_COLOR = 'antiquewhite';
export const clearCanvas = (ctx, xPos, yPos, width, height) => {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(xPos, yPos, width, height);
};


export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};


const POSITIVE_BREATH_DIRECTION = 1;
const NEGATIVE_BREATH_DIRECTION = -1;
const MAX_BREATH = 2;
const BREATH_INCREMENT = 0.05;
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


const EYES_COLOR = 'black';
const EYES_SIZE_DIVIDER = 2;

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
