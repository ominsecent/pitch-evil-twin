const KINDS = ["Startup", "Fund", "Co-invest", "Secondary"];
const EXTRA = {
  Startup: [["raising", "Raising", "raising"], ["investors", "Existing investors", "investors"]],
  Fund: [["size", "Target fund size", "fundSize"], ["close", "Next close date", "fundClose"], ["gpc", "GP commit", "gpCommit"], ["lps", "Anchor or existing LPs", "fundLps"], ["strategy", "Fund strategy", "fundStrategy"], ["track", "Track record", "fundTrack"]],
  "Co-invest": [["company", "Co-invest company", "coCompany"], ["round", "Co-invest round and lead", "coRound"], ["alloc", "Co-invest allocation", "coAlloc"], ["terms", "Co-invest valuation or terms", "coTerms"], ["deadline", "Co-invest deadline", "coDeadline"]],
  Secondary: [["company", "Secondary company", "secCompany"], ["seller", "Secondary seller", "secSeller"], ["block", "Secondary block size", "secBlock"], ["price", "Secondary price or discount", "secPrice"], ["rofr", "Secondary transfer restrictions", "secRofr"]]
};
const FLAT = [].concat(...Object.values(EXTRA)).map((e) => e[2]);
const clip = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
module.exports = async (req, res) => {
  const hook = process.env.AIRTABLE_WEBHOOK_URL;
  if (!hook) return res.status(500).json({ ok: false, error: "Not configured." });
  let payload;
  if (req.method === "GET" && process.env.SAMPLE_KEY && req.query.sample === process.env.SAMPLE_KEY) {
    payload = { name: "Schema Sample", email: "jason@eviltwincapital.com", company: "TEST schema sample (delete me)", kind: "Startup", oneLiner: "Test entry created while updating the pitch form", pitch: "test", links: "https://example.com", linkedin: "https://www.linkedin.com/in/sample", source: "setup", share: false, deckName: "sample.pdf (1 of 1 pages read)", deckText: "[Slide 1] sample" };
    FLAT.forEach((k) => { payload[k] = "sample"; });
  } else if (req.method === "POST") {
    let b = req.body || {};
    if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    if (b.website) return res.status(200).json({ ok: true });
    payload = {
      name: clip(b.name, 200), email: clip(b.email, 200), company: clip(b.company, 200),
      kind: KINDS.includes(b.kind) ? b.kind : "", oneLiner: clip(b.oneLiner, 300),
      pitch: clip(b.pitch, 20000), links: clip(b.links, 4000), linkedin: clip(b.linkedin, 500),
      source: clip(b.source, 200), share: b.share === true
    };
    if (payload.linkedin && !/^https?:\/\//i.test(payload.linkedin)) payload.linkedin = "https://" + payload.linkedin;
    const x = b.extra && typeof b.extra === "object" ? b.extra : {};
    FLAT.forEach((k) => { payload[k] = ""; });
    const lines = (EXTRA[payload.kind] || []).map(([k, label, flat]) => {
      const v = clip(x[k], 1500).replace(/\s*\n\s*/g, " ");
      payload[flat] = v;
      return v ? label + ": " + v : "";
    }).filter(Boolean);
    if (lines.length && payload.pitch) payload.pitch = (payload.pitch + "\n\n--- " + payload.kind + " details ---\n" + lines.join("\n")).slice(0, 30000);
    payload.deckName = clip(b.deckName, 200);
    payload.deckText = clip(b.deckText, 20000);
    const missing = ["name", "email", "company", "kind", "oneLiner", "pitch"].filter((k) => !payload[k]);
    if (missing.length) return res.status(400).json({ ok: false, error: "Please fill in every required field." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) return res.status(400).json({ ok: false, error: "That email address doesn't look right." });
  } else {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error("hook " + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "We couldn't save your pitch. Please try again in a minute." });
  }
};
