import {mathTask} from "./tasks/math";
import {translateTask} from "./tasks/dictionary";
import {dragAndDropTask} from "./tasks/dragAndDrop";
import {listeningTask} from "./tasks/listening";
import {listeningTranslateTask} from "./tasks/translate";
import {listeningAndTranslateTask} from "./tasks/listenAndTranslate";

class Spell {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
        console.log(elem)
    }

    act1() {
        mathTask();
    }

    act2() {
        translateTask();
    }

    act3() {
        dragAndDropTask();
    }

    act4() {
        listeningTask();
    }

    act5() {
        listeningTranslateTask();
    }

    act6() {
        listeningAndTranslateTask();
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

export {Spell};