/* ==========================================================================
   PRAMOD KUMAR SHAH SUDI - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initCanvasBackground();
  initNavigation();
  initSkillsFilter();
  initAnimatedCounters();
  initProjectModals();
  initCertModals();
  initResumeModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeBtn.querySelector('i');
  
  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode!`, 'info');
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
    } else {
      themeIcon.className = 'fas fa-sun';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Typing Animation Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const targetEl = document.getElementById('typing-element');
  if (!targetEl) return;

  const phrases = [
    'Full-Stack Web Developer',
    'LeetCode 200+ Solved | DSA Explorer',
    'Java & C++ Problem Solver',
    'Cloud & AWS Infrastructure Enthusiast',
    'B.Tech CSE @ Parul University'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      targetEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      targetEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Interactive Particle Canvas Background
   -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 60);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.fillStyle = isDark ? `rgba(32, 178, 170, ${this.alpha})` : `rgba(2, 132, 199, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
          const strokeAlpha = (1 - dist / 120) * 0.2;
          ctx.strokeStyle = isDark ? `rgba(32, 178, 170, ${strokeAlpha})` : `rgba(56, 189, 248, ${strokeAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. Header & Navigation (Active link, Scrolled styling & Mobile Menu)
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for navigation
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileBtn.querySelector('i').className = 'fas fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Skills Filter & Progress Animation
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Animate progress bars on load/view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar-fill');
        if (fill) {
          fill.style.width = fill.getAttribute('data-level') + '%';
        }
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach((card) => observer.observe(card));

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Animated Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterEls = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterEls.forEach((counter) => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1500;
          const steps = 40;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const currentVal = (target / steps) * step;
            if (isDecimal) {
              counter.textContent = currentVal.toFixed(2);
            } else {
              counter.textContent = Math.floor(currentVal);
            }

            if (step >= steps) {
              counter.textContent = isDecimal ? target.toFixed(2) : target;
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* --------------------------------------------------------------------------
   7. Project Modals & Details
   -------------------------------------------------------------------------- */
