// Uploadpagina voor de contentmakers van Quality Trukipan.
// Eén link, één wachtwoord, bestanden komen in de maandmap van de R2-bucket.

const NAAM_PATROON = /^(REST|TRUCK|SAUCE)_(REEL|FOTO|STORY)_[a-z0-9]+_\d{2}\.(mp4|mov|jpg|jpeg|png)$/;

const PAGINA = (maandmap, melding = "") => `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quality Trukipan — beeld aanleveren</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 16px/1.6 system-ui, -apple-system, sans-serif; max-width: 40rem;
         margin: 0 auto; padding: 2rem 1.25rem 4rem; }
  h1 { font-size: 1.5rem; margin-bottom: .25rem; }
  .sub { opacity: .7; margin-top: 0; }
  fieldset { border: 1px solid currentColor; border-radius: .5rem; padding: 1rem;
             margin: 1.5rem 0; opacity: .95; }
  label { display: block; font-weight: 600; margin-bottom: .35rem; }
  input { width: 100%; padding: .6rem; font: inherit; border-radius: .4rem;
          border: 1px solid currentColor; background: transparent; color: inherit; }
  button { margin-top: 1rem; padding: .7rem 1.4rem; font: inherit; font-weight: 600;
           border: 0; border-radius: .4rem; background: #c2410c; color: #fff; cursor: pointer; }
  code { background: rgba(128,128,128,.18); padding: .1rem .35rem; border-radius: .25rem; }
  .melding { padding: 1rem; border-radius: .5rem; background: rgba(128,128,128,.15);
             white-space: pre-wrap; margin-bottom: 1.5rem; }
  ul { padding-left: 1.2rem; }
</style>
</head>
<body>
<h1>Quality Trukipan — beeld aanleveren</h1>
<p class="sub">Alles komt in de map <code>${maandmap}</code>.</p>

${melding ? `<div class="melding">${melding}</div>` : ""}

<form method="post" enctype="multipart/form-data">
  <fieldset>
    <label for="wachtwoord">Wachtwoord</label>
    <input id="wachtwoord" name="wachtwoord" type="password" required autocomplete="off">
  </fieldset>
  <fieldset>
    <label for="bestanden">Bestanden</label>
    <input id="bestanden" name="bestanden" type="file" multiple required
           accept="video/mp4,video/quicktime,image/jpeg,image/png">
  </fieldset>
  <button type="submit">Uploaden</button>
</form>

<h2>Bestandsnamen</h2>
<p>De naam bepaalt bij welke post het beeld hoort. Klopt de naam niet, dan wordt het
bestand geweigerd.</p>
<p><code>MERK_TYPE_ONDERWERP_NUMMER.ext</code></p>
<ul>
  <li>Merk: <code>REST</code> (restaurant), <code>TRUCK</code> (foodtruck), <code>SAUCE</code></li>
  <li>Type: <code>REEL</code>, <code>FOTO</code> of <code>STORY</code></li>
  <li>Onderwerp: kleine letters, geen spaties</li>
  <li>Nummer: twee cijfers</li>
</ul>
<p>Bijvoorbeeld <code>REST_REEL_pom_01.mp4</code> of <code>TRUCK_FOTO_locatie_03.jpg</code>.</p>
<p>Reels verticaal 9:16, minimaal 1080x1920. Foto's vierkant of 4:5, minimaal 1440px op
de korte zijde. Muziek al in het bestand, rechtenvrij of gelicentieerd.</p>
<p>Grote video's kun je beter een voor een uploaden; boven de 100 MB per bestand gaat het mis.</p>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const maandmap = env.MAANDMAP || "2026-09";
    const html = (body, status = 200) =>
      new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });

    if (request.method === "GET") return html(PAGINA(maandmap));
    if (request.method !== "POST") return new Response("Methode niet toegestaan", { status: 405 });

    if (!env.WACHTWOORD) {
      return html(PAGINA(maandmap, "Er is nog geen wachtwoord ingesteld. Neem contact op met Jonathan."), 503);
    }

    let formulier;
    try {
      formulier = await request.formData();
    } catch {
      return html(PAGINA(maandmap, "Het formulier kon niet gelezen worden. Probeer minder bestanden tegelijk."), 400);
    }

    if (formulier.get("wachtwoord") !== env.WACHTWOORD) {
      return html(PAGINA(maandmap, "Wachtwoord klopt niet."), 401);
    }

    const bestanden = formulier.getAll("bestanden").filter((b) => typeof b === "object" && b.name);
    if (bestanden.length === 0) return html(PAGINA(maandmap, "Geen bestanden geselecteerd."), 400);

    const gelukt = [];
    const geweigerd = [];

    for (const bestand of bestanden) {
      if (!NAAM_PATROON.test(bestand.name)) {
        geweigerd.push(`${bestand.name} — naam klopt niet`);
        continue;
      }
      try {
        await env.MEDIA.put(`${maandmap}/${bestand.name}`, bestand.stream(), {
          httpMetadata: { contentType: bestand.type || "application/octet-stream" },
        });
        gelukt.push(bestand.name);
      } catch (fout) {
        geweigerd.push(`${bestand.name} — uploaden mislukt (${fout.message})`);
      }
    }

    const regels = [];
    if (gelukt.length) regels.push(`Geüpload (${gelukt.length}):\n${gelukt.join("\n")}`);
    if (geweigerd.length) regels.push(`Niet geüpload (${geweigerd.length}):\n${geweigerd.join("\n")}`);

    return html(PAGINA(maandmap, regels.join("\n\n")), geweigerd.length ? 422 : 200);
  },
};
