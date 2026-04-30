// Smooth scrolling for navigation links and buttons
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Open external links in a new tab
function openLink(url) {
  window.open(url, '_blank');
}

// Navbar scroll effect for frosted glass appearance
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 0';
    navbar.style.background = 'rgba(255, 255, 255, 0.85)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.padding = '15px 0';
    navbar.style.background = 'rgba(255, 255, 255, 0.7)';
    navbar.style.boxShadow = 'none';
  }
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    if (pageYOffset >= sectionTop - navbarHeight - 20) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Settings Panel Logic
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('open');
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('theme-toggle');
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  }
}

// Accessibility Toggle
function toggleAccessibility() {
  const body = document.body;
  const accessBtn = document.getElementById('access-toggle');
  body.classList.toggle('accessibility-mode');
  
  if (body.classList.contains('accessibility-mode')) {
    accessBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Normal Text';
  } else {
    accessBtn.innerHTML = '<i class="fas fa-eye"></i> Larger Text';
  }
}

// Animation Speed Control
function updateAnimSpeed(value) {
  const mascot = document.querySelector('.mascot');
  if (mascot) {
    // Default is 6s. We'll map 0.5-3 to 12s-2s
    const duration = 6 / value;
    mascot.style.animationDuration = `${duration}s`;
  }
  
  // Also affect general transitions
  const root = document.documentElement;
  root.style.setProperty('--transition', `all ${0.3 / value}s ease`);
}

// Party Mode
let partyInterval;
function togglePartyMode() {
  const body = document.body;
  const partyBtn = document.getElementById('party-toggle');
  body.classList.toggle('party-mode');
  
  if (body.classList.contains('party-mode')) {
    partyBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Party';
    startConfetti();
  } else {
    partyBtn.innerHTML = '<i class="fas fa-birthday-cake"></i> Start Party!';
    stopConfetti();
  }
}

function startConfetti() {
  // Simple confetti effect using emojis
  partyInterval = setInterval(() => {
    const confetti = document.createElement('div');
    confetti.innerText = ['🎉', '✨', '🚀', '🤖', '⚙️'][Math.floor(Math.random() * 5)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
    confetti.style.zIndex = '3000';
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = 'transform 3s linear, opacity 3s linear';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }, 200);
}

function stopConfetti() {
  clearInterval(partyInterval);
}

// Realistic Mode Logic
let adInterval;
let isRealisticMode = false;

function toggleRealisticMode() {
  isRealisticMode = !isRealisticMode;
  const btn = document.getElementById('realistic-toggle');
  
  if (isRealisticMode) {
    btn.innerHTML = '<i class="fas fa-check"></i> Realism Active';
    btn.style.backgroundColor = '#dcfce7';
    btn.style.color = '#166534';
    showCookieBanner();
    startAds();
  } else {
    btn.innerHTML = '<i class="fas fa-ad"></i> Enable "Realism"';
    btn.style.backgroundColor = '';
    btn.style.color = '';
    removeCookiesAndAds();
  }
}

function showCookieBanner() {
  if (document.querySelector('.cookie-banner')) return;
  
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      <p><strong>🍪 Cookie Alert!</strong> We use fake cookies to ensure you have the most "realistic" experience possible. Do you accept these non-existent tracking files?</p>
    </div>
    <div class="cookie-actions">
      <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Accept All</button>
      <button class="btn-secondary" style="margin-left: 10px;" onclick="this.parentElement.parentElement.remove()">Reject</button>
    </div>
  `;
  document.body.appendChild(banner);
}

const ads = [
  { title: "FREE RAM!", body: "Download 128GB of extra RAM for your browser instantly! No hardware required.", btn: "DOWNLOAD NOW" },
  { title: "ROBOT OVERLORDS", body: "Join the Byte Bandits and help us build the future of robotics. 0% interest!", btn: "JOIN TEAM" },
  { title: "CAD SECRETS", body: "One weird trick to make your 3D prints never fail. Engineers HATE him!", btn: "LEARN MORE" },
  { title: "WIN A GPU!", body: "You are the 1,000,000th visitor! Click here to claim your RTX 5090 Ti.", btn: "CLAIM PRIZE" }
];

function startAds() {
  adInterval = setInterval(() => {
    if (!isRealisticMode) return;
    createAd();
  }, 8000);
}

function createAd() {
  const adData = ads[Math.floor(Math.random() * ads.length)];
  const ad = document.createElement('div');
  ad.className = 'popup-ad';
  
  // Random position
  const x = Math.random() * (window.innerWidth - 320);
  const y = Math.random() * (window.innerHeight - 200);
  ad.style.left = x + 'px';
  ad.style.top = y + 'px';
  
  ad.innerHTML = `
    <div class="ad-header">
      <span>ADVERTISEMENT</span>
      <span style="cursor:pointer" onclick="this.parentElement.parentElement.remove()">[X]</span>
    </div>
    <div class="ad-body">
      <h4>${adData.title}</h4>
      <p>${adData.body}</p>
      <button class="btn-ad" onclick="this.parentElement.parentElement.remove()">${adData.btn}</button>
    </div>
  `;
  
  document.body.appendChild(ad);
  
  // Auto remove after 10 seconds if not closed
  setTimeout(() => {
    if (ad.parentElement) ad.remove();
  }, 10000);
}

function removeCookiesAndAds() {
  clearInterval(adInterval);
  document.querySelectorAll('.cookie-banner, .popup-ad').forEach(el => el.remove());
}