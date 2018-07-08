import {getAnswer} from "./drag-and-drop/dragAndDrop";
import {attack} from "../../app";
import {displayStyleForId} from "./utils/util";

const _ = require('lodash');

let rightResult = [];
let answer;
let language;
let word;

const wrongUserAnswer = 'WRONG';
const wrongUserAnswerColor = 'red';
const rightUserAnswer = 'RIGHT';
const rightUserAnswerColor = 'green';
const msgForEmptyField = 'Please enter the answer!';
const interval = 100;
const VOLUME = 1;
const RATE = 0.7;
const PITCH = 1.5;

export const taskDescription = ["Enter the result of the calculation. In case of division round up result to one decimal place.",
    "Translate the word to Russian",
    "Guess the word and use drag and drop for ordering symbols ",
    "Listen the word and write it",
    "Listen the word and write translation"];

export function getTaskDescription() {
    return taskDescription;
}

export const checkResult = () => {
    let answerResult;
    console.log(answer, rightResult);
    const userAnswerField = document.getElementById('message-about-result');

    if (answer == "") {
        userAnswerField.innerHTML = msgForEmptyField;
        userAnswerField.style.color = wrongUserAnswerColor;
    }
    else {
        answerResult = Array.isArray(rightResult) ?
            _.includes(rightResult, answer) :
            answer == rightResult;
        if (answerResult) {
            userAnswerField.innerHTML = rightUserAnswer;
            userAnswerField.style.color = rightUserAnswerColor;
        } else {
            userAnswerField.innerHTML = wrongUserAnswer;
            userAnswerField.style.color = wrongUserAnswerColor;
        }
        setTimeout(() => {
            document.getElementById('result').value = "";
            displayStyleForId(['taskModal', 'play'], ['none', 'none']);
            document.getElementById('equation').innerHTML = "";
            userAnswerField.innerHTML = "";
        }, interval);

        attack(answerResult);
    }
};

export let setRightResult = (res) => {
    rightResult = res;
};

export let setAnswer = (ans) => {
    answer = _.toLower(ans);
};

export let setLanguage = (lang) => {
    language = lang;
};
export let setWord = (w) => {
    word = w;
};

document.getElementById("play-button").onclick = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.volume = VOLUME;
    msg.rate = RATE;
    msg.pitch = PITCH;
    msg.text = word;
    msg.lang = language;
    speechSynthesis.speak(msg);
};

document.getElementById("submit-result").onclick = () => {
    if (document.getElementById("input").style.display === "none") {
        getAnswer();
    } else {
        answer = document.getElementById("result").value;
    }
    checkResult();
};