/* gk-form-source.js
   Tags every lead-form submission with the source page URL so John can see
   which page generated the lead in the CRM/email.

   v2: Also injects a clearly labelled summary block when the visitor arrives
   from the besparingskalkylator (CTA carries the settings as URL params,
   marker param = "besparing"). The block is captured at page load — before
   the multi-step form rewrites anything — and prepended at submit.

   Hooks the submit event in capture phase so values get injected BEFORE
   Webflow's native form handler reads them.
*/

(function () {
  function kalkylSummary() {
    try {
      var sp = new URLSearchParams(window.location.search);
      if (!sp.has('besparing')) return null;
      var get = function (k, d) { return sp.has(k) ? sp.get(k) : d; };
      var fmtN = function (v) {
        var n = parseFloat(v);
        return isFinite(n) ? n.toLocaleString('sv-SE') : v;
      };
      var avtal = { hourly: 'Timpris', monthly: 'Månadspris', fixed: 'Fastpris' }[get('avtal', 'hourly')] || 'Timpris';
      var rows = [];
      rows.push('Solceller: ' + get('pv', '10') + ' kWp · Batteri: ' + get('batt', '10') + ' kWh · Förbrukning: ' + fmtN(get('kwh', '15000')) + ' kWh/år');
      rows.push('Elområde: ' + get('zon', 'SE3') + ' · Elavtal: ' + avtal + ' · Elbil hemma: ' + (get('elbil', '0') === '1' ? 'Ja' : 'Nej'));
      if (sp.has('pris')) rows.push('Angivet totalpris: ' + fmtN(sp.get('pris')) + ' kr (efter grönt avdrag)');
      var b = 'Beräknad besparing: ca ' + fmtN(sp.get('besparing')) + ' SEK/år';
      if (sp.has('varavbatteri')) b += ' (varav batteri ca ' + fmtN(sp.get('varavbatteri')) + ' SEK)';
      rows.push(b);
      var qs = [];
      ['pv', 'batt', 'kwh', 'zon', 'elbil', 'avtal', 'tariff', 'grid', 'dag', 'natt', 'sommar', 'vinter', 'pris'].forEach(function (k) {
        if (sp.has(k)) qs.push(k + '=' + encodeURIComponent(sp.get(k)));
      });
      var link = 'https://gronkraftab.se/besparingskalkylator' + (qs.length ? '?' + qs.join('&') : '');
      rows.push('Öppna kalkylen: ' + link);
      return '🧮 FRÅN BESPARINGSKALKYLATORN\n' + rows.join('\n') + '\n\n';
    } catch (e) { return null; }
  }

  // Captured once at load, before the visitor interacts with the form.
  var KALKYL = kalkylSummary();

  function tag(form) {
    if (!form || form.__gkSourceTagged) return;
    form.__gkSourceTagged = true;

    var src = window.location.origin + window.location.pathname;
    var prefix = '🌐 Källa: ' + src + '\n\n';

    // Find any of the common message-style fields and prepend source
    var targets = [
      form.querySelector('[name="summary"]'),
      form.querySelector('[name="meddelande"]'),
      form.querySelector('[name="Message"]')
    ].filter(Boolean);

    targets.forEach(function (input) {
      var v = input.value || '';
      var block = '';
      if (KALKYL && v.indexOf('BESPARINGSKALKYLATORN') === -1) {
        block = KALKYL;
      }
      if (v.indexOf('Källa:') === -1) {
        block += prefix;
      }
      if (block) {
        input.value = block + v;
      }
    });
  }

  // Listen for submit events on all forms (capture phase = before form's own handler)
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;

    // For our bridge forms, the data is set by JS just before submit.
    // Tag the bridge form OR a hero-form (city page) at the moment of submit.
    if (f.matches('form[data-gk-bridge="true"]') || f.id === 'hero-form') {
      tag(f);
    }
  }, true);

  // Also intercept programmatic submit triggers — JS-clicked submit buttons
  // bypass the submit event capture phase in some browsers. Patch HTMLFormElement.submit
  // to ensure tagging happens.
  var originalSubmit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () {
    if (this.matches('form[data-gk-bridge="true"]') || this.id === 'hero-form') {
      tag(this);
    }
    return originalSubmit.apply(this, arguments);
  };
})();
