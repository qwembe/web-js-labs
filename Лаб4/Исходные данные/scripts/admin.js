/* @flow */


$.ajax({
    type: "GET",
    url: '/bidders/',
    success: (data: string, textStatus: string, jqXHR: JQueryXHR) => {
        // debugger
        var bidders: [number, string, number] | number = JSON.parse(data).data;
        console.log(bidders);
        for (let i: number = 0; i < bidders.length; i++) {
            if (bidders[i] == 0) continue;
            $('#bidders').append(`<h3>${bidders[i].name}</h3><div><p>Name: ${bidders[i].name}</p><p id=${bidders[i].money}>Money: ${bidders[2].money}</p><p>Id: ${bidders[i].id}</p></div>`);
        }
        makeBidCollaps();
    }
})

function makeBidCollaps() {
    $(() => {
        $('#bidders').accordion({
            collapsible: true
        })
    })

}


$.ajax({
    type: "GET",
    url: '/pict/',
    success: (data: string, textStatus: string, jqXHR: JQueryXHR) => {
        // debugger
        var pic = JSON.parse(data).data;
        console.log(pic);
        for (let i: number = 0; i < pic.length; i++) {
            $('#pictures').append(`<img src=images/${pic[i].file}.jpg width="200" height="200" class="my_img" 
title='Название: ${pic[i].name}. Минимальная цена: 100.        Кому продана: ${'-'}.         За сколько: ${'-'}.'>`);
            //debugger
            tipPic()
        }
    }
})


function tipPic() {
    $(() => {
        $(document).tooltip({
            track: true
        })
    })
}




//export default set;