# QA & Audit — 2026-05-06

Audit + QA-plan efter promotion av test-pages till canonical URLs.

## Sidor i produktion (efter promotion)

| URL | Tidigare slug | Page ID | Status |
|---|---|---|---|
| `/` (Startsida) | (oförändrad) | 69f09a1ac6173e9032453800 | meta uppdaterad |
| `/elbilsladdning` | test-elbilsladdning | 69f98b33070a392ecdd66f37 | promoted |
| `/solcellsbatteri` | test-solceller-batteri | 69f9a827a4f67667a0176f39 | promoted |
| `/vara-tjanster` | test-besiktning-service | 69f9e2918c1a93223b383960 | promoted |
| `/om-oss` | test-om-oss | 69fb026ec17d655aaf7922ee | promoted, bg-CTA-länk fixad, meta-typo fixad |
| `/bli-partner` | test-bli-partner | 69fb0c2948b1f3c78b50533c | promoted |
| `/kontakta-oss` | test-kontakt | 69fb3c2986b25b4cbe0d1340 | promoted |

## Sidor parkerade som `legacy-X` (tidigare produktionspages, ej i nav)

`legacy-elbilsladdning`, `legacy-solcellsbatteri`, `legacy-vara-tjanster`, `legacy-om-oss`, `legacy-bli-partner`, `legacy-kontakta-oss`, `legacy-solcellsinstallation`, `legacy-projektorder`, `legacy-untitled`, `legacy-test-formular`. Dessa kan tas bort manuellt i Designer när allt är verifierat.

---

## SEO-audit

### Meta-titlar (rekommenderat <60 tecken)

| Sida | Titel | Längd | Status |
|---|---|---|---|
| Startsida | "Grönkraft Sverige AB \| Solceller, laddbox & besiktning" | 56 | ✓ |
| Elbilsladdning | "Elbilsladdning & laddbox-installation \| Grönt avdrag, BRF \| Grönkraft" | 68 | ⚠ marginellt över |
| Solcellsbatteri | "Solceller, batterilager & grönt avdrag \| Grönkraft Sverige AB" | 60 | ✓ |
| Våra tjänster | "Besiktning solceller, laddbox & batteri \| Serviceavtal \| Grönkraft" | 66 | ⚠ marginellt över |
| Om oss | "Om Grönkraft Sverige AB \| Rådgivande partner för grön teknik" | 60 | ✓ |
| Bli partner | "Bli installatörspartner \| Solceller, laddbox & besiktning \| Grönkraft" | 68 | ⚠ marginellt över |
| Kontakt | "Kontakta Grönkraft \| rådgivning solceller, laddbox och besiktning" | 65 | ⚠ marginellt över |

### Meta-descriptions (rekommenderat <160 tecken)

Alla descriptions är 130–152 tecken. ✓

### Sökord per sida (3–4 per sida enligt SEO-best practice)

- **Startsida:** Grönkraft, solceller, laddbox, besiktning
- **Elbilsladdning:** elbilsladdning, laddbox, grönt avdrag, BRF
- **Solcellsbatteri:** solceller, batterilager, grönt avdrag, mikroproducent
- **Våra tjänster:** besiktning, termografering, serviceavtal, certifierade partners
- **Om oss:** Grönkraft Sverige AB, rådgivande partner, grön teknik, Landvetter
- **Bli partner:** installatörspartner, kvalificerade leads, samarbetsmodeller
- **Kontakt:** kontakta Grönkraft, rådgivning, offertsamtal

### Heading-hierarki

Verifierat på Kontakt och Sol — exakt en h1, h2/h3 i ordning. Övriga promoted-sidor använder samma SubBanner+prose-mönster så hierarkin är konsekvent.

### Alt-text på bilder

Asset-nivå alt är satt på alla bilder som används i hero-banners. Material-symbols ikoner använder `aria-hidden="true"` och saknar alt (korrekt eftersom ikoner är dekorativa).

---

## UX-audit (Nielsens 10 heuristiker)

| Heuristik | Implementerad? | Anteckningar |
|---|---|---|
| 1. Visibility of system status | ✓ | Breadcrumbs på alla subpages, "Skickar..." text på submit |
| 2. Match real world | ✓ | Inga jargong (laddbox istf elbilsladdare etc) |
| 3. User control | ✓ | Tydliga tillbaka-länkar via header + breadcrumb |
| 4. Consistency | ✓ | Alla servicepages använder samma SubBanner+prose+form-mönster |
| 5. Error prevention | ⚠ | Form har required men HTML5-validering är `novalidate` (vi har egen JS-validering) |
| 6. Recognition over recall | ✓ | Header-dropdown "Tjänster" visar alla 3 tjänster, contact-grid visar alla kontaktvägar |
| 7. Flexibility & efficiency | ✓ | tel: och mailto: länkar, anchor-länkar i page-nav |
| 8. Aesthetic minimalist design | ✓ | Skandinavisk minimalism, mörka och ljusa sektioner alternerar |
| 9. Help users recover from errors | ✓ | "Fyll i alla obligatoriska fält" på röd bakgrund (tillgängligt) |
| 10. Help & documentation | ✓ | FAQ-sektioner på alla servicepages |

