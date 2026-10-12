/* ==========================================================================
   PALAK SHARMA • HARRY POTTER PORTFOLIO SCRIPTS
   Interactive Wand Sparks, Snitch Physics, Web Audio Chimes, Spells & Post
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. WEB AUDIO SYNTHESIZER (Magical Celesta / Bell Chime - No External Files)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play an ethereal bell / celesta chime
  function playMagicalChime(frequency = 880, type = 'sine', duration = 0.8) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      // Subtle pitch bend upwards like magical twinkle
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.25, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback silently suppressed if browser limits
    }
  }

  // Play a multi-note magical chord (Hedwig style arpeggio)
  function playHedwigArpeggio() {
    if (!soundEnabled) return;
    const notes = [659.25, 783.99, 739.99, 659.25, 987.77, 880.00]; // E5, G5, F#5, E5, B5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playMagicalChime(freq, 'triangle', 0.9);
      }, idx * 160);
    });
  }

  // Sound toggle button
  const soundBtn = document.getElementById('spell-sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.querySelector('.icon-glyph').textContent = soundEnabled ? '🔔' : '🔕';
      soundBtn.title = soundEnabled ? 'Magical Sound: On' : 'Magical Sound: Muted';
      showToast(soundEnabled ? '🔔 Magical sound incantations enabled' : '🔕 Sound silenced');
      if (soundEnabled) playMagicalChime(880);
    });
  }

  // --------------------------------------------------------------------------
  // 2. TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  const toast = document.getElementById('magic-toast');
  let toastTimer = null;

  function showToast(message, duration = 3500) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 3. WAND SPARKS CANVAS OVERLAY (Cursor Interactive Magic)
  // --------------------------------------------------------------------------
  const wandCanvas = document.getElementById('wand-canvas');
  let wandCtx = wandCanvas ? wandCanvas.getContext('2d') : null;
  const particles = [];
  let mouse = { x: -100, y: -100, isMoving: false };

  function resizeWandCanvas() {
    if (!wandCanvas) return;
    wandCanvas.width = window.innerWidth;
    wandCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeWandCanvas);
  resizeWandCanvas();

  class WandParticle {
    constructor(x, y, color = null) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3.5 + 1.2;
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = (Math.random() - 0.5) * 3 - 0.5;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;
      this.color = color || (Math.random() > 0.3 ? '#ffd700' : '#ffffff');
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
      if (this.size > 0.2) this.size -= 0.04;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function addWandParticles(x, y, count = 2, color = null) {
    for (let i = 0; i < count; i++) {
      particles.push(new WandParticle(x, y, color));
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    addWandParticles(e.clientX, e.clientY, 2);
  });

  window.addEventListener('click', (e) => {
    // Burst of sparks on click
    addWandParticles(e.clientX, e.clientY, 15, '#ffd700');
    playMagicalChime(1100, 'sine', 0.4);
  });

  function animateWand() {
    if (wandCtx && wandCanvas) {
      wandCtx.clearRect(0, 0, wandCanvas.width, wandCanvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(wandCtx);
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(animateWand);
  }
  animateWand();

  // --------------------------------------------------------------------------
  // 4. AMBIENT BACKGROUND STARS & EMBER PARTICLES
  // --------------------------------------------------------------------------
  const starsCanvas = document.getElementById('stars-canvas');
  if (starsCanvas) {
    const sCtx = starsCanvas.getContext('2d');
    let stars = [];

    function resizeStars() {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
      stars = [];
      const starCount = Math.floor((starsCanvas.width * starsCanvas.height) / 12000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * starsCanvas.width,
          y: Math.random() * starsCanvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.015 + 0.005,
          color: Math.random() > 0.4 ? 'rgba(255, 230, 150,' : 'rgba(200, 220, 255,'
        });
      }
    }
    window.addEventListener('resize', resizeStars);
    resizeStars();

    function animateStars() {
      sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      for (let star of stars) {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }
        sCtx.fillStyle = `${star.color} ${Math.abs(star.alpha)})`;
        sCtx.beginPath();
        sCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        sCtx.fill();
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  // --------------------------------------------------------------------------
  // 5. GOLDEN SNITCH INTERACTIVE FLIGHT & CATCH
  // --------------------------------------------------------------------------
  const snitch = document.getElementById('golden-snitch');
  if (snitch) {
    let snitchX = window.innerWidth * 0.85;
    let snitchY = window.innerHeight * 0.25;
    let targetX = snitchX;
    let targetY = snitchY;

    function moveSnitchTarget() {
      const margin = 80;
      targetX = Math.random() * (window.innerWidth - margin * 2) + margin;
      targetY = Math.random() * (window.innerHeight * 0.6) + margin;
      setTimeout(moveSnitchTarget, Math.random() * 3500 + 2000);
    }
    moveSnitchTarget();

    function updateSnitchPosition() {
      snitchX += (targetX - snitchX) * 0.04;
      snitchY += (targetY - snitchY) * 0.04;
      snitch.style.transform = `translate3d(${snitchX}px, ${snitchY}px, 0)`;
      requestAnimationFrame(updateSnitchPosition);
    }
    updateSnitchPosition();

    // Catch the Snitch!
    snitch.addEventListener('click', (e) => {
      e.stopPropagation();
      playHedwigArpeggio();
      addWandParticles(snitchX + 16, snitchY + 16, 40, '#ffd700');
      showToast('⚡ Snitch Caught! 150 Points awarded to Ravenclaw & Palak Sharma! 🏆', 4500);

      // Dash away rapidly
      targetX = Math.random() > 0.5 ? 50 : window.innerWidth - 100;
      targetY = 100;
    });
  }

  // --------------------------------------------------------------------------
  // 6. LUMOS / NOX THEME TOGGLE
  // --------------------------------------------------------------------------
  const lumosBtn = document.getElementById('lumos-toggle-btn');
  const quickCastBtn = document.getElementById('quick-cast-btn');
  const body = document.body;

  function toggleLumos() {
    const isLumos = body.classList.contains('lumos-active');
    if (isLumos) {
      body.classList.remove('lumos-active');
      body.classList.add('nox-active');
      if (lumosBtn) {
        lumosBtn.querySelector('.lumos-text').textContent = 'Nox';
        lumosBtn.querySelector('.icon-glyph').textContent = '🌙';
      }
      showToast('🌑 Nox! Deep midnight stars awakened.');
      playMagicalChime(440, 'sine', 0.6);
    } else {
      body.classList.remove('nox-active');
      body.classList.add('lumos-active');
      if (lumosBtn) {
        lumosBtn.querySelector('.lumos-text').textContent = 'Lumos';
        lumosBtn.querySelector('.icon-glyph').textContent = '✨';
      }
      showToast('✨ Lumos! Golden candlelight rekindled.');
      playMagicalChime(880, 'sine', 0.6);
    }
  }

  if (lumosBtn) lumosBtn.addEventListener('click', toggleLumos);
  if (quickCastBtn) {
    quickCastBtn.addEventListener('click', () => {
      toggleLumos();
      addWandParticles(window.innerWidth / 2, window.innerHeight / 2, 25, '#ffd700');
    });
  }

  // --------------------------------------------------------------------------
  // 7. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. TECH SPELLBOOK FILTERS
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const spellCards = document.querySelectorAll('.spell-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      playMagicalChime(700, 'triangle', 0.3);

      spellCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. THE ROOM OF REQUIREMENT SPELLCASTER
  // --------------------------------------------------------------------------
  const spellCastBtns = document.querySelectorAll('.spell-cast-btn');
  const spellLog = document.getElementById('spell-log');

  const spellLore = {
    lumos: {
      soundFreq: 987,
      color: '#ffd700',
      message: '✨ Lumos cast! A sphere of golden starlight ignites the room.',
      action: () => addWandParticles(window.innerWidth / 2, window.innerHeight * 0.4, 30, '#ffd700')
    },
    patronum: {
      soundFreq: 1174,
      color: '#c0d6df',
      message: '🦌 Expecto Patronum! A luminous silver patronus shields your neural networks.',
      action: () => addWandParticles(window.innerWidth / 2, window.innerHeight * 0.4, 35, '#c0d6df')
    },
    leviosa: {
      soundFreq: 880,
      color: '#f9ca24',
      message: '🪶 Wingardium Leviosa! "It is Levi-O-sa, not Levio-SA!" Code floats with elegance.',
      action: () => addWandParticles(window.innerWidth / 2, window.innerHeight * 0.4, 25, '#74b9ff')
    },
    alohomora: {
      soundFreq: 659,
      color: '#55efc4',
      message: '🔓 Alohomora! The locked portals of artificial intelligence swing wide open.',
      action: () => addWandParticles(window.innerWidth / 2, window.innerHeight * 0.4, 25, '#55efc4')
    }
  };

  spellCastBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const spellKey = btn.dataset.spell;
      const spell = spellLore[spellKey];
      if (spell) {
        playMagicalChime(spell.soundFreq, 'sine', 0.6);
        spell.action();
        if (spellLog) {
          spellLog.innerHTML = `<span class="log-cursor">⚡</span> ${spell.message}`;
        }
        showToast(spell.message, 3000);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 10. THE SORTING HAT'S ORACLE
  // --------------------------------------------------------------------------
  const sortingQuotes = [
    `"Wit beyond measure is man's greatest treasure! In Palak Sharma, Ravenclaw sees an intellect destined to decode the frontiers of Artificial Intelligence!"`,
    `"A curious 17-year-old mind at JECRC University, fortified by 89% in the 12th trials! Great things await those who merge science with imagination."`,
    `"I sense melody in the soul and logic in the mind! One who sings and plays guitar possesses the rhythmic insight to choreograph complex neural networks!"`,
    `"Books in the restricted library, code on the terminal screen—Palak shall turn algorithms into gold like the Philosophers of old!"`,
    `"Courage of Gryffindor, intellect of Ravenclaw! Your artificial intelligence journey will transform ideas into living reality!"`
  ];

  let currentQuoteIdx = 0;
  const askHatBtn = document.getElementById('ask-hat-btn');
  const quoteElem = document.getElementById('sorting-quote');

  if (askHatBtn && quoteElem) {
    askHatBtn.addEventListener('click', () => {
      currentQuoteIdx = (currentQuoteIdx + 1) % sortingQuotes.length;
      playMagicalChime(587, 'triangle', 0.5);
      quoteElem.style.opacity = '0';
      setTimeout(() => {
        quoteElem.textContent = sortingQuotes[currentQuoteIdx];
        quoteElem.style.opacity = '1';
      }, 200);
      showToast('🎩 The Sorting Hat speaks!');
    });
  }

  // --------------------------------------------------------------------------
  // 11. OWL POST CONTACT & CLIPBOARD COPY
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddress = 'sharmapalak2549@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast('📜 Copied to quill clipboard: ' + emailAddress);
        copyEmailBtn.querySelector('.btn-copy-text').textContent = 'Copied! ✨';
        playMagicalChime(1046, 'sine', 0.3);
        setTimeout(() => {
          copyEmailBtn.querySelector('.btn-copy-text').textContent = 'Copy Email';
        }, 2500);
      } catch (err) {
        showToast('Address: ' + emailAddress);
      }
    });
  }

  // Owl Dispatch Form Handling
  const owlForm = document.getElementById('owl-dispatch-form');
  if (owlForm) {
    owlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const subject = document.getElementById('message-subject').value;
      const message = document.getElementById('message-content').value;

      playHedwigArpeggio();
      showToast('🦉 The Owl Post has taken flight! Opening your mail dispatch client...');

      // Trigger mailto link with encoded parameters
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\nMessage:\n${message}\n\n---\nSent via Palak Sharma's Hogwarts Portfolio Owl Post`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);
    });
  }

  // --------------------------------------------------------------------------
  // 12. MARAUDER'S MAP FOOTER TOGGLE
  // --------------------------------------------------------------------------
  const maraudersBox = document.getElementById('marauders-toggle-box');
  const maraudersText = document.getElementById('marauders-text');
  let mapState = false;

  if (maraudersBox && maraudersText) {
    maraudersBox.addEventListener('click', () => {
      mapState = !mapState;
      playMagicalChime(mapState ? 523 : 784, 'sine', 0.5);
      if (mapState) {
        maraudersText.textContent = '"Mischief Managed." 🪄';
        maraudersBox.querySelector('.toggle-hint').textContent = '(Click to Reveal Map Again)';
        showToast('📜 "Mischief Managed." The footprints vanish into the parchment...');
      } else {
        maraudersText.textContent = '"I solemnly swear that I am up to no good."';
        maraudersBox.querySelector('.toggle-hint').textContent = '(Click to Manage Mischief)';
        showToast('👣 "Messrs Moony, Wormtail, Padfoot, and Prongs are proud to present..."');
      }
    });
  }
});
