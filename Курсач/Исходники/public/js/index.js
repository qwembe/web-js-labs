import {gameManager} from "./gameManager.js";
//import {Enemy} from "./enemy.js";
import {eventsManager} from "./eventsManager.js";
import {soundManager} from "./audioManager.js";

console.log('init');


var canvas = document.getElementById("canvasid");
var ctx = canvas.getContext("2d");


soundManager.init();
var musikArr = ['./effects/damage.wav','./effects/gameover.wav','./effects/pew.wav','./effects/startgame.wav'];
soundManager.loadArray(musikArr);

eventsManager.setup(canvas);
gameManager.init("lvl1", ctx,canvas);

//gameManager.start();






// soundManager.play("effects/gameover.wav");
// soundManager.play('effects/pew.wav');
// soundManager.play('effects/startgame.wav');




var currentTower = 0;

// function changeTower(i){
//     eventsManager.setTower(i);
// }


// var enemy = new Enemy.build(0, 0);
// console.log(enemy)


// setInterval(() => {
//     enemy.draw(ctx)
//     //enemy.update();
// }, 50)
//

// if (-1) {
//     console.log(-1)
// }
// if (0) {
//     console.log(0)
// }
// if (1) {
//     console.log(1)
// }





// setInterval(()=>{
//      mapManager.draw()
//     draw();
// },FPS)


// mapManager.start();


//mapManager.setLevel();

//
// mapManager.loadMap("lvl1");
//
//

//
// var tileSet;
// loadTileSet(ctx).then(set => {
//     tileSet = set;
//     console.log(set)
//     simpleDraw()
// });
//
//
// function simpleDraw() {
//     console.log("simpleDraw")
//     for (var i = 0; i < tileSet.tilesY; i++) {
//         for (var j = 0; j < tileSet.tilesX; j++) {
//             drawTile(ctx, tileSet.tileSet[13], j, i)
//         }
//     }
// }


// function drawTile(ctx, imageData, x, y) {
//     ctx.putImageData(imageData, x * imageData.width, y * imageData.height)
//
// }
//
// loadLevel()
//

// var x = 10;
// var image = new Image();
//
// image.onload = () => {
//     ctx.save()
//
//     ctx.translate(40, -10);
//     ctx.rotate(30 * Math.PI / 180)
//     ctx.scale(0.3, 0.3);
//     ctx.drawImage(image, 0, 0);
//
//     ctx.restore();
//     ctx.save();
//
//     ctx.rotate(-30 * Math.Pi / 180);
//     ctx.translate(100, 100);
//     ctx.scale(0.4, 0.4)
//     ctx.drawImage(image, 0, 0);
//
//     ctx.restore()
// }
//
// image.src = "./img/tiles.png"
// console.log(image)