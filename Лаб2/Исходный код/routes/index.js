var express = require('express');
var router = express.Router();
var post_debug = require("debug")("lab2:post_debug")
var get_book_debug = require("debug")("lab2:get_book_deb")
var post_owner = require("debug")("lab2:Owner")
var delet_owner = require("debug")("lab2:delete owner")
var delete_book = require("debug")("lab2:Delete book")
const data = require("./data.json")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {data: data});
    // next();
});

router.post("/", function (req, res, next) {

    let body = req.body;
    // console.log(req.body);
    if (!body.name || !body.date.toString().match(/^[0-9]{1,}$/g) || !body.author) {
        res.status(400);
        post_debug("Bad Request")
        res.json({message: "Bad Request"});
    } else {

        data.last_key += 1;

        data[data.last_key] = {};

        data[data.last_key] = {
            "name": body.name,
            "author": body.author,
            "date": body.date,
            "is_owned": false,
            "owner": "",
            "expires": ""
        }
        res.status(200).render('index', {data: data});
    }

    const fs = require("fs");
    fs.writeFile('./routes/data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        post_debug('The file has been saved!');
    });

})


router.get('/book/:id([0-9]{1,})', function (req, res, next) {
    const id = req.params.id;

    if (req.query.type == "del") {

        next();
    }
    else {
        res.render("bookCard", {id: id, data: data[id]})
        get_book_debug("Success! " + id);
    }

})

router.post('/book/:id([0-9]{1,})', function (req, res, next) {

    let body = req.body;
    // console.log(req.body);
    if (!body.owner || !body.expires) {
        res.status(400);
        post_owner("Bad Request")
        res.json({message: "Bad Request"});
    } else {


        data[body.id]["is_owned"] = true;
        data[body.id]["owner"] = body.owner;
        data[body.id]["expires"] = body.expires;

        //console.log(data[body.id]);

        const fs = require("fs");
        fs.writeFile('./routes/data.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            // post_owner('The file has been saved!');
        });

        res.status(200).render('bookCard', {id: body.id, data: data[body.id]});

    }

    console.log(req.body);

})

router.get('/book/:id([0-9]{1,})', function (req, res, next) {
    if (req.query.type == "del") {
        // console.log("<redirect on get>")
        data[req.query.id]["is_owned"] = false;
        delet_owner("is_owned = false")
        const fs = require("fs");
        fs.writeFile('./routes/data.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            // post_owner('The file has been saved!');
        });

        res.redirect(`/book/${req.query.id}`);
        // res.render("bookCard", {id: req.query.id, data: data[req.query.id]})

    }
})

router.get('/:id([0-9]{1,})', function (req, res, next) {

    if (req.query._method == "DELETE") {

        const id = req.params.id;


        delete data[id];

        const fs = require("fs");
        fs.writeFile('./routes/data.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            // post_owner('The file has been saved!');
        });

        res.redirect("/");


    }
})

router.put("/sort1", (req, res, next) => {


    /// iv wanted to clone data but idk how

    //temp for filtring owners

    let temp = [];
    for (key in data) {
        if (key != "last_key") {
            if (data[key].is_owned == true) {
                temp.push({
                    value: data[key],
                    id: key
                })
            }
        }
    }

    //soreting array by expires

    a = temp.sort((a, b) => {
        return a.value.expires > b.value.expires
    })

    //making array to json

    b = {}
    for(i of a){
        b[`${i.id} `] = i.value; //important space after. else JSON sorting id's
    }

    //console.log(b)

    res.render("table", {data: b})

})


router.put("/sort2", (req, res, next) => {
    let temp = {};
    for (key in data) {
        if (key != "last_key") {
            if (data[key].is_owned == false) {
                temp[key] = data[key];
            }
        }
    }
    res.render("table", {data: temp})

})

router.put("/back", (req, res, next) => {
    res.render("table", {data: data})
})


// for(id_book in data) console.log(data[id_book]);

module.exports = router;
