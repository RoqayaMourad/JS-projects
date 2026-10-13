// COLOR FLIPPER
let main = document.getElementById("main");
changebg();
function changebg() {
    let bgColor =  "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, "0");
    main.style.backgroundColor = bgColor;
    document.getElementById("color").innerText = bgColor

}