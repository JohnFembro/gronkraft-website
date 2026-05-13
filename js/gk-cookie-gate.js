/* gk-cookie-gate.js
   Blocks lead-form submissions until the CookieYes consent cookie is set.
   Targets the bridge form (data-gk-bridge), the city-page hero-form, and the
   contact-page custom form. On submit attempt without consent: prevent submit,
   show a sticky toast, scroll the CookieYes banner into view + highlight it.
*/
(function () {
  function hasConsent() {
    // Broad match — CookieYes versions differ on cookie naming
    if (/(?:^|;\s*)(cookieyes-consent|cky-consent|cookie-yes-consent|CookieConsent)=/i.test(document.cookie)) return true;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && /(cookieyes|cky.?consent|cookie.?consent)/i.test(k)) return true;
      }
    } catch (e) {}
    return false;
  }

  var GATED = 'form[data-gk-bridge="true"], #hero-form, form[data-gk-cf="root"]';

  function showToast() {
    if (document.getElementById('gk-consent-toast')) return;
    var t = document.createElement('div');
    t.id = 'gk-consent-toast';
    t.setAttribute('role', 'alert');
    t.innerHTML = '⚠️ <strong>Acceptera cookies först</strong> — vi behöver ditt samtycke innan vi kan behandla din förfrågan.<button type="button" aria-label="Stäng">×</button>';
    document.body.appendChild(t);
    t.querySelector('button').addEventListener('click', function () { t.remove(); });
    setTimeout(function () {
      var el = document.getElementById('gk-consent-toast');
      if (el) el.remove();
    }, 8000);
  }

  function openBanner() {
    var sels = ['.cky-banner-element', '.cky-consent-container', '#cky-consent', '.cky-modal'];
    for (var i = 0; i < sels.length; i++) {
      var n = document.querySelector(sels[i]);
      if (n) {
        n.style.display = '';
        try { n.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
        n.style.outline = '3px solid #1F8A4C';
        n.style.outlineOffset = '4px';
        setTimeout(function () { n.style.outline = ''; n.style.outlineOffset = ''; }, 3000);
        return;
      }
    }
  }

  function block(form) {
    if (hasConsent()) return false;
    if (!form || !form.matches || !form.matches(GATED)) return false;
    showToast();
    openBanner();
    return true;
  }

  // Capture phase + stopImmediatePropagation — Webflow's submit handler is
  // bound on the form element itself (target phase). stopPropagation alone
  // would NOT stop Webflow's AJAX submit; only stopImmediatePropagation will.
  document.addEventListener('submit', function (e) {
    if (block(e.target)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  }, true);

  // The lf-card multi-step uses onclick="mfSubmit(...)" etc. — those handlers
  // populate the bridge form AND transition UI to the success step before any
  // submit event fires. Blocking only the submit event leaves a fake success.
  // We intercept the click in capture phase so onclick never runs.
  function isLeadSubmitClick(btn) {
    if (!btn) return false;
    if (btn.matches('[data-gk-cf="submit"]')) return true;
    if (btn.type === 'submit' && btn.closest('form[data-gk-bridge="true"], #hero-form, form[data-gk-cf="root"]')) return true;
    if (!btn.closest('.lf-card')) return false;
    var onclick = btn.getAttribute('onclick') || '';
    if (/(?:mf|bf|sol|ef|cf)Submit\(/.test(onclick)) return true;
    var txt = (btn.textContent || btn.value || '').trim().toLowerCase();
    return /skicka|beg.r offert/.test(txt);
  }

  document.addEventListener('click', function (e) {
    if (hasConsent()) return;
    var btn = e.target.closest('button, input, a');
    if (!isLeadSubmitClick(btn)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    showToast();
    openBanner();
  }, true);

  var origSubmit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () {
    if (block(this)) return;
    return origSubmit.apply(this, arguments);
  };

  var poll = setInterval(function () {
    if (hasConsent()) {
      var el = document.getElementById('gk-consent-toast');
      if (el) el.remove();
      clearInterval(poll);
    }
  }, 600);

  var css = document.createElement('style');
  css.textContent = '#gk-consent-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#FFF3CD;border:1px solid #FFE69C;color:#664D03;padding:14px 48px 14px 18px;border-radius:10px;font-size:14px;font-family:inherit;box-shadow:0 8px 24px rgba(0,0,0,.15);z-index:999998;max-width:520px;line-height:1.45;animation:gkToastIn .3s ease-out}#gk-consent-toast strong{font-weight:700}#gk-consent-toast button{position:absolute;top:6px;right:8px;background:none;border:0;font-size:22px;color:#664D03;cursor:pointer;line-height:1;padding:4px 8px}@keyframes gkToastIn{from{opacity:0;transform:translate(-50%,-12px)}to{opacity:1;transform:translate(-50%,0)}}';
  document.head.appendChild(css);
})();
