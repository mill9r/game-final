import {SketchedObject} from "./sketchedObject";


class Character {
    constructor(gameHeroNameId, gameHeroId, gameHeroHealthId) {
        this.gameZombieNameId = gameHeroNameId;
        this.gameZombieId = gameHeroId;
        this.gameZombieHealthId = gameHeroHealthId;
        this.breathAmt = 0;
        this.breathDirection = 1;
    }

    getZombieName() {
        return this.gameZombieNameId;
    }

    getZombieId() {
        return this.gameZombieId;
    }

    getZombieHealth() {
        return this.gameZombieHealthId;
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