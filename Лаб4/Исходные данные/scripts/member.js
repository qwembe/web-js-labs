/* @flow */

var nick;
var limit;
var socket

$(document).ready(() => {


    $.ajax({
        type: "GET",
        url: "/getIds/",
        success: (data: string) => {
            let ids: Array<string> = JSON.parse(data).data;
            var src = ids.map(function (e) {
                return e.toString()
            });
            $('#mem_id').autocomplete({
                source: src
            })
        }
    })

    //$('#currentPic').hidden()
    if (id == 0) {
        $('#btn').on("click", () => {
            // alert(123)
            id = $('#mem_id').val();
            //alert(id)
            $.ajax({
                type: "GET",
                url: `/get_mem/${id}`,
                success: (data) => {
                    chat(JSON.parse(data).data.name)
                    afterBtnClickSucces(data);
                    $('#btn').disable()
                }
            })
        })
        loadCurImage();
    } else btn.disabled = true

    $('#widget').dialog({autoOpen: false});
    $("#widgetBtn").click(function () {
        $("#widget").dialog("open");
    })

    $('#addBtn').on('click', () => {
        //TODO alax to rise money
        rate = $("#value").text();
        $.ajax({
            type: "PUT",
            url: `/addPrice/${rate}`,
            success: (data) => {
            }
        })
    })

    $('#requestBtn').on('click', () => {
        //TODO alax to confirm buys
        $.ajax({
            type: "PUT",
            url: `/soldBy/${id}`,
            success: (data) => {
            }
        })
    })


    //TODO make href to page with id's goods

    //TODO make suumary page


    //TODO debugg and test

    //$('#slider').slider('value')
})

function afterBtnClickSucces(data) {

    var bid = JSON.parse(data).data
    nick = bid.name
    limit = bid.money;
    $('#hello-tab').text(`Привет ${nick}. Баланс: ${limit}`);
    // post(`${nick} присоединился`, onlineInfo)
    loadCurImage()
    //chat(nick)

}


function loadCurImage() {
    $.ajax({
        type: "GET",
        url: "/loadcur/",
        success: (data) => {
            let cur = JSON.parse(data).curPic;
            $("#currentPic").html(` `);
            $("#currentPic").append(` <img src='images/${cur.file}.jpg' style='max-width: 400px; max-height: 700px '><p>`);
            var handle = $("#value");

            $('#slider').slider({
                value: cur.minstep,
                min: cur.minstep,
                max: cur.maxstep,
                create: function () {
                    handle.text($(this).slider("value"));
                },
                slide: function (event, ui) {
                    handle.text(ui.value);
                }
            })

            post(`Текущий лот: ${cur.name} `, onlineInfo)
        }
    })
}

function chat(nick) {
    socket = io.connect('http://localhost:3030');
    socket.on('connect', () => {
        socket.json.send({"type": "connect", "name": nick})
        socket.on("message", (msg) => {
            if (msg.type == "connect") post(msg.message, onlineInfo);
            // if(msg.)
        })
        socket.on("time", (data) => {
            $('#timer').text(data)
        })
        socket.on('hello', (data) => {
            post(data, onlineInfo)
        })
        socket.on('nextPic', () => {

            loadCurImage()
        })

        socket.on('timeTillEnd', (data) => {
            postTimeTillEnd(data, onlineInfo)
        })

        socket.on('timeTillNext', (data) => {
            postTimeTillNext(data, onlineInfo)
        })

        socket.on('sold', (data) => {
            postSold(data, onlineInfo)
            requestBtn.disabled = true;
        })
        socket.on('updatePrice', (data) => {
            postUpdatePrice(data, onlineInfo)
            //requestBtn.disabled = true;
        })

        socket.on('pause', (data) => {
            requestBtn.disabled = true;
            widgetBtn.disabled = true;
            addBtn.disabled = true;
            postPause(data, onlineInfo)
        })

        socket.on('start', (data) => {
            requestBtn.removeAttribute('disabled');
            widgetBtn.removeAttribute('disabled');
            addBtn.removeAttribute('disabled');
            postStart(data, onlineInfo)
        })

        socket.on('end', (data) => {
            requestBtn.disabled = true;
            widgetBtn.disabled = true;
            addBtn.disabled = true;
            ;
            post(data, onlineInfo)
        })


    })
}


