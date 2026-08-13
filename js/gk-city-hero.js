/* gk-city-hero.js v109 — SEO only.
   The city hero, header, footer and lead form are NATIVE Webflow elements/
   components since 2026-08-13 (built via MCP 2.0). This script now only fixes
   the per-page JSON-LD at runtime: canonical URL override, FAQPage lift,
   URL absolutify, and BreadcrumbList emit. No visual injection remains.
*/

(function () {
  if (location.pathname.indexOf('/stader/solcellsbesiktning-') === -1) return;

  var THIS_VERSION = 109;
  var existing = window.__gkCityHeroVersion || 0;
  if (existing >= THIS_VERSION) return;
  window.__gkCityHeroVersion = THIS_VERSION;

  var match = location.pathname.match(/\/stader\/solcellsbesiktning-([a-z]+)/);
  if (!match) return;
  var slug = match[1];

  var CITY = {
    goteborg: 'Göteborg', halmstad: 'Halmstad', malmo: 'Malmö', boras: 'Borås',
    kungalv: 'Kungälv', helsingborg: 'Helsingborg', lund: 'Lund',
    kristianstad: 'Kristianstad', ystad: 'Ystad', trelleborg: 'Trelleborg',
    varberg: 'Varberg', kungsbacka: 'Kungsbacka', falkenberg: 'Falkenberg',
    alingsas: 'Alingsås', lidkoping: 'Lidköping', skovde: 'Skövde',
    uddevalla: 'Uddevalla', trollhattan: 'Trollhättan', jonkoping: 'Jönköping',
    varnamo: 'Värnamo', nassjo: 'Nässjö', vaxjo: 'Växjö', ljungby: 'Ljungby',
    stockholm: 'Stockholm', uppsala: 'Uppsala', vasteras: 'Västerås',
    orebro: 'Örebro'
  };
  var cityName = CITY[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1));

  function init() {
    // SEO: lift nested FAQPage out of WebPage.about → top-level FAQPage
    // Also absolutify any relative URLs (url/item/@id) in city-page JSON-LD
    var ORIGIN = 'https://www.gronkraftab.se';
    function _abs(u) {
      if (typeof u !== 'string') return u;
      if (u.indexOf('http') === 0 || u.indexOf('//') === 0) return u;
      if (u.charAt(0) === '/') return ORIGIN + u;
      return u;
    }
    function _walk(o) {
      if (Array.isArray(o)) { for (var i = 0; i < o.length; i++) _walk(o[i]); return; }
      if (o && typeof o === 'object') {
        for (var k in o) {
          if (k === 'url' || k === 'item' || k === '@id') o[k] = _abs(o[k]);
          else if (typeof o[k] === 'object') _walk(o[k]);
        }
      }
    }
    var canonical = ORIGIN + location.pathname;
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (s) {
      if (s.hasAttribute('data-gk-jsonld-fixed')) return;
      var data;
      try { data = JSON.parse(s.textContent); } catch (e) { return; }
      if (data['@type'] === 'WebPage') {
        // Override url to actual canonical — source per-page JSON-LD has wrong path
        data.url = canonical;
        if (data.mainEntity && data.mainEntity.url) data.mainEntity.url = canonical;
      }
      if (data['@type'] === 'WebPage' && data.about && data.about['@type'] === 'FAQPage' && data.about.mainEntity) {
        var faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.about.mainEntity };
        delete data.about;
        var faqEl = document.createElement('script');
        faqEl.type = 'application/ld+json';
        faqEl.setAttribute('data-gk-faq-lifted', '1');
        faqEl.setAttribute('data-gk-jsonld-fixed', '1');
        faqEl.textContent = JSON.stringify(faq);
        s.parentNode.insertBefore(faqEl, s.nextSibling);
      }
      _walk(data);
      s.textContent = JSON.stringify(data);
      s.setAttribute('data-gk-jsonld-fixed', '1');
    });

    // SEO: emit BreadcrumbList JSON-LD matching the visual breadcrumb
    if (!document.querySelector('script[data-gk-breadcrumb]')) {
      var crumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hem', item: ORIGIN + '/' },
          { '@type': 'ListItem', position: 2, name: 'Besiktning', item: ORIGIN + '/besiktning-service' },
          { '@type': 'ListItem', position: 3, name: cityName, item: canonical }
        ]
      };
      var cs = document.createElement('script');
      cs.type = 'application/ld+json';
      cs.setAttribute('data-gk-breadcrumb', '1');
      cs.setAttribute('data-gk-jsonld-fixed', '1');
      cs.setAttribute('data-gk-abs', '1');
      cs.textContent = JSON.stringify(crumb);
      document.head.appendChild(cs);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
