import {Entitiy, draw} from "./entities.js"
import {soundManager} from "./audioManager.js";

export var Enemy = Entitiy.extend({
    name: "enemy",
    health: 100,
    speed: 3,
    finished: false,

    checkpoint: 0,
    // Needs manual settings for every enemy
    way: [
        {x: 2, y: 2},
        {x: 2, y: 12},
        {x: 12, y: 12},

    ],
    // so do this
    curentTarget: {x: 2, y: 12},
    //TODO: make settings way and current way in the new build func

    build: build,
    draw: draw,
    update: function () {
        if (!this.isOnPosition()) {
            if (this.isOnPositionX()) {
                if (this.isOnPositionX() > 0)
                    this.pos_x += this.speed;
                else
                    this.pos_x -= this.speed;
            }
            if (this.isOnPositionY()) {
                if (this.isOnPositionY() > 0)
                    this.pos_y += this.speed;
                else
                    this.pos_y -= this.speed;
            }
        } else {
            if (this.way.length <= this.checkpoint +1) {
                this.finished = true;
                this.killed = true;
            }
            else {
                this.makeCentered();
                this.curentTarget = this.way[++this.checkpoint];

            }
        }
        this.moveCenter()
    },

    isOnPosition: function () {
        return this.isOnPositionX() == 0 && this.isOnPositionY() == 0 ;
    },

    isOnPositionX: function () {
        return Math.abs(this.curentTarget.x * 32 - this.pos_x ) <= this.speed ?
            0 : this.curentTarget.x * 32 - this.pos_x
    },

    isOnPositionY: function () {
        return Math.abs(this.curentTarget.y * 32 - this.pos_y ) <= this.speed ?
            0 : this.curentTarget.y * 32 - this.pos_y
    },

    makeCentered() {
        var dx = this.curentTarget.x * 32 - this.pos_x
        var dy = this.curentTarget.y * 32 - this.pos_y
        if(dx < 0) this.pos_x -= dx;
        else this.pos_x += dx
        if(dy < 0) this.pos_y -= dy;
        else this.pos_y += dy
    },

    moveCenter(){
        this.center_y = this.pos_y + 16;
        this.center_x = this.pos_x + 16;
    },

    getDamadge(damage){

        this.health -= damage;
        if(this.health <= 0){
            this.killed = true;
        }
    }

})

function build(health = 100,speed = 1) {
    const obj = Object.create(this)
    obj.speed = speed;
    obj.health = health;
    var x = Enemy.way[0].x*32;
    var y = Enemy.way[0].y*32;
    obj.curentTarget.x = Enemy.way[1].x;
    obj.curentTarget.y = Enemy.way[1].y
    obj.pos_x = x;
    obj.pos_y = y;
    obj.center_x = x + 16;
    obj.center_y = y + 16;
    obj.size_x = 32;
    obj.size_y = 32;
    return obj;
}



