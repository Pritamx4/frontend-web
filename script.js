console.log('Script loaded!');

// Loading Screen Terminal Lines
const terminalLines = [
  '> $ git clone Pritamx4/CYBERDECK_Px4',
  '> COMPILING SOURCE [██████████████] 100%',
  '> DEPLOYING TO CYBERDECK_PX4...'
];

let currentLine = 0;
let progress = 0;

function showLoadingScreen() {
  const terminalOutput = document.getElementById('terminalOutput');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const progressContainer = document.querySelector('.progress-container');
  
  if (!terminalOutput || !progressBar || !progressText || !progressContainer) {
    console.error('Loading screen elements not found');
    hideLoadingScreen();
    return;
  }
  
  console.log('Loading screen started');
  
  progressContainer.style.display = 'none';
  progressText.style.display = 'none';
  
  setTimeout(() => {
    console.log('Starting terminal typing');
    let lineIndex = 0;
    
    function typeNextLine() {
      if (lineIndex < terminalLines.length) {
        const line = document.createElement('div');
        line.className = 'line';
        terminalOutput.appendChild(line);
        
        let charIndex = 0;
        const currentText = terminalLines[lineIndex];
        
        function typeCharacter() {
          if (charIndex < currentText.length) {
            line.textContent += currentText.charAt(charIndex);
            try { playTypingSound(); } catch(e) { }
            charIndex++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            setTimeout(typeCharacter, 25); 
          } else {
            lineIndex++;
            setTimeout(typeNextLine, 150); 
          }
        }
        typeCharacter();
      } else {
        console.log('All lines typed, clearing...');
        setTimeout(() => {
          terminalOutput.innerHTML = '';
          setTimeout(() => {
            const accessLine = document.createElement('div');
            accessLine.className = 'line access-granted';
            terminalOutput.appendChild(accessLine);
            
            let accessCharIndex = 0;
            const accessText = '> ACCESS GRANTED..';
            
            function typeAccessChar() {
              if (accessCharIndex < accessText.length) {
                accessLine.textContent += accessText.charAt(accessCharIndex);
                try { playTypingSound(); } catch(e) {}
                accessCharIndex++;
                setTimeout(typeAccessChar, 40);
              } else {
                console.log('Starting progress bar');
                setTimeout(() => {
                  progressContainer.style.display = 'block';
                  progressText.style.display = 'block';
                  
                  const progressDuration = 1200;
                  const startTime = performance.now();
                  
                  function updateProgress(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progressPercent = Math.min((elapsed / progressDuration) * 100, 100);
                    
                    progressBar.style.width = progressPercent + '%';
                    progressText.textContent = Math.floor(progressPercent) + '%';
                    
                    if (progressPercent < 100) {
                      requestAnimationFrame(updateProgress);
                    } else {
                      console.log('Loading complete');
                      setTimeout(hideLoadingScreen, 200);
                    }
                  }
                  requestAnimationFrame(updateProgress);
                }, 400);
              }
            }
            typeAccessChar();
          }, 200);
        }, 400);
      }
    }
    typeNextLine();
  }, 1000);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Animate navbar entry after loading screen
  setTimeout(() => {
    animateNavbarEntry();
    
    // Initialize Matrix Rain after loading is complete
    setTimeout(() => {
      initMatrixRain();
    }, 500);
    
    // Add glitch effect to typewriter
    setTimeout(() => {
      addGlitchEffect();
    }, 1000);
  }, 300);
}

