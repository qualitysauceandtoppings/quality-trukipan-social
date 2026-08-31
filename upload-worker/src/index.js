// Uploadpagina voor de contentmakers van Quality Trukipan.
// Eén link, één wachtwoord, bestanden komen in de maandmap van de R2-bucket.

// Soepel bij het aannemen, streng bij het opslaan. Hoofdletters in het onderwerp of de
// extensie mogen, en één tot drie cijfers ook — dat werd te vaak fout ingetypt. Wat er
// binnenkomt wordt daarna omgezet naar de vaste vorm MERK_TYPE_onderwerp_NN.ext.
const NAAM_PATROON = /^(REST|TRUCK|SAUCE)_(REEL|FOTO|STORY)_([A-Za-z0-9]+)_(\d{1,3})\.(mp4|mov|jpg|jpeg|png)$/i;

function nettteNaam(naam) {
  const m = NAAM_PATROON.exec(naam);
  if (!m) return null;
  const [, merk, type, onderwerp, nummer, ext] = m;
  const nr = nummer.length === 1 ? "0" + nummer : nummer;
  return `${merk.toUpperCase()}_${type.toUpperCase()}_${onderwerp.toLowerCase()}_${nr}.${ext.toLowerCase()}`;
}

// Alles loopt via deze worker, dus ook het logo: één domein, geen los publiek bucketadres.
const LOGO = "/media/assets/logo-trukipan.svg";

// Keys mogen alleen letters, cijfers, punt, streepje, liggend streepje en schuine streep
// bevatten. Een key met ".." erin wordt apart geweigerd.
const VEILIGE_KEY = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

const TYPES = {
  mp4: "video/mp4",
  mov: "video/quicktime",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain; charset=utf-8",
};

const typeVanNaam = (naam) =>
  TYPES[(naam.split(".").pop() || "").toLowerCase()] || "application/octet-stream";

