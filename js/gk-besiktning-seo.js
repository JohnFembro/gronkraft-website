/* gk-besiktning-seo.js
   Runtime SEO content injection for /besiktning-service.
   Adds three new H2 sections (underhåll, driftstopp, serviceavtal) before
   the existing FAQ, rewrites the conflicting FAQ entry about service, and
   injects a FAQPage JSON-LD with eight additional questions for rich snippets.
*/
(function () {
  if (location.pathname !== '/besiktning-service') return;
  if (window.__gkBesiktningSeoVersion) return;
  window.__gkBesiktningSeoVersion = 1;

  function init() {
    var anchor = null;
    document.querySelectorAll('h2').forEach(function (h) {
      if (/^Frågor/i.test(h.textContent.trim())) {
        anchor = h.closest('section') || h.parentElement;
      }
    });
    if (!anchor) return;

    var container = document.createElement('div');
    container.setAttribute('data-gk-besiktning-seo', '1');
    container.innerHTML = buildSectionsHTML();
    anchor.parentNode.insertBefore(container, anchor);

    rewriteServiceAvtalFaq();
    injectFaqJsonLdAndVisible();
  }

  function buildSectionsHTML() {
    return '' +
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
  }

  function rewriteServiceAvtalFaq() {
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
  }

  function injectFaqJsonLdAndVisible() {
    var faqs = [
      {
        q: 'Hur ofta bör en solcellsanläggning besiktigas?',
        a: 'Vi rekommenderar besiktning vart tredje till femte år för en standardanläggning som installerades fackmannamässigt, och oftare för anläggningar äldre än 10 år eller där produktionsdata visar avvikelser. Den första besiktningen bör göras i samband med driftsättning för att säkra garantin.'
      },
      {
        q: 'Vad är skillnaden mellan löpande underhåll och en besiktning?',
        a: 'Underhåll är åtgärder för att hålla anläggningen i drift (paneltvätt, kabelfäste-justering, växelriktarbyte). En besiktning är en oberoende kontroll som dokumenterar status och pekar ut vilka underhållsåtgärder som behövs. Båda behövs över anläggningens livslängd.'
      },
      {
        q: 'Vad ingår i ett serviceavtal hos Grönkraft?',
        a: 'Återkommande besiktning enligt schema (vart eller vartannat år), prioriterat datum vid driftavvikelser, uppdaterat protokoll varje cykel, och tillgång till felsökning till avtalat pris vid driftstopp. Omfattningen anpassas efter anläggningens storlek och frekvens.'
      },
      {
        q: 'Anläggningen producerar mindre än förra året — vad gör jag?',
        a: 'Börja med att jämföra produktionsdata i växelriktarens app mot förra årets motsvarande månad. Ett mindre tapp på 5 till 10 procent kan bero på smuts eller ändrad skuggning. Ett större tapp eller plötslig nedgång motiverar en felsökningsbesiktning där vi börjar med loggar och termografering.'
      },
      {
        q: 'Behöver jag besiktiga om jag bara har solceller utan batteri?',
        a: 'Ja. Besiktningen omfattar både DC-sidan (paneler, kablage, växelriktare) och anslutningen mot fastighetens elsystem. Anläggningar utan batteri har lika stort behov av kontroll som de med — risken för korrosion, lösa kontakter och paneldegradering är densamma.'
      },
      {
        q: 'Hur lång tid tar en besiktning?',
        a: 'En villabesiktning tar normalt 2 till 3 timmar på plats, plus efterföljande protokollarbete. För BRF och större fastigheter kan en besiktning ta en hel dag eller flera dagar beroende på antal växelriktare och paneler.'
      },
      {
        q: 'Vad ingår i besiktningsprotokollet?',
        a: 'Visuell yttre kontroll (montage, infästning, kablage, paneler), inre kontroll (elsäkerhet, brandförebyggande, märkning), drönarsvep med termografering, och bedömning enligt 30+ kontrollpunkter. Du får protokollet i PDF med foton, åtgärdsrekommendation och prioritering.'
      },
      {
        q: 'Kan ni serva anläggningar i hela Sverige?',
        a: 'Vi har bas i Landvetter och Halmstad och kör besiktningar i hela Götaland samt Mälardalen och Stockholm. För andra delar av landet förmedlar vi via vårt partnernätverk. Hör av dig så ser vi vad som passar dig.'
      }
    ];

    var ld = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(function (f) {
        return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
      })
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-gk-faq-extra', '1');
    s.setAttribute('data-gk-abs', '1');
    s.setAttribute('data-gk-jsonld-fixed', '1');
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);

    var sasection = document.querySelector('[data-gk-seo-section="serviceavtal"] .main-container');
    if (!sasection) return;
    var faqWrap = document.createElement('div');
    faqWrap.style.cssText = 'margin-top:40px;';
    var heading = document.createElement('h3');
    heading.className = 'heading-24px bold';
    heading.style.cssText = 'margin-top:24px;margin-bottom:16px;';
    heading.textContent = 'Vanliga frågor om underhåll, driftstopp och serviceavtal';
    faqWrap.appendChild(heading);
    faqs.forEach(function (f) {
      var details = document.createElement('details');
      details.style.cssText = 'margin:12px 0;padding:16px 20px;border:1px solid rgba(11,20,16,0.08);border-radius:12px;background:#fff;';
      var summary = document.createElement('summary');
      summary.style.cssText = 'cursor:pointer;font-weight:700;font-size:16px;color:#0B1410;list-style:none;';
      summary.textContent = f.q;
      var ans = document.createElement('p');
      ans.style.cssText = 'margin:12px 0 0;color:#2A332E;line-height:1.55;font-size:15px;';
      ans.textContent = f.a;
      details.appendChild(summary);
      details.appendChild(ans);
      faqWrap.appendChild(details);
    });
    sasection.appendChild(faqWrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
