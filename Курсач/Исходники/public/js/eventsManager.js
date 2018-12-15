import {gameManager} from "./gameManager.js";
import {mapManager} from "./mapManager.js";
import {soundManager} from "./audioManager.js";

export var eventsManager = {
    bind: [],
    auction: [],
    currentTower: 0,
    canvas: null,
    currentLevel: null,
    setup: function (canvas) {
        this.canvas = canvas;
        canvas.addEventListener("mousedown", onMouseDown);
        // canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mousemove", mouseMove, false)
        document.getElementById("tower1").addEventListener("mousedown", changeTower1)
        document.getElementById("tower2").addEventListener("mousedown", changeTower2)
        document.getElementById("tower3").addEventListener("mousedown", changeTower3)
        document.getElementById("lvl1").addEventListener("click", level1);
        document.getElementById("lvl2").addEventListener("click", level2);
        document.getElementById("startgame").addEventListener("click", startGame);
    },

    onMouseDown: function (event) {
        gameManager.newTowerClicked(eventsManager.currentTower, event, this.canvas)
    },

    getCurrenTower() {
        return this.currentTower;
    },

    onMouseUp: function (event) {
        console.log("mouse up")
    },

    changeTower(i) {
        this.currentTower = i
    },

    mouseMove(e) {
        mapManager.getMousePosition(e, this.canvas);
    },

}

function level1(e) {
    gameManager.endGame();
    gameManager.init("lvl1");
    gameManager.draw();
}

function level2(e) {
    gameManager.endGame();
    gameManager.init("lvl2");
    gameManager.draw();
}

function startGame(e) {
    if (gameManager.ispause()) {
        soundManager.play('./effects/startgame.wav');
        gameManager.start();
    }
}

function onMouseDown(e) {
    eventsManager.onMouseDown(e)
}

function mouseMove(e) {
    eventsManager.mouseMove(e);
}

function changeTower1(e) {
    eventsManager.changeTower(0);
}

function changeTower2(e) {
    eventsManager.changeTower(1);
}

function changeTower3(e) {
    eventsManager.changeTower(2);
}

