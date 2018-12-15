var express = require('express');
var getIds = require("debug")('getIds')
var router = express.Router();
const io = require('socket.io').listen(3030)


try {
    var pictures = require("../src/picture_data");
    var bidders = require("../src/bidders_data");
    var settings = require("../src/settings");
} catch (e) {
    console.error(e);
}

io.sockets.on('connection', (socket) => {
    // socket.emit('hello', 'Добро пожаловать!');
    let time = (new Date()).toLocaleDateString();
    socket.on('message', (msg) => {
        if (msg.type == 'connect') {
            socket.json.send({"type": "connect", "message": `${time} Добро пожаловать ${msg.name}`});
            socket.broadcast.json.send({"type": "connect", "message": `${time} Присоединился ${msg.name}`})
        }
    })
    socket.emit('hello', state)
    //socket.on('disconect',(msg)=>{})
    socket.emit('time', sec)

})


var sold = [];
var curentPic;
var gogogo = false;
var Pics = getActivePics().data;
const pause = settings.pause
const timeout = settings.timeout
let end = false;
let sec = 0;
let cur = 0;
let curPrice = 100;
let curSold = false;

var state = ""
var text = settings.date + " " + settings.time;
var date = new Date(text.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
var now = new Date();
var millisTill10 = 2000//date - now;
if (millisTill10 < 0) {
    state = "Аукцион закрылся"
} else {
    console.log(`its ${millisTill10} to start`)
    setTimeout(() => {
        console.log('start')


        const intId = setInterval(() => {
            //TODO: socket: make time change by broadcast
            if (!end) sec++
            else clearInterval(intId)
            io.sockets.emit('time', sec)
            //console.log((cur + 1) * (Number(pause) + Number(timeout)))
            io.sockets.emit('timeTillEnd', Pics.length * (Number(pause) + Number(timeout)) - sec)
            io.sockets.emit('timeTillNext', (cur + 1) * (Number(pause) + Number(timeout)) - sec)
        }, 1000)

        recPromiseForAuc()//rec)
    }, millisTill10);
    state = `Добро пожаловать на аукцион!`
}

function recPromiseForAuc() {//cur) { // 2 promisa second in 2 then
    //if(curSold){sold.push}
    curentPic = Pics[cur];
    curPrice = 100;
    io.sockets.emit('nextPic');
    return new Promise((resolve, reject) => {
        gogogo = false;
        console.log(cur);
        console.log('pause');
        //TODO change sate to pause             done
        io.sockets.emit('pause');
        setTimeout(() => {
            resolve()
        }, pause * 1000)
    }).then(result => {
        gogogo = true;
        //TODO change state to active           done
        io.sockets.emit('start');
        console.log('selling')
        new Promise((resolve, reject) => {
            setTimeout(() => {
                //console.log(Pics.length-1)
                if (cur >= Pics.length - 1) end = true;
                resolve()
            }, timeout * 1000)
        }).then(resolve => {
                if (!end) {
                    cur++
                    recPromiseForAuc()
                    return false
                }
                return true
            }
        ).then(result => {
            if (result) {
                //TODO change state: end            done
                state = "Аукцион закрылся"
                io.sockets.emit('end', state);
                console.log('end')
            }
        })
    }).catch(e => {
        condole.log(e);
    })
}

function getActivePics() {
    let data = []
    for (pic of pictures.mdata) {
        if (pic.selling) data.push(pic)
    }
    let resSend = {"data": data}
    return resSend;
}


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {"data_picture": pictures, 'data_bidders': bidders, 'settings': settings});
});

router.get('/admin/', function (req, res, next) {
    res.render('admin');
});

router.get('/member/', function (req, res, next) {
    res.render('member');
});

router.get('/summary/', function (req, res, next) {
    res.render('summary');
});

router.get('/bidders/', (req, res) => {
    let mdata = []
    for (bid of bidders.data) {
        if (bid != 0) mdata.push(bid)
    }
    let resSend = {"data": mdata}
    res.send(JSON.stringify(resSend));
})

router.get('/pict/', (req, res) => {
    res.send(JSON.stringify(getActivePics()));
})

router.get('/getIds/', (req, res) => {
    let data = []
    for (bid of bidders.data) {
        if (bid != 0) data.push(bid.id)
    }
    let resSend = {"data": data}
    res.send(JSON.stringify(resSend));
})

router.get('/get_mem/:id([0-9]{1,})', (req, res) => {
    const id = req.params.id;
    const resSend = bidders.data.map((e) => {
        return parseInt(e.id);
    }).indexOf(parseInt(id));
    if (resSend != -1) res.send(JSON.stringify({"data": bidders.data[resSend]}));
})

router.get('/loadcur/', (req, res) => {
    //console.log(curentPic.name)
    if (!end) {
        let resSend = {"curPic": curentPic}
        res.send(JSON.stringify(resSend));
    }
})

router.put('/addPrice/:price([0-9]{1,})', (req, res) => {
    const add = Number(req.params.price);
    // console.log(add)
    // console.log(gogogo)
    // console.log(curPrice)

    if (gogogo) {
        curPrice += add;
        //TODO emit evryone price added          done
        io.sockets.emit('updatePrice',JSON.stringify({'curPrice':curPrice,'added':add}))
    }
    res.status(200);
})

router.put('/soldBy/:id([0-9]{1,})', (req, res) => {
    const id = req.params.id;
    sold.push({"Pic": curentPic, "id": id , "price": curPrice})
    //TODO: socket change buttons                 done
    //curPrice = 100;
    io.sockets.emit('sold')
    res.status(200);
})

router.get('/sold/', (req, res) => {
    let resSend = {"sold": sold}
    res.send(JSON.stringify(resSend));
})


module.exports = router;
