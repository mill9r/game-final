import {getAnswer} from "./dragAndDrop";

const _ = require('lodash');
const signs = ["+", "-", "*", "%", "/"];
export let result;
export let answer;

export const mathTask = () => {
    document.getElementById('myModal').style.display = "none";

    const firstNumber = _.random(0, 100);
    const secondNumber = _.random(1, 20);
    const sign = signs[_.random(0, 4)];

    result = _.round(Number(eval(firstNumber + sign + secondNumber)), 1);

    document.getElementById('acquisition').innerHTML = firstNumber + " " + sign + " " + secondNumber;
    document.getElementById('mathModal').style.display = "inherit";
};

document.getElementById("submit-result").onclick = () => {
    console.log(document.getElementById("input").style.display);
    if (document.getElementById("input").style.display === "none") {
        getAnswer();
    }else {
        answer = document.getElementById("result").value;
    }
    checkResult();
};

export const checkResult = () => {
    console.log(answer , result);
    console.log(answer == result);
};

export let setResult = (res) => {
    result = res;
};

export let setAnswer = (answ) => {
    answer = answ;
};