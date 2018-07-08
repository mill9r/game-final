import {setRightResult, setLanguage, setWord} from "./tasks.js";
import {taskDescription} from "./tasks";

export const listeningTranslateTask = () => {
    document.getElementById('myModal').style.display = "none";
    document.getElementById('play').style.display = "flex";
    const start = () => {
        fetch('https://api.myjson.com/bins/yfmxi')
            .then(res => res.json())
            .then(response => {
                setTask(response)
            })
            .then(respon => {
                document.getElementById('taskModal').style.display = "grid";
                document.getElementById('input').style.display = "grid";
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
    document.getElementById('description').innerHTML = taskDescription[4];


    setRightResult(question);
    setLanguage("ru-RU");
    setWord(map.get(question));
};

