function sort1() {

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("table_id").innerHTML = this.responseText;
        }
    };
    xhttp.open("PUT", `/sort1`, true);
    xhttp.send();

}

function sort2() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(document.getElementById("table_id").innerHTML);
            document.getElementById("table_id").innerHTML = this.responseText;
        }
    };
    xhttp.open("PUT", `/sort2`, true);
    xhttp.send();

}

function back() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(document.getElementById("table_id").innerHTML);
            document.getElementById("table_id").innerHTML = this.responseText;
        }
    };
    xhttp.open("PUT", `/back`, true);
    xhttp.send();

}


// document.ready(function(){
//     ("newOwner").click(function(){
//         ("newOwner").hide();
//     });
// });