$.ajax({
    //type: "PUT",
    url: "/dataset",
    success: function (data) {
        var settings = JSON.parse(data);
        let i = 0;

        $(document).ready(() => {
            $("#set").prepend($(`<p id="pause">Pause: ${settings.pause}</p>)`))
            $("#set").prepend($(`<p id="interval">Interval: ${settings.interval}</p>)`))
            $("#set").prepend($(`<p id="timeout">Timeout: ${settings.timeout}</p>)`))
            $("#set").prepend($(`<p id="time">Time: ${settings.time}</p>)`))
            $("#set").prepend($(`<p id="date">Date: ${settings.date}</p>)`))

            // for(key of settings){
            //     console.log(key)
            //     // $(`#${key}`).append($(`<input type="text" name=${key} value="">`))
            // }


            $("#date").after($('<input type="date" id="date2" name="date" >test'))
            $("#time").after($('<input type="time" id="time2" name="time" >test'))
            $("#timeout").after($('<input type="text" id="timeout2" name="timeout" >test'))
            $("#interval").after($('<input type="text" id="interval2" name="interval" >test'))
            $("#pause").after($('<input type="text" id="pause2" name="pause" >test'))

            $("#pause2").after($('<button type="submit" name="submit" id="btn"> submit </button>  '))

            // alert($("#date2").text());

            $("#btn").on('click', () => {
                    // console.log($("#date2").val() != "")
                    if ($("#date2").val() != "") $.ajax({
                        type: "PUT",
                        url: "/settings/",
                        data: {date: $("#date2").val()},
                        success: function () {
                            $("#date").text(`Date: ${$("#date2").val()}`)
                        }
                    })
                    if ($("#time2").val() != "") $.ajax({
                        type: "PUT",
                        url: "/settings/",
                        data: {time: $("#time2").val()},
                        success: function () {
                            $("#time").text(`Time: ${$("#time2").val()}`)
                        }
                    })
                    if ($("#timeout2").val() != "") $.ajax({
                        type: "PUT",
                        url: "/settings/",
                        data: {timeout: $("#timeout2").val()},
                        success: function () {
                            $("#timeout").text(`Timeout: ${$("#timeout2").val()}`)
                        }
                    })
                    if ($("#interval2").val() != "") $.ajax({
                        type: "PUT",
                        url: "/settings/",
                        data: {interval: $("#interval2").val()},
                        success: function () {
                            $("#interval").text(`Interval: ${$("#interval2").val()}`)
                        }
                    })
                    if ($("#pause2").val() != "") $.ajax({
                        type: "PUT",
                        url: "/settings/",
                        data: {pause: $("#pause2").val()},
                        success: function () {
                            $("#pause").text(`Pause: ${$("#pause2").val()}`)
                        }
                    })


                }
            )


        })
    }
});