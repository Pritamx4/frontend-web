// ========================================
// 1. NAVBAR FUNCTIONALITY
// ========================================

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const icon = document.getElementById('menuToggleIcon');

  navLinks.classList.toggle('show');

  if (navLinks.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

// Auto-close menu when a link is clicked (on mobile)
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#navLinks a');

  links.forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      const icon = document.getElementById('menuToggleIcon');

      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
});

// ========================================
// 2. HERO SECTION - TYPEWRITER EFFECT
// ========================================

const texts = [
  '🚀 Level Up Your Skills with Pritamx4',
  '💻Turning Code into Creativity 💡',
  'Pritam Singh',
  'HTML, CSS, JavaScript',
  'Think. Code. Create.',
  'Passion > Perfaction',
  'Always Learning, Always Building',
  'Zero to Hero Journey',
  '404: Limits NOt Found',
  '<Frontend Dev/>',
  'Booting up...',
  'System Online: Code Detected',
  'Next-gen UI Loding...',
  'Access Granted: Frontend Mode',
  'Digital Architect in Progress',
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenTexts = 1000;
const typedText = document.getElementById('typedText');

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

// Start typewriter effect on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

// ========================================
// 6. BOTTOM TAB - TERMINAL FUNCTIONALITY
// ========================================

// Auto-show bottom tab on hover and hide after inactivity
document.addEventListener('DOMContentLoaded', () => {
  const bottomTab = document.getElementById('bottomTab');
  const toggleButton = bottomTab.querySelector('.toggle-btn');
  const icon = document.getElementById('icon');
  let hideTimeout;

  bottomTab.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    icon.classList.remove('fa-angle-up');
    icon.classList.add('fa-angle-down');

    bottomTab.classList.remove('hidden');
    bottomTab.classList.add('shown');
  });

  bottomTab.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      bottomTab.classList.add('hidden');
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-up');
      bottomTab.classList.remove('shown');
    }, 30);
  });

  hideTimeout = setTimeout(() => {
    bottomTab.classList.add('hidden');
    bottomTab.classList.remove('shown');
    icon.classList.remove('fa-angle-down');
    icon.classList.add('fa-angle-up');
  }, 5000);
});

// Toggle the bottom tab visibility
let hideTimeout;
function toggleBottomTab() {
  const tab = document.getElementById('bottomTab');
  const button = tab.querySelector('.toggle-btn');
  const icon = document.getElementById('icon');
  const isHidden = tab.classList.contains('hidden');

  if (isHidden) {
    tab.classList.remove('hidden');
    tab.classList.add('shown');
    icon.classList.remove('fa-angle-up');
    icon.classList.add('fa-angle-down');
    button.classList.remove('rotate-icon');
  } else {
    tab.classList.add('hidden');
    tab.classList.remove('shown');
    icon.classList.remove('fa-angle-down');
    icon.classList.add('fa-angle-up');
    button.classList.add('rotate-icon');
  }
}

// Terminal typing effect and GitHub repo stats
const terminalElement = document.getElementById('terminal-text');
const statsContainer = document.getElementById('stats-container');
const progressBars = document.querySelectorAll('.progress-bar');
const percentTexts = document.querySelectorAll('.percent');

const messages = [
  '> ACCESSING REPO: frontend-web',
  '> ANALYZING SOURCE CODE...',
  '> CALCULATING REPO STATISTICS...',
  '> DEPLOYING SKILL METRICS... [COMPLETE]',
];

let msgIndex = 0;
let charPos = 0;
let repoData = [55, 35, 10]; 
// Fetch GitHub stats
async function fetchGitHubStats() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/Pritamx4/frontend-web/languages'
    );

    if (!response.ok) throw new Error('API Limit Reached');

    const data = await response.json();
    const totalBytes = Object.values(data).reduce((a, b) => a + b, 0);

    if (totalBytes > 0) {
      repoData = [
        Math.round(((data.HTML || 0) / totalBytes) * 100),
        Math.round(((data.CSS || 0) / totalBytes) * 100),
        Math.round(((data.JavaScript || 0) / totalBytes) * 100),
      ];
    }
  } catch (error) {
    console.warn('Using fallback data due to:', error.message);
  }
}

// Terminal typing effect
function typeEffect() {
  if (msgIndex < messages.length) {
    if (charPos < messages[msgIndex].length) {
      terminalElement.innerHTML += messages[msgIndex].charAt(charPos);
      charPos++;
      setTimeout(typeEffect, 30);
    } else {
      terminalElement.innerHTML += '<br>';
      msgIndex++;
      charPos = 0;
      setTimeout(typeEffect, 400);
    }
  } else {
    showStats();
  }
}

// Show statistics with animation
function showStats() {
  statsContainer.style.opacity = '1';
  statsContainer.style.transition = 'opacity 1s ease';

  setTimeout(() => {
    progressBars.forEach((bar, index) => {
      const val = repoData[index];
      const safeVal = isNaN(val) ? 0 : val;

      bar.style.width = safeVal + '%';
      if (percentTexts[index]) {
        percentTexts[index].innerText = safeVal + '%';
      }
    });
  }, 500);
}

// Initialize terminal effect on page load
window.onload = () => {
  fetchGitHubStats();
  typeEffect();
};
