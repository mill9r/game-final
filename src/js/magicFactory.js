import {SketchedObject} from "./sketchedObject";

class MagicFactory {
    create(type) {
        if (type === 'stone') {
            const stone = ['stone0'];
            const stoneObj = new SketchedObject(stone, 0, 0, 'img/magic_zombie');

            const stoneExplosion = ['stone1', 'stone2', 'stone3', 'stone4'];
            const stoneExplosionObj = new SketchedObject(stoneExplosion, 0, 0, 'img/magic_zombie');
            return [stoneObj, stoneExplosionObj]
        }
        if (type === 'blackStone') {
            const blackStone = ['black_stone0'];
            const blackStoneObj = new SketchedObject(blackStone, 0, 0, 'img/magic_zombie');

            const blackStoneExplosion = ['black_stone1', 'black_stone2', 'black_stone3', 'black_stone4'];
            const blackStoneExplosionObj = new SketchedObject(blackStoneExplosion, 0, 0, 'img/magic_zombie');
            return [blackStoneObj, blackStoneExplosionObj]

        }
        if (type === 'fire') {
            const fire = ['fire0'];
            const fireObj = new SketchedObject(fire, 0, 0, 'img/magic_zombie');

            const fireExplosion = ['fire1', 'fire2', 'fire3', 'fire4', 'fire5', 'fire6'];
            const fireExplosionObj = new SketchedObject(fireExplosion, 0, 0, 'img/magic_zombie');
            return [fireObj, fireExplosionObj]

        }
        if (type === 'fireFist') {
            const fireFist = ['fire_fist0'];
            const fireFistObj = new SketchedObject(fireFist, 0, 0, 'img/magic_zombie');

            const fireFistExplosion = ['fire_fist1', 'fire_fist2', 'fire_fist3', 'fire_fist4'];
            const fireFistExplosionObj = new SketchedObject(fireFistExplosion, 0, 0, 'img/magic_zombie');
            return [fireFistObj, fireFistExplosionObj]
        }
    }
}

export {MagicFactory}