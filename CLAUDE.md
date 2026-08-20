# CLAUDE.md — context voor Claude Code

Dit project beheert de social media van **Quality Trukipan** (Surinaams eten,
Presikhaaf/Arnhem). Doel: een voorraadmodel met vaste weekdag-rubrieken, per
maand vooraf ingepland via Buffer. Gebruik dit bestand om het werk voort te zetten.

## Merken & accounts

| Onderdeel | Merk / account | Actief | Kanalen |
|---|---|---|---|
| Restaurant | **Quality Trukipan Presikhaaf** | di t/m zo (ma dicht) | Instagram, TikTok |
| Foodtruck | **Quality Trukipan** | do + za + zo (bevestigd) | Instagram, TikTok, Facebook |
| Eigen merk | Quality Sauce & Toppings | ma + vr | Instagram, TikTok, Facebook |

> Quality Sauce & Toppings zit vanaf september mee in het systeem: vaste foto op
> maandag, vaste reel op vrijdag.
> Presikhaaf heeft (nog) geen eigen Facebook-pagina; Facebook loopt via het hoofdaccount.

## Buffer

- Organisatie: **Quality empire** — `organizationId: 6a2d69cf3d34f01dcdb6401f`
- Plan: **Essentials** (per kanaal betaald; alle kanalen gekoppeld)
- Tool: de Buffer MCP-server. De toolnamen dragen een server-ID die per omgeving
  verschilt — zoek ze op met ToolSearch op "buffer" in plaats van een naam te gokken.
  Vereist dat Buffer als connector geautoriseerd is.

### Kanaal-IDs

| Account | Service | Kanaal-ID |
|---|---|---|
| Quality Trukipan (foodtruck) | Instagram | `6a7a27f7b2d9d577435144a4` |
| Quality Trukipan (foodtruck) | TikTok | `6a7a2870b2d9d577435146c6` |
| Quality Trukipan (foodtruck) | Facebook | `6a7a2926b2d9d577435149a0` |
| Quality Trukipan Presikhaaf (restaurant) | Instagram | `6a7a28b4b2d9d577435147db` |
| Quality Trukipan Presikhaaf (restaurant) | TikTok | `6a7a246bb2d9d5774351333e` |
| Quality Sauce & Toppings (los) | Instagram | `6a2d6a8c38b5579345903152` |
| Quality Sauce & Toppings (los) | Facebook | `6a2d6b2f38b5579345903373` |
| Quality Sauce & Toppings (los) | TikTok | `6a2d6b6338b557934590342b` |

## Het systeem

Voorraadmodel met vaste weekdag-rubrieken. Volledige beschrijving staat in
`docs/superpowers/specs/2026-08-10-social-september-design.md`.

De foodtruck heeft vaste standplaatsen: donderdag en zaterdag winkelcentrum
Hatert in Nijmegen, zondag winkelcentrum Elderhof in Arnhem. Zie
`content/locaties.md` voor de standplaatsen en de bijbehorende hashtag-regel.
Afwijkingen (festival, privéfeest, dag dat de truck niet rijdt) geeft
Jonathan door via de chat, uiterlijk de dag ervoor — niet meer per maand
aanleveren zoals bij [gerecht]/[drink].

Drie merken: restaurant (di–zo), foodtruck (do + za + zo), Sauce & Toppings (ma + vr).
Per maand 62 contentmomenten, vooraf ingepland in Buffer. Een contentmoment dat
naar twee kanalen gaat (bijvoorbeeld Instagram + TikTok) is in Buffer twee
aparte posts; 33 van de 62 contentmomenten gaan naar twee kanalen, dus dat
worden samen 95 posts.

## Rolverdeling

- **Jonathan** — keurt één keer per maand de complete batch goed en levert daarbij
  de invulling van [gerecht] en [drink] voor die maand aan. De standplaatsen van
  de foodtruck liggen vast in `content/locaties.md`; Jonathan hoeft die niet meer
  per maand aan te leveren, alleen uitzonderingen erop worden via de chat
  doorgegeven (zie `content/locaties.md`). Verder niets.
