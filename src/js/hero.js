import {Character} from "./character"

class Hero extends Character {
    constructor(gameHeroNameId, gameHeroId, gameHeroHealthId, eyesWidth, eyesHeight, eyesShift) {
        super(gameHeroNameId, gameHeroId, gameHeroHealthId);
        this.eyesWidth = eyesWidth;
        this.eyesHeight = eyesHeight;
        this.eyesShift = eyesShift;
    }

    getEyesWidth() {
        return this.eyesWidth
    }

    getEyesHeight() {
        return this.eyesHeight;
    }

    getEyesShift() {
        return this.eyesShift;
    }
};

export {Hero}