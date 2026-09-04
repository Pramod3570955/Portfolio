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
  initAIRobotAssistant();
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

/* --------------------------------------------------------------------------
   10. AI Robot Assistant (ChatGPT-Style Interactive Portfolio Guide)
   -------------------------------------------------------------------------- */
function initAIRobotAssistant() {
  const triggerBtn = document.getElementById('ai-robot-trigger');
  const chatWidget = document.getElementById('ai-chat-widget');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const minimizeBtn = document.getElementById('ai-chat-minimize-btn');
  const resetBtn = document.getElementById('ai-chat-reset-btn');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const inputForm = document.getElementById('ai-chat-input-form');
  const inputField = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const typingIndicator = document.getElementById('ai-typing-indicator');
  const tooltip = document.getElementById('ai-robot-tooltip');
  const suggestionChips = document.querySelectorAll('.ai-chip');

  if (!triggerBtn || !chatWidget) return;

  let isChatOpen = false;
  let hasInteracted = false;

  // Toggle chat widget
  function toggleChat(open) {
    isChatOpen = typeof open === 'boolean' ? open : !isChatOpen;
    if (isChatOpen) {
      chatWidget.classList.add('active');
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
      if (tooltip) tooltip.classList.add('hidden');
      setTimeout(() => inputField && inputField.focus(), 300);
      if (!hasInteracted) {
        hasInteracted = true;
        renderWelcomeMessage();
      }
    } else {
      chatWidget.classList.remove('active');
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  triggerBtn.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => toggleChat(false));

  // Reset conversation
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      renderWelcomeMessage();
      showToast("Conversation cleared", "info");
    });
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isChatOpen) {
      toggleChat(false);
    }
  });

  // Welcome Message
  function renderWelcomeMessage() {
    const welcomeHtml = `
      <p>Hi! I'm <strong>Pramod's AI Assistant</strong> 🤖</p>
      <p>Ask me anything about Pramod, his skills, projects, experience, or portfolio. You can also ask me to navigate directly to any section!</p>
    `;
    appendMessage('assistant', welcomeHtml, [
      { text: '⚡ Who is Pramod?', query: 'Who is Pramod?' },
      { text: '💼 Projects', query: 'Show me projects' },
      { text: '🛠️ Skills', query: 'What skills does Pramod have?' },
      { text: '📄 Resume', query: 'Show resume' }
    ]);
  }

  // Suggestion Chips Click
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) handleUserQuery(query);
    });
  });

  // Handle Input Submission
  if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = inputField.value.trim();
      if (!query) return;
      handleUserQuery(query);
    });
  }

  // Process User Query
  function handleUserQuery(query) {
    appendMessage('user', escapeHtml(query));
    inputField.value = '';
    inputField.disabled = true;
    sendBtn.disabled = true;

    // Show typing indicator & scroll
    if (typingIndicator) {
      typingIndicator.style.display = 'flex';
      messagesContainer.appendChild(typingIndicator);
      scrollChatToBottom();
    }

    // Dynamic delay for realistic AI feel
    const delay = Math.min(800, Math.max(450, query.length * 15));

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';

      const response = generateAIResponse(query);
      appendMessage('assistant', response.text, response.actions);

      inputField.disabled = false;
      sendBtn.disabled = false;
      inputField.focus();
      scrollChatToBottom();

      // Execute automated navigation if requested
      if (response.autoNavigate) {
        handleAutoNavigation(response.autoNavigate);
      }
    }, delay);
  }

  // Append message bubble
  function appendMessage(sender, contentHtml, actions = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;

    if (sender === 'assistant') {
      msgDiv.innerHTML = `
        <div class="ai-msg-avatar">
          <img src="assets/images/ai_robot.jpg" alt="AI Robot">
        </div>
        <div class="ai-msg-bubble">
          ${contentHtml}
          ${renderActionsHtml(actions)}
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="ai-msg-bubble">
          ${contentHtml}
        </div>
      `;
    }

    messagesContainer.appendChild(msgDiv);
    bindActionButtons(msgDiv);
    scrollChatToBottom();
  }

  function renderActionsHtml(actions) {
    if (!actions || actions.length === 0) return '';
    const btns = actions.map(act => {
      if (act.query) {
        return `<button class="ai-action-btn ai-action-query" data-query="${escapeHtml(act.query)}">${act.text}</button>`;
      } else if (act.scroll) {
        return `<button class="ai-action-btn ai-action-scroll" data-target="${act.scroll}">${act.text}</button>`;
      } else if (act.resume) {
        return `<button class="ai-action-btn ai-action-resume">${act.text}</button>`;
      } else if (act.url) {
        return `<a href="${act.url}" target="_blank" rel="noopener noreferrer" class="ai-action-btn">${act.text}</a>`;
      }
      return '';
    }).join('');

    return `<div class="ai-msg-actions">${btns}</div>`;
  }

  function bindActionButtons(container) {
    container.querySelectorAll('.ai-action-query').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (query) handleUserQuery(query);
      });
    });

    container.querySelectorAll('.ai-action-scroll').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if (target) {
          smoothScrollTo(target);
          if (window.innerWidth < 600) toggleChat(false);
        }
      });
    });

    container.querySelectorAll('.ai-action-resume').forEach(btn => {
      btn.addEventListener('click', () => {
        const resumeModal = document.getElementById('resume-modal');
        if (resumeModal) {
          resumeModal.classList.add('active');
          if (window.innerWidth < 600) toggleChat(false);
        }
      });
    });
  }

  function scrollChatToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function smoothScrollTo(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleAutoNavigation(navType) {
    setTimeout(() => {
      if (navType === 'projects') smoothScrollTo('#projects');
      else if (navType === 'skills') smoothScrollTo('#skills');
      else if (navType === 'contact') smoothScrollTo('#contact');
      else if (navType === 'about') smoothScrollTo('#about');
      else if (navType === 'competitive') smoothScrollTo('#competitive');
      else if (navType === 'certifications') smoothScrollTo('#certifications');
      else if (navType === 'resume') {
        const resumeModal = document.getElementById('resume-modal');
        if (resumeModal) resumeModal.classList.add('active');
      }
    }, 400);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ------------------------------------------------------------------------
  // AI Knowledge Base & Natural Language Query Processor
  // ------------------------------------------------------------------------
  function generateAIResponse(rawQuery) {
    const q = rawQuery.toLowerCase().trim();

    // 1. Navigation Commands
    if (q.includes('show me projects') || q.includes('go to projects') || q === 'projects' || q === 'project' || q.includes('view projects')) {
      return {
        text: `Navigating you directly to Pramod's <strong>Featured Projects</strong> section! Here you can find LifeSaver AI, Building Construction Planner, and SkyGuru Weather.`,
        actions: [
          { text: '📂 Projects Section', scroll: '#projects' },
          { text: '🚀 Launch LifeSaver AI', url: 'https://lifesaver-ai-532111624600.asia-southeast1.run.app/' }
        ],
        autoNavigate: 'projects'
      };
    }

    if (q.includes('show me skills') || q.includes('go to skills') || q === 'skills' || q.includes('view skills')) {
      return {
        text: `Scrolling down to the <strong>Technical Skills</strong> section! You can explore Pramod's proficiency in Java, C++, React, SQL, AWS, and DSA.`,
        actions: [
          { text: '🛠️ Skills Section', scroll: '#skills' }
        ],
        autoNavigate: 'skills'
      };
    }

    if (q.includes('contact pramod') || q.includes('go to contact') || q === 'contact' || q.includes('send message')) {
      return {
        text: `Taking you to the <strong>Contact</strong> section! You can send an email to <strong>pm3570955@gmail.com</strong> or fill out the direct contact form.`,
        actions: [
          { text: '📬 Contact Form', scroll: '#contact' },
          { text: '📧 Send Email', url: 'mailto:pm3570955@gmail.com' }
        ],
        autoNavigate: 'contact'
      };
    }

    if (q.includes('show resume') || q.includes('download resume') || q.includes('view resume') || q === 'resume' || q === 'cv') {
      return {
        text: `Opening Pramod's <strong>Interactive Resume Modal</strong> for you! You can read all academic details or click <em>Print / Save as PDF</em>.`,
        actions: [
          { text: '📄 Open Resume Modal', resume: true }
        ],
        autoNavigate: 'resume'
      };
    }

    // 2. Greetings
    if (/^(hi|hello|hey|greetings|hola|namaste|sup|yo)\b/i.test(q)) {
      return {
        text: `Hello! 👋 I'm Pramod's personal AI Assistant. How can I help you today? I can answer questions about Pramod's <strong>skills</strong>, <strong>projects</strong>, <strong>200+ LeetCode solutions</strong>, or guide you through his portfolio!`,
        actions: [
          { text: '⚡ Who is Pramod?', query: 'Who is Pramod?' },
          { text: '💼 His Projects', query: 'Show me his projects' },
          { text: '🛠️ Top Skills', query: 'What skills does Pramod have?' }
        ]
      };
    }

    // 3. Who is Pramod / About / Background / Location
    if (q.includes('who is pramod') || q.includes('who are you') || q.includes('about') || q.includes('bio') || q.includes('profile') || q.includes('tell me about')) {
      return {
        text: `<strong>Pramod Kumar Shah Sudi</strong> is an ambitious Computer Science & Engineering undergraduate at <strong>Parul University</strong> (Current CGPA: <strong>8.09 / 10.00</strong>) based in <strong>Vadodara, Gujarat, India</strong>.<br><br>
        He is a dedicated problem solver with over <strong>200+ algorithmic solutions on LeetCode</strong>, passionate about architecting scalable full-stack web applications, cloud backends with AWS, and low-level C++ parsing engines.`,
        actions: [
          { text: '👤 About Section', scroll: '#about' },
          { text: '💼 View Projects', scroll: '#projects' },
          { text: '📄 View Resume', resume: true }
        ]
      };
    }

    // 4. LifeSaver AI Specific
    if (q.includes('lifesaver') || q.includes('healthcare') || q.includes('vibe')) {
      return {
        text: `<strong>LifeSaver AI</strong> is an AI-driven smart task rescuing and focus platform built by Pramod!<br><br>
        • <strong>Tech Stack</strong>: React, JavaScript, AWS Cloud, RESTful APIs.<br>
        • <strong>Key Features</strong>: Features an empathetic AI coach named "Vibe", a real-time Urgency Heat Gauge, dynamic task urgency scoring, and cloud auto-scaling.<br>
        • <strong>Live Demo</strong>: Deployed and running live on Google Cloud!`,
        actions: [
          { text: '🚀 Launch LifeSaver AI ↗', url: 'https://lifesaver-ai-532111624600.asia-southeast1.run.app/' },
          { text: '📂 Projects Section', scroll: '#projects' }
        ]
      };
    }

    // 5. SkyGuru Weather Specific
    if (q.includes('skyguru') || q.includes('weather')) {
      return {
        text: `<strong>SkyGuru Weather</strong> is an advanced weather analytics platform engineered by Pramod!<br><br>
        • <strong>Tech Stack</strong>: React, C++, REST APIs, JSON Parsing.<br>
        • <strong>Architecture</strong>: Multi-tiered system linking React frontend hooks directly to low-level C++ parsing computation metrics for high performance.<br>
        • <strong>Features</strong>: Live radar, celestial Sun & Moon cycle tracking, and hourly/7-day forecast analytics.`,
        actions: [
          { text: '⭐ View GitHub Repo ↗', url: 'https://github.com/Pramod3570955/https-github.com-PramodShah-SkyGuru' },
          { text: '📂 Projects Section', scroll: '#projects' }
        ]
      };
    }

    // 6. Construction Building Software Specific
    if (q.includes('construction') || q.includes('building planner') || q.includes('erp')) {
      return {
        text: `<strong>Building Construction Planner</strong> is an enterprise management software tailored for construction sites and multi-project operations.<br><br>
        • <strong>Tech Stack</strong>: Java, MySQL, OOP Principles.<br>
        • <strong>Features</strong>: Executive Command Dashboard with EVM S-Curve cost analytics, risk matrix heatmaps, material stock reorder alerts, and localized inventory tracking.`,
        actions: [
          { text: '📂 Projects Section', scroll: '#projects' }
        ]
      };
    }

    // 7. General Projects
    if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('apps') || q.includes('application')) {
      return {
        text: `Pramod has engineered 3 core featured projects:<br><br>
        1. <strong>LifeSaver AI</strong> (Hackathon Project): AI-driven task rescuing & focus coach with "Vibe" AI assistant.<br>
        2. <strong>Building Construction Planner</strong> (Academic Project): Enterprise Java & MySQL ERP with EVM S-Curve analytics.<br>
        3. <strong>SkyGuru Weather</strong> (Personal Project): C++ computation engine linked to a modern React frontend with live radar.`,
        actions: [
          { text: '🚀 Launch LifeSaver AI ↗', url: 'https://lifesaver-ai-532111624600.asia-southeast1.run.app/' },
          { text: '📂 Explore Projects Section', scroll: '#projects' }
        ]
      };
    }

    // 8. Java & OOP
    if (q.includes('java') || q.includes('oop')) {
      return {
        text: `Pramod possesses strong expertise in <strong>Java</strong> and <strong>Object-Oriented Programming (OOP)</strong>:<br><br>
        • Applied OOP paradigms to design enterprise solutions like the <strong>Building Construction Planner</strong>.<br>
        • Implements complex algorithms, trees, arrays, and two-pointer tracking questions on LeetCode utilizing Java.<br>
        • Proficient in secure database integration with MySQL and multi-threaded business logic.`,
        actions: [
          { text: '🛠️ View Skills', scroll: '#skills' },
          { text: '🏆 LeetCode Stats', scroll: '#competitive' }
        ]
      };
    }

    // 9. DSA & Competitive Programming (LeetCode, HackerRank, Coding Ninjas)
    if (q.includes('dsa') || q.includes('leetcode') || q.includes('algorithm') || q.includes('hackerrank') || q.includes('coding') || q.includes('problem')) {
      return {
        text: `Pramod is a proven algorithmic problem solver:<br><br>
        • <strong>LeetCode</strong>: Solved <strong>200+ questions</strong> focusing on Arrays, Two Pointers, Trees, and Strings in Java and C++.<br>
        • <strong>HackerRank</strong>: 50+ logic proficiency problems with multi-star milestone rankings.<br>
        • <strong>Coding Ninjas</strong>: Active participant in competitive hackathons and coding arenas, delivering structured solutions within runtime limits.`,
        actions: [
          { text: '⚡ View LeetCode Profile ↗', url: 'https://leetcode.com/u/Pramod955' },
          { text: '🏆 Coding Stats Section', scroll: '#competitive' }
        ]
      };
    }

    // 10. SQL & Databases
    if (q.includes('sql') || q.includes('mysql') || q.includes('database')) {
      return {
        text: `Pramod is proficient in <strong>SQL and MySQL</strong>:<br><br>
        • Programmed secure relational database schemas to handle complex tabular structures, transactions, and resource allocations.<br>
        • Implemented structural data validation modules to cross-verify resource quantities and inventory tracking.`,
        actions: [
          { text: '🛠️ View Skills', scroll: '#skills' }
        ]
      };
    }

    // 11. React, JavaScript & Web Development
    if (q.includes('react') || q.includes('javascript') || q.includes('js') || q.includes('web') || q.includes('full-stack') || q.includes('frontend') || q.includes('html') || q.includes('css')) {
      return {
        text: `Pramod is experienced in modern <strong>Full-Stack Web Development</strong>:<br><br>
        • <strong>React</strong>: Component architecture, custom hooks, state management, and modern responsive design.<br>
        • <strong>JavaScript (ES6+)</strong>: Asynchronous programming, DOM manipulation, and dynamic client experiences.<br>
        • <strong>API Integration</strong>: RESTful APIs with minimized network latency, WebSocket telemetry, and cloud infrastructure.`,
        actions: [
          { text: '🛠️ Skills Section', scroll: '#skills' },
          { text: '📂 View Web Projects', scroll: '#projects' }
        ]
      };
    }

    // 12. C++
    if (q.includes('c++') || q.includes('cpp')) {
      return {
        text: `Pramod uses <strong>C++</strong> for both competitive programming and high-performance computing:<br><br>
        • Solved algorithmic tracking problems utilizing C++ standard library data structures.<br>
        • Built the backend computation engine for <strong>SkyGuru Weather</strong> to parse geolocation JSON string payloads natively in low-level data blocks.`,
        actions: [
          { text: '⭐ SkyGuru Repo ↗', url: 'https://github.com/Pramod3570955/https-github.com-PramodShah-SkyGuru' },
          { text: '🛠️ View Skills', scroll: '#skills' }
        ]
      };
    }

    // 13. Cloud & AWS
    if (q.includes('cloud') || q.includes('aws') || q.includes('amazon') || q.includes('deploy')) {
      return {
        text: `Pramod has foundational expertise in <strong>Amazon Web Services (AWS)</strong>:<br><br>
        • Architected deployment blueprints using AWS cloud components to guarantee application stability and auto-scaling.<br>
        • Deployed cloud services for AI telemetry web applications.`,
        actions: [
          { text: '🛠️ Skills Section', scroll: '#skills' }
        ]
      };
    }

    // 14. Software Testing & QA
    if (q.includes('testing') || q.includes('qa') || q.includes('quality') || q.includes('unit test')) {
      return {
        text: `Pramod has completed formal training and holds credentials in <strong>Software Testing & QA</strong> from Simplilearn SkillUp:<br><br>
        • Unit testing frameworks and test case design.<br>
        • Quality Assurance lifecycle, edge case discovery, and bug validation logic.`,
        actions: [
          { text: '📜 View Certifications', scroll: '#certifications' }
        ]
      };
    }

    // 15. All Skills Overview
    if (q.includes('skill') || q.includes('technolog') || q.includes('stack') || q.includes('language') || q.includes('tools')) {
      return {
        text: `Here is a summary of Pramod's technical skill set:<br><br>
        • <strong>Languages</strong>: Java, C++, JavaScript, SQL<br>
        • <strong>Web Development</strong>: React, Full Stack, HTML5, CSS3, REST API Integration<br>
        • <strong>Cloud & DB</strong>: Amazon Web Services (AWS), MySQL<br>
        • <strong>Core Competencies</strong>: Data Structures & Algorithms (200+ LeetCode), Software Testing, Object-Oriented Programming (OOP)`,
        actions: [
          { text: '🛠️ View Skills Section', scroll: '#skills' }
        ]
      };
    }

    // 16. Education & Academic Background
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('parul') || q.includes('degree') || q.includes('b.tech') || q.includes('cgpa') || q.includes('school')) {
      return {
        text: `Here is Pramod's academic journey:<br><br>
        🎓 <strong>B.Tech in Computer Science & Engineering</strong><br>
        • <em>Parul University</em>, Vadodara, Gujarat, India (Expected: May 2028)<br>
        • <strong>Current CGPA: 8.09 / 10.00</strong><br><br>
        🏫 <strong>10+2 in Computer Engineering</strong><br>
        • <em>Shree Mills Secondary School</em>, Biratnagar, Nepal (Graduated 2024)<br>
        • <strong>Academic Score: 83%</strong>`,
        actions: [
          { text: '🎓 Education Timeline', scroll: '#about' },
          { text: '📄 View Resume', resume: true }
        ]
      };
    }

    // 17. Certifications & Hackathons
    if (q.includes('certif') || q.includes('credential') || q.includes('hackathon') || q.includes('vibe2ship') || q.includes('simplilearn')) {
      return {
        text: `Pramod holds verified credentials & achievements:<br><br>
        🏆 <strong>Vibe2Ship Hackathon Certificate</strong>: India's Biggest Vibe Coding Hackathon by Coding Ninjas in collaboration with <strong>Google for Developers</strong>.<br><br>
        📜 <strong>Introduction to Software Testing</strong>: Professional Certificate of Completion by <strong>Simplilearn SkillUp</strong> (Code: 8850332).`,
        actions: [
          { text: '📜 View Certifications Section', scroll: '#certifications' }
        ]
      };
    }

    // 18. Contact / Hire / Phone / Email / Socials
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('message')) {
      return {
        text: `You can reach out to Pramod through any of these channels:<br><br>
        • 📧 <strong>Email</strong>: <a href="mailto:pm3570955@gmail.com" style="color:var(--accent-secondary);">pm3570955@gmail.com</a><br>
        • 📞 <strong>Phone</strong>: +91 8210245186<br>
        • 📍 <strong>Location</strong>: Vadodara, Gujarat, India<br>
        • 💼 <strong>LinkedIn</strong>: <a href="https://linkedin.com/in/pramod-shah-6b8b983b0" target="_blank" rel="noopener noreferrer" style="color:var(--accent-secondary);">linkedin.com/in/pramod-shah-6b8b983b0</a><br>
        • 🐙 <strong>GitHub</strong>: <a href="https://github.com/Pramod3570955" target="_blank" rel="noopener noreferrer" style="color:var(--accent-secondary);">github.com/Pramod3570955</a>`,
        actions: [
          { text: '📬 Open Contact Form', scroll: '#contact' },
          { text: '📧 Email Pramod', url: 'mailto:pm3570955@gmail.com' }
        ]
      };
    }

    // Default Fallback Response
    return {
      text: `I'm specifically trained to answer questions about <strong>Pramod's portfolio</strong>, <strong>technical skills</strong>, <strong>projects</strong>, and <strong>experience</strong>.<br><br>
      Here are some topics you can explore:`,
      actions: [
        { text: '⚡ Who is Pramod?', query: 'Who is Pramod?' },
        { text: '💼 View Projects', query: 'Show me projects' },
        { text: '🛠️ Top Skills', query: 'What skills does Pramod have?' },
        { text: '☕ Java & DSA', query: 'Tell me about his Java & DSA skills' },
        { text: '📄 Resume', query: 'Show resume' },
        { text: '📬 Contact Info', query: 'How can I contact him?' }
      ]
    };
  }
}

