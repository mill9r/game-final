export const loadImage = (name,path) => {
    const img = new Image();
    img.src = `./src/${path}/${name}.png`;
    console.log(img.src);
    return img;
};

export const redraw = (obj,position, canvasId, width, height,div) => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', canvasId);
    const canvasDiv = document.getElementById(div);
    canvasDiv.appendChild(canvas);
    const context = document.getElementById(canvasId).getContext('2d');
    //TODO use lodash foreach(zip)
    obj.person.forEach((value,i) => {
        context.drawImage(value,obj.charX + position[i][0],obj.charY+ position[i][1]);
    });
};