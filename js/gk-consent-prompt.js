/* gk-consent-prompt.js
   Consolidated CookieYes consent prompt for form interactions.
   Replaces gkconsentprompt 4.0.0 + 4.0.1 + 4.0.2 which previously stacked.
   Combines:
   - 4.0.1's corrected cookie-state parser (distinguishes consent:yes vs consent:no)
   - 4.0.2's patches: rate-limit revisit-button clicks + dedupe gtag events
   - Inline yellow banner that appears in any form on focusin when consent is missing
   2026-09-03: event param renamed source -> prompt_trigger (GA4 read `source` as the
   session's traffic source, creating a bogus "form_focus / (not set)" channel).
*/
(function () {
  var REVISIT_SEL = '[class*="cky-revisit-"], .cky-btn-revisit-wrapper';

  // Inject the inline-banner CSS (idempotent)
  if (!document.querySelector('style[data-gk-consent-prompt]')) {
    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-gk-consent-prompt', '1');
    styleEl.textContent =
      '.gk-cn{background:#fff8e1;border-left:4px solid #f5b800;padding:12px 16px;margin:16px 0;font-size:14px;border-radius:4px;color:#3a2a00}' +
      '.gk-cn p{margin:0}' +
      '.gk-cn a{text-decoration:underline;font-weight:600;cursor:pointer;color:#3a2a00}';
    document.head.appendChild(styleEl);
  }

  // Cookie state: 'u' = unanswered, 'a' = accepted, 'd' = denied (rejected)
  function state() {
    var match = document.cookie.split('; ').find(function (r) {
      return r.indexOf('cookieyes-consent=') === 0;
    });
    if (!match) return 'u';
    var decoded = decodeURIComponent(match.split('=')[1]);
    if (!/action:yes/.test(decoded)) return 'u';
    if (/consent:yes/.test(decoded)) return 'a';
    return 'd';
  }

  function openRevisit() {
    var btn = document.querySelector(REVISIT_SEL);
    if (btn) btn.click();
  }

  // Patch CookieYes revisit button + gtag dedupe.
  // Runs multiple times to catch CookieYes lazy-loading after init.
  function patch() {
    var btn = document.querySelector(REVISIT_SEL);
    if (btn && !btn.__gkRateLimited) {
      btn.__gkRateLimited = 1;
      var origClick = HTMLElement.prototype.click.bind(btn);
      var cooldown = false;
      btn.click = function () {
        if (cooldown) return;
        cooldown = true;
        setTimeout(function () { cooldown = false; }, 1500);
        origClick();
      };
    }
    if (window.gtag && !window.__gkGtagWrapped) {
      window.__gkGtagWrapped = 1;
      var origGtag = window.gtag;
      var recentEvents = {};
      window.gtag = function (type, event) {
        if (type === 'event' && event === 'consent_prompt_shown') {
          if (recentEvents[event]) return;
          recentEvents[event] = 1;
          setTimeout(function () { recentEvents[event] = 0; }, 1500);
        }
        return origGtag.apply(this, arguments);
      };
    }
  }

  function showInlineBanner(form) {
    if (form.querySelector('.gk-cn')) return;
    var div = document.createElement('div');
    div.className = 'gk-cn';
    div.innerHTML = '<p>För bästa service, vänligen <a class="gk-cn-o">acceptera cookies</a>.</p>';
    var submitBtn = form.querySelector('input[type=submit],button[type=submit]');
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(div, submitBtn);
    } else {
      form.appendChild(div);
    }
    div.querySelector('.gk-cn-o').addEventListener('click', function (e) {
      e.preventDefault();
      openRevisit();
    });
  }

  function init() {
    patch();
    document.querySelectorAll('form').forEach(function (form) {
      var fired = false;
      form.addEventListener('focusin', function () {
        if (fired) return;
        fired = true;
        var s = state();
        if (s === 'u') openRevisit();
        if (s !== 'a') showInlineBanner(form);
        if (window.gtag) gtag('event', 'consent_prompt_shown', { prompt_trigger: 'form_focus' });
      });
    });
    document.addEventListener('cookieyes_consent_update', function () {
      if (state() === 'a') {
        document.querySelectorAll('.gk-cn').forEach(function (n) { n.remove(); });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Late-firing patches in case CookieYes loads after init
  setTimeout(patch, 500);
  setTimeout(patch, 1500);
})();
