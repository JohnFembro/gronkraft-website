# Embedding the Grönkraft lead form in Webflow

This guide walks through dropping `webflow-embed.html` into a Webflow site so leads land in Webflow's Forms tab and conversions fire to Google Ads + Meta Pixel.

## Architecture

There are **two pieces** that must coexist on the Webflow page:

1. A **hidden Webflow Form Block** with `data-name="leads-gronkraft"` and one Plain Text input per field. This is what actually receives the submission — leads land in Webflow's Forms tab and trigger Webflow's email notifications.
2. An **Embed Block** containing `webflow-embed.html`. This is the visible multi-step UI. On submit it copies all values into the hidden Webflow form and triggers its submit button.

The embed is fully scoped under `.gk-form` so it cannot collide with Webflow's own styles.

## Step 1 — Add Nunito as a project font

Webflow Project Settings → **Fonts** → **Add Google Font** → search "Nunito" → enable weights `400, 700, 800` → Save.

(The embed also `@import`s Nunito as a fallback, but loading it at the project level is faster and avoids a flash of fallback font.)

## Step 2 — Add tracking pixels in `<head>`

Webflow Project Settings → **Custom Code** → **Head Code**. Paste:

```html
<!-- Google Ads / GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-CONVERSION_ID');
</script>

<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'META_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

Replace:
- `AW-CONVERSION_ID` with your Google Ads conversion ID (format `AW-1234567890`).
- `META_PIXEL_ID` with your Meta Pixel ID.

Then in `embed/webflow-embed.html`, replace `AW-CONVERSION_ID/CONVERSION_LABEL` (appears once in the `gtag('event', 'conversion', …)` call) with your actual conversion ID + label, e.g. `AW-1234567890/AbCdEfGhIjK`.

## Step 3 — Build the hidden Webflow form

On the page where the form should live, add a **Form Block** from Webflow Designer.

**Form settings:**
- Form name: `leads-gronkraft` (this sets `data-name="leads-gronkraft"` automatically — the bridge JS looks for exactly this)
- Add the class `gk-bridge` to the wrapping `.w-form` div (the embed CSS hides anything with this class)

**Add one Plain Text input for each of these field names** (set the `Name` attribute on each input — case-sensitive):

```
omrade            kundtyp           tjanst            antalUttag
laddare           intresse          kontrollera       befintlig
orgNamn           orgNr             adress            kommun
postort           namn              kontaktperson     telefon
epost             meddelande
```

The default Webflow form ships with `Name`, `Email`, and a textarea — you can rename those to `namn`, `epost`, and `meddelande` and add the rest.

The submit button can keep its default label — it's never visible, the JS just calls `.click()` on it.

**Tip:** to keep Webflow Designer tidy, drop the entire form inside a div with class `gk-bridge` and `display: none` set in Style. The CSS rule in the embed (`.gk-bridge { display: none !important; }`) handles this automatically.

## Step 4 — Configure form notifications

In Webflow form settings → **Email**: set the recipient to the address that should receive lead notifications. Webflow sends one email per submission with all the field values.

You can also set **Redirect URL** to `/tack` if you want users redirected after Webflow processes the submission — but the embed shows its own success screen instantly via `mfGoto('fs-done')`, so a redirect isn't needed for UX.

## Step 5 — Drop in the Embed Block

1. On the same page, add an **Embed** element where the form should appear (typically the hero section).
2. Open `embed/webflow-embed.html`, copy the entire contents, paste into the Embed.
3. Save & close the embed editor.

The embed contains its own `<style>` and `<script>` so nothing else needs to be loaded on the page.

## Step 6 — Test in Webflow Preview / Staging

1. Publish to a Webflow staging URL (`*.webflow.io`).
2. Walk through the form for each branch:
   - Elbilsladdning → Privat → contact info → submit
   - Solceller → Företag → org info → contact → submit
   - Besiktning → Elbilsladdare check → contact → submit
3. After each submission, check:
   - **Webflow Forms tab** → submission appears with all fields populated
   - **Email notification** → arrives at the configured address
   - **Google Ads → Conversions** → conversion event recorded (delay up to a few minutes)
   - **Meta Events Manager → Test Events** → `Lead` event fires with `content_category` and `content_name`

## Iterating after launch

Local dev workflow stays the same:
1. Edit `index.html` / `css/style.css` / `js/main.js` and test locally with `python3 -m http.server 8080`.
2. When you change form copy, fields, or styling, regenerate `embed/webflow-embed.html` (mirror the changes — the embed is a flattened, scoped copy of the live form).
3. Paste the updated embed back into the Webflow Embed Block → Publish.

If the field set in `mfState` changes (new keys added/renamed), the hidden Webflow form must be updated to match — otherwise the new fields won't appear in submissions.

## Troubleshooting

**Submissions not showing in Forms tab:** open browser devtools → Network → submit form → look for a request to `webflow.com/api/v1/form/...`. If missing, the bridge can't find the Webflow form — verify `data-name="leads-gronkraft"` matches exactly. Inspect with: `document.querySelector('form[data-name="leads-gronkraft"]')`.

**Conversion pixel not firing:** in devtools console, paste `typeof gtag` and `typeof fbq` — both should return `"function"`. If `"undefined"`, the head code wasn't loaded; check Project Settings → Custom Code.

**Form looks unstyled / wrong font:** the embed's `@import` of Nunito should still load it, but if the page uses a strict CSP that blocks `fonts.googleapis.com`, add Nunito at the project level (Step 1).
