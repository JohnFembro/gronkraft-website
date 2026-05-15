/* gk-city-hero.js
   Runtime replacement of old header + hero on /stader/solcellsbesiktning-<city>
   - New header (matches new design across solceller/solcellsbatteri/brf)
   - New sub-banner hero with breadcrumb, h1, intro
   - 2-step besiktning form in hero (lf-card pattern, bridged to existing
     hero-form on the page so Webflow's submit + /tack redirect works)
   - Background image varied per city (deterministic hash → 8 candidates)
*/

(function () {
  if (location.pathname.indexOf('/stader/solcellsbesiktning-') === -1) return;

  // Version check — newer version always wins, regardless of script execution order.
  // Bump this in lockstep with the loader SHA to make new edits take effect.
  var THIS_VERSION = 103;
  var existing = window.__gkCityHeroVersion || 0;
  if (existing >= THIS_VERSION) return;

  // Always remove prior injection — older un-versioned predecessors don't set the
  // marker, so we can't rely on `existing > 0` here. Clean up unconditionally.
  var prior = document.querySelectorAll(
    '[data-gk-city-hero], header[data-gk-header][data-gk-injected="1"], ' +
    'footer[data-gk-footer][data-gk-injected="1"], style[data-gk-city-hero-css]'
  );
  for (var i = 0; i < prior.length; i++) prior[i].remove();
  window.__gkCityHeroVersion = THIS_VERSION;

  var match = location.pathname.match(/\/stader\/solcellsbesiktning-([a-z]+)/);
  if (!match) return;
  var slug = match[1];

  // City display names — Swedish proper-cased
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

  var BASE = 'https://cdn.prod.website-files.com/689459ca72b26f3abc2a641d/';

  // 8 background images — distributed across 27 cities by deterministic hash
  var IMAGES = [
    '699c42add358ba3ab51d67f0_nuno-marques-0GbrjL3vZF4-unsplash.avif',
    '699d7411ef8bde4a4b9bbdba_03a6e7a81ee291b97fda6546962c4f8d_andreas-gucklhorn-Ilpf2eUPpUE-unsplash.avif',
    '692699a132426adc459f0ce0_martijn-baudoin-pldJSFIcn20-unsplash.avif',
    '69833628720456d95c9a2026_michael-pointner-9XNbOxsSIrw-unsplash.avif',
    '68b6061dad3c50e26121013b_soren-h-omfN1pW-n2Y-unsplash.jpg',
    '68b605c32130f861f2901685_benjamin-jopen-2SfssudtyIA-unsplash.jpg',
    '6a030f8681b48d6eca68dd89_Sun%20panels%20in%20the%20evening.avif',
    '689588873887778274895950_andreas-gucklhorn-7razCd-RUGs-unsplash.avif'
  ];

  function hashSlug(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
    return Math.abs(h) % IMAGES.length;
  }

  var cityName = CITY[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1));

  // Per-city hero image override — takes precedence over the hash distribution
  var CITY_IMAGE_OVERRIDE = {
    malmo: '6a06ca3f545ca92639bd2ab2_karl-hornfeldt-X0wvdQZbZAw-unsplash.avif'
  };
  var CITY_IMAGE_ALT = {
    malmo: 'Öresundsbron som sträcker sig över lugnt vatten under en klar himmel.'
  };
  var imageURL = BASE + (CITY_IMAGE_OVERRIDE[slug] || IMAGES[hashSlug(slug)]);
  var imageAlt = CITY_IMAGE_ALT[slug] || 'Solpaneler';

  // City-specific intro paragraphs (the existing copy from the old hero — preserved per user request)
  // Falls back to a generic intro for any city not explicitly mapped.
  var INTROS = {
    goteborg: 'Vi hjälper kunder i och runt Göteborg med oberoende besiktning av solcellsanläggningen. Vi säkerställer att din anläggning är korrekt installerad, brandsäker och levererar den effekt du betalat för.',
    halmstad: 'Oberoende solcellsbesiktning i Halmstad. Vi minimerar brandrisk, säkerställer lönsamhet och ger dig underlag för garanti- och försäkringsärenden.',
    malmo: 'Säkra din solcellsanläggning med oberoende besiktning i Malmö. Vi utför teknisk kontroll med 30+ punkter och termisk analys.',
    boras: 'Oberoende solcellsbesiktning i Borås. Vi kontrollerar säkerhet, lönsamhet och garanti — extra noggrant i ett av landets nederbördsrikaste klimat.',
    kungalv: 'Oberoende solcellsbesiktning i Kungälv. Vi kontrollerar säkerhet, effektivitet och efterlevnad — med särskild vana av kustnära anläggningar.',
    helsingborg: 'Oberoende solcellsbesiktning i Helsingborg. Vi säkrar din anläggning mot brandrisk, verifierar lönsamhet och ger dig dokumentation för garanti och försäkring.',
    lund: 'Professionell solcellsbesiktning i Lund. 30+ kontrollpunkter, termografering och brandkontroll. För villa, BRF och företag.',
    kristianstad: 'Oberoende solcellsbesiktning i Kristianstad. Vi hjälper villaägare, BRF och företag att säkerställa trygga och effektiva solcellsanläggningar.',
    ystad: 'Professionell solcellsbesiktning i Ystad — Sveriges soligaste hörn. Vi säkrar din anläggning mot brandrisk och verifierar att den producerar som utlovat.',
    trelleborg: 'Oberoende solcellsbesiktning i Trelleborg. Vi kontrollerar säkerhet, lönsamhet och garanti för villor, BRF och företag i Sveriges soligaste kommun.',
    varberg: 'Professionell solcellsbesiktning i Varberg. Vi minimerar brandrisk och säkerställer lönsamhet — extra fokus på vindlast och kustnära montage.',
    kungsbacka: 'Oberoende solcellsbesiktning i Kungsbacka. Vi kontrollerar säkerhet, lönsamhet och garanti med 30+ kontrollpunkter och termografering.',
    falkenberg: 'Vi säkrar din solcellsinvestering i Falkenberg — från kustens villor till inlandets stora lantbruk.',
    alingsas: 'Oberoende solcellsbesiktning i Alingsås. Vi kontrollerar säkerhet, effekt och att din anläggning följer alla krav.',
    lidkoping: 'Professionell solcellsbesiktning i Lidköping. Minimera brandrisk, säkerställ lönsamhet och få garanti.',
    skovde: 'Oberoende solcellsbesiktning i Skövde och Skaraborg. Vi minimerar brandrisk och säkerställer lönsamhet på din solanläggning.',
    uddevalla: 'Professionell solcellsbesiktning i Uddevalla. Minimera brandrisk, säkerställ lönsamhet och få underlag för garanti.',
    trollhattan: 'Oberoende solcellsbesiktning i Trollhättan för privatpersoner, BRF och företag. Vi minimerar brandrisk och säkerställer lönsamhet.',
    jonkoping: 'Oberoende solcellsbesiktning i Jönköping. Vi kontrollerar säkerhet, lönsamhet och garanti för villaägare, BRF och företag.',
    varnamo: 'Oberoende solcellsbesiktning i Värnamo. Vi kontrollerar säkerhet, lönsamhet och garanti för villor, BRF och företag — inklusive lantbruksanläggningar.',
    nassjo: 'Oberoende solcellsbesiktning i Nässjö. Vi kontrollerar säkerhet, lönsamhet och garanti — med extra fokus på snölast i smålandshöjden.',
    vaxjo: 'Oberoende solcellsbesiktning i Växjö. Vi hjälper villaägare, BRF och företag att säkra sina solanläggningar.',
    ljungby: 'Oberoende solcellsbesiktning i Ljungby. Vi kontrollerar brandrisk, lönsamhet och garanti — med vana av både villor och lantbruksanläggningar.',
    stockholm: 'Oberoende solcellsbesiktning i Stockholm. Vi hjälper villaägare, BRF och företag att säkerställa säkra och lönsamma solanläggningar i hela Storstockholm.',
    uppsala: 'Oberoende solcellsbesiktning i Uppsala. Vi hjälper villaägare, BRF och företag säkerställa säkra och effektiva solanläggningar.',
    vasteras: 'Oberoende besiktning av solceller i Västerås. Vi hjälper villaägare, BRF och företag med säkra installationer vid Mälaren.',
    orebro: 'Oberoende solcellsbesiktning i Örebro. Vi kontrollerar säkerhet, lönsamhet och garanti med 30+ kontrollpunkter.'
  };
  var introText = INTROS[slug] || ('Oberoende solcellsbesiktning i ' + cityName + '. Vi kontrollerar säkerhet, lönsamhet och garanti för din anläggning.');

  // === HTML templates ===

  var FOOTER_HTML =
    '<footer data-gk-footer="true"><div data-gk-wrap="true"><div data-gk-footer-grid="true">' +
      '<div data-gk-brand-block="true">' +
        '<img src="' + BASE + '68ae1b9f1273e4c3fa49a897_Gro%CC%88nkraft%20logo%20vit.png" loading="lazy" alt="Grönkraft Sverige AB"/>' +
        '<p>Grönkraft Sverige AB är en rådgivare inom elbilsladdning, solceller, batterilager och serviceavtal. Vi kopplar privatpersoner, BRF och företag till rätt certifierad installatör.</p>' +
      '</div>' +
      '<div data-gk-footer-col="true"><h3>Tjänster</h3><ul role="list">' +
        '<li><a href="/elbilsladdning">Elbilsladdning</a></li>' +
        '<li><a href="/solceller">Solceller</a></li>' +
        '<li><a href="/solcellsbatteri">Solcellsbatteri</a></li>' +
        '<li><a href="/besiktning-service" aria-current="page" class="w--current">Besiktning &amp; Serviceavtal</a></li>' +
      '</ul></div>' +
      '<div data-gk-footer-col="true"><h3>Företag</h3><ul role="list">' +
        '<li><a href="/om-oss">Om oss</a></li>' +
        '<li><a href="/bli-partner">Bli partner</a></li>' +
        '<li><a href="/kontakta-oss">Kontakt</a></li>' +
        '<li><a href="/artiklar">Artiklar</a></li>' +
      '</ul></div>' +
      '<div data-gk-footer-col="true"><h3>Kontakt</h3><ul role="list">' +
        '<li><a href="tel:+4631105620">031-10 56 20</a></li>' +
        '<li><a href="mailto:kontakt@gronkraftab.se">kontakt@gronkraftab.se</a></li>' +
        '<li>Fläskebovägen 11g<br/>438 91 Landvetter</li>' +
      '</ul></div>' +
    '</div><div data-gk-footer-bottom="true">' +
      '<span>© 2026 Grönkraft Sverige AB · Fläskebovägen 11g, 438 91 Landvetter · 031-10 56 20</span>' +
      '<span data-gk-footer-legal="true">' +
        '<a href="/policyer-villkor/integritetspolicy">Integritetspolicy</a>' +
        '<a href="/policyer-villkor/cookiepolicy">Cookies</a>' +
        '<a href="/policyer-villkor/allmanna-villkor">Allmänna villkor</a>' +
      '</span>' +
    '</div></div></footer>';

  var HEADER_HTML =
    '<header data-gk-header="true">' +
      '<div data-gk-header-inner="true">' +
        '<a aria-label="Grönkraft startsida" data-gk-header-logo="true" href="/" class="w-inline-block">' +
          '<img src="' + BASE + '68ae1b9f1273e4c3fa49a897_Gro%CC%88nkraft%20logo%20vit.png" loading="eager" alt="Grönkraft Sverige AB"/>' +
        '</a>' +
        '<nav data-gk-header-nav="true">' +
          '<a href="/">Hem</a>' +
          '<div data-gk-header-dd="true">' +
            '<a href="#" data-gk-header-dd-trigger="true"><span>Tjänster</span> <span data-gk-chevron="true">▾</span></a>' +
            '<div data-gk-header-dd-menu="true">' +
              '<a href="/elbilsladdning">Elbilsladdning</a>' +
              '<a href="/solceller">Solceller</a>' +
              '<a href="/solcellsbatteri">Solcellsbatteri</a>' +
              '<a href="/besiktning-service" aria-current="page" class="w--current">Besiktning &amp; Serviceavtal</a>' +
            '</div>' +
          '</div>' +
          '<a href="/bli-partner">Bli partner</a>' +
          '<a href="/om-oss">Om oss</a>' +
          '<a href="/kontakta-oss">Kontakt</a>' +
        '</nav>' +
        '<a data-gk-header-cta="true" href="/#offertform">Få offert</a>' +
        '<a href="#" data-gk-header-burger="true" aria-label="Öppna meny">☰</a>' +
      '</div>' +
      '<div data-gk-header-drawer="true">' +
        '<a href="#" data-gk-drawer-close="true" aria-label="Stäng meny">×</a>' +
        '<a href="/">Hem</a>' +
        '<a href="/elbilsladdning">Elbilsladdning</a>' +
        '<a href="/solceller">Solceller</a>' +
        '<a href="/solcellsbatteri">Solcellsbatteri</a>' +
        '<a href="/besiktning-service" aria-current="page" class="w--current">Besiktning &amp; Serviceavtal</a>' +
        '<a href="/bli-partner">Bli partner</a>' +
        '<a href="/om-oss">Om oss</a>' +
        '<a href="/kontakta-oss">Kontakt</a>' +
        '<a data-gk-drawer-cta="true" href="/#offertform">Få offert</a>' +
      '</div>' +
    '</header>';

  function formHTML() {
    return (
      '<div class="lead-card lf-card" role="complementary" aria-label="Boka solcellsbesiktning" style="border-radius:22px!important;-webkit-border-radius:22px!important;overflow:hidden!important;background:rgba(255,255,255,0.97)!important;padding:26px!important;box-shadow:0 30px 60px -30px rgba(11,20,16,0.35)!important;border:1px solid rgba(255,255,255,0.6)!important;display:flex!important;flex-direction:column!important;color:#0B1410!important;width:100%!important;max-width:540px!important;min-height:460px!important;line-height:1.55!important;">' +
        '<div class="lf-progress">' +
          '<div class="lf-progress-track"><div class="lf-progress-fill" id="bf-progress-fill"></div></div>' +
          '<span class="lf-progress-label" id="bf-progress-label">Steg 1 av 2</span>' +
        '</div>' +

        '<div class="lf-step lf-step--active" id="bf-1">' +
          '<div class="lf-head"><h3>Boka besiktning</h3><p class="lf-sub">Du får offert inom 24h på vardagar.</p></div>' +
          '<p class="lf-section-label">Vem är du?</p>' +
          '<div class="lf-radios" role="radiogroup">' +
            '<label class="lf-opt"><input type="radio" name="bf-kundtyp" value="privat"><span class="lf-opt-dot" aria-hidden="true"></span><span class="lf-opt-text">Privat</span></label>' +
            '<label class="lf-opt"><input type="radio" name="bf-kundtyp" value="brf"><span class="lf-opt-dot" aria-hidden="true"></span><span class="lf-opt-text">Bostadsrättsförening</span></label>' +
            '<label class="lf-opt"><input type="radio" name="bf-kundtyp" value="foretag"><span class="lf-opt-dot" aria-hidden="true"></span><span class="lf-opt-text">Företag</span></label>' +
          '</div>' +
          '<div class="lf-err" id="bf1-err" hidden role="alert" aria-live="polite">Välj kundtyp.</div>' +
          '<div class="lf-nav"><span></span><button type="button" class="btn btn-primary" onclick="bfNext()">Nästa →</button></div>' +
        '</div>' +

        '<div class="lf-step" id="bf-2">' +
          '<div class="lf-head"><h3 id="bf2-title">Dina kontaktuppgifter</h3></div>' +
          '<div class="field lf-field"><label class="lf-label" for="bf-namn" id="bf2-namn-label">Namn</label><input type="text" id="bf-namn" name="bf-namn" autocomplete="name" placeholder="För- och efternamn"></div>' +
          '<div class="field lf-field" id="bf-orgnr-wrap" style="display:none;"><label class="lf-label" for="bf-orgnr">Org.nr <span class="lf-optional">(Valfritt)</span></label><input type="text" id="bf-orgnr" name="bf-orgnr" autocomplete="off" placeholder="Organisationsnummer"></div>' +
          '<div class="lf-row">' +
            '<div class="field lf-field"><label class="lf-label" for="bf-tel">Telefon</label><input type="tel" id="bf-tel" name="bf-tel" autocomplete="tel" placeholder="+46"></div>' +
            '<div class="field lf-field"><label class="lf-label" for="bf-epost">E-post</label><input type="email" id="bf-epost" name="bf-epost" autocomplete="email" placeholder="namn@exempel.se"></div>' +
          '</div>' +
          '<div class="field lf-field"><label class="lf-label" for="bf-adress">Adress för anläggningen</label><input type="text" id="bf-adress" name="bf-adress" autocomplete="street-address" placeholder="Gatuadress"></div>' +
          '<div class="field lf-field"><label class="lf-label" for="bf-msg">Meddelande <span class="lf-optional">(Valfritt)</span></label><textarea id="bf-msg" name="bf-msg" placeholder="t.ex. anläggningens storlek, ålder, ev. problem"></textarea></div>' +
          '<div class="lf-err" id="bf2-err" hidden role="alert" aria-live="polite">Fyll i alla obligatoriska fält.</div>' +
          '<div class="lf-nav">' +
            '<button type="button" class="lf-back" onclick="bfBack()">← Tillbaka</button>' +
            '<button type="button" class="btn btn-primary" onclick="bfSubmit()">Begär offert →</button>' +
          '</div>' +
          '<p class="tiny" style="margin-top:12px;">Genom att skicka godkänner du Grönkrafts <a href="/policyer-villkor/integritetspolicy">integritetspolicy</a></p>' +
        '</div>' +

        '<div class="lf-step" id="bf-done">' +
          '<div class="lead-success">' +
            '<span class="success-mark">✓</span>' +
            '<h3 id="bf-done-title">Tack för din förfrågan!</h3>' +
            '<p id="bf-done-sub">En av våra rådgivare hör av sig inom 24 timmar.</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // Custom CSS for the hero layout (form right, text left on desktop)
  var EXTRA_CSS =
    '[data-gk-city-hero] { position: relative; padding: 96px 0 80px; color: #fff; overflow: hidden; }' +
    '@media (min-width: 960px) { [data-gk-city-hero] { padding: 120px 0 96px; } }' +
    '[data-gk-city-hero] [data-gk-sub-banner-image="true"] { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }' +
    '[data-gk-city-hero] [data-gk-sub-banner-overlay="true"] { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,32,23,.78) 0%, rgba(6,32,23,.6) 100%); z-index: 1; }' +
    '[data-gk-city-hero] [data-gk-wrap="true"] { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }' +
    '@media (min-width: 960px) { [data-gk-city-hero] [data-gk-wrap="true"] { grid-template-columns: 1.2fr 1fr; gap: 64px; } }' +
    '[data-gk-city-hero] [data-gk-breadcrumb="true"] { font-size: 14px; margin-bottom: 24px; color: rgba(255,255,255,.7); grid-column: 1 / -1; }' +
    '[data-gk-city-hero] [data-gk-breadcrumb="true"] a { color: rgba(255,255,255,.85); text-decoration: none; }' +
    '[data-gk-city-hero] [data-gk-breadcrumb="true"] a:hover { color: #fff; text-decoration: underline; }' +
    '[data-gk-city-hero] [data-gk-bc-sep="true"] { margin: 0 8px; opacity: .5; }' +
    '[data-gk-city-hero] [data-gk-sub-h1="true"] { font-size: clamp(36px, 5vw, 56px); font-weight: 800; line-height: 1.05; letter-spacing: -.01em; margin: 0 0 16px; color: #fff; }' +
    '[data-gk-city-hero] [data-gk-sub-intro="true"] { font-size: clamp(16px, 1.5vw, 18px); line-height: 1.55; color: rgba(255,255,255,.85); max-width: 56ch; margin: 0 0 32px; }' +
    '[data-gk-city-hero] [data-gk-city-usps="true"] { display: flex; flex-wrap: wrap; gap: 32px 48px; margin-top: 8px; }' +
    '[data-gk-city-hero] [data-gk-city-usp="true"] { display: flex; flex-direction: column; }' +
    '[data-gk-city-hero] [data-gk-city-usp-num="true"] { font-size: clamp(36px, 4vw, 48px); font-weight: 800; line-height: 1; color: #4CC07A; letter-spacing: -.02em; margin-bottom: 6px; }' +
    '[data-gk-city-hero] [data-gk-city-usp-lbl="true"] { font-size: 14px; color: rgba(255,255,255,.85); letter-spacing: 0.02em; }' +
    // ===== lf-card form styles (extracted from Solceller form embed) =====
    '@keyframes lfFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }' +
    '.lf-card, .lf-card * { box-sizing: border-box; }' +
    ".lf-card label, .lf-card input, .lf-card textarea, .lf-card fieldset, .lf-card legend, .lf-card p, .lf-card span, .lf-card h3, .lf-card button { text-transform: none !important; letter-spacing: normal !important; margin-bottom: 0; line-height: inherit; font-family: 'Nunito', system-ui, -apple-system, sans-serif; }" +
    '.lf-card img { max-width: 100%; display: block; }' +
    '.lead-card.lf-card { display: flex !important; flex-direction: column !important; background: rgba(255,255,255,0.88) !important; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #0B1410 !important; border-radius: 22px !important; padding: 26px !important; box-shadow: 0 30px 60px -30px rgba(11,20,16,0.35) !important; border: 1px solid rgba(255,255,255,0.6) !important; width: 100% !important; max-width: 540px !important; min-height: 460px !important; line-height: 1.55 !important; }' +
    '@media (min-width: 1024px) { .lead-card.lf-card { padding: 32px; } }' +
    '.lf-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }' +
    '.lf-progress-track { flex: 1; height: 4px; border-radius: 999px; background: rgba(11,20,16,0.08); overflow: hidden; }' +
    '.lf-progress-fill { height: 100%; background: #1F8A4C; transition: width 0.35s cubic-bezier(0.4,0,0.2,1); border-radius: 999px; width: 50%; }' +
    '.lf-progress-label { font-size: 12px; font-weight: 700; color: #5A655F; letter-spacing: 0.02em; white-space: nowrap; }' +
    '.lead-card.is-done .lf-progress { display: none; }' +
    '.lf-step { display: none !important; flex: 1; animation: lfFade 0.22s ease both; }' +
    '.lf-step.lf-step--active { display: block !important; }' +
    '.lf-head h3 { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.005em; color: #0B1410; }' +
    '.lf-head .lf-sub { margin: 0 0 18px; font-size: 14px; color: #5A655F; line-height: 1.5; }' +
    '.lf-section-label { font-size: 13px; font-weight: 700; color: #2A332E; margin: 4px 0 10px; }' +
    '.lf-radios { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }' +
    '.lf-opt { position: relative; display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1.5px solid #E4E8E5; border-radius: 12px; background: #fff; font-size: 15px; font-weight: 700; color: #0B1410; cursor: pointer; user-select: none; transition: border-color 0.15s ease, background 0.15s ease; min-height: 56px; }' +
    '.lf-opt:hover { border-color: #4CC07A; }' +
    '.lf-opt input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; margin: 0; }' +
    '.lf-opt-text { flex: 1; line-height: 1.3; }' +
    '.lf-opt-dot { width: 20px; height: 20px; border-radius: 999px; border: 2px solid #B7BFB9; background: #fff; flex-shrink: 0; position: relative; transition: border-color 0.15s ease; }' +
    '.lf-opt:has(input[type="radio"]:checked) { border-color: #1F8A4C; background: rgba(31,138,76,0.06); }' +
    '.lf-opt:has(input[type="radio"]:checked) .lf-opt-dot { border-color: #1F8A4C; }' +
    '.lf-opt:has(input[type="radio"]:checked) .lf-opt-dot::after { content: ""; position: absolute; inset: 3px; border-radius: 999px; background: #1F8A4C; }' +
    '.field.lf-field { position: relative; margin-bottom: 12px; }' +
    '.lf-label { display: block; font-size: 13px; font-weight: 700; color: #2A332E; margin: 0 0 6px; }' +
    '.lf-optional { font-weight: 500; color: #5A655F; }' +
    '.lf-card input, .lf-card textarea { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid #E4E8E5; background: #fff; font-size: 15px; color: #0B1410; font-family: inherit; transition: border 0.15s ease, box-shadow 0.15s ease; appearance: none; -webkit-appearance: none; }' +
    '.lf-card input::placeholder, .lf-card textarea::placeholder { color: #B7BFB9; }' +
    '.lf-card input:focus, .lf-card textarea:focus { outline: none; border-color: #1F8A4C; box-shadow: 0 0 0 4px rgba(31,138,76,0.12); }' +
    '.lf-card textarea { resize: vertical; min-height: 84px; line-height: 1.55; }' +
    '.lf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }' +
    '@media (max-width: 480px) { .lf-row { grid-template-columns: 1fr; } }' +
    '.lf-err { font-size: 13px; color: #C5341A; font-weight: 700; background: #FFF2EE; border: 1px solid rgba(197,52,26,0.2); border-radius: 8px; padding: 10px 12px; margin: 4px 0 12px; animation: lfFade 0.15s ease; }' +
    '.lf-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 8px; padding-top: 16px; border-top: 1px solid rgba(11,20,16,0.06); }' +
    '.lead-card.is-done .lf-nav { display: none; }' +
    '.lf-back { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; font-size: 14px; font-weight: 700; color: #2A332E; padding: 10px 4px; cursor: pointer; font-family: inherit; transition: color 0.15s ease; }' +
    '.lf-back:hover { color: #1F8A4C; }' +
    '.lf-card .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 12px 22px; border-radius: 999px; font-weight: 700; font-size: 15px; border: none; cursor: pointer; font-family: inherit; white-space: nowrap; transition: background 0.15s ease, transform 0.15s ease; }' +
    '.lf-card .btn:active { transform: translateY(1px); }' +
    '.lf-card .btn-primary { background: #1F8A4C; color: #fff; box-shadow: 0 8px 18px -8px rgba(31,138,76,0.55); }' +
    '.lf-card .btn-primary:hover { background: #25A85A; }' +
    '.lead-success { text-align: center; padding: 16px 8px 8px; }' +
    '.success-mark { width: 64px; height: 64px; border-radius: 999px; background: rgba(31,138,76,0.12); display: inline-flex; align-items: center; justify-content: center; color: #1F8A4C; margin: 0 auto 12px; font-size: 32px; font-weight: 900; }' +
    '.lead-success h3 { margin: 6px 0; font-size: 22px; font-weight: 800; color: #0B1410; }' +
    '.lead-success p { margin: 0 0 18px; color: #5A655F; font-size: 14.5px; line-height: 1.55; }' +
    '.tiny { font-size: 12px; color: #5A655F; margin-top: 8px; }' +
    '.lf-card :focus-visible { outline: 2px solid #1F8A4C; outline-offset: 3px; }';

  function buildHero() {
    var html =
      '<section data-gk-city-hero="true" id="hero">' +
        '<img data-gk-sub-banner-image="true" src="' + imageURL + '" alt="' + imageAlt + '"/>' +
        '<div data-gk-sub-banner-overlay="true" aria-hidden="true"></div>' +
        '<div data-gk-wrap="true">' +
          '<nav data-gk-breadcrumb="true" aria-label="Brödsmulor">' +
            '<a href="/">Hem</a><span data-gk-bc-sep="true">/</span>' +
            '<a href="/besiktning-service">Besiktning</a><span data-gk-bc-sep="true">/</span>' +
            '<span aria-current="page">' + cityName + '</span>' +
          '</nav>' +
          '<div data-gk-sub-banner-inner="true">' +
            '<h1 data-gk-sub-h1="true">Solcellsbesiktning i ' + cityName + '</h1>' +
            '<p data-gk-sub-intro="true">' + introText + '</p>' +
            '<div data-gk-city-usps="true">' +
              '<div data-gk-city-usp="true"><div data-gk-city-usp-num="true">100%</div><div data-gk-city-usp-lbl="true">Oberoende</div></div>' +
              '<div data-gk-city-usp="true"><div data-gk-city-usp-num="true">24h</div><div data-gk-city-usp-lbl="true">Till offert</div></div>' +
              '<div data-gk-city-usp="true"><div data-gk-city-usp-num="true">30+</div><div data-gk-city-usp-lbl="true">Kontrollpunkter</div></div>' +
            '</div>' +
          '</div>' +
          '<div data-sol-lp="true" style="border-radius:22px;overflow:hidden;width:100%;max-width:540px;">' + formHTML() + '</div>' +
        '</div>' +
      '</section>';
    return html;
  }

  // Inject styles
  function injectStyles() {
    var s = document.createElement('style');
    s.setAttribute('data-gk-city-hero-css', '1');
    s.textContent = EXTRA_CSS;
    document.head.appendChild(s);
  }

  // Header interactions
  function bindHeader() {
    var burger = document.querySelector('[data-gk-header-burger]');
    var close = document.querySelector('[data-gk-drawer-close]');
    var drawer = document.querySelector('[data-gk-header-drawer]');
    if (burger && drawer) {
      burger.addEventListener('click', function (e) {
        e.preventDefault();
        drawer.setAttribute('data-open', '1');
      });
    }
    if (close && drawer) {
      close.addEventListener('click', function (e) {
        e.preventDefault();
        drawer.removeAttribute('data-open');
      });
    }
    var ddTrig = document.querySelector('[data-gk-header-dd-trigger]');
    var ddMenu = document.querySelector('[data-gk-header-dd-menu]');
    if (ddTrig && ddMenu) {
      ddTrig.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = ddMenu.classList.toggle('open');
        ddTrig.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!ddMenu.contains(e.target) && !ddTrig.contains(e.target)) {
          ddMenu.classList.remove('open');
          ddTrig.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Form state + interactions
  var bfState = { kundtyp: null };

  function showStep(id) {
    var steps = document.querySelectorAll('[data-gk-city-hero] .lf-step');
    for (var i = 0; i < steps.length; i++) steps[i].classList.remove('lf-step--active');
    var s = document.getElementById(id);
    if (s) s.classList.add('lf-step--active');
    var fill = document.getElementById('bf-progress-fill');
    var label = document.getElementById('bf-progress-label');
    var stepNum = id === 'bf-1' ? 1 : (id === 'bf-2' ? 2 : 2);
    if (fill) fill.style.width = (stepNum * 50) + '%';
    if (label) label.textContent = id === 'bf-done' ? 'Klart!' : ('Steg ' + stepNum + ' av 2');
    var card = document.querySelector('[data-gk-city-hero] .lead-card');
    if (card) card.classList.toggle('is-done', id === 'bf-done');
  }

  window.bfNext = function () {
    var sel = document.querySelector('input[name="bf-kundtyp"]:checked');
    var err = document.getElementById('bf1-err');
    if (!sel) { if (err) err.hidden = false; return; }
    if (err) err.hidden = true;
    bfState.kundtyp = sel.value;
    // Adapt step-2 labels for kundtyp
    var t = document.getElementById('bf2-title');
    var nl = document.getElementById('bf2-namn-label');
    var orgWrap = document.getElementById('bf-orgnr-wrap');
    if (bfState.kundtyp === 'privat') {
      if (t) t.textContent = 'Dina kontaktuppgifter';
      if (nl) nl.textContent = 'Namn';
      if (orgWrap) orgWrap.style.display = 'none';
    } else {
      if (t) t.textContent = bfState.kundtyp === 'brf' ? 'BRF + kontaktperson' : 'Företag + kontaktperson';
      if (nl) nl.textContent = bfState.kundtyp === 'brf' ? 'BRF-namn + kontaktperson' : 'Företagsnamn + kontaktperson';
      if (orgWrap) orgWrap.style.display = '';
    }
    showStep('bf-2');
  };

  window.bfBack = function () { showStep('bf-1'); };

  window.bfSubmit = function () {
    var fields = ['bf-namn', 'bf-tel', 'bf-epost', 'bf-adress'];
    var ok = true;
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || !el.value.trim()) { if (el) el.style.borderColor = '#C5341A'; ok = false; }
      else if (el) el.style.borderColor = '';
    });
    var err = document.getElementById('bf2-err');
    if (!ok) { if (err) { err.hidden = false; } return; }
    if (err) err.hidden = true;

    // Compose summary into existing hero-form's namn + Phone + Message
    var namn = (document.getElementById('bf-namn') || {}).value || '';
    var tel = (document.getElementById('bf-tel') || {}).value || '';
    var epost = (document.getElementById('bf-epost') || {}).value || '';
    var adress = (document.getElementById('bf-adress') || {}).value || '';
    var orgnr = (document.getElementById('bf-orgnr') || {}).value || '';
    var msg = (document.getElementById('bf-msg') || {}).value || '';

    var summary = [
      '═══ SOLCELLSBESIKTNING ═══',
      'Tjänst: Solcellsbesiktning',
      'Stad: ' + cityName,
      'Kundtyp: ' + (bfState.kundtyp || ''),
      '',
      'Namn: ' + namn,
      'Telefon: ' + tel,
      'E-post: ' + epost,
      'Adress: ' + adress,
      orgnr ? 'Org.nr: ' + orgnr : '',
      msg ? '\nMeddelande:\n' + msg : ''
    ].filter(Boolean).join('\n');

    // Tag namn so John can identify lead source at a glance
    var namnTagged = '[Besiktning ' + cityName + '] ' + namn;

    var f = document.getElementById('hero-form');
    if (f) {
      // Strip redirect attrs so Webflow doesn't navigate to /tack — user stays on page
      f.removeAttribute('redirect');
      f.removeAttribute('data-redirect');
      var setVal = function (name, val) {
        var i = f.querySelector('[name="' + name + '"]');
        if (i) i.value = val;
      };
      setVal('namn', namnTagged);
      setVal('Phone', tel);
      setVal('Message', summary);
      // Trigger Webflow's submit handler
      var sub = f.querySelector('input[type="submit"], button[type="submit"]');
      if (sub) sub.click();
      else if (typeof f.submit === 'function') f.submit();
    }

    showStep('bf-done');

    // GTM
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submit',
        lead_omrade: 'besiktning',
        lead_kundtyp: bfState.kundtyp,
        lead_city: slug
      });
    } catch (e) {}
  };

  // Init
  function init() {
    if (document.querySelector('[data-gk-city-hero]')) return; // already injected

    injectStyles();

    // Hide old header + old hero
    var oldNav = document.querySelector('.navigation.w-nav');
    if (oldNav) oldNav.style.display = 'none';
    var oldHero = document.querySelector('.hero-startpage');
    if (oldHero) {
      // Keep functional but visually hidden — the existing #hero-form still receives our values
      oldHero.style.position = 'absolute';
      oldHero.style.left = '-9999px';
      oldHero.style.width = '1px';
      oldHero.style.height = '1px';
      oldHero.style.overflow = 'hidden';
      oldHero.setAttribute('aria-hidden', 'true');
    }

    // Hide old footer (section.section-5 contains the old footer-column structure)
    document.querySelectorAll('section.section-5').forEach(function (el) {
      el.style.display = 'none';
    });

    // Strip redirect attrs from hero-form EARLY (before Webflow binds its handler)
    // so submission stays on page instead of navigating to /tack
    var heroForm = document.getElementById('hero-form');
    if (heroForm) {
      heroForm.removeAttribute('redirect');
      heroForm.removeAttribute('data-redirect');
      if (window.jQuery) {
        try { window.jQuery(heroForm).removeData('redirect'); } catch (e) {}
      }
    }

    // Inject new header at top of body (mark as ours so version-check can remove on update)
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    var injectedHdr = document.querySelector('header[data-gk-header]');
    if (injectedHdr) injectedHdr.setAttribute('data-gk-injected', '1');

    // Inject new hero immediately after new header
    if (injectedHdr) injectedHdr.insertAdjacentHTML('afterend', buildHero());
    else document.body.insertAdjacentHTML('afterbegin', buildHero());
    var hdr = injectedHdr;

    // Apply critical card styles via setProperty with !important — highest CSS precedence possible
    // Apply synchronously AND in rAF for double-safety against timing issues
    var applyCardStyles = function () {
      var card = document.querySelector('[data-gk-city-hero] .lead-card');
      if (!card) return false;
      var apply = function (prop, val) { card.style.setProperty(prop, val, 'important'); };
      apply('display', 'flex');
      apply('flex-direction', 'column');
      apply('background', 'rgba(255,255,255,0.97)');
      apply('color', '#0B1410');
      apply('border-radius', '22px');
      apply('padding', '26px');
      apply('box-shadow', '0 30px 60px -30px rgba(11,20,16,0.35)');
      apply('border', '1px solid rgba(255,255,255,0.6)');
      apply('width', '100%');
      apply('max-width', '540px');
      apply('min-height', '460px');
      apply('line-height', '1.55');
      apply('overflow', 'hidden');
      return true;
    };
    applyCardStyles();
    requestAnimationFrame(applyCardStyles);
    setTimeout(applyCardStyles, 100);
    setTimeout(applyCardStyles, 500);
    setTimeout(applyCardStyles, 1500);

    // Watch the card's style attribute — if anything clears it, re-apply
    var cardEl = document.querySelector('[data-gk-city-hero] .lead-card');
    if (cardEl && window.MutationObserver) {
      var mo2 = new MutationObserver(function () {
        if (!cardEl.style.borderRadius || cardEl.style.borderRadius === '0px') {
          applyCardStyles();
        }
      });
      mo2.observe(cardEl, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    // Also re-apply on bfcache restore (back-forward navigation)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        applyCardStyles();
      }
    });

    // Append new footer at end of body (mark as ours)
    if (!document.querySelector('footer[data-gk-footer]')) {
      document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
      var ftr = document.querySelector('footer[data-gk-footer]');
      if (ftr) ftr.setAttribute('data-gk-injected', '1');
    }

    bindHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
