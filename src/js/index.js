import {SketchedObject} from "./sketchedObject";
import {
    redrawCharacter,
    addCanvas,
    isCanvasSupported,
    drawMagic,
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
const personsPosition = {
    'hero': [100, 460],
    'zombie': [840, 460]
};

const zombieNameAdj = ['ugly', 'terrible', 'anger', 'mad', 'unlucky'];
const zombieNameType = ['dead', 'undead', 'ork', 'zombie', 'torn to pieces'];
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

export const creatHero = () => {
    const hero = ['leftArm', 'legs', 'torso', 'weapon', 'rightArm', 'head', 'hair',];
    const heroEyes = {'xPos': 59, 'yPos': 25};
    const person = new SketchedObject(hero, 0, 0, 'img');
    person.set(personsPosition['hero'][0], personsPosition['hero'][1]);
    const position = [[40, 8], [0, 50], [0, 0], [65, -57], [-12, -3], [0, -80], [-28, -96]];
    const clearHeroArea = [71, 360, 165, 180];
    setInterval(redrawCharacter.bind(null, person, position, ctx, clearHeroArea, heroEyes), milliseconds / fps);
};


export const createZombie = () => {
    const zombiePosition = [[-40, 8], [-25, 50], [0, 0], [-1, 2], [-78, -75], [-30, -80]];
    const clearZombieArea = [750, 360, 150, 180];
    const zombiePerson = new ZombieFactory();
    const zombie = zombiePerson.create();
    zombie.set(personsPosition['zombie'][0], personsPosition['zombie'][1]);
    setInterval(redrawCharacter.bind(null, zombie, zombiePosition, ctx, clearZombieArea), milliseconds / fps);
};

export const makeAttack = (ctx, action, spell) => {
    const waitTime = 2500;
    const person = action === true ? 'hero' : 'zombie';
    const fabric = new MagicFactory();
    const attack = fabric.create(spell);
    const attackAxis = attackType[person][getRandomInt(2)];
    const paramsForAnimateObject = magic[attackAxis];

    animateObject(ctx, attack[0], paramsForAnimateObject['xPos'], paramsForAnimateObject['yPos'],
        attack[0].object[0][0].width, attack[0].object[0][0].height, paramsForAnimateObject['clearArea'],
        attack[1], paramsForAnimateObject['increment'], paramsForAnimateObject['axis'], paramsForAnimateObject['stop'],
        paramsForAnimateObject['direction']);

    const health = document.getElementById(revertPerson(person));
    const width = health.style.width.replace('%', '');
    setTimeout(subtractHealth.bind(null, health, Number(width), 10, revertPerson(person)), waitTime)
};


export const startGame = (name) => {
    fillHeroLive(name, startHealth);
    creatHero();

};



export const createNewZombie = () => {
    if (getCurrentHealth('zombie') === 0) {
        fillZombieLive(startHealth, zombieNameAdj, zombieNameType, zombieNameList);
        createZombie();
    }
};

setInterval(createNewZombie,1000);

startGame('John');
makeAttack(ctx, false, spells[getRandomInt(4)]);




// const cloud = ['cloud'];
// const cloudObj = new SketchedObject(cloud, 620, 220, 'img/magic');
// setInterval(drawMagic.bind(null, cloudObj, ctx), milliseconds / magicFps);
//
// const lightning = ['lightning', 'lightning1'];
// const light = new SketchedObject(lightning, 680, 300, 'img/magic');
// setInterval(drawMagic.bind(null, light, ctx), milliseconds / magicFps);
//
//
// const zombieCloud = ['cloud'];
// const zombieCloudObj = new SketchedObject(cloud, 275, 220, 'img/magic_zombie');
// setInterval(drawMagic.bind(null, zombieCloudObj, ctx), milliseconds / fps);
//
// const zombieLightning = ['lightning', 'lightning1'];
// const zombieLight = new SketchedObject(lightning, 310, 301, 'img/magic_zombie');
// setInterval(drawMagic.bind(null, zombieLight, ctx), milliseconds / fps);



// const context = gameContainer.getContext('2d');
//
// gameContainer.addEventListener('mousemove', function (evt) {
//     const mousePos = getMousePos(gameContainer, evt);
//     const message = 'Mouse position: x = ' + Math.round(mousePos.x) + ', y = ' + Math.round(mousePos.y);
//     writeMessage(gameContainer, message);
// }, false);

