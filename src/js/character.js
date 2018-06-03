import {loadImage} from "./utils";

class Character {

    constructor(person, charX, charY, path) {
        this.index = 0;
        this.personSize = person.length;
        this.person = person.map((value, index) => {
                index++;
                return loadImage(value,path);
            }
        );
        this.charX = charX;
        this.charY = charY;
    }

    set(field, func, time) {
        if(this.index === this.personSize){
            this[field].onload = setInterval(func, time);
        }
    }
}


export {Character}



