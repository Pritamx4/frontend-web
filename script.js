const texts = [
  "🚀 Level Up Your Skills with Pritamx4",
  "💻Turning Code into Creativity 💡",
  "Pritam Singh",
  "HTML, CSS, JavaScript",
  "Think. Code. Create.",
  "Passion > Perfaction",
  "Always Learning, Always Building",
  "Zero to Hero Journey",
  "404: Limits NOt Found",
  "<Frontend Dev/>",
  "Booting up...",
  "System Online: Code Detected",
  "Next-gen UI Loding...",
  "Access Granted: Frontend Mode",
  "Digital Architect in Progress",
  // windows + . for emoji
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenTexts = 1000;
const typedText = document.getElementById("typedText");
function type() {
  if (charIndex < texts[textIndex].length) {
    typedText.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

// effective while mouse
// hovering over the bottom tab

// and hides it after a few seconds of inactivity
// document.addEventListener("DOMContentLoaded", () => {
//   const bottomTab = document.getElementById("bottomTab");
//   const toggleButton = bottomTab.querySelector(".toggle-btn");
//   const icon = document.getElementById("icon");
//   let hideTimeout;

//   bottomTab.addEventListener("mouseenter", () => {
//     clearTimeout(hideTimeout);
//     icon.classList.remove("fa-angle-up");
//     icon.classList.add("fa-angle-down");

//     bottomTab.classList.remove("hidden");
//     bottomTab.classList.add("shown");
//   });

//   bottomTab.addEventListener("mouseleave", () => {
//     hideTimeout = setTimeout(() => {
//       bottomTab.classList.add("hidden");
//       icon.classList.remove("fa-angle-down");
//       icon.classList.add("fa-angle-up");
//       bottomTab.classList.remove("shown");
//     }, 30);
//   });

//   hideTimeout = setTimeout(() => {
//     bottomTab.classList.add("hidden");
//     bottomTab.classList.remove("shown");
//     icon.classList.remove("fa-angle-down");
//     icon.classList.add("fa-angle-up");
//   }, 3000);
// });

// Toggle the bottom tab visibility
let hideTimeout;
function toggleBottomTab() {
  const tab = document.getElementById("bottomTab");
  const button = tab.querySelector(".toggle-btn");
  const icon = document.getElementById("icon");
  const isHidden = tab.classList.contains("hidden");

  if (isHidden) {
    tab.classList.remove("hidden");
    tab.classList.add("shown");
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
    button.classList.remove("rotate-icon");
  } else {
    tab.classList.add("hidden");
    tab.classList.remove("shown");
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
    button.classList.add("rotate-icon");
  }
}

// bottom tab multipule images&text animation starts

// const card1Images = [

//   {src: "images/robot.png", text: "Card1 text1"},
//   {src: "images/devilbg.png", text: "Card1 text2"},
//   {src: "images/devilbg2.png", text: "Card1 text3"},
//   {src: "images/bgrobot.jpeg", text: "Card1 text4"},
//   {src: "images/robot.png", text: "Card1 text5"},
//   {src: "images/robot.png", text: "Card1 text6"},
// ];

// const card2Images = [

//   {src: "images/robot.png", text: "Card1 text1"},
//   {src: "images/devilbg.png", text: "Card1 text2"},
//   {src: "images/devilbg2.png", text: "Card1 text3"},
//   {src: "images/bgrobot.jpeg", text: "Card1 text4"},
//   {src: "images/robot.png", text: "Card1 text5"},
//   {src: "images/robot.png", text: "Card1 text6"},
// ];

// let index = 0;
// function
// animateChanges(cardImgId,cardTextId, newSrc, newText)
// {
//    const img =
//    document.getElementById(cardImgId);
//    const text =
//    document.getElementById(cardTextId);

//    img.style.transform = "translateX(-100%)";
//    setTimeout(() => {
//     img.src = newSrc;
//     img.style.transform = "translateX(100%)";
//     setTimeout(() => {
//       img.style.transform = "translateX(0)";
//     }, 50);
//    }, 300);

//    text.style.transform = "translateY(-100%)";
//    setTimeout(() => {
//     text.innerText = newText;
//     text.style.transform = "translateY(100%)";
//     setTimeout(() => {
//       text.style.transform = "translate(0)";
//     }, 50);
//    }, 300);
// }

// function updateCards(){
//   index = (index + 1)%
//   card1Images.length;

//   animateChanges("card1-img","card1-text",
//   card1Images[index].src,
//   card1Images[index].text);

//   animateChanges("card2-img","card2-text",
//   card1Images[index].src,
//   card1Images[index].text);

// }

// updateCards();

// setInterval(updateCards,3000);

// bottom tab multipule images&text animation end