const projectDetailsData = {
  lifesaver: {
    title: 'LifeSaver AI',
    subtitle: 'AI-Driven Smart Task Rescuing & Focus Coach',
    category: 'Hackathon Project',
    tech: ['React', 'JavaScript', 'AWS Cloud', 'RESTful API', 'Supportive AI Vibe'],
    description: `LifeSaver AI is a smart task management and focus rescue platform designed to reduce procrastination and last-minute stress. Featuring an empathetic AI coach named "Vibe", an interactive Urgency Heat Gauge, and real-time commitment tracking.`,
    highlights: [
      'Engineered an AI-driven responsive web application using React and JavaScript for dynamic task urgency scoring.',
      'Integrated "Vibe" supportive AI coach module to provide personalized encouragement and focus session adjustments.',
      'Architected deployment blueprints using AWS cloud infrastructure components with low-latency API integration.'
    ],
    github: 'https://github.com/Pramod3570955',
    liveDemo: 'https://lifesaver-ai-532111624600.asia-southeast1.run.app/',
    image: 'assets/images/lifesaver_ai.jpg'
  },
  construction: {
    title: 'Building Construction Planner',
    subtitle: 'Enterprise Management Workspace & EVM Analytics',
    category: 'Academic Project',
    tech: ['Java', 'MySQL', 'OOP Principles', 'EVM Analytics', 'BIM & Stock Alerts'],
    description: `An enterprise executive command dashboard tailored for construction site operations and multi-project management. Features real-time progress telemetry, EVM S-Curve cost analytics, risk matrix heatmaps, stock reorder threshold alerts, and site milestone scheduling.`,
    highlights: [
      'Designed a comprehensive Executive Command Dashboard executing OOP paradigms and modular Java backend logic.',
      'Programmed secure database schemas in MySQL to handle complex tabular structures, EVM financial metrics, and stock alerts.',
      'Formulated structural data validation modules to cross-verify resource quantities, material reorders, and milestone schedules.'
    ],
    github: 'https://github.com/Pramod3570955',
    image: 'assets/images/construction.jpg'
  },
  weather: {
    title: 'SkyGuru Weather',
    subtitle: 'C++ Computation Engine + React Frontend Integration',
    category: 'Personal Project',
    tech: ['React', 'C++', 'REST APIs', 'World Radar', 'Celestial Cycle'],
    description: `SkyGuru is an advanced weather analytics platform created by Pramod Shah. It pairs high-performance low-level C++ geolocation string payload parsing with an interactive React frontend showcasing live weather radar, celestial cycles (Sun & Moon), hourly/7-day forecasts, and real-time precipitation metrics.`,
    highlights: [
      'Conceptualized a multi-tiered architecture linking frontend React hooks directly to backend C++ parsing computation metrics.',
      'Implemented real-time world location radar, celestial sun/moon cycle tracking, and detailed hourly weather metrics.',
      'Constructed automated algorithms to handle geolocation JSON string parsing payload arrays natively inside low-level data blocks.'
    ],
    github: 'https://github.com/Pramod3570955/https-github.com-PramodShah-SkyGuru',
    image: 'assets/images/weather_app.jpg'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetailsData[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="margin-top: 1rem;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--accent-secondary); letter-spacing: 1px;">${data.category}</span>
          <h2 style="font-size: 2rem; margin: 0.4rem 0 1rem 0;">${data.title}</h2>
          <a href="${data.liveDemo || data.github}" target="_blank" rel="noopener noreferrer" title="Click to view live app">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--glass-border);" />
          </a>
          
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7;">${data.description}</p>
          
          <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem;">Key Architectural Highlights:</h4>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 1.8rem;">
            ${data.highlights.map(h => `<li style="margin-bottom: 0.6rem; display: flex; gap: 0.6rem; color: var(--text-secondary);"><i class="fas fa-check-circle" style="color: var(--accent-tertiary); margin-top: 4px;"></i> ${h}</li>`).join('')}
          </ul>

          <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem;">Technologies Used:</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
            ${data.tech.map(t => `<span style="padding: 0.3rem 0.8rem; background: rgba(32,178,170,0.15); color: var(--accent-primary); border-radius: 6px; font-weight: 600; font-size: 0.85rem;">${t}</span>`).join('')}
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${data.liveDemo ? `<a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm floating-btn-style"><i class="fas fa-external-link-alt"></i> Launch Live Application</a>` : ''}
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm"><i class="fab fa-github"></i> View GitHub Repository</a>
            <button class="btn btn-outline btn-sm modal-close-trigger"><i class="fas fa-times"></i> Close Window</button>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');

      modalBody.querySelectorAll('.modal-close-trigger').forEach(b => {
        b.addEventListener('click', () => modalOverlay.classList.remove('active'));
      });
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   7.1. Certificate Lightbox Modal
   -------------------------------------------------------------------------- */
function initCertModals() {
  const certModal = document.getElementById('cert-modal');
  const certCloseBtn = document.getElementById('cert-modal-close');
  const certImg = document.getElementById('cert-modal-img');
  const certTitle = document.getElementById('cert-modal-title');
  const certDesc = document.getElementById('cert-modal-desc');

  if (!certModal) return;

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      const imgEl = card.querySelector('.cert-img');
      const titleEl = card.querySelector('h3');
      const descEl = card.querySelector('.cert-content p');

      if (imgEl && certImg) certImg.src = imgEl.src;
      if (titleEl && certTitle) certTitle.textContent = titleEl.textContent;
      if (descEl && certDesc) certDesc.textContent = descEl.textContent;

      certModal.classList.add('active');
    });
  });

  if (certCloseBtn) {
    certCloseBtn.addEventListener('click', () => certModal.classList.remove('active'));
  }

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) certModal.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   8. Resume Preview Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeBtn = document.getElementById('view-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeClose = document.getElementById('resume-modal-close');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
    });
  }

  if (resumeClose && resumeModal) {
    resumeClose.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   9. Contact Form & Toast Notifications
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Contact Inquiry';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields in the contact form.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Message...`;

    try {
      const response = await fetch('https://formsubmit.co/ajax/pm3570955@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _subject: `New Portfolio Message from ${name}: ${subject}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        form.reset();
        showToast(`Thank you ${name}! Your message has been sent to Pramod's email.`, 'success');
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        form.reset();
        showToast(`Thank you ${name}! One-time activation required: check pm3570955@gmail.com to confirm.`, 'info');
      } else {
        throw new Error(data.message || 'Error transmitting message');
      }
    } catch (err) {
      console.warn('FormSubmit error, offering mailto fallback:', err);
      showToast(`Notice: Opening your email client to deliver message to pm3570955@gmail.com`, 'info');
      setTimeout(() => {
        window.location.href = `mailto:pm3570955@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Pramod,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      }, 1200);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-check-circle';
  if (type === 'error') iconClass = 'fa-exclamation-triangle';
  if (type === 'info') iconClass = 'fa-info-circle';

  toast.innerHTML = `<i class="fas ${iconClass}" style="font-size: 1.2rem;"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease-out';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
