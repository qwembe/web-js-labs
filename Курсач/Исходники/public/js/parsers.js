export function parseTiles(tileInfo) {
    var ctx = document.createElement("canvas").getContext("2d");
    var tileSet = new Array();
    var spriteSheet = new Image();
    spriteSheet.src = `./sprites/${tileInfo.image}`;

    var tilesX = tileInfo.columns;
    var tilesY = tileInfo.tilecount / tilesX;
    var tileheight = tileInfo.tileheight;
    var tilewidth = tileInfo.tilewidth;

    return new Promise((resolve => {
            spriteSheet.onload = () => {
                ctx.drawImage(spriteSheet, 0, 0);

                for (var i = 0; i < tilesY; i++) {
                    for (var j = 0; j < tilesX; j++)
                        tileSet.push(getImageData_ij(ctx, j, i, tilewidth, tileheight))
                }

                ctx.clearRect(0, 0, tileInfo.imageheight, tileInfo.imagewidth);
                console.log("Parse tiles complete");
                resolve({
                    "tileSet": tileSet,
                    "tileheight": tileheight,
                    "tilewidth": tilewidth

                });
            }
        }
    ))
}

function getImageData_ij(ctx, j, i, tilewidth, tileheight) {
    return ctx.getImageData(j * tilewidth, i * tileheight, tilewidth, tileheight)
}


export function parseSprites(tileInfo) {
    var ctx = document.createElement("canvas").getContext("2d");
    var spriteSet = new Array();
    var spriteSheet = new Image();
    spriteSheet.src = `./sprites/${tileInfo.meta.image}`;

    return new Promise((resolve => {
            var frame;
            for (frame in tileInfo.frames) {
                var x = tileInfo.frames[frame].frame.x
                var y = tileInfo.frames[frame].frame.y
                var h = tileInfo.frames[frame].frame.h
                var w = tileInfo.frames[frame].frame.w
                spriteSet.push({
                    name: frame,
                    frame: tileInfo.frames[frame],
                    sprite: {x, y, w, h},
                })
            }
            console.log("Parse sprites complete");
            resolve({
                "spriteSet": spriteSet,
            });
        }
    ))
}

