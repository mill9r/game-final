export const loadImage = (name,path) => {
    const img = new Image();
    img.src = `./src/${path}/${name}.png`;
    return img;
};

export const redraw = (obj, canvasId, width, height) => {
    const canvas = document.createElement('canvasId');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', canvasId);
    const canvasDiv = document.getElementById('canvasDiv');
    canvasDiv.appendChild(canvas);
    const context = document.getElementById(canvasId).getContext('2d');
    context.drawImage(obj.leftArm, obj.charX + 40, obj.charY - 42);
    context.drawImage(obj.legs, obj.charX, obj.charY);
    context.drawImage(obj.torso, obj.charX, obj.charY - 50);
    context.drawImage(obj.rightArm, obj.charX - 15, obj.charY - 42);
    context.drawImage(obj.head, obj.charX - 10, obj.charY - 125);
    context.drawImage(obj.hair, obj.charX - 37, obj.charY - 138);
};