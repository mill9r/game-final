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
        this.breathAmt = 0;
        this.breathDirection = 1;
    }

    set(field, func,args, time) {
        //TODO how it's works?
        if(this.index === this.personSize){
            this[field].onload = setInterval(func.bind(null,...args), time);
        }
    }
}


export {Character}



