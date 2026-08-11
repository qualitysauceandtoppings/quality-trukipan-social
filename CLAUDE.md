# CLAUDE.md — context voor Claude Code

Dit project beheert de social media van **Quality Trukipan** (Surinaams eten,
Presikhaaf/Arnhem). Doel: een voorraadmodel met vaste weekdag-rubrieken, per
maand vooraf ingepland via Buffer. Gebruik dit bestand om het werk voort te zetten.

## Merken & accounts

| Onderdeel | Merk / account | Actief | Kanalen |
|---|---|---|---|
| Restaurant | **Quality Trukipan Presikhaaf** | di t/m zo (ma dicht) | Instagram, TikTok |
| Foodtruck | **Quality Trukipan** | do + za | Instagram, TikTok, Facebook |
| Los merk | Quality Sauce & Toppings | — | Instagram, TikTok, Facebook |

> Quality Sauce & Toppings zit vanaf september mee in het systeem: vaste foto op
> maandag, vaste reel op vrijdag.
> Presikhaaf heeft (nog) geen eigen Facebook-pagina; Facebook loopt via het hoofdaccount.

## Buffer

- Organisatie: **Quality empire** — `organizationId: 6a2d69cf3d34f01dcdb6401f`
- Plan: **Essentials** (per kanaal betaald; alle kanalen gekoppeld)
- Tool: Buffer MCP-server (`mcp__buffer__*`). Vereist dat de gebruiker Buffer als
  connector heeft geautoriseerd.

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
Per maand ± 54 posts, vooraf ingepland in Buffer.

## Rolverdeling

- **Jonathan** — keurt één keer per maand de complete batch goed. Verder niets.
- **Contentmakers** — leveren beeld volgens `content/briefing-contentmakers.md`, vóór de 28e.
- **Claude** — maandplan, captions, beeld koppelen, inplannen in Buffer, index bijhouden, evaluatie.

Niets wordt ingepland zonder expliciete goedkeuring van Jonathan op de hele batch.

## Publiceren

Beide Instagram-accounts zijn Professional Accounts zonder herinneringen: feed-posts
en reels publiceren automatisch. Kale stories ook. Alleen reels die op een trending
sound uit de app moeten worden als herinnering klaargezet, maximaal twee per maand.

## Status

- [x] Ontwerp vastgelegd en goedgekeurd (10 aug 2026)
- [x] Maandplan, captions, contentbank en briefing voor september
- [ ] Shootdag ingepland met de contentmakers (uiterlijk 22 aug)
- [ ] Beeld geleverd (uiterlijk 28 aug)
- [ ] Aanleverroute voor media vastgesteld — open vraag bij de contentmakers
- [ ] Batch september goedgekeurd en ingepland in Buffer
