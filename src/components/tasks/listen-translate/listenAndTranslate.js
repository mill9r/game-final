import {setRightResult, setLanguage, setWord} from "../tasks.js";
import {taskDescription} from "../tasks";
import {displayStyleForId} from "../utils/util";


export const listenAndTranslateTask = (taskNumber, language, condition,TASK_URL) => {
    displayStyleForId(['myModal', 'play'], ['none', 'flex']);
    const start = () => {
        fetch(TASK_URL)
            .then(result => result.json())
            .then(response => {
                setTask(response, taskNumber, language, condition)
            })
            .then(() => {
                displayStyleForId(['taskModal', 'input'], ['grid', 'grid']);
            })
    };
    start();
};

const setTask = (response, taskNumber, language, condition) => {
    let map = new Map();
    Object.keys(response).forEach(key => {
        map.set(key, response[key]);
    });
    const index = _.random(0, map.size - 1);
    let question = Array.from(map.keys())[index];
    document.getElementById('description').innerHTML = taskDescription[taskNumber];

    setRightResult(selectResult(map, question, condition));
    setLanguage(language);
    setWord(selectResult(map, question, condition));
};

const selectResult = (map, question, condition) => {
    if (condition === 'setRightResultFromMap') {
        return map.get(question);
    }
    if (condition === 'setWordFromMap') {
        return map.get(question);
    }
    return question;
};


