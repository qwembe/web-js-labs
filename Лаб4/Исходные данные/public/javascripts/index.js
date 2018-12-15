/*       */


var post;
var postTimeTillEnd
var postTimeTillNext
var postSold
var postUpdatePrice
var postPause
var postStart
var id = 0;

$(document).ready(() => {



    $('#admin').on('click', () => {
        $.ajax({
            type: "GET",
            url: '/admin/',
            success: (data     , textStatus        , jqXHR           ) => {
                $('#container').html(data);
            }
        })
    })

    $('#member').click(() => {
        $.ajax({
            type: "GET",
            url: '/member/',
            success: (data     , textStatus        , jqXHR           ) => {
                $('#container').html(data);
            }
        })
    })

    $('#summary').click(() => {
        $.ajax({
            type: "GET",
            url: '/summary/',
            success: (data     , textStatus        , jqXHR           ) => {
                $('#container').html(data);
            }
        })
    })

    $(() => {
        $('#onlineInfo').draggable();
        // $('#onlineInfo').resizable();

    })

    post = function post(input,myTarget) {
        myTarget.contentWindow.postMessage({"type":"info","message": input},'*');
    }

    postTimeTillEnd = function post(input, myTarget) {
        myTarget.contentWindow.postMessage({"type":"timeTillEnd","message": input},'*');
    }
    postTimeTillNext = function post(input, myTarget) {
        myTarget.contentWindow.postMessage({"type":"timeTillNext","message": input},'*');
    }

    postSold = function post(input, myTarget) {
        //let data = input.value;
        myTarget.contentWindow.postMessage({"type":"sold","message": input},'*');
    }

    postUpdatePrice = function post(input, myTarget) {
        myTarget.contentWindow.postMessage({"type":"update","message": input},'*');
    }

    postPause = function post(input, myTarget) {
        myTarget.contentWindow.postMessage({"type":"pause","message": input},'*');
    }

    postStart = function post(input, myTarget) {
        myTarget.contentWindow.postMessage({"type":"start","message": input},'*');
    }

})








// require('./admin.js');