const PAGINA = (maandmap, melding = "", gelukt = false) => `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quality Trukipan — beeld aanleveren</title>
<link rel="icon" href="${LOGO}">
<style>
  :root {
    --inkt: #1a1208;
    --inkt-diep: #0d0d0d;
    --creme: #f3e9c8;
    --creme-zacht: #e9ddc0;
    --goud: #e5c358;
    --goud-diep: #d4af37;
    --warm: #e08a6a;
    --rand: rgba(229, 195, 88, .22);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 16px/1.65 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    color: var(--creme);
    background:
      radial-gradient(1200px 600px at 50% -10%, rgba(229,195,88,.10), transparent 60%),
      linear-gradient(180deg, var(--inkt) 0%, var(--inkt-diep) 100%);
    background-attachment: fixed;
    min-height: 100vh;
  }
  .wrap { max-width: 44rem; margin: 0 auto; padding: 3rem 1.25rem 5rem; }

  header { text-align: center; margin-bottom: 2.5rem; }
  header img { width: min(280px, 70vw); height: auto; display: block; margin: 0 auto 1.25rem; }
  h1 { font-size: clamp(1.35rem, 4vw, 1.75rem); margin: 0 0 .4rem; letter-spacing: -.01em; }
  .sub { margin: 0; color: var(--creme-zacht); opacity: .72; font-size: .95rem; }
  .map {
    display: inline-block; margin-top: .9rem; padding: .3rem .8rem;
    border: 1px solid var(--rand); border-radius: 999px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .85rem;
    color: var(--goud); background: rgba(229,195,88,.06);
  }

  form {
    background: rgba(243,233,200,.04);
    border: 1px solid var(--rand);
    border-radius: 1rem;
    padding: 1.75rem;
  }
  .veld + .veld { margin-top: 1.5rem; }
  label { display: block; font-weight: 600; margin-bottom: .5rem; font-size: .92rem; letter-spacing: .01em; }
  input[type="password"] {
    width: 100%; padding: .8rem 1rem; font: inherit; color: var(--creme);
    background: rgba(13,13,13,.55); border: 1px solid var(--rand); border-radius: .6rem;
  }
  input[type="password"]:focus-visible,
  input[type="file"]:focus-visible { outline: 2px solid var(--goud); outline-offset: 2px; }
  input[type="file"] {
    width: 100%; padding: 1.5rem 1rem; font: inherit; color: var(--creme-zacht);
    background: rgba(13,13,13,.35); border: 1px dashed var(--rand); border-radius: .6rem;
    cursor: pointer;
  }
  input[type="file"]::file-selector-button {
    font: inherit; font-weight: 600; margin-right: 1rem; padding: .5rem 1rem;
    color: var(--inkt); background: var(--creme-zacht);
    border: 0; border-radius: .4rem; cursor: pointer;
  }
  button {
    width: 100%; margin-top: 1.75rem; padding: .95rem 1.5rem;
    font: inherit; font-weight: 700; font-size: 1.02rem; color: var(--inkt);
    background: linear-gradient(180deg, var(--goud) 0%, var(--goud-diep) 100%);
    border: 0; border-radius: .6rem; cursor: pointer;
  }
  button:hover { filter: brightness(1.07); }

  .melding {
    padding: 1.1rem 1.25rem; border-radius: .75rem; margin-bottom: 1.75rem;
    white-space: pre-wrap; font-size: .93rem; line-height: 1.55;
    border: 1px solid var(--rand); background: rgba(243,233,200,.05);
  }
  .melding.goed { border-color: rgba(126,200,140,.4); background: rgba(126,200,140,.09); }
  .melding.fout { border-color: rgba(224,138,106,.45); background: rgba(224,138,106,.10); }

  .uitleg { margin-top: 3rem; }
  h2 { font-size: 1.05rem; margin: 0 0 .75rem; color: var(--goud); letter-spacing: .02em; }
  .uitleg p { color: var(--creme-zacht); opacity: .82; font-size: .93rem; }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .87em;
    background: rgba(229,195,88,.1); color: var(--goud);
    padding: .12rem .4rem; border-radius: .3rem;
  }
  .regels { list-style: none; padding: 0; margin: 1rem 0; }
  .regels li {
    padding: .6rem 0; border-top: 1px solid rgba(243,233,200,.09);
    color: var(--creme-zacht); font-size: .93rem;
  }
  .voorbeeld {
    margin: 1.25rem 0; padding: 1rem 1.1rem; border-radius: .6rem;
    border-left: 3px solid var(--warm); background: rgba(224,138,106,.07);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .85rem;
    color: var(--creme-zacht); overflow-x: auto; white-space: pre;
  }
  footer { margin-top: 3rem; text-align: center; font-size: .85rem; opacity: .5; }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <img src="${LOGO}" alt="Quality Trukipan">
    <h1>Beeld aanleveren</h1>
    <p class="sub">Reels en foto's voor de social media van september.</p>
    <span class="map">${maandmap}</span>
  </header>

  ${melding ? `<div class="melding ${gelukt ? "goed" : "fout"}">${melding}</div>` : ""}

  <form method="post" enctype="multipart/form-data">
    <div class="veld">
      <label for="wachtwoord">Wachtwoord</label>
      <input id="wachtwoord" name="wachtwoord" type="password" required autocomplete="off"
             placeholder="Van Jonathan gekregen">
    </div>
    <div class="veld">
      <label for="bestanden">Bestanden</label>
      <input id="bestanden" name="bestanden" type="file" multiple required
             accept="video/mp4,video/quicktime,image/jpeg,image/png">
    </div>
    <button type="submit">Uploaden</button>
  </form>

  <section class="uitleg">
    <h2>Bestandsnamen</h2>
    <p>De naam bepaalt bij welke post het beeld hoort. Klopt de naam niet, dan wordt het
    bestand geweigerd en zie je dat meteen op deze pagina.</p>
    <p><code>MERK_TYPE_ONDERWERP_NUMMER.ext</code></p>
    <ul class="regels">
      <li><strong>Merk</strong> — <code>REST</code> restaurant · <code>TRUCK</code> foodtruck · <code>SAUCE</code></li>
      <li><strong>Type</strong> — <code>REEL</code> · <code>FOTO</code> · <code>STORY</code></li>
      <li><strong>Onderwerp</strong> — kleine letters, geen spaties</li>
      <li><strong>Nummer</strong> — twee cijfers</li>
    </ul>
    <div class="voorbeeld">REST_REEL_pom_01.mp4
TRUCK_FOTO_locatie_03.jpg
SAUCE_FOTO_fles_02.jpg</div>

    <h2>Formaat</h2>
    <ul class="regels">
      <li>Reels verticaal 9:16, minimaal 1080 × 1920, MP4</li>
      <li>Foto's vierkant of 4:5, minimaal 1440 px op de korte zijde, JPG</li>
      <li>Muziek al in het bestand gebakken, rechtenvrij of gelicentieerd</li>
      <li>Geen stickers of tekst uit de Instagram-app — ingebrande tekst mag wel</li>
      <li>Grote video's een voor een; boven de 100 MB per bestand gaat het mis</li>
    </ul>

    <h2>Niet vergeten</h2>
    <p>Stuur een lijstje mee met welk gerecht of welke drink in welk bestand zit. Zonder
    dat lijstje kunnen de teksten niet geschreven worden.</p>
  </section>

  <footer>Quality Trukipan · Presikhaaf, Arnhem</footer>
</div>
</body>
</html>`;

