import {mapManager} from "./mapManager.js"
import {spriteManager} from "./spriteManager.js";
import {loadLevel} from "./loaders.js";
import {loadJSONEntities} from "./loaders.js";
import {Tower1, Tower2, Tower3} from "./cannons.js"
import {Enemy} from "./enemy.js"
import {Rocket} from "./rocket.js";
import {soundManager} from "./audioManager.js";


export var gameManager = {
    ctx: null,
    FPS: 24,
    cannons: new Array(),
    enemies: new Array(),
    rockets: new Array(),
    wave: 0,
    cash: 50,
    mpause: true,
    timer: null,
    lives: 10,
    score: 0,
    pulse: null,
    liveInfo: {},
    canvas: null,
    waveOn: false,
    lvl: "",

    setContext(ctx) {
        this.ctx = ctx;
    },

    init(lvl , ctx = this.ctx, canvas = this.canvas) {
        this.setContext(ctx);
        this.canvas = canvas
        spriteManager.load();
        mapManager.init(lvl, this.ctx, canvas);
        this.wave = 0;
        this.liveInfo.info = document.getElementById("info");
        this.liveInfo.money = document.getElementById("money");
        this.liveInfo.wave = document.getElementById("wave");
        this.cannons = new Array();
        this.enemies = new Array();
        this.rockets = new Array();
        this.cash = 50;
        this.mpause = true;
        this.timer = null;
        this.lives = 10;
        this.score = 0;
        this.pulse = null;

    },

    start() {

        this.unpause();
        this.pulse = setInterval(() => {
            if ((this.enemies.length == 0) && !this.ispause() && !this.waveOn) this.newWave()
            if (this.lives <= 0) this.endGame();
        }, 1500)

        //this.endGame()

        this.draw();
    },

    pause() {
        this.mpause = true
    },
    unpause() {
        this.mpause = false
    },
    ispause() {
        return this.mpause;
    },
    newWave() {
        this.wave++;
        this.waveOn = true;
        var counter = 0;
        var start = {x: 2 * 32, y: 2 * 32}
        var wave = this.wave
        var health = Math.floor(10 * wave);
        var speed = Math.floor(wave % 2 + 1);
        console.log(start, wave, health, speed)
        this.enemies.push(Enemy.build( health, speed))
        var waveCounter = setInterval(() => {
            this.enemies.push(Enemy.build( health, speed )) // Todo make start coords from map?
            counter++;
            if (counter > 9) {
                clearInterval(waveCounter)
                this.waveOn = false;
            }
        }, 1000)
    },

    endGame() {
        soundManager.play('./effects/gameover.wav');
        clearInterval(this.pulse);
        this.stopDraw();
        this.pause();
        endGame(this.score);

    },

    updateInfo() {
        this.liveInfo.money.innerText = this.cash;
        this.liveInfo.wave.innerText = this.wave;
        this.liveInfo.info.innerText = this.lives == 0 ? "Game over" : this.lives;
    },

    draw() {
        this.timer = setInterval(() => {
            mapManager.draw();
            this.updateInfo()
            mapManager.drawMouse() //experimental func
            this.drawObjects();
            this.updateObects();
            this.garbageCollector();
        }, this.FPS)
    },

    stopDraw(){
        clearInterval(this.timer);
    },

    drawObjects() {
        for (var cannon of this.cannons) {
            cannon.draw(this.ctx);
        }
        for (var enemy of this.enemies) {
            enemy.draw(this.ctx);
        }
        for (var rocket of this.rockets) {
            rocket.draw(this.ctx);
        }
    },

    updateObects() {
        if (this.ispause()) return
        for (var enemy of this.enemies) {
            enemy.update();
        }
        for (var cannon of this.cannons) {
            cannon.update(this.enemies, this.rockets)
        }
        for (var rocket of this.rockets) {
            rocket.update()
        }
    },

    garbageCollector() {
        if (this.ispause()) return
        this.enemies.forEach((val, i, enemies) => {
            if (val.killed) {
                soundManager.play('./effects/damage.wav')
                enemies.splice(i, 1);
                if (!val.finished) {
                    this.cash += 5;
                    this.score += 5 * this.wave;
                } else {
                    this.lives -= 1;
                }
            }
        })
        this.rockets.forEach((val, i, rockets) => {
            if (val.killed) {
                rockets.splice(i, 1);
            }
        })
    },

    newTowerClicked(i, e, canvas) {
        var rect = canvas.getBoundingClientRect();
        var x = Math.floor(e.x / 32 - rect.left / 32);
        var y = Math.floor(e.y / 32 - rect.top / 32);
        console.log(x, y)

        if (!this.checkForTower(x * 32, y * 32) && this.apliedBlock(x, y)) {
            var towers = [Tower1, Tower2, Tower3];
            var cost = [10, 25, 25];
            if (cost[i] <= this.cash) {
                this.cash -= cost[i];
                this.cannons.push(towers[i].build(x * 32, y * 32))
            }
        }
    },

    checkForTower(x, y) {
        for (var cannon of this.cannons) {
            if (x - cannon.pos_x == 0)
                if (y - cannon.pos_y == 0)
                    return true;
        }
        return false
    },

    apliedBlock(x, y) {
        return mapManager.checkBlock(x, y)
    }


}