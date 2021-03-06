import {setAnswer, setRightResult, taskDescription} from "./tasks";

const _ = require('lodash');

export const dragAndDropTask = () => {
    document.getElementById('myModal').style.display = "none";

    const start = () => {
        fetch('https://api.myjson.com/bins/yfmxi')
            .then(res => res.json())
            .then(response => {
                setTask(response)
            })
            .then(respon => {
                document.getElementById('input').style.display = "none";
                document.getElementById('taskModal').style.display = "grid";
            })
    };
    start();
};

const setTask = (response) => {
    let map = new Map();
    Object.keys(response).forEach(key => {
        map.set(key, response[key]);
    });
    const index = _.random(0, map.size - 1);
    let question = Array.from(map.keys())[index];

    console.log(question);
    let shuffleWord = _.shuffle(question);
    document.getElementById('description').innerHTML = taskDescription[2];
    setDraggable(shuffleWord);
    setRightResult(question);
};

function setDraggable(wordArray) {
    let listOfSymbols = document.createElement('ul');
    listOfSymbols.setAttribute("id", "sortable");
    listOfSymbols.setAttribute("class", "ui-sortable");
    wordArray.forEach((item, i) => {
        let symbol = document.createElement('li');
        symbol.setAttribute('class', 'ui-state-default');
        symbol.innerHTML = item;
        let sp = document.createElement('span');
        sp.setAttribute('class', 'ui-icon ui-icon-arrowthick-2-n-s');
        symbol.appendChild(sp);

        listOfSymbols.appendChild(symbol);
    });
    document.getElementById('question').appendChild(listOfSymbols);
    $(document).ready(function () {
        $("#sortable").sortable();
    });
}

export function getAnswer() {
    let answerElements = document.getElementsByClassName("ui-state-default");
    let answer = "";
    let i;
    for (i = 0; i < answerElements.length; i++) {
        answer = answer + answerElements[i].textContent;
    }
    setAnswer(answer);
    document.getElementById('question').removeChild(document.getElementById('sortable'));
}