const LIJSTPAGINA = (maandmap, melding = "", bestanden = null, logregels = null) => `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quality Trukipan — wat staat er in ${maandmap}</title>
<style>
  :root { --inkt:#1a1208; --inkt-diep:#0d0d0d; --creme:#f3e9c8; --creme-zacht:#e9ddc0;
          --goud:#e5c358; --goud-diep:#d4af37; --warm:#e08a6a; --rand:rgba(229,195,88,.22); }
  * { box-sizing:border-box; }
  body { margin:0; font:16px/1.6 ui-sans-serif, system-ui, sans-serif; color:var(--creme);
         background:linear-gradient(180deg,var(--inkt) 0%,var(--inkt-diep) 100%);
         background-attachment:fixed; min-height:100vh; }
  .wrap { max-width:52rem; margin:0 auto; padding:3rem 1.25rem 5rem; }
  h1 { font-size:1.5rem; margin:0 0 .3rem; }
  .sub { margin:0 0 2rem; color:var(--creme-zacht); opacity:.7; font-size:.95rem; }
  h2 { font-size:1rem; color:var(--goud); margin:2.5rem 0 .75rem; }
  form { background:rgba(243,233,200,.04); border:1px solid var(--rand); border-radius:1rem; padding:1.5rem; }
  label { display:block; font-weight:600; margin-bottom:.5rem; font-size:.92rem; }
  input { width:100%; padding:.8rem 1rem; font:inherit; color:var(--creme);
          background:rgba(13,13,13,.55); border:1px solid var(--rand); border-radius:.6rem; }
  button { width:100%; margin-top:1.25rem; padding:.9rem; font:inherit; font-weight:700;
           color:var(--inkt); background:linear-gradient(180deg,var(--goud),var(--goud-diep));
           border:0; border-radius:.6rem; cursor:pointer; }
  .melding { padding:1rem 1.25rem; border-radius:.75rem; margin-bottom:1.5rem;
             border:1px solid rgba(224,138,106,.45); background:rgba(224,138,106,.1); }
  pre { margin:0; padding:1.1rem; border-radius:.6rem; overflow-x:auto;
        background:rgba(13,13,13,.5); border:1px solid var(--rand);
        font:.85rem/1.7 ui-monospace, SFMono-Regular, Menlo, monospace; color:var(--creme-zacht); }
  .leeg { color:var(--warm); font-size:.93rem; }
  a { color:var(--goud); }
</style>
</head>
<body><div class="wrap">
  <h1>Wat staat er in ${maandmap}</h1>
  <p class="sub">Overzicht van de aangeleverde bestanden en de laatste uploadpogingen.</p>

  ${melding ? `<div class="melding">${melding}</div>` : ""}

  ${
    bestanden === null
      ? `<form method="post">
    <label for="w">Wachtwoord</label>
    <input id="w" name="wachtwoord" type="password" required autocomplete="off">
    <button type="submit">Bekijken</button>
  </form>`
      : `<h2>Bestanden in ${maandmap} (${bestanden.length})</h2>
  ${bestanden.length ? `<pre>${bestanden.join("\n")}</pre>` : `<p class="leeg">Nog niets aangeleverd.</p>`}

  <h2>Laatste pogingen</h2>
  ${
    logregels && logregels.length
      ? `<pre>${logregels.join("\n")}</pre>`
      : `<p class="leeg">Nog geen pogingen vastgelegd.</p>`
  }`
  }

  <p style="margin-top:2.5rem"><a href="/">Terug naar de uploadpagina</a></p>
</div></body>
</html>`;