- **Contentmakers** — leveren beeld volgens `content/briefing-contentmakers.md`, vóór de 28e,
  met een lijstje erbij van welk gerecht of welke drink in welk bestand zit. Daaruit worden
  de placeholders `[gerecht]` en `[drink]` in de captions ingevuld.
- **Claude** — maandplan, captions, beeld koppelen, inplannen in Buffer, index bijhouden, evaluatie.

Niets wordt ingepland zonder expliciete goedkeuring van Jonathan op de hele batch.

## Publiceren

Beide Instagram-accounts zijn Professional Accounts zonder herinneringen: feed-posts
en reels publiceren automatisch. Kale stories ook. Alleen reels die op een trending
sound uit de app moeten worden als herinnering klaargezet, maximaal twee per maand.

### Foto's versus reels

**Foto's gaan volautomatisch.** De post krijgt een media-URL mee en Buffer haalt het
beeld daar zelf op. Er komt geen mens aan te pas.

**Reels worden één keer in Buffer geüpload** en posten daarna vanzelf op het geplande
moment. Volgens Jonathan post Buffer video zonder problemen — bewezen op 1 juli 2026.
Dat is één handeling per reel, en de enige die overblijft in de maandcyclus.

Volautomatische reels, rechtstreeks via de Instagram- en TikTok-API, staan beschreven in
`docs/superpowers/specs/spec-volautomatisch-video-posten.md`. Dat is werk voor later en
vereist eerst een Facebook-pagina voor Presikhaaf, een Meta-app en een TikTok-audit.

**Geluid moet in het videobestand zitten.** De muziekbibliotheken van Instagram en TikTok
bestaan alleen in hun eigen app; Buffer en de API kunnen er niet bij. Een reel zonder
ingebakken audio komt stil online. Dit staat ook in de briefing.

## Beeldopslag

Buffer accepteert media alleen via een directe bestands-URL. Daarvoor staat een
Cloudflare R2-bucket klaar in het account `info@qualityfoodcocktailbar.nl`
(account-ID `49cd4a50cee1c34782a6d375951b7143`):

- Bucket: `quality-trukipan-media`
- Worker: `quality-trukipan-upload`, live op `https://quality-trukipan-upload.trukipan.workers.dev`
  (workers.dev, geen eigen domein). Broncode in `upload-worker/`.
- Eén map per maand: `2026-09/`, `2026-10/`, enzovoort
- **Media-URL-vorm:** `https://<worker-domein>/media/<maand>/<bestandsnaam>`, dus
  `https://quality-trukipan-upload.trukipan.workers.dev/media/2026-09/REST_REEL_pom_01.mp4`
- De worker leest via de binding `MEDIA`. Publieke toegang op de bucket zelf staat uit:
  het oude `pub-…r2.dev`-adres geeft 401 en wordt niet meer gebruikt.

De contentmakers krijgen géén toegang tot de bucket; zij leveren aan zoals ze gewend
zijn, met de juiste bestandsnamen. Claude zet de bestanden er zelf in met
`wrangler r2 object put <bucket>/<maandmap>/<naam> --file <pad> --remote`.

Publieke toegang betekent: wie de exacte link heeft kan het bestand ophalen. De bucket
is niet doorzoekbaar en geeft geen bestandslijst.

## Status

- [x] Ontwerp vastgelegd en goedgekeurd (10 aug 2026)
- [x] Maandplan, captions, contentbank en briefing voor september
- [x] Beeldopslag ingericht: R2-bucket met publieke toegang (11 aug 2026)
- [x] Shootdagen vastgelegd: za 29 aug restaurant, zo 30 aug foodtruck
- [ ] Beeld geleverd — week 1 op ma 31 aug, de rest uiterlijk wo 2 sept

> Let op: de shoot valt later dan de maandroutine voorschrijft. September start
> daardoor krap: één werkdag tussen de shoot en de eerste post op di 1 sept 12:00.
> Vanaf oktober weer volgens de routine, dus shoot vóór de 27e.
- [ ] Batch september goedgekeurd en ingepland in Buffer
