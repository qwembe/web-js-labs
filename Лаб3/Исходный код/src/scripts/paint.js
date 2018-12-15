
// no use
$('#checkbox1').click(function (event) {
    alert(event)
    if ($(this).attr('checked')) {
        alert('is checked');
    } else {
        alert('is not checked');
    }
})
