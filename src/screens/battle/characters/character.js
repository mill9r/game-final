import {SketchedObject} from "./sketchedObject";


class Character {
    constructor(gameHeroNameId, gameHeroId, gameHeroHealthId) {
        this.gameHeroNameId = gameHeroNameId;
        this.gameHeroId = gameHeroId;
        this.gameHeroHealthId = gameHeroHealthId;
        this.breathAmt = 0;
        this.breathDirection = 1;
    }

    getGameHeroNameId() {
        return this.gameHeroNameId;
    }

    getGameHeroId() {
        return this.gameHeroId;
    }

    getGameHeroHealthId() {
        return this.gameHeroHealthId;
    }

    getBreathAmt() {
        return this.breathAmt;
    }

    getBreathDirection() {
        return this.breathDirection;
    }

    setSketchedObject(objectParticles, charX, charY, path) {
        this.sketchedObject = new SketchedObject(objectParticles, charX, charY, path);
    }

    getSketchedObject() {
        return this.sketchedObject;
    }
}

export {Character}