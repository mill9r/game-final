import {startGame} from "../../app";
import {displayStyleForId} from "../../components/tasks/utils/util";

let winnResult = [];

const TABLE_HEADER = ['N', 'Name', 'Results'];

export const userResults = (userName, userLastName, userScore) => {
    const winnTable = document.getElementById('winner-table');
    document.getElementById('register').style.display = 'grid';
    document.getElementsByClassName('user-form')[0].style.display = 'none';

    if (document.getElementById('winner-table').childNodes.length >= 1) {
        clearDivContent('winner-table');
    }
    setResult(userScore);
    localStorage.setItem('result', JSON.stringify(winnResult));

    createTableHeader(winnTable, TABLE_HEADER);
    winnResult.forEach((item, i) => {
        createTableRow(i, item, winnTable);

    });
    winnTable.style.display = "grid";
    document.getElementById('new-game').style.display = 'grid';

};

const createTableHeader = (tableElement, tableHeader) => {
    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    tableHeader.forEach((elem) => {
        const theadCell = document.createElement('td');
        theadCell.innerHTML = elem;
        theadRow.appendChild(theadCell);
    });
    thead.appendChild(theadRow);
    tableElement.appendChild(thead);
};

const createTableRow = (position, item, table) => {
    const row = document.createElement('tr');

    const rank = document.createElement('td');
    const userName = document.createElement('td');
    const userScore = document.createElement('td');
    table.appendChild(row);
    row.appendChild(rank);
    row.appendChild(userName);
    row.appendChild(userScore);
    rank.innerHTML = "" + position;
    userName.innerHTML = item.person[0].name + " " + item.person[0].lastName;
    userScore.innerHTML = item.score;
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
    const winnTable = document.getElementById('winner-table');
    winnTable.style.display = 'none';
    document.getElementById('register').style.display = 'none';
    startGame((JSON.parse(localStorage.getItem("person")))[0].name);
};