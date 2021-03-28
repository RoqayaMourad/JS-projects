// COLOR FLIPPER
let main = document.getElementById("main");
changebg();
function changebg() {
    let bgColor =  "#" + Math.floor(Math.random() * 16777215).toString(16);
    main.style.backgroundColor = bgColor;
    document.getElementById("color").innerText = bgColor

}