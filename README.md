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

The form collects name, phone, and vehicle (no email) and emails `autodetailingofcentralfl@gmail.com` through [Web3Forms](https://web3forms.com/). The subject starts with `Ad lead`. Text and call links for 407-561-4200 sit under the form.

The Web3Forms access key stays blank in `js/lead-config.js` until Henry pastes it. Until then the form validates, then tells the visitor to call. It does not send email. `/get-quote/` is the separate Meta landing page and can share this same key and `js/lead-form.js`.
