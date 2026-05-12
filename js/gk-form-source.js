/* gk-form-source.js
   Tags every lead-form submission with the source page URL so John can see
   which page generated the lead in the CRM/email.

   Hooks the submit event in capture phase so values get injected BEFORE
   Webflow's native form handler reads them.
*/

(function () {
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
      if (v.indexOf('Källa:') === -1) {
        input.value = prefix + v;
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
