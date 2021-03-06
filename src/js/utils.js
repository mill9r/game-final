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
    obj.object.forEach((value, i) => {
        if (value[1].includes('torso') || value[1].includes('legs')) {
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1]);
        } else {
            breath(obj);
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1] - obj.breathAmt);
        }
    });
    if (eyes !== undefined) {
        drawEyes(obj.charX + eyes['xPos'], obj.charY - eyes['yPos'] - obj.breathAmt, 8, 14, context); // Left Eye
        drawEyes(obj.charX + eyes['xPos'] + 10, obj.charY - eyes['yPos'] - obj.breathAmt, 8, 14, context); // Right Eye
    }

};

export const drawMagic = (ctx, canvas) => {
    clearCanvas(canvas, obj.charX, obj.charY, obj.object[0][0].width, obj.object[0][0].height);
    ctx.drawImage(obj.object[getRandomInt(obj.object.length)][0], obj.charX, obj.charY);
};

const checkResult = (movementPoint, movementToPosition, direction) => {
    if (direction === 'negative') {
        return movementPoint > movementToPosition;
    }
    if (direction === 'positive') {
        return movementPoint < movementToPosition;
    }
};

export const subtractHealth = (element, currentValue, subTrck, person) => {
    const secondIdPart = 'Health';
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
    const size = 90;
    width = size;
    height = size;
    ctx.clearRect(dx - subtract, dy - subtract, width + subtract, height + subtract);  // clear canvas
    ctx.drawImage(obj.object[0][0], dx, dy);                                          // draw image at current position
    let movementPoint = moveAxe === 'dx' ? dx += incr : dy += incr;
    if (checkResult(movementPoint, movementToPosition, direction)) {
        requestAnimationFrame(animateObject.bind(null, ctx, obj, dx, dy, width, height, subtract, explosion, incr, moveAxe, movementToPosition, direction))  // loop
    } else {
        ctx.clearRect(dx-subtract, dy-subtract, width + subtract, height + subtract);
        makeExplosion(ctx, explosion, dx, dy, explosion.object[0][0].width, explosion.object[0][0].height)
    }
    return true;
};

const makeExplosion = (ctx, obj, dx, dy, width, height) => {
    for (let i = 0; i < obj.object.length; i++) {
        setTimeout(createImage.bind(null, ctx, obj.object[i][0], dx, dy, width, height, 100 * i), 100 * i);
    }
};

export const fillZombieLive = (healtAmount, zombieNameAdj, zombieNameType, zombieNameList) => {
    const nameRange = 5;
    const zombieNameId = document.getElementById("zombieName");
    const zombieName = _.concat(zombieNameAdj[getRandomInt(nameRange)], zombieNameType[getRandomInt(nameRange)], zombieNameList[getRandomInt(nameRange)]);
    zombieNameId.innerHTML = zombieName.join(' ');
    const zombieHealthLine = document.getElementById('zombie');
    zombieHealthLine.style.width = healtAmount + '%';
    const zombieHealth = document.getElementById('zombieHealth');
    zombieHealth.innerHTML = healtAmount;
};

export const fillHeroLive = (name, healthAmount) => {
    const heroName = document.getElementById("heroName");
    heroName.innerHTML = name;
    const heroHealthLine = document.getElementById('hero');
    heroHealthLine.style.width = healthAmount + '%';
    const heroHealth = document.getElementById('heroHealth');
    heroHealth.innerHTML = healthAmount;
};

const createImage = (ctx, img, dx, dy, width, height, time) => {
    ctx.drawImage(img, dx, dy);
    setTimeout(clearCanvas.bind(null, ctx, dx, dy, width, height), time);
};

export const clearCanvas = (ctx, xPos, yPos, width, height) => {
    ctx.fillStyle = 'antiquewhite';
    ctx.fillRect(xPos, yPos, width, height);
};

export const isCanvasSupported = function () {
    const elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
};

export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

const breath = (obj) => {
    const breathMax = 2;
    const breathInc = 0.05;
    if (obj.breathDirection === 1) {
        obj.breathAmt -= breathInc;
        if (obj.breathAmt < -breathMax) {
            obj.breathDirection = -1;
        }
    } else {
        obj.breathAmt += breathInc;
        if (obj.breathAmt > breathMax) {
            obj.breathDirection = 1;
        }
    }
};

const drawEyes = (centerX, centerY, width, height, context) => {

    context.beginPath();

    context.moveTo(centerX, centerY - height / 2);

    context.bezierCurveTo(
        centerX + width / 2, centerY - height / 2,
        centerX + width / 2, centerY + height / 2,
        centerX, centerY + height / 2);

    context.bezierCurveTo(
        centerX - width / 2, centerY + height / 2,
        centerX - width / 2, centerY - height / 2,
        centerX, centerY - height / 2);

    context.fillStyle = "black";
    context.fill();
    context.closePath();
};

const addBorder = (ctx, dx, dy, img) => {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(dx, dy, img.width, img.height);
};


export const writeMessage = (canvas, message) => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
};

export const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};


const sleep = ms => {
    ms += new Date().getTime();
    while (new Date() < ms) {
    }
};