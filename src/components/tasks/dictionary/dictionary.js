import {setRightResult} from "../tasks.js";
import {taskDescription} from "../tasks";
import {displayStyleForId} from "../utils/util";


const _ = require('lodash');


export const translateTask = (taskNumber,TASK_URL) => {
    displayStyleForId(['myModal'], ['none']);
    const start = () => {
        fetch(TASK_URL)
            .then(res => res.json())
            .then(response => {
                setTask(response, taskNumber)
            })
            .then(respon => {
                displayStyleForId(['taskModal', 'input'], ['grid', 'grid']);
            })
    };
    start();
};

const setTask = (response, taskNumber) => {
    let map = new Map();
    Object.keys(response).forEach(key => {
        map.set(key, response[key]);
    });
    const index = _.random(0, map.size - 1);
    let question = Array.from(map.keys())[index];
    document.getElementById('equation').innerHTML = question;
    document.getElementById('description').innerHTML = taskDescription[taskNumber];
    setRightResult(map.get(question));
};