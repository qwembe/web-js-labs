import {spriteManager} from "./spriteManager.js";

export var Entitiy = {
    // name: "",
    pos_x: 0,
    pos_y: 0,
    size_x: 32,
    size_y: 32,
    center_x: 16,
    center_y: 16,
    killed: false,

    //draw: null,


    extend: function (extendPtroto) {
        var object = Object.create(this);
        for (var property in extendPtroto) {
            if (this.hasOwnProperty(property) || typeof object[property] === "undefined") {
                object[property] = extendPtroto[property];
            }
        }
        return object;
    },

}


export function draw(ctx) {
    spriteManager.drawByName(ctx,this.name,this.pos_x,this.pos_y);
}

export function build(x,y) {
    const obj = Object.create(this)
    obj.pos_x = x;
    obj.pos_y = y;
    obj.center_x = x + 16;
    obj.center_y = y + 16;
    obj.size_x = 32;
    obj.size_y = 32;
    console.log("new")
    return obj;
}
