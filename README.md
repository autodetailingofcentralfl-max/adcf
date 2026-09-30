# Auto Detailing of Central Florida (A.D.C.F.)

Marketing site for [adcf.us](https://adcf.us) — mobile auto detailing in the Kissimmee / Orlando area.

Static HTML for GitHub Pages. No build step.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Primary CTA

Text to book: `sms:+14075614200` (407-561-4200)  
Call: `tel:+14075614200` (407-561-4200)  
Gift cards: https://app.squareup.com/gift/TC1XD7V8T3Y7S/order

## Homepage video and lead form

The homepage opens with Henry’s interior wipe-down clip, then the quote form.

- Video: `videos/see-us-work.mp4`
- Poster: `images/see-us-work-poster.jpg`
- The player is click-to-play (`controls`, `playsinline`, `preload="metadata"`). It does not autoplay.

The form collects name, vehicle, and ZIP code. It does not ask for a phone number or an email address. Copy next to the form says the Freshen-Up starts at $80, and that pricing depends on vehicle size and condition. Submissions email `autodetailingofcentralfl@gmail.com` through [Web3Forms](https://web3forms.com/). The subject starts with `Ad lead`. Text and call links for 407-561-4200 sit under the form.

The Web3Forms access key stays blank in `js/lead-config.js` until Henry pastes it. Until then the form validates, then tells the visitor to call. It does not send email.

## Meta ad lead form

Stable URL for the Meta “Learn more” button: <https://adcf.us/get-quote/>

The page collects name, vehicle, and ZIP code, then emails `autodetailingofcentralfl@gmail.com`. Copy on the page says the Freshen-Up starts at $80, and that the final quote depends on vehicle size and condition. 407-561-4200 stays on the page as a secondary call link. Submissions are sent by [Web3Forms](https://web3forms.com/) because this site is static GitHub Pages and has no form backend.

The email subject starts with `Ad lead` so a Gmail filter can label them. Suggested filter: subject contains `Ad lead`.

### What Henry must set before go-live

GitHub Pages cannot read a server secret. The Web3Forms access key is a public inbox alias (safe to commit; it is not a private API key). Until it is pasted in, the form validates but tells the visitor to call instead of emailing anyone.

1. Go to <https://web3forms.com> and create an access key for `autodetailingofcentralfl@gmail.com`.
2. Open the confirmation email in that Gmail inbox and copy the access key.
3. Paste it into `js/lead-config.js` as `window.ADCF_LEAD_ACCESS_KEY`.
4. Commit and wait for GitHub Pages to publish.
5. Submit one real test from `/get-quote/` and confirm the message arrives with a subject like `Ad lead: Jane Doe — 2019 Honda Civic (34741)`.
6. Optional: in the Web3Forms dashboard, restrict the key to `adcf.us`.

Check Web3Forms’ current free-plan monthly cap before sending ad traffic. Do not point the live Meta ad at this URL until step 5 succeeds.

### How to test locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/get-quote/`.

- Submit empty fields: name, vehicle, and ZIP code each show an error.
- Enter a ZIP that is not exactly 5 digits: ZIP error only.
- Submit valid name, vehicle, and ZIP before the access key is set: the form stays up and shows the call fallback. Nothing is emailed.
- After the key is set, the same submit shows “Got it.” and the inbox receives the lead.
