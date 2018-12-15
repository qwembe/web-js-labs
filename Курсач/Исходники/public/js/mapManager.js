import {loadTileSet} from "./loaders.js"
import {loadLevel} from "./loaders.js"
import {gameManager} from "./gameManager.js";
import {Tower1, Tower2, Tower3} from "./cannons.js";
import {eventsManager} from "./eventsManager.js";
import {Enemy} from "./enemy.js";


var FPS = 64;


export var mapManager = Object.create({
        loadComplete: false,

        mapLoaded: false,
        mapData: null,
        tLayer: null,
        xCount: 0,
        yCount: 0,
        mapSize: {x: 32, y: 32},

        tileLoaded: false,
        tSize: {x: 32, y: 32},
        tilesets: null,

        ctx: null,
        mouse: null,
        canvas: null,
        way: "",

        tileInit: function tileInit(tileData) {
            this.tilesets = tileData.tileSet
            this.tSize.x = tileData.tileheight
            this.tSize.y = tileData.tilewidth
            this.tileLoaded = true;
        },

        levelInit: function (level) {
            this.mapData = level;
            this.xCount = this.mapData.width
            this.yCount = this.mapData.height
            this.tLayer = this.mapData.layers
            this.way = JSON.parse(this.tLayer[0].properties.filter(e => {return e.name === "way"})[0].value).way
            console.log(this.way)
            Enemy.way = this.way;
            this.mapLoaded = true;


        },

        getTile: function getTile(id) {
            return this.tilesets[id];
        },

        init: function init(level, ctx, canvas) {
            Promise.all([
                loadTileSet(),
                loadLevel(level)
            ]).then(
                ([tileData, level]) => {
                    this.tileInit(tileData);
                    this.levelInit(level);
                    this.ctx = ctx;             //TODO make check ctx
                    this.canvas = canvas;
                    this.canvas.height = this.yCount * this.tSize.y;
                    this.canvas.width = this.xCount * this.tSize.x;
                    this.loadComplete = true;
                    console.log("initianion Complete!");
                },
                erorr => {
                    console.error(erorr);
                    alert("smthing wrong!")
                })
        },

        start: function () {
            console.log("Start!")
            console.log("Draw");
            var start = setInterval(() => this.draw(), FPS)
        },

        draw() {
            if (this.loadComplete) {
                for (var id = 0; id < this.mapData.layers.length; id++) {
                    var layer = this.mapData.layers[id];
                    if (layer.type === "tilelayer") {
                        this.tLayer = layer;
                        break;
                    }
                }
                for (var i = 0; i < this.tLayer.data.length; i++) {
                    if (this.tLayer.data[i] != 0) {
                        var Tile = this.getTile(this.tLayer.data[i] - 1);
                        var pX = (i % this.xCount)// * this.tSize.x;
                        var pY = Math.floor(i / this.xCount)// * this.tSize.y;
                        drawTile(this.ctx, Tile, pX, pY)
                    }
                }
            }
        },

        drawMouse() {
            if (!this.loadComplete) return
            this.ctx.save()
            if (!this.mouse) return;
            var towerClasses = [Tower1, Tower2, Tower3];
            var range = towerClasses[eventsManager.getCurrenTower()].range;
            this.ctx.beginPath();
            this.ctx.globalAlpha = 0.2;
            this.ctx.arc(this.mouse.x, this.mouse.y, range, 0, 2 * Math.PI);
            if (this.checkBlock(this.mouse.x, this.mouse.y)) this.ctx.fillStyle = 'yellow'; //todo bug - always red
            else this.ctx.fillStyle = 'red';
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            this.ctx.restore();
        }
        ,


        getMousePosition(e, canvas) {
            var x = e.x - 10//Math.floor(e.x / 32) * 32;
            var y = e.y - 10//Math.floor(e.y / 32) * 32;
            var rect = canvas.getBoundingClientRect();
            this.mouse = {
                x: x + Math.floor(this.tSize.x / 2) - rect.left,
                y: y + Math.floor(this.tSize.y / 2) - rect.top ,
            }

        },

        checkBlock(x, y) {
            return this.tLayer.data[x + this.yCount * y] == 1 || this.tLayer.data[x + this.yCount * y] == 16
        }

    }
)

function drawTile(ctx, imageData, x, y) {
    ctx.putImageData(imageData, x * imageData.width, y * imageData.height)

}

