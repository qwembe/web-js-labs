

alert("HI")


function readPlayer(source) {
    source.username = localStorage["tetris.username"];
}

var Player = {
    username;
    score = 0;
}


readPlayer(Player);

alert(Player.username,Player.score);




