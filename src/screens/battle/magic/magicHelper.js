import {createImage} from "../helper";

const MULTIPLIER = 100;

export const animateObject = (ctx, obj, dx, dy, width, height, subtract, explosion, incr, moveAxe, movementToPosition, direction) => {
    ctx.clearRect(dx - subtract, dy - subtract, width + subtract, height + subtract);  // clear canvas
    ctx.drawImage(obj.getObject()[0][0], dx, dy);                                      // draw image at current position
    let movementPoint = moveAxe === 'dx' ? dx += incr : dy += incr;
    if (checkResult(movementPoint, movementToPosition, direction)) {
        requestAnimationFrame(animateObject.bind(null, ctx, obj, dx, dy, width, height, subtract, explosion, incr, moveAxe, movementToPosition, direction))  // loop
    } else {
        ctx.clearRect(dx - subtract, dy - subtract, width + subtract, height + subtract);
        makeExplosion(ctx, explosion, dx, dy, explosion.getObject()[0][0].width, explosion.getObject()[0][0].height)
    }
    return true;
};

const makeExplosion = (ctx, obj, dx, dy, width, height) => {
    for (let i = 0; i < obj.getObject().length; i++) {
        setTimeout(createImage.bind(null, ctx, obj.getObject()[i][0], dx, dy, width, height, MULTIPLIER * i), MULTIPLIER * i);
    }
};

const checkResult = (movementPoint, movementToPosition, direction) => {
    if (direction === 'negative') {
        return movementPoint > movementToPosition;
    }
    if (direction === 'positive') {
        return movementPoint < movementToPosition;
    }
};
