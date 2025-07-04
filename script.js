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












let hideTimeout;
function toggleBottomTab(){
  const tab = 
  document.getElementById("bottomTab");
  const button = 
  tab.querySelector(".toggle-btn");
  const arrowIcon = 
  document.getElementById("arrowIcon");
  const isHidden = 
  tab.classList.contains("hidden");

  if (isHidden){
    tab.classList.remove("hidden");
    arrowIcon.innerHTML = "^";
    button.classList.remove("rotate-icon");

    clearTimeout(hideTimeout);
    hideTimeout = 
    setTimeout(() => {
      tab.classList.add("rotate-icon");
    },10000);
  } else {
    tab.classList.add("hidden");
    arrowIcon.innerHTML = 
    "!";

    button.classList.add("rotate-icon");
  }
}