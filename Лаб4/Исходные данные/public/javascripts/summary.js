

// alert(1)

$(document).ready(() => {

    $.ajax({
        type: "GET",
        url: "/sold/",
        success: (data) => {
            let sold = JSON.parse(data).sold;

            for(pic of sold) {
                console.log(pic)
                $('#soldPic').prepend(`<img src=images/${pic.Pic.file}.jpg width="200" height="200" class="my_img" 
title="Название: ${pic.Pic.name}. Минимальная цена: 100.        Кому продана: ${pic.id}.         За сколько: ${pic.price}.">`)
            }
        }
    })

    $(() => {
        $('img').tooltip({
            track: true
        })
    })

})