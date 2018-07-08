import {SketchedObject} from "./sketchedObject";

const START_X_POSITION = 0;
const START_Y_POSITION = 0;
const PATH_TO_FOLDER_WITH_MAGIC = 'img/magic_zombie';

class MagicFactory {
    create(type) {
        if (type === 'stone') {
            const stone = ['stone0'];
            const stoneObj = new SketchedObject(stone, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);

            const stoneExplosion = ['stone1', 'stone2', 'stone3', 'stone4'];
            const stoneExplosionObj = new SketchedObject(stoneExplosion, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);
            return [stoneObj, stoneExplosionObj]
        }
        if (type === 'blackStone') {
            const blackStone = ['black_stone0'];
            const blackStoneObj = new SketchedObject(blackStone, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);

            const blackStoneExplosion = ['black_stone1', 'black_stone2', 'black_stone3', 'black_stone4'];
            const blackStoneExplosionObj = new SketchedObject(blackStoneExplosion, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);
            return [blackStoneObj, blackStoneExplosionObj]

        }
        if (type === 'fire') {
            const fire = ['fire0'];
            const fireObj = new SketchedObject(fire, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);

            const fireExplosion = ['fire1', 'fire2', 'fire3', 'fire4', 'fire5', 'fire6'];
            const fireExplosionObj = new SketchedObject(fireExplosion, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);
            return [fireObj, fireExplosionObj]

        }
        if (type === 'fireFist') {
            const fireFist = ['fire_fist0'];
            const fireFistObj = new SketchedObject(fireFist, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);

            const fireFistExplosion = ['fire_fist1', 'fire_fist2', 'fire_fist3', 'fire_fist4'];
            const fireFistExplosionObj = new SketchedObject(fireFistExplosion, START_X_POSITION, START_Y_POSITION, PATH_TO_FOLDER_WITH_MAGIC);
            return [fireFistObj, fireFistExplosionObj]
        }
    }
}

export {MagicFactory}