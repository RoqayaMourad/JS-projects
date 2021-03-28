var img = document.getElementById("myImage");

document.addEventListener("mousemove", function(e){
    img.style.left = e.clientX;
    img.style.top = e.clientY;
});

/*
can be written: 
document.addEventListener("mousemove" , movex)
function movex(e){
    img.style.left = e.clientX;
    img.style.top = e.clientY;
}

another way:
document.addEventListener("mousemove" , function(e){
    movex(e)
})
function movex(e){
    img.style.left = e.clientX;
    img.style.top = e.clientY;
}

*/

