import {Entitiy,draw,build} from "./entities.js"
import {Rocket} from "./rocket.js";
import {soundManager} from "./audioManager.js";

var minRange = 100;
var minDamage = 50;
var minPrice = 100;
var cooler = 1000;



export var Tower1 = Entitiy.extend({
    overheat: false,
    name: "cannon1",
    range: minRange,
    damage: minDamage,
    cost: minPrice,
    target: null,
    build: build,
    draw:draw,
    update:update,
})

export var Tower2 = Entitiy.extend({
    overheat: false,
    name: "cannon2",
    range: minRange,
    damage: minDamage*2,
    cost: minPrice*2,
    build: build,
    draw: draw,
    update:update,
})

export var Tower3 = Entitiy.extend({
    overheat: false,
    name: "cannon3",
    range: minRange*2,
    damage: minDamage,
    cost: minPrice*2,
    build: build,
    draw: draw,
    update:update,
})


function update(enemies,rockets) {
    if(this.overheat) return
    if(this.target == null){
        for(var enemy of enemies){
            if(reachable(enemy,this.range,this.center_x,this.center_y)){
                this.target = enemy;
                break
            }
        }
        return
    }

    if(!reachable(this.target,this.range,this.center_x,this.center_y)){
        this.target = null
    } else {
        rockets.push(Rocket.build(this.center_x,this.center_y,this.target,this.damage))
        soundManager.play('./effects/pew.wav');
        this.overheat = true
        setTimeout(() => {this.overheat = false},cooler)
    }
}

function reachable(enemy,range,center_x,center_y){
    return ((Math.sqrt((enemy.center_x-center_x)*(enemy.center_x-center_x) + (enemy.center_y-center_y)*(enemy.center_y-center_y)) <= range) && !enemy.killed)
}

