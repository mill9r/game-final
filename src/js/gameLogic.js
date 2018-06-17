//winner table
import {startGame} from "./index";

let winnResult = [];
let winnTable = document.getElementById('winner-table');
export const userResults = (userName, userLastName, userScore) => {
    document.getElementById('register').style.display = 'grid';
    document.getElementsByClassName('user-form')[0].style.display = 'none';

    if (document.getElementById('winner-table').childNodes.length >= 1) {
        clearDivContent('winner-table');
    }
    setResult(userScore);
    localStorage.setItem('result', JSON.stringify(winnResult));

    const headRow = document.createElement('tr');
    const headCell1 = document.createElement('th');
    const headCell2 = document.createElement('th');
    const headCell4 = document.createElement('th');
    headCell1.innerHTML = 'N';
    headCell2.innerHTML = 'Name';
    headCell4.innerHTML = 'Results';
    headRow.appendChild(headCell1);
    headRow.appendChild(headCell2);
    headRow.appendChild(headCell4);
    winnTable.appendChild(headRow);

    let i = 0;
    winnResult.forEach(item => {
        i++;
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell4 = document.createElement('td');
        winnTable.appendChild(row);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell4);

        cell1.innerHTML = "" + i;
        cell2.innerHTML = item.person[0].name + " " + item.person[0].lastName;
        cell4.innerHTML = item.score;

    });
    winnTable.style.display = "grid";
    document.getElementById('new-game').style.display = 'grid';

};

function setResult(userScore) {
    if (JSON.parse(localStorage.getItem("result"))) {
        winnResult = JSON.parse(localStorage.getItem("result"));
    }
    if (winnResult.length < 10) {
        formDate(userScore);
    }
    else {
        winnResult = winnResult.sort(function (a, b) {
            return (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
        });
        if (winnResult[9].score < userScore) {
            winnResult.pop();
            formDate(userScore);
        }
    }
    winnResult = winnResult.sort(function (a, b) {
        return (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
    });
}

function formDate(userScore) {
    winnResult.push({
        'person': JSON.parse(localStorage.getItem("person")),
        'score': userScore,
    });
}

const clearDivContent = (idName) => {
    let div = document.getElementById(idName);
    clearInner(div);
};
const clearInner = (node) => {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
};

const clear = (node) => {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
};

document.getElementById("new-game").onclick = () => {
    winnTable.style.display = 'none';
    document.getElementById('register').style.display = 'none';
    startGame((JSON.parse(localStorage.getItem("person")))[0].name);
};