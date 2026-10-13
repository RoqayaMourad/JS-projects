var img = document.getElementById("myImage");

// pointer events work for mouse, touch and pen
document.addEventListener("pointermove", moveFlame);
document.addEventListener("pointerdown", moveFlame);

function moveFlame(e){
    // the image is position: fixed, so it uses viewport coordinates
    img.style.left = e.clientX + "px";
    img.style.top = e.clientY + "px";
}

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

