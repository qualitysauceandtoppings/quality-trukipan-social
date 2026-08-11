# CLAUDE.md — context voor Claude Code

Dit project beheert de social media van **Quality Trukipan** (Surinaams eten,
Presikhaaf/Arnhem). Doel: een voorraadmodel met vaste weekdag-rubrieken, per
maand vooraf ingepland via Buffer. Gebruik dit bestand om het werk voort te zetten.

## Merken & accounts

| Onderdeel | Merk / account | Actief | Kanalen |
|---|---|---|---|
| Restaurant | **Quality Trukipan Presikhaaf** | di t/m zo (ma dicht) | Instagram, TikTok |
| Foodtruck | **Quality Trukipan** | do + za | Instagram, TikTok, Facebook |
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

Drie merken: restaurant (di–zo), foodtruck (do + za), Sauce & Toppings (ma + vr).
Per maand 54 contentmomenten, vooraf ingepland in Buffer. Een contentmoment dat
naar twee kanalen gaat (bijvoorbeeld Instagram + TikTok) is in Buffer twee
aparte posts; 29 van de 54 contentmomenten gaan naar twee kanalen, dus dat
worden samen 83 posts.

## Rolverdeling

- **Jonathan** — keurt één keer per maand de complete batch goed en levert daarbij
  de invulling van [gerecht], [drink] en [locatie] voor die maand aan. Verder niets.
- **Contentmakers** — leveren beeld volgens `content/briefing-contentmakers.md`, vóór de 28e.
- **Claude** — maandplan, captions, beeld koppelen, inplannen in Buffer, index bijhouden, evaluatie.

Niets wordt ingepland zonder expliciete goedkeuring van Jonathan op de hele batch.

## Publiceren

Beide Instagram-accounts zijn Professional Accounts zonder herinneringen: feed-posts
en reels publiceren automatisch. Kale stories ook. Alleen reels die op een trending
sound uit de app moeten worden als herinnering klaargezet, maximaal twee per maand.

## Beeldopslag

Buffer accepteert media alleen via een directe bestands-URL. Daarvoor staat een
Cloudflare R2-bucket klaar in het account `info@qualityfoodcocktailbar.nl`
(account-ID `49cd4a50cee1c34782a6d375951b7143`):

- Bucket: `quality-trukipan-media`
- Publiek adres: `https://pub-45b4de13a5a44d21a27e6ebf505bfc5b.r2.dev`
- Eén map per maand: `2026-09/`, `2026-10/`, enzovoort
- Link van een bestand: `<publiek adres>/<maandmap>/<bestandsnaam>`, bijvoorbeeld
  `https://pub-45b4de13a5a44d21a27e6ebf505bfc5b.r2.dev/2026-09/REST_REEL_pom_01.mp4`

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
