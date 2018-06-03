export const loadImage = (name,path) => {
    const img = new Image();
    img.src = `./src/${path}/${name}.png`;
    return img;
};

export const redraw = (obj,position, canvasId, width, height) => {
    const canvas = document.createElement(canvasId);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', canvasId);
    const canvasDiv = document.getElementById('canvasDiv');
    canvasDiv.appendChild(canvas);
    const context = document.getElementById(canvasId).getContext('2d');
    //TODO use lodash foreach(zip)
    obj.person.forEach((value,i) => {
        context.drawImage(value,obj.charX + position[i][0],obj.charY+ position[i][1]);
    });
};