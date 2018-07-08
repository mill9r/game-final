import {mathTask} from "./math/math";
import {translateTask} from "./dictionary/dictionary";
import {dragAndDropTask} from "./drag-and-drop/dragAndDrop";
import {listenAndTranslateTask} from "./listen-translate/listenAndTranslate";
import {TASK_URL} from "./utils/tasksData";

class Spell {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
        console.log(elem)
    }

    act1() {
        const taskNumber = 0;
        mathTask(taskNumber);
    }

    act2() {
        const taskNumber = 1;
        translateTask(taskNumber,TASK_URL);
    }

    act3() {
        const taskNumber = 2;
        dragAndDropTask(taskNumber,TASK_URL);
    }

    act4() {
        const taskNumber = 3;
        const word = '';
        const language = "en-US";
        listenAndTranslateTask(taskNumber, language, word,TASK_URL);
    }

    act5() {
        const taskNumber = 4;
        const word = 'setWordFromMap';
        const language = "ru-RU";
        listenAndTranslateTask(taskNumber, language, word,TASK_URL);
    }

    act6() {
        const taskNumber = 4;
        const word = 'setRightResultFromMap';
        const language = "en-US";
        listenAndTranslateTask(taskNumber, language, word,TASK_URL);
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

export {Spell};