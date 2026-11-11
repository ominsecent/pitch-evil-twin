# pitch-evil-twin

Public pitch page for Evil Twin Capital: https://pitch-evil-twin.vercel.app

- `index.html` — the page
- `data.js` — editable content: companies backed, "What we bring" extras, About text
- `form.js` — the built-in pitch form
- `api/pitch.js` — receives a pitch and forwards it to the Airtable automation (URL in the `AIRTABLE_WEBHOOK_URL` environment variable on Vercel)
- `og-twins.jpg` — the image shown when the link is shared
