import {getAnswer} from "./dragAndDrop";

const _ = require('lodash');

let rightResult = [];
let answer;
let language;
let word;

export const taskDescription = ["Enter the result of the calculation. In the case of division round up result to one decimal place.",
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
    const userAnswerField = document.getElementById('final-result');

    if (answer == "") {
        userAnswerField.innerHTML = "Please enter the answer!";
        userAnswerField.style.color = "red";
    }
    else {
        answerResult = Array.isArray(rightResult) ?
            _.includes(rightResult, answer) :
            answer == rightResult;

        if (answerResult) {
            userAnswerField.innerHTML = "RIGHT";
            userAnswerField.style.color = "green";
        } else {
            userAnswerField.innerHTML = "WRONG";
            userAnswerField.style.color = "red";
        }
        setTimeout(() => {
            document.getElementById('mathModal').style.display = "none";
        }, 1000)
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
    msg.volume = 1; // 0 to 1
    msg.rate = 0.7; // 0.1 to 10
    msg.pitch = 1.5; // 0 to 2
    msg.text = word;
    msg.lang = language;
    speechSynthesis.speak(msg);
};

document.getElementById("submit-result").onclick = () => {
    console.log(document.getElementById("input").style.display);
    if (document.getElementById("input").style.display === "none") {
        getAnswer();
    } else {
        answer = document.getElementById("result").value;
    }
    checkResult();
};