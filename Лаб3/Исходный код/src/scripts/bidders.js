var m_data;
$(document).ready(() => {
    $.ajax({
        url: "/databid",
        success: function (data) {
            m_data = JSON.parse(data).data;
            let i = 0;
            console.log(m_data);
            while (i < m_data.length) {
                i++
                let bid = m_data[i - 1];

                if(bid==0){continue;}
                $("#olid").append(`<li id=${bid.id}>
    <p> Name: ${bid.name}
    <p> Money: ${bid.money}
    <form action=/bid/${bid.id} method="POST">
        <input type="text" name="money">
    </form>
    <form action=/bid/${bid.id} method="GET">
        <button type="submit" name="delete" value=${bid.id}> delete member
    </form>

</li>`).on("click", () => {
                    windows.location.reload();
                });
            }
            $("#olid").append(`<li>
<form action=/bid/new method="POST">
    New member!
     Name: <input type="text" name="name" val="Andrei">
     Money: <input type="text" name="money" val="1000">
    <button type="submit"> submit
    
</form>
</li>`)


        }
    })
})
