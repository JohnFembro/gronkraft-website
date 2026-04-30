# Embedding the Grönkraft lead form in Webflow

This guide is calibrated to the **actual current state of `gronkraftab.se`** (verified 2026-04-30 via Webflow MCP + live HTML inspection).

## What's already in place on your site

- ✅ **GA4** — `G-C8VE6XR86Z`, loaded via Webflow's first-party tracking (Project Settings → Integrations → Google Analytics)
- ✅ **GTM** — `GTM-MMLNRTP9`, loaded via the GTM Webflow Marketplace app
- ✅ **HubSpot** — Hub `146755030`, loaded via the HubSpot Webflow Marketplace app (likely auto-syncs Webflow Form submissions to HubSpot CRM — bonus pipeline)
- ✅ **Meta domain verification** — `whbuog9havfzqjz6dfpv3qtso92fim` meta tag is present (the Pixel base code itself is likely fired via GTM — verify in GTM container)
- ✅ **`/tack` page** exists — Webflow form redirects can target it
- ✅ **`/test-av-nytt-formular` page** exists — use it as the staging ground for this embed
- ❌ **Nunito** is **not** loaded — site currently uses Open Sans. Add Nunito as a project font (Step 1 below).

## Architecture

Two pieces coexist on the page:

1. A **hidden Webflow Form Block** named `Leads Gronkraft` with one Plain Text input per `mfState` field. Receives the actual submission. Leads land in Webflow's Forms tab, trigger Webflow's email notifications, and likely flow into HubSpot via the marketplace integration.
2. An **Embed Block** containing `webflow-embed.html`. Visible multi-step UI, scoped under `.gk-form` — cannot collide with site styles.

On submit, the embed JS copies `mfState` into the hidden form, clicks its submit button, and pushes `event: 'lead_form_submit'` to `dataLayer` for GTM-based conversion tracking.

## Step 1 — Add Nunito as a project font

Webflow Project Settings → **Fonts** → **Add Google Font** → search "Nunito" → enable weights `400, 700, 800` → Save.

The embed `@import`s Nunito as a fallback, but loading it at the project level avoids a flash of fallback font.

## Step 2 — (Skip if Meta Pixel already runs in GTM)