// Navbar Entry Animation with GSAP
function animateNavbarEntry() {
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded for navbar animation');
    return;
  }

  const navbarLogo = document.getElementById('navbarLogo');
  const navItems = document.querySelectorAll('.nav-item');

  // Animate logo from top
  gsap.from(navbarLogo, {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Animate nav items from right, one by one
  navItems.forEach((item, index) => {
    gsap.from(item, {
      x: 100,
      opacity: 0,
      duration: 0.6,
      delay: 0.3 + (index * 0.1),
      ease: 'power2.out'
    });
  });
}

// Hide/Show Navbar Links on Scroll (keep logo visible)
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
  if (typeof gsap === 'undefined') return;
  
  // Clear previous timeout
  clearTimeout(scrollTimeout);
  
  // Debounce scroll event
  scrollTimeout = setTimeout(() => {
    const navLinks = document.querySelector('.nav-links');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply on desktop (not in mobile menu)
    if (window.innerWidth > 768) {
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down - hide links
        gsap.to('.nav-links', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        });
      } else {
        // Scrolling up - show links
        gsap.to('.nav-links', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, 50); // 50ms debounce
});

// Sound System
let audioContext;
let soundEnabled = true;

function initAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function createSound(freq, type, duration, gain) {
  if (!soundEnabled) return;
  initAudio();
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  osc.frequency.value = freq;
  osc.type = type;
  gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + duration);
}

function playBeep() { createSound(800, 'sine', 0.1, 0.1); }
function playTypingSound() { createSound(600, 'square', 0.08, 0.08); }
function playHoverSound() { createSound(400, 'square', 0.05, 0.05); }

document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    soundEnabled = !soundEnabled;
    showToast(soundEnabled ? 'Sound ON' : 'Sound OFF', 'info');
  }
});

console.log('Setting up window load event');

// Make sure loading starts even if images fail to load
let loadingStarted = false;

window.addEventListener('load', () => {
  if (loadingStarted) return;
  loadingStarted = true;
  console.log('Window loaded!');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    console.log('Calling showLoadingScreen');
    showLoadingScreen();
  }, 100);
});

// Fallback in case load event doesn't fire
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!loadingStarted) {
      loadingStarted = true;
      console.log('DOMContentLoaded fallback triggered');
      document.body.style.overflow = 'hidden';
      showLoadingScreen();
    }
  }, 500);
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => link.addEventListener('mouseenter', playHoverSound));
});

// Initialize EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Mobile Menu with GSAP
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.querySelector('.menu-icon');
  const menuItems = document.querySelectorAll('.nav-item');

  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded');
    navLinks.classList.toggle('show');
    return;
  }

  if (!navLinks.classList.contains('show')) {
    navLinks.classList.add('show');
    menuIcon.classList.add('active');

    gsap.to(navLinks, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    menuItems.forEach((item, index) => {
      gsap.fromTo(item, 
        { opacity: 0, x: '100%' },
        { opacity: 1, x: 0, duration: 0.6, delay: index * 0.12, ease: 'power3.out' }
      );
    });
  } else {
    menuIcon.classList.remove('active');

    menuItems.forEach((item, index) => {
      gsap.to(item, { opacity: 0, x: '100%', duration: 0.4, delay: index * 0.05, ease: 'power2.in' });
    });

    gsap.to(navLinks, {
      opacity: 0,
      duration: 0.3,
      delay: 0.3,
      ease: 'power2.in',
      onComplete: () => navLinks.classList.remove('show')
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#navLinks a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      if (navLinks.classList.contains('show')) toggleMenu();
    });
  });
});

