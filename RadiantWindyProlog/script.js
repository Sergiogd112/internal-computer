setInterval(function() {
    html.body.backgroundImage = "url('testimage.jpg')";
}, 1000);
function download(){
    url="testimage.jpg";
    document.getElementById('my_iframe').src = url;
}
function config(){}