Open `GTM-MMLNRTP9` in [tagmanager.google.com](https://tagmanager.google.com). Check whether a "Meta Pixel" / "Facebook Pixel" tag exists.

- **If yes:** confirm it fires on `All Pages` (or equivalent). Done.
- **If no:** add a new Custom HTML tag with the Meta Pixel base code (replace `META_PIXEL_ID` with your actual ID) and trigger on `All Pages`:

```html
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'META_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

> You do **not** need to add `gtag.js` separately — GA4 is already loaded.

## Step 3 — Build the hidden Webflow form

On `/test-av-nytt-formular`, add a **Form Block** from Webflow Designer.

**Form settings (in the form's element settings panel):**
- **Form Name:** anything readable, e.g. `Leads Gronkraft` (used in Webflow Forms tab and email subject)
- **Action:** leave empty (default Webflow handler)
- **Method:** `POST`
- **Redirect URL:** **leave empty** *(important — if you set `/tack` here, Webflow will navigate the page on submit and break the embed's success screen)*
- **Custom Attribute** *(this is what the embed JS targets — must match exactly):*
  - In Designer, select the `<form>` element → element settings → "+ Add Custom Attribute"
  - Name: `data-gk-bridge`
  - Value: `true`
- Wrap the entire `.w-form` block in a div with class `gk-bridge` — the embed CSS hides anything with this class

**Add one Plain Text input for each of these field names** (set the input's `Name` attribute — case-sensitive, exact match required):

| Field name        | Used for                                |
| ----------------- | --------------------------------------- |
| `omrade`          | EV / Sol / Besiktning                   |
| `kundtyp`         | privat / brf / foretag                  |
| `tjanst`          | besiktning / serviceavtal / bada        |
| `antalUttag`      | EV uttag count                          |
| `laddare`         | ac / dc                                 |
| `intresse`        | solceller / batteri / solceller-batteri |
| `kontrollera`     | besiktnings-checkboxar (kommaseparerat) |
| `befintlig`       | befintlig / ny anläggning               |
| `orgNamn`         | organisation                            |
| `orgNr`           | org.nr (valfritt)                       |
| `adress`          | gatuadress                              |
| `kommun`          | kommun                                  |
| `postort`         | postort                                 |
| `namn`            | personnamn                              |
| `kontaktperson`   | BRF/Ftg kontaktperson                   |
| `telefon`         | telefon                                 |
| `epost`           | e-post                                  |
| `meddelande`      | valfritt meddelande                     |

You can hide each input visually via Designer (set Display: None, or just give the wrapping div the `gk-bridge` class). The submit button can keep its default label — it's never seen.

## Step 4 — Configure form notifications

In the form's Settings panel → **Form Settings** → set the recipient email for lead notifications. Webflow sends one email per submission with all field values.

If HubSpot's marketplace integration is configured to sync Webflow forms, leads should also appear in HubSpot CRM automatically — verify by checking HubSpot Contacts after a test submission.

## Step 5 — Drop in the Embed Block

1. On `/test-av-nytt-formular`, add an **Embed** element where the form should appear.
2. Open `embed/webflow-embed.html`, copy the entire contents, paste into the Embed.
3. Save & close the embed editor.

The embed contains its own `<style>` and `<script>` — no additional page setup needed.

## Step 6 — Configure GTM tags for conversion tracking

In `GTM-MMLNRTP9`:

**Trigger** — create one trigger:
- **Name:** `Custom Event - Lead Form Submit`
- **Type:** Custom Event
- **Event name:** `lead_form_submit`

**Variables** — create dataLayer variables for the lead context:
- `DLV - lead_omrade` → Data Layer Variable Name: `lead_omrade`
- `DLV - lead_kundtyp` → Data Layer Variable Name: `lead_kundtyp`
- `DLV - lead_tjanst` → Data Layer Variable Name: `lead_tjanst`

**Tags** — create three tags using the trigger above:

1. **GA4 Event — generate_lead**
   - Tag type: Google Analytics: GA4 Event
   - Configuration tag: your existing GA4 config (`G-C8VE6XR86Z`)
   - Event name: `generate_lead`
   - Event parameters:
     - `lead_omrade` → `{{DLV - lead_omrade}}`
     - `lead_kundtyp` → `{{DLV - lead_kundtyp}}`
     - `lead_tjanst` → `{{DLV - lead_tjanst}}`

2. **Google Ads Conversion**
   - Tag type: Google Ads Conversion Tracking
   - Conversion ID + Label: from your Google Ads account (Conversions → New conversion action → Website → "Lead form submission")
   - Trigger: `Custom Event - Lead Form Submit`

3. **Meta Pixel — Lead**
   - Tag type: Custom HTML
   - HTML:
     ```html
     <script>
       fbq('track', 'Lead', {
         content_category: {{DLV - lead_omrade}},
         content_name: {{DLV - lead_kundtyp}}
       });
     </script>
     ```
   - Trigger: `Custom Event - Lead Form Submit`

**Publish the GTM container** when done.

> **Why this approach:** firing `gtag()` and `fbq()` directly from the embed JS would double-count, since GTM already manages those tags. The dataLayer push is the single source of truth — every tracking platform listens through GTM.

## Step 7 — Test on the staging URL

1. In Webflow Designer: **Publish** to `gronkraft.webflow.io` (staging) — uncheck the custom domain so production isn't affected.
2. Visit `https://gronkraft.webflow.io/test-av-nytt-formular`.
3. Walk through each branch:
   - Elbilsladdning → Privat → contact info → submit
   - Solceller → Företag → org info → contact → submit
   - Besiktning → Elbilsladdare → contact → submit
4. After each submission, verify:
   - **Webflow Forms tab** → submission appears with all 18 field names populated
   - **Email notification** → arrives at the configured address
   - **HubSpot CRM** → contact created (if HubSpot sync is on)
   - **GTM Preview Mode** → `lead_form_submit` event fires; all three tags trigger
   - **GA4 DebugView** → `generate_lead` event arrives with custom params
   - **Meta Events Manager Test Events** → `Lead` event fires with `content_category` + `content_name`
   - **Google Ads Conversions** → conversion recorded (delay up to a few hours; use Tag Assistant for live verification)

When everything is green on staging, publish to the production domain.

## Iterating after launch

Local dev workflow stays the same:
1. Edit `index.html` / `css/style.css` / `js/main.js` and test locally with `python3 -m http.server 8080`.
2. When form copy/fields/styling change, regenerate `embed/webflow-embed.html` to mirror the changes.
3. Paste the updated embed back into the Webflow Embed Block → Publish.
4. **If field names change in `mfState`:** update the hidden Webflow form's input names to match — otherwise new fields silently won't appear in submissions.

## Troubleshooting

**Submissions not in Forms tab:** in browser devtools console, run `document.querySelector('form[data-gk-bridge="true"]')`. Should return the form element. If `null`, the custom attribute is missing — re-check Step 3 (Custom Attribute on the form element).

**Page redirects to `/tack` after submit:** the hidden Webflow form has a Redirect URL set. Clear it in the form settings — embed handles the success screen.

**Conversion event not firing:** open GTM Preview Mode, submit the form, watch for `lead_form_submit` in the events panel. If missing, the JS isn't reaching the dataLayer push — check console for errors.

**Form looks unstyled / wrong font:** the embed's `@import` of Nunito should still load it, but if a strict CSP blocks `fonts.googleapis.com`, add Nunito at the project level (Step 1).

**Submit button click does nothing:** Webflow's form scripts attach on `DOMContentLoaded`. If the hidden form is rendered after that (e.g., via custom code), the submit handler isn't bound. Place the hidden form directly in Designer, not via embed.
