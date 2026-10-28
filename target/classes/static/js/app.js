/**
 * CODE ALPHA — FUTURISTIC STUDENT GRADE TRACKER
 * Dynamic Core Application Logic, Live Visual Meters,
 * Web Audio Synthesizer, Speech Engine, Canvas Animations,
 * and Persistent Java Backend Integration
 */

(function () {
  'use strict';

  // State Management
  const state = {
    studentName: 'Aria Vance',
    university: 'Stanford Quantum Institute',
    academicYear: 'Year 2',
    semester: 'Semester 4',
    gradingScheme: 'UGC_10_POINT',

    soundEnabled: true,
    speechEnabled: true,

    // Subject Marks (Left Side)
    marks: [
      { name: 'Quantum Neural Algorithms', marksObtained: 88, maxMarks: 100 },
      { name: 'Cybernetic Systems & Robotics', marksObtained: 94, maxMarks: 100 },
      { name: 'Distributed Blockchain Architectures', marksObtained: 79, maxMarks: 100 },
      { name: 'Advanced Artificial Intelligence', marksObtained: 91, maxMarks: 100 },
      { name: 'Cyber Security & Cryptography', marksObtained: 85, maxMarks: 100 }
    ],

    // Subject Grades (Right Side)
    grades: [
      { name: 'Quantum Neural Algorithms', credits: 4, grade: 'A+', gradePoint: 9.0 },
      { name: 'Cybernetic Systems & Robotics', credits: 4, grade: 'O', gradePoint: 10.0 },
      { name: 'Distributed Blockchain Architectures', credits: 3, grade: 'A', gradePoint: 8.0 },
      { name: 'Advanced Artificial Intelligence', credits: 4, grade: 'A+', gradePoint: 9.0 },
      { name: 'Cyber Security & Cryptography', credits: 3, grade: 'A', gradePoint: 8.0 }
    ],

    // Past Completed Semesters for cumulative CGPA & Year-wise breakdown
    pastSemesters: [
      { semesterName: 'Semester 1', academicYear: 'Year 1', sgpa: 8.90, credits: 20 },
      { semesterName: 'Semester 2', academicYear: 'Year 1', sgpa: 9.15, credits: 22 },
      { semesterName: 'Semester 3', academicYear: 'Year 2', sgpa: 8.85, credits: 21 }
    ],

    lastAnalysisResult: null
  };

  // University Grading Schemes & Grade Point Lookups
  const SCHEMES = {
    UGC_10_POINT: {
      name: 'UGC / AICTE Standard (10-Point)',
      maxGpa: 10.0,
      points: { 'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0, 'C': 5.0, 'P': 4.0, 'F': 0.0 },
      formula: 'Official AICTE Formula: Percentage = (CGPA - 0.75) × 10'
    },
    MUMBAI_CBCS: {
      name: 'Mumbai University (CBCS 10-Point)',
      maxGpa: 10.0,
      points: { 'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0, 'C': 5.0, 'D': 4.0, 'F': 0.0 },
      formula: 'Official MU Formula: Percentage = 7.25 × CGPA + 11 (for CGPA ≥ 7.0)'
    },
    VTU_10_POINT: {
      name: 'VTU Karnataka (10-Point)',
      maxGpa: 10.0,
      points: { 'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0, 'C': 5.0, 'P': 4.0, 'F': 0.0 },
      formula: 'Official VTU Formula: Percentage = (CGPA - 0.75) × 10'
    },
    ANNA_10_POINT: {
      name: 'Anna University (10-Point)',
      maxGpa: 10.0,
      points: { 'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0, 'C': 5.0, 'RA': 0.0 },
      formula: 'Official Anna Univ Formula: Equivalent Percentage = CGPA × 10'
    },
    US_4_SCALE: {
      name: 'US Collegiate (4.0 Scale)',
      maxGpa: 4.0,
      points: { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0 },
      formula: 'No universal linear formula. Official WES credential evaluation required.'
    }
  };

  /* =========================================================
     AUDIO SYNTHESIS & SOUND EFFECTS ENGINE (Web Audio API)
     ========================================================= */
  let audioCtx = null;

  function initAudioContext() {
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

  // Play Futuristic Audio Effects
  function playCyberSound(type) {
    if (!state.soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      if (type === 'good') {
        // Cheerful victory chime chords (C5 -> E5 -> G5 -> C6)
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.1 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.85);
        });
      } else if (type === 'reels') {
        // Funny comic boing / spring synth glide
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (type === 'warning') {
        // Dramatic low hazard alarm pulse
        [180, 160].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.25);
          gain.gain.setValueAtTime(0.28, now + idx * 0.25);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.25 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.25);
          osc.stop(now + idx * 0.25 + 0.4);
        });
      } else if (type === 'click') {
        // Subtle cyber blip
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // Speech Synthesis Voice Reactions
  function speakVoiceReaction(text) {
    if (!state.speechEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop prior speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.volume = 0.95;

    // Set voice wave animation to active
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach((b) => b.classList.add('playing'));

    utterance.onend = () => {
      waveBars.forEach((b) => b.classList.remove('playing'));
    };
    utterance.onerror = () => {
      waveBars.forEach((b) => b.classList.remove('playing'));
    };

    // Try choosing an English natural voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /* =========================================================
     CANVAS VISUAL EFFECTS: FLOWER BLOOM, CONFETTI, RED WARNING
     ========================================================= */
  const fxCanvas = document.getElementById('reaction-fx-canvas');
  const fxCtx = fxCanvas ? fxCanvas.getContext('2d') : null;

  function resizeFxCanvas() {
    if (fxCanvas) {
      fxCanvas.width = window.innerWidth;
      fxCanvas.height = window.innerHeight;
    }
  }
  window.addEventListener('resize', resizeFxCanvas);
  resizeFxCanvas();

  let activeFxAnimation = null;
  let fxParticles = [];
  let fxStartTime = 0;

  function stopFxAnimation() {
    if (activeFxAnimation) {
      cancelAnimationFrame(activeFxAnimation);
      activeFxAnimation = null;
    }
    if (fxCtx && fxCanvas) {
      fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    }
    fxParticles = [];
  }

  // 1. FLOWER BLOOM WITH GOLDEN PARTICLES (Above 70% AND CGPA >= 7.0)
  function triggerFlowerBloomAnimation() {
    stopFxAnimation();
    if (!fxCtx || !fxCanvas) return;

    fxStartTime = performance.now();
    const centerX = fxCanvas.width / 2;
    const centerY = fxCanvas.height * 0.45;

    // Create golden particle burst
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 7;
      fxParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: 2 + Math.random() * 4,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.012,
        color: Math.random() > 0.3 ? '#ffd700' : '#ffea75',
        sparkle: Math.random() * 10
      });
    }

    function renderFlower(timestamp) {
      const elapsed = (timestamp - fxStartTime) / 1000;
      fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

      // Draw Blooming Golden Lotus Flower in center
      const bloomProgress = Math.min(1.0, elapsed / 1.5);
      const petalCount = 12;
      const basePetalLen = 130 * bloomProgress;

      fxCtx.save();
      fxCtx.translate(centerX, centerY);

      // Outer golden glow aura
      const radialGlow = fxCtx.createRadialGradient(0, 0, 10, 0, 0, basePetalLen + 60);
      radialGlow.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
      radialGlow.addColorStop(0.6, 'rgba(255, 170, 0, 0.2)');
      radialGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      fxCtx.fillStyle = radialGlow;
      fxCtx.beginPath();
      fxCtx.arc(0, 0, basePetalLen + 60, 0, Math.PI * 2);
      fxCtx.fill();

      // Golden Petals layer 1 (outer)
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2 + elapsed * 0.15;
        fxCtx.save();
        fxCtx.rotate(angle);

        fxCtx.beginPath();
        fxCtx.moveTo(0, 0);
        fxCtx.quadraticCurveTo(basePetalLen * 0.4, -basePetalLen * 0.4, basePetalLen, 0);
        fxCtx.quadraticCurveTo(basePetalLen * 0.4, basePetalLen * 0.4, 0, 0);

        const grad = fxCtx.createLinearGradient(0, 0, basePetalLen, 0);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
        grad.addColorStop(0.7, 'rgba(255, 180, 0, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
        fxCtx.fillStyle = grad;
        fxCtx.shadowColor = '#ffd700';
        fxCtx.shadowBlur = 15;
        fxCtx.fill();
        fxCtx.restore();
      }

      // Golden Petals layer 2 (inner)
      const innerPetalLen = basePetalLen * 0.65;
      for (let i = 0; i < petalCount; i++) {
        const angle = ((i + 0.5) / petalCount) * Math.PI * 2 - elapsed * 0.25;
        fxCtx.save();
        fxCtx.rotate(angle);

        fxCtx.beginPath();
        fxCtx.moveTo(0, 0);
        fxCtx.quadraticCurveTo(innerPetalLen * 0.35, -innerPetalLen * 0.35, innerPetalLen, 0);
        fxCtx.quadraticCurveTo(innerPetalLen * 0.35, innerPetalLen * 0.35, 0, 0);

        fxCtx.fillStyle = 'rgba(255, 245, 180, 0.92)';
        fxCtx.shadowColor = '#ffdd55';
        fxCtx.shadowBlur = 12;
        fxCtx.fill();
        fxCtx.restore();
      }

      // Flower Center Core
      fxCtx.beginPath();
      fxCtx.arc(0, 0, 18 * bloomProgress, 0, Math.PI * 2);
      fxCtx.fillStyle = '#ffffff';
      fxCtx.shadowColor = '#ffd700';
      fxCtx.shadowBlur = 25;
      fxCtx.fill();
      fxCtx.restore();

      // Render Golden Particles
      let aliveParticles = 0;
      for (let i = 0; i < fxParticles.length; i++) {
        const p = fxParticles[i];
        if (p.alpha > 0.01) {
          aliveParticles++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity
          p.alpha -= p.decay;

          fxCtx.save();
          fxCtx.globalAlpha = Math.max(0, p.alpha);
          fxCtx.fillStyle = p.color;
          fxCtx.shadowColor = p.color;
          fxCtx.shadowBlur = 10;
          fxCtx.beginPath();
          fxCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          fxCtx.fill();
          fxCtx.restore();
        }
      }

      if (elapsed < 5.0 && (aliveParticles > 0 || elapsed < 3.5)) {
        activeFxAnimation = requestAnimationFrame(renderFlower);
      } else {
        stopFxAnimation();
      }
    }

    activeFxAnimation = requestAnimationFrame(renderFlower);
  }

  // 2. VIBRANT CYBER CONFETTI CELEBRATION (50%-70% & CGPA 5.0-<7.0)
  function triggerConfettiCelebration() {
    stopFxAnimation();
    if (!fxCtx || !fxCanvas) return;

    fxStartTime = performance.now();
    const colors = ['#00f3ff', '#b026ff', '#00ffa3', '#ff007f', '#ffe600', '#38bdf8'];

    // Spawn 220 confetti ribbons
    for (let i = 0; i < 220; i++) {
      fxParticles.push({
        x: Math.random() * fxCanvas.width,
        y: Math.random() * -fxCanvas.height * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: 3 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        w: 10 + Math.random() * 12,
        h: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0
      });
    }

    function renderConfetti(timestamp) {
      const elapsed = (timestamp - fxStartTime) / 1000;
      fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

      let alive = 0;
      for (let i = 0; i < fxParticles.length; i++) {
        const c = fxParticles[i];
        c.y += c.vy;
        c.x += c.vx + Math.sin(c.y * 0.02) * 1.5;
        c.rot += c.rotSpeed;

        if (c.y < fxCanvas.height + 50) {
          alive++;
          fxCtx.save();
          fxCtx.translate(c.x, c.y);
          fxCtx.rotate(c.rot);
          fxCtx.fillStyle = c.color;
          fxCtx.shadowColor = c.color;
          fxCtx.shadowBlur = 8;
          fxCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          fxCtx.restore();
        }
      }

      if (elapsed < 5.0 && alive > 0) {
        activeFxAnimation = requestAnimationFrame(renderConfetti);
      } else {
        stopFxAnimation();
      }
    }

    activeFxAnimation = requestAnimationFrame(renderConfetti);
  }

  // 3. RED HOLOGRAPHIC HAZARD WARNING (Below 50%)
  function triggerRedHolographicWarning() {
    stopFxAnimation();
    if (!fxCtx || !fxCanvas) return;

    fxStartTime = performance.now();

    function renderWarning(timestamp) {
      const elapsed = (timestamp - fxStartTime) / 1000;
      fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

      const pulse = (Math.sin(elapsed * 5) + 1) / 2; // 0 to 1

      // Red Vignette Flash
      const radGrad = fxCtx.createRadialGradient(
        fxCanvas.width / 2, fxCanvas.height / 2, fxCanvas.width * 0.2,
        fxCanvas.width / 2, fxCanvas.height / 2, fxCanvas.width * 0.8
      );
      radGrad.addColorStop(0, 'rgba(255, 0, 85, 0)');
      radGrad.addColorStop(1, `rgba(255, 0, 85, ${0.15 + pulse * 0.25})`);
      fxCtx.fillStyle = radGrad;
      fxCtx.fillRect(0, 0, fxCanvas.width, fxCanvas.height);

      // Holographic Hexagonal Scanlines
      fxCtx.strokeStyle = `rgba(255, 42, 109, ${0.15 + pulse * 0.2})`;
      fxCtx.lineWidth = 1;
      const step = 40;
      for (let y = (elapsed * 50) % step; y < fxCanvas.height; y += step) {
        fxCtx.beginPath();
        fxCtx.moveTo(0, y);
        fxCtx.lineTo(fxCanvas.width, y);
        fxCtx.stroke();
      }

      if (elapsed < 3.5) {
        activeFxAnimation = requestAnimationFrame(renderWarning);
      } else {
        stopFxAnimation();
      }
    }

    activeFxAnimation = requestAnimationFrame(renderWarning);
  }

  /* =========================================================
     LIVE METRIC CALCULATIONS & TABLE RENDERING
     ========================================================= */

  // Dynamic Live Calculation of Percentage (Left Side)
  function calculatePercentageMetrics() {
    let totalObt = 0;
    let totalMax = 0;
    let highest = -1;
    let highestSub = '';
    let lowest = 999999;
    let lowestSub = '';
    let count = 0;

    state.marks.forEach((m) => {
      if (m.name && m.name.trim() !== '') {
        const obt = Math.max(0, parseFloat(m.marksObtained) || 0);
        const max = Math.max(1, parseFloat(m.maxMarks) || 100);
        totalObt += obt;
        totalMax += max;
        count++;

        const pct = (obt / max) * 100;
        if (pct > highest) {
          highest = pct;
          highestSub = `${m.name} (${obt}/${max})`;
        }
        if (pct < lowest) {
          lowest = pct;
          lowestSub = `${m.name} (${obt}/${max})`;
        }
      }
    });

    const overallPct = totalMax > 0 ? (totalObt / totalMax) * 100 : 0;
    const avgMarks = count > 0 ? totalObt / count : 0;

    return {
      totalObtained: totalObt,
      totalMax: totalMax,
      percentage: overallPct,
      highestScore: highest >= 0 ? highest : 0,
      highestSubject: highestSub,
      lowestScore: lowest < 999999 ? lowest : 0,
      lowestSubject: lowestSub,
      averageMarks: avgMarks,
      subjectCount: count
    };
  }

  // Dynamic Live Calculation of SGPA, CGPA & Year-wise (Right Side)
  function calculateCgpaMetrics() {
    let currentWeighted = 0;
    let currentCredits = 0;

    state.grades.forEach((g) => {
      if (g.name && g.name.trim() !== '') {
        const cred = Math.max(0.5, parseFloat(g.credits) || 0);
        const gp = Math.max(0, parseFloat(g.gradePoint) || 0);
        currentWeighted += cred * gp;
        currentCredits += cred;
      }
    });

    const semesterSgpa = currentCredits > 0 ? currentWeighted / currentCredits : 0;

    // Incorporate Past Semesters
    let totalWeighted = currentWeighted;
    let totalCredits = currentCredits;

    const yearMap = { 'Year 1': [], 'Year 2': [], 'Year 3': [], 'Year 4': [] };

    // Record current semester into its year
    if (yearMap[state.academicYear]) {
      yearMap[state.academicYear].push(semesterSgpa);
    }

    state.pastSemesters.forEach((p) => {
      if (p.credits > 0 && p.sgpa >= 0) {
        totalWeighted += p.sgpa * p.credits;
        totalCredits += p.credits;
        if (yearMap[p.academicYear]) {
          yearMap[p.academicYear].push(p.sgpa);
        }
      }
    });

    const cumulativeCgpa = totalCredits > 0 ? totalWeighted / totalCredits : semesterSgpa;

    const yearWise = {};
    Object.keys(yearMap).forEach((yr) => {
      const arr = yearMap[yr];
      if (arr.length > 0) {
        const sum = arr.reduce((a, b) => a + b, 0);
        yearWise[yr] = sum / arr.length;
      } else {
        yearWise[yr] = 0;
      }
    });

    return {
      semesterSgpa,
      cumulativeCgpa,
      currentCredits,
      totalCumulativeCredits: totalCredits,
      yearWise
    };
  }

  // Update Percentage Meter Ring
  function updatePercentageMeter(pct) {
    const meterValEl = document.getElementById('percentage-meter-val');
    const circle = document.getElementById('percentage-prog-circle');

    if (meterValEl) {
      meterValEl.textContent = `${pct.toFixed(1)}%`;
    }

    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (pct / 100) * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = Math.max(0, offset);
    }
  }

  // Update CGPA Meter Ring
  function updateCgpaMeter(cgpa, maxScale = 10.0) {
    const cgpaValEl = document.getElementById('cgpa-meter-val');
    const cgpaScaleEl = document.getElementById('cgpa-scale-max');
    const circle = document.getElementById('cgpa-prog-circle');

    if (cgpaValEl) {
      cgpaValEl.textContent = cgpa.toFixed(2);
    }
    if (cgpaScaleEl) {
      cgpaScaleEl.textContent = `/ ${maxScale.toFixed(1)}`;
    }

    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const ratio = Math.min(1.0, cgpa / maxScale);
      const offset = circumference - ratio * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = Math.max(0, offset);
    }
  }

  // Render Live UI Display
  function renderLiveDashboard() {
    const pStats = calculatePercentageMetrics();
    const cStats = calculateCgpaMetrics();
    const scheme = SCHEMES[state.gradingScheme] || SCHEMES.UGC_10_POINT;

    // 1. Percentage Left Side Elements
    updatePercentageMeter(pStats.percentage);
    const totalMarksEl = document.getElementById('stat-total-marks');
    if (totalMarksEl) {
      totalMarksEl.textContent = `${Math.round(pStats.totalObtained)} / ${Math.round(pStats.totalMax)}`;
    }

    const highMarkEl = document.getElementById('stat-highest-mark');
    const highSubEl = document.getElementById('stat-highest-sub');
    if (highMarkEl) highMarkEl.textContent = `${pStats.highestScore.toFixed(1)}%`;
    if (highSubEl) highSubEl.textContent = pStats.highestSubject || '—';

    const lowMarkEl = document.getElementById('stat-lowest-mark');
    const lowSubEl = document.getElementById('stat-lowest-sub');
    if (lowMarkEl) lowMarkEl.textContent = `${pStats.lowestScore.toFixed(1)}%`;
    if (lowSubEl) lowSubEl.textContent = pStats.lowestSubject || '—';

    const avgMarkEl = document.getElementById('stat-average-marks');
    if (avgMarkEl) avgMarkEl.textContent = `${pStats.averageMarks.toFixed(1)} pts`;

    // 2. CGPA Right Side Elements
    updateCgpaMeter(cStats.cumulativeCgpa, scheme.maxGpa);

    const sgpaEl = document.getElementById('stat-semester-sgpa');
    if (sgpaEl) sgpaEl.textContent = cStats.semesterSgpa.toFixed(2);

    const totCredEl = document.getElementById('stat-total-credits');
    if (totCredEl) totCredEl.textContent = `${cStats.totalCumulativeCredits.toFixed(1)} Credits`;

    const formulaNoticeEl = document.getElementById('scheme-formula-notice');
    if (formulaNoticeEl) {
      formulaNoticeEl.textContent = scheme.formula;
    }

    // 3. Year-wise CGPA Cards
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'].forEach((yr, idx) => {
      const gpa = cStats.yearWise[yr] || 0;
      const gpaEl = document.getElementById(`year-${idx + 1}-gpa`);
      const fillEl = document.getElementById(`year-${idx + 1}-fill`);
      if (gpaEl) gpaEl.textContent = gpa > 0 ? gpa.toFixed(2) : '—';
      if (fillEl) {
        const pct = (gpa / scheme.maxGpa) * 100;
        fillEl.style.width = `${Math.min(100, pct)}%`;
      }
    });
  }

  // Render Marks Table Rows (Left Side)
  function renderMarksTable() {
    const tbody = document.getElementById('marks-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.marks.forEach((m, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <input type="text" class="mark-sub-input" value="${m.name}" placeholder="Course Title..." data-idx="${idx}" />
        </td>
        <td style="width: 100px;">
          <input type="number" class="mark-obt-input" min="0" max="100" step="0.5" value="${m.marksObtained}" data-idx="${idx}" />
        </td>
        <td style="width: 90px;">
          <input type="number" class="mark-max-input" min="10" max="500" step="10" value="${m.maxMarks}" data-idx="${idx}" />
        </td>
        <td style="width: 44px; text-align: center;">
          <button type="button" class="delete-row-btn delete-mark-btn" data-idx="${idx}" title="Remove Subject">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire listeners
    tbody.querySelectorAll('.mark-sub-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.marks[idx].name = e.target.value;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.mark-obt-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.marks[idx].marksObtained = parseFloat(e.target.value) || 0;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.mark-max-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.marks[idx].maxMarks = parseFloat(e.target.value) || 100;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.delete-mark-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        state.marks.splice(idx, 1);
        playCyberSound('click');
        renderMarksTable();
        renderLiveDashboard();
      });
    });
  }

  // Render Grades Table Rows (Right Side)
  function renderGradesTable() {
    const tbody = document.getElementById('grades-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const scheme = SCHEMES[state.gradingScheme] || SCHEMES.UGC_10_POINT;
    const gradeOptions = Object.keys(scheme.points);

    state.grades.forEach((g, idx) => {
      const tr = document.createElement('tr');

      let optionsHtml = '';
      gradeOptions.forEach((opt) => {
        const sel = opt === g.grade ? 'selected' : '';
        optionsHtml += `<option value="${opt}" ${sel}>${opt}</option>`;
      });

      tr.innerHTML = `
        <td>
          <input type="text" class="grade-sub-input" value="${g.name}" placeholder="Course Title..." data-idx="${idx}" />
        </td>
        <td style="width: 80px;">
          <input type="number" class="grade-cred-input" min="0.5" max="10" step="0.5" value="${g.credits}" data-idx="${idx}" />
        </td>
        <td style="width: 90px;">
          <select class="grade-select-input" data-idx="${idx}">
            ${optionsHtml}
          </select>
        </td>
        <td style="width: 80px;">
          <input type="number" class="grade-point-input" min="0" max="${scheme.maxGpa}" step="0.1" value="${g.gradePoint}" data-idx="${idx}" />
        </td>
        <td style="width: 44px; text-align: center;">
          <button type="button" class="delete-row-btn delete-grade-btn" data-idx="${idx}" title="Remove Subject">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire listeners
    tbody.querySelectorAll('.grade-sub-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.grades[idx].name = e.target.value;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.grade-cred-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.grades[idx].credits = parseFloat(e.target.value) || 1;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.grade-select-input').forEach((select) => {
      select.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const chosenGrade = e.target.value;
        state.grades[idx].grade = chosenGrade;

        // Auto-update grade point from scheme table
        const pt = scheme.points[chosenGrade] ?? 0;
        state.grades[idx].gradePoint = pt;

        // Update corresponding input field
        const row = e.target.closest('tr');
        if (row) {
          const ptInput = row.querySelector('.grade-point-input');
          if (ptInput) ptInput.value = pt;
        }

        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.grade-point-input').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        state.grades[idx].gradePoint = parseFloat(e.target.value) || 0;
        renderLiveDashboard();
      });
    });

    tbody.querySelectorAll('.delete-grade-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        state.grades.splice(idx, 1);
        playCyberSound('click');
        renderGradesTable();
        renderLiveDashboard();
      });
    });
  }

  /* =========================================================
     PERFORMANCE ANALYSIS & REACTION EXECUTION
     (Prompt Core Logic)
     ========================================================= */
  async function executePerformanceAnalysis() {
    playCyberSound('click');

    const requestPayload = {
      studentName: state.studentName,
      university: state.university,
      academicYear: state.academicYear,
      semester: state.semester,
      gradingScheme: state.gradingScheme,
      subjectMarks: state.marks,
      subjectGrades: state.grades,
      pastSemesters: state.pastSemesters
    };

    let result = null;

    // Call Java Spring Boot Backend
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
      if (response.ok) {
        result = await response.json();
      }
    } catch (err) {
      console.warn('Backend /api/analyze unreachable, executing client-side failover engine:', err);
    }

    // Client-side Failover Engine (if backend offline)
    if (!result) {
      result = computeClientSideFallback(requestPayload);
    }

    state.lastAnalysisResult = result;
    displayReaction(result);
  }

  function computeClientSideFallback(req) {
    const pStats = calculatePercentageMetrics();
    const cStats = calculateCgpaMetrics();
    const scheme = SCHEMES[state.gradingScheme] || SCHEMES.UGC_10_POINT;

    const pct = pStats.percentage;
    const cgpa = cStats.cumulativeCgpa;
    const highCgpa = scheme.maxGpa === 4.0 ? 3.0 : 7.0;
    const midCgpa = scheme.maxGpa === 4.0 ? 2.0 : 5.0;

    let code = 'GOOD';
    let title = 'GOOD!';
    let sub = 'EXEMPLARY ACADEMIC TRAJECTORY DETECTED';
    let voice = 'Good! Exceptional performance, scholar! Your academic matrix is blooming with brilliance. Keep conquering!';
    let anim = 'FLOWER_BLOOM';
    let summary = `Outstanding mastery across ${req.university}! You maintain ${pct.toFixed(1)}% average marks and a ${cgpa.toFixed(2)} CGPA.`;
    const suggestions = [
      'Submit undergraduate research papers to IEEE or academic conferences.',
      'Apply for premier competitive fellowships and elite tech internships.',
      `Strengthen leadership in study cohorts for ${pStats.highestSubject || 'core electives'}.`
    ];

    if (pct > 70 && cgpa >= highCgpa) {
      // Prompt Rule 1: Above 70% AND CGPA >= 7.0
      code = 'GOOD';
      title = 'GOOD!';
      sub = 'EXEMPLARY ACADEMIC TRAJECTORY DETECTED';
      voice = 'Good! Exceptional performance, scholar! Your academic matrix is blooming with brilliance. Keep conquering!';
      anim = 'FLOWER_BLOOM';
    } else if (pct >= 50 && pct <= 70 && cgpa >= midCgpa && cgpa < highCgpa) {
      // Prompt Rule 2: 50%–70% AND CGPA 5.0–<7.0
      code = 'REELS_WARNING';
      title = 'PLEASE DO NOT SCROLL SO MUCH REELS!';
      sub = 'POTENTIAL UNTAPPED — HIGH ALGORITHMIC DISTRACTION DETECTED';
      voice = 'Please do not scroll so much reels! Put that smartphone on do-not-disturb mode and unlock your true academic beast!';
      anim = 'CONFETTI_CELEBRATION';
      summary = `You hold a decent foundation at ${pct.toFixed(1)}% and ${cgpa.toFixed(2)} CGPA, but your ceiling is far higher.`;
      suggestions[0] = 'Lock social media and short video apps during designated study intervals.';
      suggestions[1] = `Focus strategically on high-credit coursework (${pStats.lowestSubject || 'weaker modules'}) to elevate your semester SGPA.`;
      suggestions[2] = 'Solve previous 5 years examination papers under real exam timing conditions.';
    } else {
      // Prompt Rule 3: Below 50% (or CGPA below threshold)
      code = 'CRITICAL_WARNING';
      title = 'THIS IS NOT FAIR FOR YOU!';
      sub = 'ACADEMIC HAZARD PROTOCOL ENGAGED — RAPID INTERVENTION REQUIRED';
      voice = 'This is not fair for you! You are built for greatness, not academic surrender. Wake up, revamp, and execute the turnaround now!';
      anim = 'RED_HOLOGRAM_WARNING';
      summary = `Critical warning: Recorded ${pct.toFixed(1)}% marks and ${cgpa.toFixed(2)} CGPA. Immediate strategic recalibration required.`;
      suggestions[0] = 'Schedule immediate office-hour sessions with course professors.';
      suggestions[1] = 'Form a focused turnaround study sprint covering fundamental syllabus competencies.';
      suggestions[2] = `Overhaul concept clarity in ${pStats.lowestSubject || 'lowest-scoring modules'}.`;
    }

    return {
      studentName: req.studentName,
      university: req.university,
      percentage: pct,
      semesterSgpa: cStats.semesterSgpa,
      cumulativeCgpa: cgpa,
      reactionCode: code,
      reactionTitle: title,
      reactionSubtitle: sub,
      voiceText: voice,
      animationType: anim,
      academicSummary: summary,
      suggestions: suggestions
    };
  }

  function displayReaction(result) {
    const card = document.getElementById('performance-reaction-card');
    if (!card) return;

    // Reset theme classes
    card.classList.remove('reaction-good', 'reaction-reels', 'reaction-warning');

    const mainTitleEl = document.getElementById('reaction-main-title');
    const subTitleEl = document.getElementById('reaction-sub-title');
    const emblemEl = document.getElementById('reaction-emblem');
    const summaryTextEl = document.getElementById('academic-summary-text');
    const suggestionsListEl = document.getElementById('academic-suggestions-list');

    if (mainTitleEl) mainTitleEl.textContent = result.reactionTitle;
    if (subTitleEl) subTitleEl.textContent = result.reactionSubtitle;
    if (summaryTextEl) summaryTextEl.textContent = result.academicSummary;

    if (suggestionsListEl) {
      suggestionsListEl.innerHTML = '';
      (result.suggestions || []).forEach((s) => {
        const li = document.createElement('li');
        li.textContent = s;
        suggestionsListEl.appendChild(li);
      });
    }

    // Apply specific theme styling and trigger animation & sound
    if (result.reactionTitle.includes('GOOD')) {
      card.classList.add('reaction-good');
      if (emblemEl) emblemEl.textContent = '🌟';
      playCyberSound('good');
      triggerFlowerBloomAnimation();
    } else if (result.reactionTitle.includes('REELS')) {
      card.classList.add('reaction-reels');
      if (emblemEl) emblemEl.textContent = '📱';
      playCyberSound('reels');
      triggerConfettiCelebration();
    } else {
      card.classList.add('reaction-warning');
      if (emblemEl) emblemEl.textContent = '⚠️';
      playCyberSound('warning');
      triggerRedHolographicWarning();
    }

    // Trigger Original Voice Reaction
    if (result.voiceText) {
      speakVoiceReaction(result.voiceText);
    }

    // Smooth scroll down to reaction
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* =========================================================
     PERSISTENT DATA MANAGEMENT & ALL STUDENTS REPORT
     ========================================================= */

  async function saveStudentRecord() {
    playCyberSound('click');
    const pStats = calculatePercentageMetrics();
    const cStats = calculateCgpaMetrics();
    const curResult = state.lastAnalysisResult || computeClientSideFallback(state);

    const recordPayload = {
      studentName: state.studentName,
      university: state.university,
      academicYear: state.academicYear,
      semester: state.semester,
      percentage: pStats.percentage,
      sgpa: cStats.semesterSgpa,
      cgpa: cStats.cumulativeCgpa,
      reactionTitle: curResult.reactionTitle
    };

    try {
      const resp = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: state.studentName,
          university: state.university,
          academicYear: state.academicYear,
          semester: state.semester,
          gradingScheme: state.gradingScheme,
          subjectMarks: state.marks,
          subjectGrades: state.grades,
          pastSemesters: state.pastSemesters
        })
      });
      if (resp.ok) {
        showToast(`Record for ${state.studentName} stored in Neural Core!`);
        return;
      }
    } catch (e) {
      console.warn('Backend save unavailable, cached locally.');
    }

    // LocalStorage fallback cache
    try {
      const existing = JSON.parse(localStorage.getItem('codealpha_records') || '[]');
      existing.unshift({
        id: Date.now().toString(),
        studentName: state.studentName,
        university: state.university,
        academicYear: state.academicYear,
        semester: state.semester,
        percentage: pStats.percentage,
        sgpa: cStats.semesterSgpa,
        cgpa: cStats.cumulativeCgpa,
        reactionTitle: curResult.reactionTitle,
        recordedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      });
      localStorage.setItem('codealpha_records', JSON.stringify(existing));
      showToast(`Record for ${state.studentName} saved persistently!`);
    } catch (e) {
      showToast('Record saved!');
    }
  }

  async function loadAllStudents() {
    let list = [];
    try {
      const resp = await fetch('/api/students');
      if (resp.ok) {
        list = await resp.json();
      }
    } catch (e) {
      console.warn('Fetching from backend failed, using local cache:', e);
    }

    if (!list || list.length === 0) {
      try {
        list = JSON.parse(localStorage.getItem('codealpha_records') || '[]');
      } catch (e) {}
    }

    renderAllStudentsTable(list);
  }

  function renderAllStudentsTable(students) {
    const tbody = document.getElementById('all-students-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!students || students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">No student records archived in database yet.</td></tr>`;
      return;
    }

    students.forEach((s) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: #ffffff;">${s.studentName}</td>
        <td>${s.university}</td>
        <td>${s.academicYear} • ${s.semester}</td>
        <td style="color: var(--cyan); font-weight: 700;">${(s.percentage || 0).toFixed(1)}%</td>
        <td style="color: var(--violet); font-weight: 700;">${(s.cgpa || 0).toFixed(2)}</td>
        <td><span style="font-size: 11px; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.08);">${s.reactionTitle || 'ANALYZED'}</span></td>
        <td style="text-align: center;">
          <button type="button" class="delete-row-btn delete-student-btn" data-id="${s.id}" title="Remove record">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.delete-student-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        try {
          await fetch(`/api/students/${id}`, { method: 'DELETE' });
        } catch (err) {}

        try {
          let cached = JSON.parse(localStorage.getItem('codealpha_records') || '[]');
          cached = cached.filter((c) => c.id !== id);
          localStorage.setItem('codealpha_records', JSON.stringify(cached));
        } catch (err) {}

        playCyberSound('click');
        loadAllStudents();
      });
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('cyber-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* =========================================================
     INITIALIZATION & EVENT BINDINGS
     ========================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial renders
    renderMarksTable();
    renderGradesTable();
    renderLiveDashboard();

    // 2. Student Information Form Inputs
    const nameInput = document.getElementById('student-name-input');
    if (nameInput) {
      nameInput.value = state.studentName;
      nameInput.addEventListener('input', (e) => {
        state.studentName = e.target.value;
      });
    }

    const uniSelect = document.getElementById('university-select');
    if (uniSelect) {
      uniSelect.value = state.university;
      uniSelect.addEventListener('change', (e) => {
        state.university = e.target.value;
      });
    }

    const yearSelect = document.getElementById('academic-year-select');
    if (yearSelect) {
      yearSelect.value = state.academicYear;
      yearSelect.addEventListener('change', (e) => {
        state.academicYear = e.target.value;
        renderLiveDashboard();
      });
    }

    const semSelect = document.getElementById('semester-select');
    if (semSelect) {
      semSelect.value = state.semester;
      semSelect.addEventListener('change', (e) => {
        state.semester = e.target.value;
        renderLiveDashboard();
      });
    }

    const schemeSelect = document.getElementById('grading-scheme-select');
    if (schemeSelect) {
      schemeSelect.value = state.gradingScheme;
      schemeSelect.addEventListener('change', (e) => {
        state.gradingScheme = e.target.value;
        renderGradesTable();
        renderLiveDashboard();
      });
    }

    // 3. Add Subject Buttons
    const addMarkBtn = document.getElementById('add-mark-row-btn');
    if (addMarkBtn) {
      addMarkBtn.addEventListener('click', () => {
        state.marks.push({ name: 'New Subject Elective', marksObtained: 85, maxMarks: 100 });
        playCyberSound('click');
        renderMarksTable();
        renderLiveDashboard();
      });
    }

    const addGradeBtn = document.getElementById('add-grade-row-btn');
    if (addGradeBtn) {
      addGradeBtn.addEventListener('click', () => {
        const scheme = SCHEMES[state.gradingScheme] || SCHEMES.UGC_10_POINT;
        state.grades.push({ name: 'New Subject Elective', credits: 3.0, grade: 'A', gradePoint: scheme.points['A'] || 8.0 });
        playCyberSound('click');
        renderGradesTable();
        renderLiveDashboard();
      });
    }

    // 4. Prominent Analyze Performance Button
    const analyzeBtn = document.getElementById('analyze-performance-btn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => {
        executePerformanceAnalysis();
      });
    }

    // 5. Sound & Voice Control Toggles
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundToggleBtn.textContent = state.soundEnabled ? '🔊 SOUND ON' : '🔇 MUTED';
        soundToggleBtn.classList.toggle('active', state.soundEnabled);
        if (state.soundEnabled) playCyberSound('click');
      });
    }

    const replayVoiceBtn = document.getElementById('replay-voice-btn');
    if (replayVoiceBtn) {
      replayVoiceBtn.addEventListener('click', () => {
        if (state.lastAnalysisResult && state.lastAnalysisResult.voiceText) {
          speakVoiceReaction(state.lastAnalysisResult.voiceText);
        } else {
          speakVoiceReaction('Greetings scholar! Click Analyze My Performance to synthesize your academic telemetry.');
        }
      });
    }

    // 6. Persistence Save Button
    const saveBtn = document.getElementById('save-record-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveStudentRecord);
    }

    // 7. Student Summary Report Modal / Drawer
    const modal = document.getElementById('records-modal');
    const openModalBtn = document.getElementById('open-records-drawer-btn');
    const closeModalBtn = document.getElementById('close-records-modal-btn');

    if (openModalBtn && modal) {
      openModalBtn.addEventListener('click', () => {
        playCyberSound('click');
        loadAllStudents();
        modal.classList.add('open');
      });
    }

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        playCyberSound('click');
        modal.classList.remove('open');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }

    // Auto-run initial silent analysis so the screen displays complete demonstration results immediately
    executePerformanceAnalysis();
  });
})();
