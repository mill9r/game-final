import {mathTask} from "./tasks/tasks";
import {translateTask} from "./tasks/dictionary";
import {dragAndDropTask} from "./tasks/dragAndDrop";

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
    }

    act5() {
    }

    act6() {
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

export {Spell};