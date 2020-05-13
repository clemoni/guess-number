const minT = 5;
const maxT = 10;

let numbList = "";
const helper = document.querySelector(".helper h6");
// generate a new element span number from min to max
for (let i = minT; i <= maxT; i++) {
  if (i == maxT) {
    numbList += `<span id=num${i}>${i}</span>`;
  } else {
    numbList += `<span id=num${i}>${i}</span> - `;
  }
}

let helperList = document.createElement("p");
helperList.className = "helper-list";
helperList.innerHTML = numbList;
helper.appendChild(helperList);

function scratchUsedNumber(numGuessed) {
  const spanIdNumber = "num" + numGuessed;
  const helperListUI = document.querySelectorAll("p.helper-list span");
  helperListUI.forEach(function (span) {
    if (span.id == spanIdNumber) {
      span.style.color = "#686463";
      span.style.textDecoration = "line-through";
    }
  });
}

scratchUsedNumber(5);
scratchUsedNumber(6);
scratchUsedNumber(7);