// Hero Typewriter Effect
const texts = [
  '⚡ SYSTEM INITIALIZING...',
  '🔐 ACCESS GRANTED: CYBERDECK_PX4',
  '💻 NEURAL INTERFACE ACTIVE',
  '🌐 PRITAM SINGH | DIGITAL ARCHITECT',
  '🚀 HTML • CSS • JAVASCRIPT • REACT',
  '⚙️ COMPILING DIGITAL DREAMS...',
  '🎯 THINK • CODE • EXECUTE',
  '🔥 PASSION > PERFECTION',
  '📡 ALWAYS LEARNING • ALWAYS BUILDING',
  '🎮 ZERO TO HERO PROTOCOL',
  '⚠️ ERROR 404: LIMITS NOT FOUND',
  '💾 <FRONTEND_DEV/>',
  '🔋 LOADING NEXT-GEN UI...',
  '🌟 QUANTUM CODE DETECTED',
  '🎨 ARCHITECTING THE IMPOSSIBLE',
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

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// Contact Message Functionality
const sendIcon = document.querySelector('.send-icon');
const messageInput = document.querySelector('.message-input');
let isInputVisible = false;

sendIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (!isInputVisible) {
    messageInput.classList.remove('hide');
    messageInput.classList.add('show');
    isInputVisible = true;
    messageInput.focus();
  } else {
    const message = messageInput.value.trim();
    if (message) {
      sendIcon.classList.add('sending');
      
      const templateParams = {
        message: message,
        from_name: 'Portfolio Visitor',
        to_name: 'Pritam Singh'
      };
      
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
          messageInput.value = '';
          messageInput.classList.remove('show');
          messageInput.classList.add('hide');
          sendIcon.classList.remove('sending');
          isInputVisible = false;
        }, (error) => {
          console.error('FAILED...', error);
          showToast('Failed to send message. Please try again.', 'error');
          sendIcon.classList.remove('sending');
        });
    } else {
      showToast('Please enter a message first!', 'error');
    }
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.message-container') && isInputVisible) {
    messageInput.classList.remove('show');
    messageInput.classList.add('hide');
    isInputVisible = false;
  }
});

// Bottom Tab Terminal
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

// Terminal Repo Stats
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

async function fetchGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/repos/Pritamx4/frontend-web/languages');
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

function showStats() {
  statsContainer.style.opacity = '1';
  statsContainer.style.transition = 'opacity 1s ease';

  setTimeout(() => {
    progressBars.forEach((bar, index) => {
      const val = repoData[index];
      const safeVal = isNaN(val) ? 0 : val;
      bar.style.width = safeVal + '%';
      if (percentTexts[index]) percentTexts[index].innerText = safeVal + '%';
    });
  }, 500);
}

window.onload = () => {
  fetchGitHubStats();
  typeEffect();
};

// Skills Animation Observer
const skillCards = document.querySelectorAll('.skill-card');
const skillProgressBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar) {
        const targetWidth = progressBar.getAttribute('data-progress');
        setTimeout(() => progressBar.style.width = targetWidth + '%', 200);
      }
    }
  });
}, observerOptions);

skillCards.forEach(card => skillsObserver.observe(card));

// ========================================
// MATRIX RAIN EFFECT
// ========================================
function initMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00fff7';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 35);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ========================================
// GLITCH EFFECT ON TYPEWRITER
// ========================================
function addGlitchEffect() {
  const typedText = document.getElementById('typedText');
  if (!typedText) return;

  setInterval(() => {
    if (Math.random() > 0.95) {
      typedText.classList.add('glitch');
      setTimeout(() => {
        typedText.classList.remove('glitch');
      }, 300);
    }
  }, 3000);
}

// ========================================
// PROJECT CARD 3D TILT EFFECT
// ========================================
function init3DTiltCards() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `translateY(-8px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    init3DTiltCards();
  }, 1000);
});

// ========================================
// GSAP SKILL BARS ANIMATION ON SCROLL
// ========================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);

  // Only apply GSAP animations on desktop (not mobile)
  if (window.innerWidth > 768) {
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
      const progressBar = card.querySelector('.skill-progress');
      const targetWidth = progressBar.getAttribute('data-progress');

      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });

      gsap.to(progressBar, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
        width: targetWidth + '%',
        duration: 1.5,
        delay: index * 0.1 + 0.3,
        ease: 'power2.out'
      });
    });
  } else {
    // On mobile, just set progress bars to their target width immediately
    document.querySelectorAll('.skill-card').forEach(card => {
      const progressBar = card.querySelector('.skill-progress');
      const targetWidth = progressBar.getAttribute('data-progress');
      progressBar.style.width = targetWidth + '%';
    });
  }
}

// ========================================
// SCROLL INDICATOR - HIDE ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    if (window.scrollY > 100) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }
});

// Smooth scroll to next section on click
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  document.querySelector('#section-about')?.scrollIntoView({ behavior: 'smooth' });
});
