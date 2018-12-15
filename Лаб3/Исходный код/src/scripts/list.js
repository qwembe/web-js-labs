var m_data;
$(document).ready(() => {
    $.ajax({
        url: "/datapic",
        success: function (data) {
            m_data = JSON.parse(data).mdata;
            let i = 0;
            while (i < m_data.length) {
                // $(`#li${i}`).text("Hello!")
                //
                // pic = m_data[i];
                // $(`olid`).find("#li0").prepend($("li").attr("id",`#li${i}`))
                i++

                let pic = m_data[i - 1];
                $("#olid").append(`<li id=${i - 1}><img src=images/ico/${pic.file}.ico><a href=img/${i - 1}> ${pic.name} </a></li>`);
            }
        }
    })
})












