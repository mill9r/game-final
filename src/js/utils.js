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

export const redraw = (obj, position, canvas, eyes) => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    //TODO use lodash foreach(zip)
    obj.person.forEach((value, i) => {
        if (value[1] === 'torso' || value[1] === 'legs') {
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1]);
        } else {
            breath(obj);
            context.drawImage(value[0], obj.charX + position[i][0], obj.charY + position[i][1] - obj.breathAmt);
        }
    });
    drawEyes(obj.charX + eyes['left'], obj.charY - eyes['right'] - obj.breathAmt, 8, 14, context); // Left Eye
    drawEyes(obj.charX + eyes['left'] + 10, obj.charY - eyes['right'] - obj.breathAmt, 8, 14, context); // Right Eye
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