// Legt elke poging vast in logs/<datum>.jsonl. Geen wachtwoorden, geen IP-adressen —
// alleen wat nodig is om te zien waarom een upload niet aankwam.
async function noteer(env, gegevens) {
  try {
    const nu = new Date();
    const sleutel = `logs/${nu.toISOString().slice(0, 10)}.jsonl`;
    const bestaand = await env.MEDIA.get(sleutel);
    const eerder = bestaand ? await bestaand.text() : "";
    const regel = JSON.stringify({ tijd: nu.toISOString(), ...gegevens }) + "\n";
    await env.MEDIA.put(sleutel, eerder + regel, {
      httpMetadata: { contentType: "application/x-ndjson" },
    });
  } catch {
    // Loggen mag een upload nooit laten mislukken.
  }
}

export default {
  async fetch(request, env) {
    const maandmap = env.MAANDMAP || "2026-09";
    const html = (body, status = 200) =>
      new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });

    const url = new URL(request.url);

    // Publieke leesroute: hier haalt Buffer het beeld op. Geen wachtwoord — een
    // ingeplande post moet het bestand zonder inloggen kunnen downloaden.
    if (url.pathname.startsWith("/media/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Methode niet toegestaan", { status: 405 });
      }
      let key;
      try {
        key = decodeURIComponent(url.pathname.slice("/media/".length));
      } catch {
        return new Response("Niet gevonden", { status: 404 });
      }
      if (!key || key.includes("..") || !VEILIGE_KEY.test(key)) {
        return new Response("Niet gevonden", { status: 404 });
      }
      // Het uploadlog blijft binnen: dat is alleen zichtbaar op /lijst, achter het wachtwoord.
      if (key.startsWith("logs/")) return new Response("Niet gevonden", { status: 404 });
      const object = await env.MEDIA.get(key);
      if (!object) return new Response("Niet gevonden", { status: 404 });

      const koppen = new Headers();
      koppen.set("content-type", object.httpMetadata?.contentType || typeVanNaam(key));
      koppen.set("content-length", String(object.size));
      koppen.set("cache-control", "public, max-age=3600");
      if (object.httpEtag) koppen.set("etag", object.httpEtag);
      return new Response(request.method === "HEAD" ? null : object.body, { headers: koppen });
    }

    // Overzichtspagina achter hetzelfde wachtwoord: wat staat er in de maandmap, en
    // welke pogingen zijn er gedaan.
    if (url.pathname === "/lijst") {
      if (request.method === "GET") return html(LIJSTPAGINA(maandmap));
      if (request.method !== "POST") return new Response("Methode niet toegestaan", { status: 405 });
      if (!env.WACHTWOORD) return html(LIJSTPAGINA(maandmap, "Er is nog geen wachtwoord ingesteld."), 503);

      let f;
      try {
        f = await request.formData();
      } catch {
        return html(LIJSTPAGINA(maandmap, "Formulier kon niet gelezen worden."), 400);
      }
      if (f.get("wachtwoord") !== env.WACHTWOORD) {
        return html(LIJSTPAGINA(maandmap, "Wachtwoord klopt niet."), 401);
      }

      const inhoud = await env.MEDIA.list({ prefix: maandmap + "/" });
      const bestanden = inhoud.objects
        .map(
          (o) =>
            `${o.key.slice(maandmap.length + 1)}  ·  ${Math.round(o.size / 1024)} kB  ·  ${o.uploaded
              .toISOString()
              .slice(0, 16)
              .replace("T", " ")}`
        )
        .sort();

      const logs = await env.MEDIA.list({ prefix: "logs/" });
      const recent = logs.objects.map((o) => o.key).sort().slice(-5).reverse();
      const regels = [];
      for (const k of recent) {
        const obj = await env.MEDIA.get(k);
        if (!obj) continue;
        const tekst = await obj.text();
        for (const r of tekst.trim().split("\n").filter(Boolean).slice(-25).reverse()) {
          try {
            const p = JSON.parse(r);
            const stukken = [p.tijd?.slice(0, 16).replace("T", " "), p.uitkomst];
            if (p.gelukt?.length) stukken.push("gelukt: " + p.gelukt.join(", "));
            if (p.geweigerd?.length) stukken.push("geweigerd: " + p.geweigerd.join(" | "));
            regels.push(stukken.filter(Boolean).join("  ·  "));
          } catch {
            regels.push(r);
          }
        }
        if (regels.length >= 40) break;
      }

      return html(LIJSTPAGINA(maandmap, "", bestanden, regels.slice(0, 40)));
    }

    if (request.method === "GET") {
      return url.pathname === "/"
        ? html(PAGINA(maandmap))
        : new Response("Niet gevonden", { status: 404 });
    }
    if (request.method !== "POST") return new Response("Methode niet toegestaan", { status: 405 });

    if (!env.WACHTWOORD) {
      return html(PAGINA(maandmap, "Er is nog geen wachtwoord ingesteld. Neem contact op met Jonathan."), 503);
    }

    const browser = request.headers.get("user-agent") || "";

    let formulier;
    try {
      formulier = await request.formData();
    } catch {
      await noteer(env, { uitkomst: "formulier onleesbaar, waarschijnlijk te groot bestand", browser });
      return html(PAGINA(maandmap, "Het formulier kon niet gelezen worden. Probeer minder bestanden tegelijk."), 400);
    }

    if (formulier.get("wachtwoord") !== env.WACHTWOORD) {
      const namen = formulier
        .getAll("bestanden")
        .filter((b) => typeof b === "object" && b.name)
        .map((b) => b.name);
      await noteer(env, { uitkomst: "wachtwoord fout", geweigerd: namen, browser });
      return html(PAGINA(maandmap, "Wachtwoord klopt niet."), 401);
    }

    const bestanden = formulier.getAll("bestanden").filter((b) => typeof b === "object" && b.name);
    if (bestanden.length === 0) return html(PAGINA(maandmap, "Geen bestanden geselecteerd."), 400);

    const gelukt = [];
    const geweigerd = [];

    for (const bestand of bestanden) {
      const naam = nettteNaam(bestand.name);
      if (!naam) {
        geweigerd.push(
          `${bestand.name} — naam klopt niet, verwacht MERK_TYPE_onderwerp_NN.ext ` +
            `(merk REST/TRUCK/SAUCE, type REEL/FOTO/STORY, extensie mp4/mov/jpg/png)`
        );
        continue;
      }
      try {
        await env.MEDIA.put(`${maandmap}/${naam}`, bestand.stream(), {
          httpMetadata: { contentType: bestand.type || typeVanNaam(naam) },
        });
        gelukt.push(naam === bestand.name ? naam : `${naam} (hernoemd van ${bestand.name})`);
      } catch (fout) {
        geweigerd.push(`${bestand.name} — uploaden mislukt (${fout.message})`);
      }
    }

    await noteer(env, {
      uitkomst: geweigerd.length ? "deels of niets gelukt" : "alles gelukt",
      gelukt,
      geweigerd,
      browser,
    });

    const regels = [];
    if (gelukt.length) regels.push(`Geüpload (${gelukt.length}):\n${gelukt.join("\n")}`);
    if (geweigerd.length) regels.push(`Niet geüpload (${geweigerd.length}):\n${geweigerd.join("\n")}`);

    return html(PAGINA(maandmap, regels.join("\n\n"), geweigerd.length === 0), geweigerd.length ? 422 : 200);
  },
};