### Specifika UX-förbättringar implementerade

- **Inga två mörka sektioner i rad** — bg-CTA dark följs alltid av FAQ light → footer dark, aldrig adjacent
- **Kontaktvägs-redundans** — kontakt-grid ger 3 vägar (tel/mail/adress), formulär som 4:e väg
- **Brand-neutral copy** — undviker "oberoende säljbolag", betonar "rådgivande mediator"
- **Partner-disclosure** — formulärets disclaimer: "Vi förmedlar uppgifterna till en kvalitetssäkrad partner"

---

## QA test-scenarier

### Kritisk path: Kontakt-formulär submit

**Scenario K1** — Submit med alla fält ifyllda
1. Gå till `/kontakta-oss`
2. Fyll i Namn, Telefon, E-post, Meddelande
3. Klicka "Skicka förfrågan →"
4. **Förväntat:** Formuläret skickas via Bridge Form, redirect till `/tack`
5. **Verifiera:** Submission syns i Webflow Forms-dashboard, syncas till HubSpot

**Scenario K2** — Submit med tomma obligatoriska fält
1. Gå till `/kontakta-oss`
2. Lämna Namn tomt
3. Klicka submit
4. **Förväntat:** Felmeddelande "Fyll i alla obligatoriska fält" syns i rött med ljusrosa bakgrund
5. **Verifiera:** Felmeddelandet är dolt vid sidladdning, visas bara efter validering

### Kritisk path: Multi-step form på service-sidor

**Scenario S1** — Submit på `/solcellsbatteri`
1. Gå till `/solcellsbatteri`
2. Klicka "Få offert" i hero eller bg-CTA → scrollar till sub-lead form
3. Genomför multi-step-flöde
4. **Förväntat:** Submit triggar Bridge Form → redirect `/tack`

**Scenario S2** — Anchor-länkar fungerar
1. Klicka page-nav-länk "Vad ingår" på `/solcellsbatteri`
2. **Förväntat:** Smooth-scroll till sektionen

### Navigation & links

**Scenario N1** — Header-dropdown
1. På valfri sida, klicka "Tjänster ▾" i header
2. **Förväntat:** Dropdown visar Elbilsladdning / Solceller & batteri / Besiktning & serviceavtal
3. Klicka varje länk → korrekta sidor

**Scenario N2** — Mobile drawer
1. På mobil, klicka burger-ikon ☰
2. **Förväntat:** Drawer slidar in med alla nav-länkar
3. Klicka × → drawer stängs

**Scenario N3** — Footer-länkar
1. Scrolla till footer på valfri sida
2. **Förväntat:** Alla länkar pekar på canonical URLs (`/elbilsladdning` etc), inte `/test-X`

### Cross-page CTAs

**Scenario C1** — Om oss bg-CTA
1. Gå till `/om-oss`
2. Scrolla till bg-CTA "Vill du jobba med oss?"
3. Klicka "Bli partner"
4. **Förväntat:** Navigerar till `/bli-partner` (inte `/test-bli-partner`)

**Scenario C2** — Bli partner mini-CTA
1. Gå till `/bli-partner`
2. Klicka "Skicka intresseanmälan" i bg-CTA
3. **Förväntat:** Scrollar till `#kontakt` på samma sida

### SEO/tekniskt

**Scenario T1** — Sitemap & robots
1. Besök `/sitemap.xml`
2. **Förväntat:** Innehåller endast canonical URLs (`/elbilsladdning` etc), inte `legacy-X`

**Scenario T2** — Meta-tags syns i SERP-preview
1. Använd ett SERP-preview-verktyg (Mozbar etc) på `/`
2. **Förväntat:** Title "Grönkraft Sverige AB | Solceller, laddbox & besiktning", description matchar uppdaterad meta

---

## Kvarvarande att fixa manuellt (när du är tillbaka vid datorn)

1. **Custom Code Head SHA-pin** — den injicerade `GkCssLatest`-scriptet är en workaround. Cleanaste lösningen: uppdatera `<link>`-taggen i Webflow Project Settings → Custom Code Head till `@a5787c8` (eller senaste SHA), och radera `GkCssLatest`-scriptet.
2. **Radera legacy-pages permanent** — `legacy-elbilsladdning`, `legacy-solcellsbatteri`, `legacy-vara-tjanster`, `legacy-om-oss`, `legacy-bli-partner`, `legacy-kontakta-oss`, `legacy-solcellsinstallation`, `legacy-projektorder`, `legacy-untitled`, `legacy-test-formular` (Webflow MCP saknar delete-API).
3. **Form embed på service-sidor** — multi-step-formulärets HTML embeds i `[data-gk-sub-lead-form-slot]` är pasta'de manuellt. Verifiera att embed-koden (från `/embed/webflow-embed-X.html`) är aktuell på varje servicepage.

---

## Live URLs efter publish

- https://gronkraft.webflow.io/
- https://gronkraft.webflow.io/elbilsladdning
- https://gronkraft.webflow.io/solcellsbatteri
- https://gronkraft.webflow.io/vara-tjanster
- https://gronkraft.webflow.io/om-oss
- https://gronkraft.webflow.io/bli-partner
- https://gronkraft.webflow.io/kontakta-oss
