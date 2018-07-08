const BACKGROUND_COLOR = 'antiquewhite';

export const createImage = (ctx, img, dx, dy, width, height, time) => {
    ctx.drawImage(img, dx, dy);
    setTimeout(clearCanvas.bind(null, ctx, dx, dy, width, height), time);
};

export const clearCanvas = (ctx, xPos, yPos, width, height) => {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(xPos, yPos, width, height);
};

export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const loadImage = (name, path) => {
    const img = new Image();
    img.src = `./src/${path}/${name}.png`;
    console.log(img.src);
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