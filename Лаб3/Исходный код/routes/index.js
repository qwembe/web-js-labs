var express = require('express');
var fs = require("fs")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("./public/index.html")
    //res.render('index', { title: 'Express' });
});

router.get('/datapic', (req, res) => {
    const data = require("../picture_data");
    res.send(JSON.stringify(data));

})

router.get('/databid', (req, res) => {
    const data = require("../bidders_data");
    res.send(JSON.stringify(data));

})

router.get('/dataset', (req, res) => {
    const data = require("../settings");
    res.send(JSON.stringify(data));

})

router.get(`/img/:img`, (req, res) => {
    const id = req.params.img;

    const data = require("../picture_data.json")
    console.log();
    const pic = data.mdata[id];
    res.render('paintning', {title: pic.name, data: pic, id: id});
    res.status("200");

})

router.post(`/bid/:img([0-9]{1,})`, (req, res) => {
    const id = req.params.img;

    const data = require("../bidders_data.json")
    const bid = data.data;
    const removeIndex = bid.map((bid) => {
        return parseInt(bid.id);
    }).indexOf(parseInt(id));
    console.log(removeIndex);
    data.data[removeIndex].money = req.body.money;
    fs.writeFile('bidders_data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    // console.log();
    //res.render('paintning', {title: pic.name, data: pic, id: id});
    res.render("bidders", {title: "List of bidders!"});

})



router.get(`/bid/:img`, (req, res) => {
    const id = req.params.img;

    const data = require("../bidders_data.json")
    const bid = data.data;
    const removeIndex = bid.map((bid) => {
        return parseInt(bid.id);
    }).indexOf(parseInt(id));

    // console.log(removeIndex);
    // data.data.splice(data.data.indexOf(removeIndex), 1);
    // console.log(data.data);

    data.data[removeIndex] = 0;

    fs.writeFile('bidders_data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.render("bidders", {title: "List of bidders!"});
})

router.post(`/bid/new`, (req, res) => {
    //const id = req.params.img;
    console.log(req.body);
    const data = require("../bidders_data.json")

    data.ids += 1;

    data.data.push({
        "id": data.ids,
        "name": req.body.name,
        "money": req.body.money
    })

    fs.writeFile('bidders_data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.render("bidders", {title: "List of bidders!"});

})

router.put('/settings/' ,(req,res)=>{
    console.log(req.body);
    var body =  req.body;

    var key = Object.keys(body)[0];
    const setting = require("../settings.json");
    setting[key] = body[key];
    fs.writeFile('settings.json', JSON.stringify(setting), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.send();
})


router.post(`/bid/:img`, (req, res) => {
    const id = req.params.img;

    const data = require("../bidders_data.json")
    const bid = data.data;
    const removeIndex = bid.map((bid) => {
        return parseInt(bid.id);
    }).indexOf(parseInt(id));
    data.data[removeIndex].money = req.body.money;
    fs.writeFile('bidders_data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    // console.log();
    //res.render('paintning', {title: pic.name, data: pic, id: id});
    res.render("bidders", {title: "List of bidders!"});

})


router.post(`/image/:img`, (req, res) => {
    const id = req.params.img;
    const body = req.body;
    var key = Object.keys(body)[0];
    // console.log(id)
    // console.log(body);
    const data = require("../picture_data.json")
    if (key == "selling") {
        data.mdata[id][key] = data.mdata[id][key] ? false : true
    }
    else {
        data.mdata[id][key] = body[key];
    }
    var pic = data.mdata[id];
    //console.log(data);
    fs.writeFile('picture_data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.render('paintning', {title: pic.name, data: pic, id: id});
    res.status("200");

})

module.exports = router;
