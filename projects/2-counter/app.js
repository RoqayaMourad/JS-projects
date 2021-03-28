// two methods
// method one
let decreaseBtn = document.querySelector(".decrease");
let resetBtn = document.querySelector(".reset");
let increaseBtn = document.querySelector(".increase");
let value = document.getElementById("value");
let numberValue = parseInt(document.getElementById("value").innerText); 

decreaseBtn.addEventListener("click", function() {
  numberValue--;
  value.innerText = numberValue;
  value.style.color = ("red")
  });
resetBtn.addEventListener("click", function() {
  numberValue = 0;
  value.innerText = numberValue;

  });
increaseBtn.addEventListener("click", function() {
  numberValue++;
  value.innerText  = numberValue;
  value.style.color = ("green")
  });

// // method two
// let count = 0;
// const value = document.querySelector("#value");
// const btns = document.querySelectorAll(".btn");

// btns.forEach(function (btn) {
//   btn.addEventListener("click", function (e) {
//     const styles = e.currentTarget.classList;
//     if (styles.contains("decrease")) {
//       count--;
//     } else if (styles.contains("increase")) {
//       count++;
//     } else {
//       count = 0;
//     }

//     if (count > 0) {
//       value.style.color = "green";
//     }
//     if (count < 0) {
//       value.style.color = "red";
//     }
//     if (count === 0) {
//       value.style.color = "#222";
//     }
//     value.textContent = count;
//   });
// });