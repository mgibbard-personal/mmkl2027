/* =========================================
   Lexi & Max Wedding Website — main.js
   ========================================= */

// ── WEDDING DATE ──────────────────────────
const WEDDING_DATE = new Date('2027-05-22T16:00:00');

// ── COUNTDOWN TIMER ───────────────────────
function updateCountdown() {
  const now  = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    document.getElementById('countdown-timer').innerHTML =
      '<p style="font-family:var(--font-display);font-size:2rem;color:var(--blush)">Today\'s the day! 🎉</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent    = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);


// ── STICKY NAV ────────────────────────────
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE NAV TOGGLE ─────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ── ADD TO CALENDAR ───────────────────────
document.querySelectorAll('.add-to-cal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const name  = btn.dataset.name;
    const start = btn.dataset.date.replace(/[-:]/g, '') + 'Z';
    const end   = start;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(name)}` +
      `&dates=${encodeURIComponent(start)}/${encodeURIComponent(end)}` +
      `&details=${encodeURIComponent("Lexi & Max's Wedding — May 22, 2027. Visit mmkl2027.com for details.")}`;
    window.open(gcalUrl, '_blank');
  });
});


// ── RSVP FORM ─────────────────────────────
// 📌 TO SET UP GOOGLE SHEETS COLLECTION:
//    1. Go to docs.google.com/spreadsheets → create a new sheet
//    2. Extensions → Apps Script → paste the script from SETUP.md
//    3. Deploy → Web App → copy the URL
//    4. Paste it below as GOOGLE_SCRIPT_URL
//
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const rsvpForm    = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const rsvpSubmit  = document.getElementById('rsvp-submit');

rsvpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  const name      = document.getElementById('rsvp-name').value.trim();
  const email     = document.getElementById('rsvp-email').value.trim();
  const attending = document.getElementById('rsvp-attending').value;

  if (!name || !email || !attending) {
    alert('Please fill in your name, email, and attendance selection.');
    return;
  }

  rsvpSubmit.textContent = 'Sending…';
  rsvpSubmit.disabled = true;

  const formData = {
    name,
    email,
    attending: attending === 'yes' ? 'Attending' : 'Not attending',
    guests:    document.getElementById('rsvp-guests').value,
    dietary:   document.getElementById('rsvp-dietary').value.trim(),
    timestamp: new Date().toISOString(),
  };

  // If no Google Script URL set yet, show success anyway (for testing)
  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    console.log('RSVP data (not yet connected to Google Sheets):', formData);
    showSuccess();
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    showSuccess();
  } catch (err) {
    console.error('RSVP submission error:', err);
    rsvpSubmit.textContent = 'Send my RSVP ♡';
    rsvpSubmit.disabled = false;
    alert('Something went wrong. Please try again or email us directly.');
  }
});

function showSuccess() {
  rsvpForm.style.display    = 'none';
  rsvpSuccess.style.display = 'block';
}


// ── SMOOTH SCROLL for anchor links ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
