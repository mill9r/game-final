import {Spell} from "./spell";
import {userResults} from "./gameLogic";
import {SketchedObject} from "./sketchedObject";
import {Hero} from "./hero";
import {
    redrawCharacter,
    addCanvas,
    isCanvasSupported,
    getRandomInt,
    drawMagicSequence,
    animateObject,
    makeExplosion,
    executeInSequence,
    subtractHealth,
    revertPerson,
    fillZombieLive,
    fillHeroLive,
    getCurrentHealth
} from "./utils";

document.getElementById('start').onclick = () => {
    const modal = document.getElementById("myModal");
    if ((modal.style.display == "" || modal.style.display == "none") && (document.getElementById("taskModal").style.display == ""
        || document.getElementById("taskModal").style.display == 'none')) {
        modal.style.display = "grid";
        new Spell(document.getElementById("myModal"));
    }
};
let userName;
let userLastName;
let userScore = 0;
document.getElementById('save').onclick = () => {

    userName = document.getElementById('name').value;
    userLastName = document.getElementById('lastName').value;
    if (userName == "") {
        document.getElementById('name').style.borderColor = 'red';
    } else if (userLastName == "") {
        document.getElementById('lastName').style.borderColor = 'red';
    } else {
        let person = [{'name': userName, 'lastName': userLastName}];
        localStorage.setItem('person', JSON.stringify(person));
        document.getElementById('register').style.display = 'none';

        startGame(userName);
    }
};


import {MagicFactory} from "./magicFactory";
import {ZombieFactory} from "./zombieFactory";

const _ = require('lodash');

const fps = 30;
const fieldWidth = 1000;
const fieldHeight = 800;
const milliseconds = 1000;
const id = 'gameCanvas';
const gameField = 'gameField';
const gameContainer = addCanvas(id, fieldWidth, fieldHeight, gameField);
const ctx = gameContainer.getContext('2d');

const zombieNameAdj = ['Ugly', 'Terrible', 'Anger', 'Mad', 'Unlucky'];
const zombieNameType = ['Dead', 'Undead', 'Ork', 'Zombie', 'Torn to pieces'];
const zombieNameList = ['Tom', 'Jack', 'Max', 'John', 'Sam'];

const startHealth = 100;
const clearArea = 5;

const magic = {
    'heroVertical': {
        'xPos': 830,
        'yPos': 30,
        'axis': 'dy',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 290,
        'direction': 'positive'
    },
    'zombieVertical': {
        'xPos': 100,
        'yPos': 30,
        'axis': 'dy',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 290,
        'direction': 'positive'
    },
    'heroHorizontal': {
        'xPos': 190,
        'yPos': 390,
        'axis': 'dx',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 750,
        'direction': 'positive'
    },
    'zombieHorizontal': {
        'xPos': 750,
        'yPos': 390,
        'axis': 'dx',
        'increment': -5,
        'clearArea': clearArea,
        'stop': 190,
        'direction': 'negative'
    }
};

const spells = ['blackStone', 'stone', 'fire', 'fireFist'];

const attackType = {
    'hero': ['heroVertical', 'heroHorizontal'],
    'zombie': ['zombieVertical', 'zombieHorizontal']
};

let zombieTimer;
let heroTimer;


const PATH_TO_HERO_IMG = 'img';
const START_X_POSITION = 100;
const START_Y_POSITION = 460;
const HERO_HTML_PAGE_NAME_ID = 'heroName';
const HERO_HTML_PAGE_HEALTH_LINE_ID = 'hero';
const HERO_HTML_PAGE_HEALTH_AMOUNT_ID = 'heroHealth';
const HERO_EYES_WIDTH = 8;
const HERO_EYES_HEIGHT = 14;
const HERO_EYES_SHIFT = 10;
export const createHero = () => {
    const hero = ['leftArm', 'legs', 'torso', 'weapon', 'rightArm', 'head', 'hair',];
    const heroEyes = {'xPos': 59, 'yPos': 25};
    const person = new Hero(HERO_HTML_PAGE_NAME_ID, HERO_HTML_PAGE_HEALTH_LINE_ID, HERO_HTML_PAGE_HEALTH_AMOUNT_ID, HERO_EYES_WIDTH, HERO_EYES_HEIGHT, HERO_EYES_SHIFT);
    person.setSketchedObject(hero, START_X_POSITION, START_Y_POSITION, PATH_TO_HERO_IMG);
    const position = [[40, 8], [0, 50], [0, 0], [65, -57], [-12, -3], [0, -80], [-28, -96]];
    const clearHeroArea = [71, 360, 165, 180];
    heroTimer = setInterval(redrawCharacter.bind(null, person, position, ctx, clearHeroArea, heroEyes), milliseconds / fps);
};


export const createZombie = () => {
    const nameRange = 5;
    const zombiePerson = new ZombieFactory();
    const zombie = zombiePerson.create();
    fillZombieLive(startHealth, zombieNameAdj, zombieNameType, zombieNameList, nameRange, zombie.getZombieName(), zombie.getZombieId(), zombie.getZombieHealth());
    const zombiePosition = [[-40, 8], [-25, 50], [0, 0], [-1, 2], [-78, -75], [-30, -80]];
    const clearZombieArea = [750, 360, 150, 180];
    const timer = setInterval(redrawCharacter.bind(null, zombie, zombiePosition, ctx, clearZombieArea), milliseconds / fps);
    return timer;
};

const makeAttack = (ctx, action, spell) => {
    const waitTime = 2500;
    const person = action === true ? 'hero' : 'zombie';
    const fabric = new MagicFactory();
    const attack = fabric.create(spell);
    const attackAxis = attackType[person][getRandomInt(2)];
    const paramsForAnimateObject = magic[attackAxis];

    animateObject(ctx, attack[0], paramsForAnimateObject['xPos'], paramsForAnimateObject['yPos'],
        attack[0].getObject()[0][0].width + 100, attack[0].getObject()[0][0].height + 100, paramsForAnimateObject['clearArea'],
        attack[1], paramsForAnimateObject['increment'], paramsForAnimateObject['axis'], paramsForAnimateObject['stop'],
        paramsForAnimateObject['direction']);

    const health = document.getElementById(revertPerson(person));
    const width = health.style.width.replace('%', '');
    setTimeout(subtractHealth.bind(null, health, Number(width), 10, revertPerson(person), 'Health'), waitTime);
};

export const startGame = (name) => {
    clearInterval(heroTimer);
    clearInterval(zombieTimer);
    fillHeroLive(name, startHealth, 'heroName', 'hero', 'heroHealth');
    createHero();
    zombieTimer = createZombie();
    setInterval(createNewZombie, 1000);
};


export const createNewZombie = () => {
    console.log(getCurrentHealth('hero'), getCurrentHealth('zombie'));
    if (getCurrentHealth('hero') == 0) {
        userResults(userName, userLastName, userScore);
        userScore = 0;
    } else if (getCurrentHealth('zombie') == 0) {
        userScore++;
        clearInterval(zombieTimer);
        zombieTimer = createZombie();
    }
};


export const attack = (result) => {
    makeAttack(ctx, result, spells[getRandomInt(4)]);
};

