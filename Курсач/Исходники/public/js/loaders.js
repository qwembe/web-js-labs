import {parseTiles} from "./parsers.js";

export function loadLevel(level) {
    return new Promise(resolve => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                console.log("Level loaded");
                resolve(JSON.parse(request.responseText));
            }
        };
        request.open("GET", `../levels/${level}.json`, true)
        request.send();
    })

}

export function loadTileSet() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var tileInfo = JSON.parse(request.responseText);
                parseTiles(tileInfo).then(data => {
                    console.log("loadTileSet")
                    resolve(data)
                })
            }
        };
        request.open("GET", `../sprites/mytileset.json`, true)
        request.send();
    })

}

export function loadJSONEntities() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var sprites = JSON.parse(request.responseText);
                resolve(sprites)
            }
        };
        request.open("GET", `../sprites/sprites.json`, true)
        request.send();
    })
}

export function loadImageEntitiesFromJSON(json) {
        return  `./sprites/${json.meta.image}`;
}