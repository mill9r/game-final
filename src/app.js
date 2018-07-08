import {Spell} from "./components/tasks/spellDelegate";
import {userResults} from "./screens/winner-table/winnerTable";
import {
    redrawCharacter,
    subtractHealth,
    getCurrentHealth,
    fillHeroLive,
    fillZombieLive,
    revertPerson
} from "./screens/battle/characters/characterHelper";
import {animateObject} from "./screens/battle/magic/magicHelper";
import {addCanvas, getRandomInt} from "./screens/battle/helper";
import {dataForMagicAction, spells, attackType} from "./screens/battle/magic/dataForMagicAction";
import {
    zombieNameAdj,
    zombieNameList,
    zombieNameType,
    zombiePosition,
    clearZombieArea
} from "./screens/battle/characters/zombieData";
import {heroPosition, clearHeroArea} from "./screens/battle/characters/heroData";
import {MagicFactory} from "./screens/battle/magic/magicFactory";
import {characterFactory} from "./screens/battle/characters/characterFactory";

const _ = require('lodash');

const HERO = 'hero';
const ZOMBIE = 'zombie';
const SPELLS_RANGE = 4;
const DAMAGE = 100;
const DEAD = 0;
const RESET_USER_SCORE = 0;


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


const fps = 30;
const fieldWidth = 1000;
const fieldHeight = 800;
const milliseconds = 1000;
const id = 'gameCanvas';
const gameField = 'gameField';
const gameContainer = addCanvas(id, fieldWidth, fieldHeight, gameField);
const ctx = gameContainer.getContext('2d');
const startHealth = 100;


let zombieTimer;
let heroTimer;


export const createHero = (name) => {
    const hero = new characterFactory();
    const person = hero.create(HERO);
    fillHeroLive(name, startHealth, person.getGameHeroNameId(), person.gameHeroId, person.gameHeroHealthId);
    heroTimer = setInterval(redrawCharacter.bind(null, person, heroPosition, ctx, clearHeroArea), milliseconds / fps);
};

export const createZombie = () => {
    const nameRange = 5;
    const zombiePerson = new characterFactory();
    const zombie = zombiePerson.create(ZOMBIE);
    fillZombieLive(startHealth, zombieNameAdj, zombieNameType, zombieNameList, nameRange, zombie.getGameHeroNameId(), zombie.getGameHeroId(), zombie.getGameHeroHealthId());
    const timer = setInterval(redrawCharacter.bind(null, zombie, zombiePosition, ctx, clearZombieArea), milliseconds / fps);
    return timer;
};

const makeAttack = (ctx, action, spell) => {
    const waitTime = 2500;
    const person = action === true ? 'hero' : 'zombie';
    const fabric = new MagicFactory();
    const attack = fabric.create(spell);
    const attackAxis = attackType[person][getRandomInt(2)];
    const paramsForAnimateObject = dataForMagicAction[attackAxis];
    const spellFlightCorrection = 100;

    animateObject(ctx, attack[0], paramsForAnimateObject['xPos'], paramsForAnimateObject['yPos'],
        attack[0].getObject()[0][0].width + spellFlightCorrection, attack[0].getObject()[0][0].height + spellFlightCorrection, paramsForAnimateObject['clearArea'],
        attack[1], paramsForAnimateObject['increment'], paramsForAnimateObject['axis'], paramsForAnimateObject['stop'],
        paramsForAnimateObject['direction']);

    const health = document.getElementById(revertPerson(person));
    const width = health.style.width.replace('%', '');
    setTimeout(subtractHealth.bind(null, health, Number(width), DAMAGE, revertPerson(person), 'Health'), waitTime);
};

export const startGame = (name) => {
    clearInterval(heroTimer);
    clearInterval(zombieTimer);
    createHero(name);
    zombieTimer = createZombie();
    setInterval(createNewZombie, milliseconds);
};


export const createNewZombie = () => {
    console.log(getCurrentHealth('hero'), getCurrentHealth('zombie'));
    if (getCurrentHealth('hero') == DEAD) {
        userResults(userName, userLastName, userScore);
        userScore = RESET_USER_SCORE;
    } else if (getCurrentHealth('zombie') == DEAD) {
        userScore++;
        clearInterval(zombieTimer);
        zombieTimer = createZombie();
    }
};

export const attack = (result) => {
    makeAttack(ctx, result, spells[getRandomInt(SPELLS_RANGE)]);
};

