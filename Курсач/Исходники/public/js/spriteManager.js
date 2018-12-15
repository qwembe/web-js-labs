import {loadJSONEntities, loadImageEntitiesFromJSON} from "./loaders.js";
import {parseSprites} from "./parsers.js";

export var spriteManager = {
    loadComplete: false,
    image: new Image(),
    sprites: new Array(),
    data: {},
    imgLoaded: false,
    jsonLoaded: false,

    load: function () {
        loadJSONEntities()
            .then(JSON => {
                this.data = JSON;
                this.jsonLoaded = true;
                this.image.src = loadImageEntitiesFromJSON(JSON);
                this.imgLoaded = true;
            }).then(() => {
            this.parseSprites(this.data)
        })
    },

    parseSprites(JSON) {
        parseSprites(JSON).then((sprites) => {
            this.sprites = sprites.spriteSet;
            this.loadComplete = true;
            console.log("Sprites loaded");
        })
    },


    // simpleDraw() {
    //     if (this.loadComplete) {
    //         var ctx = document.getElementById("canvasid").getContext("2d");
    //         for (var i = 0; i < this.sprites.length; i++) {
    //
    //             drawTile(ctx, this.image, this.sprites[i].sprite, i * 32, 0)
    //         }
    //     }
    // },

    getSprite(name) {
        if(!this.loadComplete) return
        const sprite = this.sprites.filter(s => {
            return s.name == name;
        })
        return sprite;
    },

    drawByName(ctx, name, pos_x, pos_y) {
        if(!this.loadComplete) return
        this.drawSprite(ctx, this.getSprite(name)[0].sprite, pos_x, pos_y)
    },

    drawSprite(ctx, sprite, pos_x, pos_y) {
        if(!this.loadComplete) return
        ctx.drawImage(this.image,
            sprite.x, sprite.y,
            sprite.w, sprite.h,
            pos_x, pos_y,
            sprite.w, sprite.h)
    }

}

// function drawTile(ctx, src, imageData, x, y) {
//     ctx.drawImage(src,
//         imageData.x, imageData.y,
//         imageData.w, imageData.h,
//         x, y,
//         imageData.w, imageData.h)
// }
