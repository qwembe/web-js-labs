import {Entitiy, draw} from "./entities.js"

export var Rocket = Entitiy.extend({
    radius: 10,
    impulse: 5,
    name: "bullet",
    draw: draw, //TODO make draw
    target: null,
    targetCords: {x: 0, y: 0},
    damage: 100,
    px: 0,
    py: 0,
    targetLost: false,

    build: build,
    update() {
        if (!this.target.killed && !this.targetLost) {
            this.updateCords();
        } else {
            this.targetLost = true;
        }

        if (this.inRadus()) {
            this.target.getDamadge(this.damage);
            this.killed = true;
            return;
        }

        if (!this.isOnPosition()) {
            this.move();
        }


    },

    move() {
        var distx = this.targetCords.x - this.pos_x;
        var disty = this.targetCords.y - this.pos_y;
        var angle = Math.atan2(disty, distx);

        this.pos_x += this.impulse * Math.cos(angle);
        this.pos_y += this.impulse * Math.sin(angle);

        //return (distx < 0 ? -distx : distx) + (disty < 0 ? -disty : disty) < this.impulse;
    },

    updateCords() {
        this.targetCords.x = this.target.pos_x;
        this.targetCords.y = this.target.pos_y;
    },

    isOnPosition: function () {
        return this.isOnPositionX() == 0 && this.isOnPositionY() == 0;
    },

    isOnPositionX: function () {
        return Math.abs(this.targetCords.x * 32 - this.pos_x) <= this.impulse ?
            0 : this.targetCords.x * 32 - this.pos_x
    },

    isOnPositionY: function () {
        return Math.abs(this.targetCords.y * 32 - this.pos_y) <= this.impulse ?
            0 : this.targetCords.y * 32 - this.pos_y
    },

    inRadus(){
        return (this.targetCords.x - this.pos_x)*(this.targetCords.x - this.pos_x) + (this.targetCords.y - this.pos_y)*(this.targetCords.y - this.pos_y) < this.radius*this.radius;
    }


})


function build(x, y, target, damage) {
    const obj = Object.create(this)
    obj.pos_x = x - 17;
    obj.pos_y = y - 17;
    obj.center_x = x;
    obj.center_y = y;
    obj.size_x = 6;
    obj.size_y = 6;
    obj.target = target;
    obj.targetCords.x = target.pos_x;
    obj.targetCords.y = target.pos_y;
    obj.damage = damage;
    return obj;
}