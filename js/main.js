/* ============================================================
   MOBILE NAVIGATION
============================================================ */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-links');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ============================================================
   FAQ ACCORDION
============================================================ */
(function () {
  const buttons = document.querySelectorAll('.faq-q');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId   = btn.getAttribute('aria-controls');
      const answer     = document.getElementById(answerId);

      // Collapse all
      buttons.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        const a = document.getElementById(b.getAttribute('aria-controls'));
        if (a) a.hidden = true;
      });

      // Expand this one if it was closed
      if (!isExpanded && answer) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
})();

/* ============================================================
   LEAD FORM — RADIO/CHECKBOX KEYBOARD SUPPORT
============================================================ */
(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    var opt = e.target.closest('.radio-opt');
    if (!opt) return;
    e.preventDefault();
    var input = opt.querySelector('input');
    if (!input) return;
    if (input.type === 'radio') {
      input.checked = true;
    } else if (input.type === 'checkbox') {
      input.checked = !input.checked;
    }
    input.dispatchEvent(new Event('change'));
  });
})();

/* ============================================================
   MULTI-STEP LEAD FORM
============================================================ */
(function () {

  var mfState   = {};
  var mfHistory = ['fs-1'];

  function mfShowStep(id) {
    document.querySelectorAll('.mf-step').forEach(function (el) {
      el.classList.remove('mf-step--active');
    });
    var step = document.getElementById(id);
    if (!step) return;
    step.classList.add('mf-step--active');
    var card = document.querySelector('.gk-form');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function mfRadio(name, errId) {
    var el  = document.querySelector('input[name="' + name + '"]:checked');
    var err = errId ? document.getElementById(errId) : null;
    if (!el) { if (err) err.hidden = false; return false; }
    if (err) err.hidden = true;
    return el.value;
  }

  function mfCheckboxes(name, errId) {
    var els = document.querySelectorAll('input[name="' + name + '"]:checked');
    var err = errId ? document.getElementById(errId) : null;
    if (!els.length) { if (err) err.hidden = false; return false; }
    if (err) err.hidden = true;
    return Array.from(els).map(function (c) { return c.value; }).join(', ');
  }

  function mfFields(ids, errId) {
    var ok  = true;
    var err = errId ? document.getElementById(errId) : null;
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) { el.style.borderColor = '#c0392b'; ok = false; }
      else el.style.borderColor = '';
    });
    if (!ok) { if (err) err.hidden = false; return false; }
    if (err) err.hidden = true;
    return true;
  }

  function mfVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function mfGoto(id) {
    mfHistory.push(id);
    mfShowStep(id);
  }

  /* ── Navigation ── */
  window.mfNext = function (cur) {
    var next;

    if (cur === 'fs-1') {
      var omrade = mfRadio('fs1-omrade', 'fs1-err');
      if (!omrade) return;
      mfState.omrade = omrade;
      next = omrade === 'elbilsladdning' ? 'fs-2a' :
             omrade === 'solceller-batteri' ? 'fs-2b' : 'fs-2c';

    } else if (cur === 'fs-2a') {
      var kt = mfRadio('fs2a-kundtyp', 'fs2a-err');
      if (!kt) return;
      mfState.kundtyp = kt;
      next = kt === 'foretag' ? 'fs-3b' : 'fs-3a';

    } else if (cur === 'fs-2b') {
      var kt2 = mfRadio('fs2b-kundtyp', 'fs2b-err');
      if (!kt2) return;
      mfState.kundtyp = kt2;
      next = 'fs-3c';

    } else if (cur === 'fs-2c') {
      var tj = mfRadio('fs2c-tjanst', 'fs2c-err');
      if (!tj) return;
      mfState.tjanst = tj;
      next = 'fs-3d';

    } else if (cur === 'fs-3a') {
      var u = mfVal('fs3a-uttag');
      var e3a = document.getElementById('fs3a-err');
      if (!u) { if (e3a) e3a.hidden = false; return; }
      if (e3a) e3a.hidden = true;
      mfState.antalUttag = u;
      next = mfState.kundtyp === 'privat' ? 'fs-4a' : 'fs-4b';

    } else if (cur === 'fs-3b') {
      var lad = mfRadio('fs3b-laddare', null);
      var u3b = mfVal('fs3b-uttag');
      var e3b = document.getElementById('fs3b-err');
      if (!lad || !u3b) { if (e3b) e3b.hidden = false; return; }
      if (e3b) e3b.hidden = true;
      mfState.laddare    = lad;
      mfState.antalUttag = u3b;
      next = 'fs-4b';

    } else if (cur === 'fs-3c') {
      var intr = mfRadio('fs3c-intresse', 'fs3c-err');
      if (!intr) return;
      mfState.intresse = intr;
      next = mfState.kundtyp === 'privat' ? 'fs-4c' : 'fs-4d';

    } else if (cur === 'fs-3d') {
      var kont = mfCheckboxes('fs3d-kontroll', 'fs3d-err');
      if (!kont) return;
      mfState.kontrollera = kont;
      next = kont === 'elbilsladdare' ? 'fs-5c' : 'fs-4e';

    } else if (cur === 'fs-4b') {
      if (!mfFields(['fs4b-orgnamn','fs4b-adress','fs4b-kommun','fs4b-postort'], 'fs4b-err')) return;
      mfState.orgNamn  = mfVal('fs4b-orgnamn');
      mfState.orgNr    = mfVal('fs4b-orgnr');
      mfState.adress   = mfVal('fs4b-adress');
      mfState.kommun   = mfVal('fs4b-kommun');
      mfState.postort  = mfVal('fs4b-postort');
      next = 'fs-5a';

    } else if (cur === 'fs-4d') {
      if (!mfFields(['fs4d-orgnamn','fs4d-adress','fs4d-kommun','fs4d-postort'], 'fs4d-err')) return;
      mfState.orgNamn  = mfVal('fs4d-orgnamn');
      mfState.orgNr    = mfVal('fs4d-orgnr');
      mfState.adress   = mfVal('fs4d-adress');
      mfState.kommun   = mfVal('fs4d-kommun');
      mfState.postort  = mfVal('fs4d-postort');
      next = 'fs-5b';

    } else if (cur === 'fs-4e') {
      var bef = mfRadio('fs4e-befintlig', 'fs4e-err');
      if (!bef) return;
      mfState.befintlig = bef;
      next = 'fs-5c';
    }

    if (next) mfGoto(next);
  };

  window.mfBack = function () {
    if (mfHistory.length > 1) {
      mfHistory.pop();
      mfShowStep(mfHistory[mfHistory.length - 1]);
    }
  };

  /* ── Submit ── */
  window.mfSubmit = function (cur) {
    var reqMap = {
      'fs-4a': ['fs4a-namn','fs4a-tel','fs4a-epost','fs4a-adress','fs4a-kommun'],
      'fs-4c': ['fs4c-namn','fs4c-tel','fs4c-epost','fs4c-adress','fs4c-kommun'],
      'fs-5a': ['fs5a-kontakt','fs5a-tel','fs5a-epost'],
      'fs-5b': ['fs5b-kontakt','fs5b-tel','fs5b-epost'],
      'fs-5c': ['fs5c-namn','fs5c-tel','fs5c-epost','fs5c-adress','fs5c-kommun']
    };
    var errMap = {
      'fs-4a':'fs4a-err','fs-4c':'fs4c-err',
      'fs-5a':'fs5a-err','fs-5b':'fs5b-err','fs-5c':'fs5c-err'
    };

    if (!mfFields(reqMap[cur] || [], errMap[cur] || null)) return;

    if (cur === 'fs-4a') {
      mfState.namn = mfVal('fs4a-namn'); mfState.telefon = mfVal('fs4a-tel');
      mfState.epost = mfVal('fs4a-epost'); mfState.adress = mfVal('fs4a-adress');
      mfState.kommun = mfVal('fs4a-kommun');
    } else if (cur === 'fs-4c') {
      mfState.namn = mfVal('fs4c-namn'); mfState.telefon = mfVal('fs4c-tel');
      mfState.epost = mfVal('fs4c-epost'); mfState.adress = mfVal('fs4c-adress');
      mfState.kommun = mfVal('fs4c-kommun');
    } else if (cur === 'fs-5a') {
      mfState.kontaktperson = mfVal('fs5a-kontakt'); mfState.telefon = mfVal('fs5a-tel');
      mfState.epost = mfVal('fs5a-epost'); mfState.meddelande = mfVal('fs5a-meddelande');
    } else if (cur === 'fs-5b') {
      mfState.kontaktperson = mfVal('fs5b-kontakt'); mfState.telefon = mfVal('fs5b-tel');
      mfState.epost = mfVal('fs5b-epost'); mfState.meddelande = mfVal('fs5b-meddelande');
    } else if (cur === 'fs-5c') {
      mfState.namn = mfVal('fs5c-namn'); mfState.telefon = mfVal('fs5c-tel');
      mfState.epost = mfVal('fs5c-epost'); mfState.adress = mfVal('fs5c-adress');
      mfState.kommun = mfVal('fs5c-kommun'); mfState.meddelande = mfVal('fs5c-meddelande');
    }

    /* Show success immediately */
    mfGoto('fs-done');

    /* Webflow bridge: copy values into the hidden Webflow form and submit it */
    var wfForm = document.querySelector('form[data-name="leads-gronkraft"]');
    if (wfForm) {
      Object.keys(mfState).forEach(function (k) {
        if (mfState[k] === undefined) return;
        var input = wfForm.querySelector('[name="' + k + '"]');
        if (input) input.value = mfState[k];
      });
      var submitBtn = wfForm.querySelector('input[type="submit"], button[type="submit"]');
      if (submitBtn) submitBtn.click();
    } else {
      /* Local dev fallback: silent POST to legacy hidden form */
      var form = document.getElementById('mf-submit-form');
      if (form) {
        form.innerHTML = '';
        Object.keys(mfState).forEach(function (k) {
          if (mfState[k] === undefined) return;
          var inp = document.createElement('input');
          inp.type = 'hidden'; inp.name = k; inp.value = mfState[k];
          form.appendChild(inp);
        });
        try { fetch(form.action, { method: 'POST', body: new FormData(form) }); } catch (e) {}
      }
    }

    /* Tracking — Google Ads conversion + Meta Pixel Lead event */
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'event_category': 'lead',
          'event_label': mfState.omrade || 'unknown'
        });
        window.gtag('event', 'generate_lead', {
          'event_category': 'lead',
          'event_label': mfState.omrade || 'unknown'
        });
      }
    } catch (e) {}
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_category: mfState.omrade || 'unknown',
          content_name: mfState.kundtyp || mfState.tjanst || 'unknown'
        });
      }
    } catch (e) {}
  };

})();

/* ============================================================
   STICKY HEADER — shadow on scroll
============================================================ */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.10)';
    } else {
      header.style.boxShadow = '';
    }
  }, { passive: true });
})();
