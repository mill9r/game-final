import {Character} from "./character"

class Hero extends Character {
    constructor(gameHeroNameId, gameHeroId, gameHeroHealthId, eyesWidth, eyesHeight, eyesShift, eyeXPosition, eyeYPosition) {
        super(gameHeroNameId, gameHeroId, gameHeroHealthId);
        this.eyesWidth = eyesWidth;
        this.eyesHeight = eyesHeight;
        this.eyesShift = eyesShift;
        this.eyeXPosition = eyeXPosition;
        this.eyeYPosition = eyeYPosition;
    }

    getEyesWidth() {
        return this.eyesWidth;
    }

    getEyesHeight() {
        return this.eyesHeight;
    }

    getEyesShift() {
        return this.eyesShift;
    }

    getEyeXPosition() {
        return this.eyeXPosition;
    }

    getEyeYPosition() {
        return this.eyeYPosition;
    }

    getClassName() {
        return 'Hero';
    }
};

export {Hero}