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

export const redrawCharacter = (obj, position, canvas, clearArea, eyes) => {
    const context = canvas.getContext('2d');
    clearCanvas(canvas, ...clearArea);
    obj.person.forEach((value, i) => {
        if (value[1] === 'torso' || value[1] === 'legs') {
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1]);
        } else {
            breath(obj);
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1] - obj.breathAmt);
        }
    });
    if (eyes !== undefined) {
        drawEyes(obj.charX + eyes['xPox'], obj.charY - eyes['yPos'] - obj.breathAmt, 8, 14, context); // Left Eye
        drawEyes(obj.charX + eyes['xPox'] + 10, obj.charY - eyes['yPos'] - obj.breathAmt, 8, 14, context); // Right Eye
    }

};

export const drawMagic = (obj, canvas, position, clearArea) => {
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas, ...clearArea);
    ctx.drawImage(obj.person[getRandomInt(obj.person.length)][0], obj.charX + position[0], obj.charY + position[1]);
};

export const clearCanvas = (canvas, xPos, yPos, width, height) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
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