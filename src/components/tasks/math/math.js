const _ = require('lodash');
import {setRightResult, getTaskDescription} from "../tasks.js";
import {displayStyleForId} from "../utils/util";

const signs = ["+", "-", "*", "%", "/"];

export const mathTask = (taskNumber) => {
    displayStyleForId(['myModal'], ['none']);

    const firstNumber = _.random(0, 100);
    const secondNumber = _.random(1, 20);
    const sign = signs[_.random(0, signs.length-1)];

    setRightResult( _.round(Number(eval(firstNumber + sign + secondNumber)), 1));
    document.getElementById('equation').innerHTML = firstNumber + " " + sign + " " + secondNumber+ " = ";
    document.getElementById('description').innerHTML =( getTaskDescription())[taskNumber];

    displayStyleForId(['taskModal', 'input'], ['grid', 'grid']);
};


