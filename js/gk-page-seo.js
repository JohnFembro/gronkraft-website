/* gk-page-seo.js
   Per-page runtime SEO content injection. Branches by pathname.
   - /besiktning-service: adds underhåll/driftstopp/serviceavtal sections + FAQ schema
   - /elbilsladdning: rewrites H1, adds brand/installation/dual-outlet sections + FAQ schema
*/
(function () {
  if (window.__gkPageSeoVersion) return;
  window.__gkPageSeoVersion = 1;

  var path = location.pathname;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  if (path === '/besiktning-service') ready(initBesiktning);
  else if (path === '/elbilsladdning') ready(initLaddbox);
  else if (path === '/' || path === '') ready(initHome);

  /* ───────────────────────── /besiktning-service ───────────────────────── */
  function initBesiktning() {
    var anchor = null;
    document.querySelectorAll('h2').forEach(function (h) {
      if (/^Frågor/i.test(h.textContent.trim())) {
        anchor = h.closest('section') || h.parentElement;
      }
    });
    if (!anchor) return;

    var container = document.createElement('div');
    container.setAttribute('data-gk-besiktning-seo', '1');
    container.innerHTML =
      '<section class="main-section" data-gk-seo-section="underhall">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Löpande underhåll av solcellsanläggningen</h2>' +
          '<p class="large-paragraph italic">Solpaneler beskrivs ofta som underhållsfria. Det stämmer i den meningen att de inte kräver löpande tillsyn på samma sätt som en värmepump eller bil, men anläggningen som helhet behöver ses över med jämna mellanrum för att hålla full produktion och förbli säker.</p>' +
          '<p class="large-paragraph">Typiska underhållsmoment över en solcellsanläggnings livslängd: kontroll av kabelinfästningar, översyn av växelriktarens loggar, byte av växelriktare efter 10 till 15 år, rengöring av paneler när smuts eller mossa börjar synligt påverka produktionen, och kontroll av elsäkerhetsmärkning vid renoveringar. Inget av detta brukar göras självmant av installatören efter att garantin har tickat ut.</p>' +
          '<a href="/post/solceller-ar-inte-underhallsfria---5-situationer-som-kraver-kontroll" class="large-link">Läs mer om när din solcellsanläggning behöver kontroll</a>' +
        '</div>' +
      '</section>' +
      '<section class="main-section" data-gk-seo-section="driftstopp">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Driftstopp och felsökning</h2>' +
          '<p class="large-paragraph italic">När en solcellsanläggning slutar leverera är det sällan ett problem i sig, det är ett symptom. Felet kan ligga i en enskild panel (skuggning, mikrosprickor), i kablaget (lös kontakt, vattenintrång), eller i växelriktaren (loggad felkod, ventilationsproblem).</p>' +
          '<p class="large-paragraph">Vid en felsökningsbesiktning börjar vi med växelriktarens loggar och produktionsdata. Därefter görs termografering med drönare för att lokalisera hotspots på panelnivå, och slutligen kontrolleras DC-sidan med isolationsmätning. Du får ett protokoll med specifik åtgärdsrekommendation som kan skickas till installatör eller försäkringsbolag.</p>' +
          '<a href="/post/de-vanligaste-felen-vi-hittar-vid-besiktning-och-dess-konsekvenser" class="large-link">Vanliga fel vi hittar vid besiktning</a>' +
        '</div>' +
      '</section>' +
      '<section class="main-section" data-gk-seo-section="serviceavtal">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Serviceavtal — återkommande besiktning enligt schema</h2>' +
          '<p class="large-paragraph italic">Ett serviceavtal hos Grönkraft innebär återkommande besiktning enligt schema, normalt vart eller vartannat år beroende på anläggningens ålder, exponering och driftshistorik.</p>' +
          '<p class="large-paragraph">Du får en fast tid varje cykel, prioriterat datum vid avvikelser i produktionen och ett uppdaterat protokoll som täcker hela anläggningens skick. Vad som ingår skräddarsys efter anläggningens storlek (villa, BRF eller större fastighet) och hur ofta kontrollerna körs. För större anläggningar och BRF-bestånd är det vanligt att kombinera besiktning med tillgång till felsökning vid driftstopp.</p>' +
          '<p class="large-paragraph"><strong>Pris:</strong> Kontakta oss för offert på serviceavtal — priset baseras på antal anläggningar, geografi och frekvens.</p>' +
          '<a href="/#offertform" class="large-link">Få offert på serviceavtal</a>' +
        '</div>' +
      '</section>';
    anchor.parentNode.insertBefore(container, anchor);

    // Rewrite the conflicting FAQ about service
    document.querySelectorAll('.question').forEach(function (q) {
      var text = q.textContent.trim().toLowerCase();
      if (text.indexOf('skillnaden') > -1 && text.indexOf('serviceavtal') > -1) {
        var wrap = q.closest('.question-wrapper');
        if (!wrap) return;
        var ans = wrap.querySelector('.answer p, .answer div');
        if (ans) {
          ans.textContent = 'En besiktning är en oberoende kontroll av anläggningens skick vid ett givet tillfälle. Ett serviceavtal hos oss innebär samma typ av kontroll, men återkommande enligt schema (vart eller vartannat år). Vi gör inte själva paneltvätt eller installationer — den löpande tillsynen och åtgärderna sköts av installationspartner eller fastighetsskötsel. Vår roll är att med jämna mellanrum verifiera att anläggningen är säker, lönsam och dokumenterad.';
        }
      }
    });

    // FAQ JSON-LD only (no visible accordion per user request)
    injectFaqLd([
      ['Hur ofta bör en solcellsanläggning besiktigas?', 'Vi rekommenderar besiktning vart tredje till femte år för en standardanläggning som installerades fackmannamässigt, och oftare för anläggningar äldre än 10 år eller där produktionsdata visar avvikelser. Den första besiktningen bör göras i samband med driftsättning för att säkra garantin.'],
      ['Vad är skillnaden mellan löpande underhåll och en besiktning?', 'Underhåll är åtgärder för att hålla anläggningen i drift (paneltvätt, kabelfäste-justering, växelriktarbyte). En besiktning är en oberoende kontroll som dokumenterar status och pekar ut vilka underhållsåtgärder som behövs. Båda behövs över anläggningens livslängd.'],
      ['Vad ingår i ett serviceavtal hos Grönkraft?', 'Återkommande besiktning enligt schema (vart eller vartannat år), prioriterat datum vid driftavvikelser, uppdaterat protokoll varje cykel, och tillgång till felsökning till avtalat pris vid driftstopp. Omfattningen anpassas efter anläggningens storlek och frekvens.'],
      ['Anläggningen producerar mindre än förra året — vad gör jag?', 'Börja med att jämföra produktionsdata i växelriktarens app mot förra årets motsvarande månad. Ett mindre tapp på 5 till 10 procent kan bero på smuts eller ändrad skuggning. Ett större tapp eller plötslig nedgång motiverar en felsökningsbesiktning där vi börjar med loggar och termografering.'],
      ['Behöver jag besiktiga om jag bara har solceller utan batteri?', 'Ja. Besiktningen omfattar både DC-sidan (paneler, kablage, växelriktare) och anslutningen mot fastighetens elsystem. Anläggningar utan batteri har lika stort behov av kontroll som de med — risken för korrosion, lösa kontakter och paneldegradering är densamma.'],
      ['Hur lång tid tar en besiktning?', 'En villabesiktning tar normalt 2 till 3 timmar på plats, plus efterföljande protokollarbete. För BRF och större fastigheter kan en besiktning ta en hel dag eller flera dagar beroende på antal växelriktare och paneler.'],
      ['Vad ingår i besiktningsprotokollet?', 'Visuell yttre kontroll (montage, infästning, kablage, paneler), inre kontroll (elsäkerhet, brandförebyggande, märkning), drönarsvep med termografering, och bedömning enligt 30+ kontrollpunkter. Du får protokollet i PDF med foton, åtgärdsrekommendation och prioritering.'],
      ['Kan ni serva anläggningar i hela Sverige?', 'Vi har bas i Landvetter och Halmstad och kör besiktningar i hela Götaland samt Mälardalen och Stockholm. För andra delar av landet förmedlar vi via vårt partnernätverk. Hör av dig så ser vi vad som passar dig.']
    ]);
  }

  /* ───────────────────────── /elbilsladdning ───────────────────────── */
  function initLaddbox() {
    // Rewrite H1 to lead with "Laddbox"
    var h1 = document.querySelector('h1');
    if (h1 && /elbilsladdning/i.test(h1.textContent)) {
      h1.textContent = 'Laddbox för hemma, BRF och företag';
    }

    // Find anchor: the FAQ section
    var anchor = null;
    document.querySelectorAll('h2').forEach(function (h) {
      if (/^Frågor/i.test(h.textContent.trim())) {
        anchor = h.closest('section') || h.parentElement;
      }
    });
    if (!anchor) return;

    var container = document.createElement('div');
    container.setAttribute('data-gk-laddbox-seo', '1');
    container.innerHTML =
      '<section class="main-section" data-gk-seo-section="laddbox-brands">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Garo, Charge Amps, Defa, Zaptec eller Easee — så väljer du rätt laddbox</h2>' +
          '<p class="large-paragraph italic">Marknaden domineras idag av fem tillverkare: <strong>Garo</strong>, <strong>Charge Amps</strong>, <strong>Defa</strong>, <strong>Zaptec</strong> och <strong>Easee</strong>. Alla levererar laddboxar som klarar svenska bostadsförhållanden — skillnaderna handlar mer om appstöd, lastbalansering, betallösningar för BRF och hur boxen tål väder än om laddhastighet i sig.</p>' +
          '<p class="large-paragraph"><em>Garo</em> har lång erfarenhet av nordiska klimat och stark närvaro hos elektriker. <em>Charge Amps</em> är ett svenskt premiummärke med fokus på appgränssnitt och inbyggd energimätning — populärt hos villaägare som integrerar laddning med solceller. <em>Defa</em> är ofta förstvalet vid integration mot solceller eftersom de tillåter dynamisk styrning från växelriktare. <em>Zaptec</em> dominerar BRF-marknaden tack vare smidig hantering av många användare på samma huvudsäkring. <em>Easee</em> har det mest moderna app-gränssnittet och tunna boxar som passar i carporten.</p>' +
          '<p class="large-paragraph">Vi rekommenderar inte ett enskilt fabrikat — valet beror på din anläggning, ditt elabonnemang och hur du tänker använda laddboxen. I förstudien går vi igenom dina förutsättningar och rekommenderar 1–2 alternativ.</p>' +
          '<a href="/#offertform" class="large-link">Få offert på rätt laddbox för ditt hem</a>' +
        '</div>' +
      '</section>' +
      '<section class="main-section" data-gk-seo-section="laddbox-installation">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Installera laddbox — steg för steg</h2>' +
          '<p class="large-paragraph italic">Från beställning till installerat och klart tar det normalt 2 till 4 veckor. Så här ser processen ut när du installerar laddbox via Grönkraft.</p>' +
          '<p class="large-paragraph"><strong>1. Förstudie (1–3 dagar).</strong> Vi går igenom dina förutsättningar via formulär eller telefon: huvudsäkring, var laddboxen ska sitta, om du har solceller, hur många bilar.</p>' +
          '<p class="large-paragraph"><strong>2. Offert (inom 24 h på vardagar).</strong> Du får fast pris från en certifierad installatör. Grönt avdrag på 50 % dras direkt på fakturan.</p>' +
          '<p class="large-paragraph"><strong>3. Installation (oftast 2–4 timmar på plats).</strong> Vår partner-elektriker drar kabel, installerar boxen och konfigurerar appstöd. Vid behov uppgraderas huvudsäkringen.</p>' +
          '<p class="large-paragraph"><strong>4. Installerat och klart.</strong> Du får dokumentation, garantibevis och en kort genomgång av appen.</p>' +
        '</div>' +
      '</section>' +
      '<section class="main-section" data-gk-seo-section="laddbox-dubbla-uttag">' +
        '<div class="main-container">' +
          '<h2 class="heading-l bold">Laddbox med dubbla uttag — för hushåll med två elbilar</h2>' +
          '<p class="large-paragraph italic">Hushåll med två elbilar har två alternativ: två separata laddboxar med lastbalansering, eller en laddbox med dubbla uttag som delar effekt mellan bilarna.</p>' +
          '<p class="large-paragraph">En laddbox med dubbla uttag är ofta billigare och kräver mindre kabel-dragning, men reducerar laddhastigheten när båda bilarna laddar samtidigt. Vi dimensionerar utifrån din huvudsäkring och realistiska laddmönster — för de flesta tvåbils-hushåll räcker en box med dubbla uttag som balanserar mot 11 kW.</p>' +
        '</div>' +
      '</section>';
    anchor.parentNode.insertBefore(container, anchor);

    // FAQ JSON-LD only
    injectFaqLd([
      ['Vilken laddbox är bäst för mig?', 'Det beror på dina förutsättningar. För integration mot solceller är Defa eller Charge Amps starka val. För BRF-installationer dominerar Zaptec tack vare smidig hantering av många användare. För villaägare med fokus på app-upplevelse är Easee eller Charge Amps populära. I förstudien rekommenderar vi 1–2 alternativ utifrån din anläggning.'],
      ['Hur lång tid tar det att installera en laddbox?', 'Själva installationen tar normalt 2 till 4 timmar på plats. Inklusive förstudie, offert och leverans tar hela processen från första kontakt till installerat och klart cirka 2 till 4 veckor.'],
      ['Kan jag installera en laddbox själv?', 'Nej. Installation av laddbox kräver behörig elektriker och anmälan till nätägaren. Försäkring och garanti gäller inte om installationen utförs av icke-behörig person. Det är också en säkerhetsrisk — laddboxar drar höga strömmar och felinstallation kan leda till brand.'],
      ['Kan jag få en laddbox med dubbla uttag?', 'Ja. De flesta laddboxtillverkare (Garo, Zaptec, Charge Amps med flera) erbjuder modeller med dubbla uttag. För tvåbils-hushåll är detta ofta den mest kostnadseffektiva lösningen, men reducerar laddhastigheten när båda bilarna laddar samtidigt.'],
      ['Vad händer om jag flyttar — kan jag ta laddboxen med jag?', 'Tekniskt går det att demontera och flytta laddboxen, men det kräver en behörig elektriker på båda sidor och anmälan till nätägaren igen. I praktiken är det ofta enklare att låta laddboxen vara kvar (kan öka husets försäljningsvärde) och installera en ny i det nya hemmet.']
    ]);
  }

  /* ───────────────────────── / (home) ─────────────────────────
     Design-safe: only edits H1 textContent (keeps all classes/styling)
     and injects invisible JSON-LD. No new visible sections. */
  function initHome() {
    // H1 reorder to lead with strongest commercial keyword
    var h1 = document.querySelector('h1');
    if (h1 && /Elbilsladdning.{0,40}Besiktning/i.test(h1.textContent)) {
      h1.textContent = 'Solceller, batteri, laddbox & besiktning';
    }

    // FAQPage schema for the 10 visible FAQs
    injectFaqLd([
      ['Vad kostar det att installera en elbilsladdare?', 'Kostnaden varierar beroende på installationens kontext, är det en hemmainstallation eller åt en bostadsrättsförening eller företag. För en hemmainstallation ligger priset mellan 5000-7000 kr och i en gemensamhetsanläggning ligger priset mellan 7000-10 000 kr efter bidrag.'],
      ['Kan jag få ROT-avdrag på elbilsladdare?', 'Nej, för installation av laddpunkt används inte ROT-avdrag. Då gäller i stället skattereduktion för grön teknik. För laddpunkt innebär det att du kan få skattereduktion med 50 procent av kostnaden för både arbete och material. Skillnaden mot ROT är att ROT bara gäller arbetskostnaden, medan grön teknik omfattar både arbete och material.'],
      ['Hur lång tid tar en laddboxinstallation?', 'En standardinstallation tar vanligtvis 2–4 timmar. Mer komplexa installationer, till exempel i gemensamhetsanläggningar kan det ta längre tid. Vi ger dig alltid en tydlig tidsplan innan arbetet påbörjas.'],
      ['Vilka laddboxmärken jobbar ni med?', 'Vi har tagit ett aktivt val att hålla oss neutrala och inte samarbeta med några specifika tillverkare av laddboxar. Du kan vara trygg i att vi erbjuder marknadens ledande tillverkare och väljer alltid laddbox utifrån dina specifika behov. Vi rekommenderar aldrig produkter utan att ha granskat kvalitet, garantier och kompatibilitet.'],
      ['Varför behöver jag besikta min solcellsanläggning?', 'En solcellsanläggning är en investering på hundratusentals kronor. Regelbundna besiktningar säkerställer optimal produktion, att garantier hålls och att potentiella fel upptäcks tidigt — innan de blir dyra skador.'],
      ['Hur mycket kan jag spara med solceller?', 'Det beror på din förbrukning, takets läge och anläggningens storlek. En genomsnittlig villa med en 10 kWp-anläggning kan spara 15 000–25 000 kr per år i minskade elkostnader och elförsäljning. Betalningstiden är normalt 8–12 år.'],
      ['Varför har man batteri tillsammans med sin solcellsanläggning?', 'Solceller producerar el från solljus dagtid. Ett batteripaket lagrar överskottsel som du sedan kan använda på kvällen eller när solproduktionen är låg. Kombinationen ger maximal självförsörjning och bäst skydd mot höga elpriser.'],
      ['Hur länge håller solceller?', 'Kvalitetspaneler håller i 25–30 år och levereras med produktgarantier på 10–15 år samt prestationsgarantier på upp till 25 år. Med rätt underhåll kan anläggningen vara lönsam i 30+ år. För att hålla en solcellsanläggning säker och produktiv krävs löpande underhåll och gärna fortlöpande kontroller.'],
      ['Vad ingår i ett serviceavtal?', 'Det beror på vilken partner som erbjuder serviceavtalet och dina specifika behov, men generellt brukar serviceavtal inkludera regelbundna produktionskontroller, visuell besiktning av paneler och anslutningar, elskåpsinspektion, rensning av skräp och mossa, samt prioriterad hjälp vid driftstopp. Vi hjälper dig hitta bästa avtalet efter dina behov.'],
      ['Hur snabbt kan ni komma ut och besikta?', 'Normalt bokar vi in en besiktning inom 1–2 veckor. Vid akuta driftstopp för kunder med serviceavtal prioriteras ni och vi siktar på att ha en tekniker på plats inom 48 timmar.']
    ]);
  }

  /* ───────────────────────── shared ───────────────────────── */
  function injectFaqLd(pairs) {
    var ld = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pairs.map(function (p) {
        return { '@type': 'Question', name: p[0], acceptedAnswer: { '@type': 'Answer', text: p[1] } };
      })
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-gk-faq-extra', '1');
    s.setAttribute('data-gk-abs', '1');
    s.setAttribute('data-gk-jsonld-fixed', '1');
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
})();
