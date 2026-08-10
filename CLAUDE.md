# CLAUDE.md — context voor Claude Code

Dit project beheert de social media van **Quality Trukipan** (Surinaams eten,
Presikhaaf/Arnhem). Doel: één vast weekritme + posts inplannen via Buffer.
Gebruik dit bestand om het werk voort te zetten.

## Merken & accounts

| Onderdeel | Merk / account | Actief | Kanalen |
|---|---|---|---|
| Restaurant | **Quality Trukipan Presikhaaf** | di t/m zo (ma dicht) | Instagram, TikTok |
| Foodtruck | **Quality Trukipan** | do + za | Instagram, TikTok, Facebook |
| Los merk | Quality Sauce & Toppings | — | Instagram, TikTok, Facebook |

> Quality Sauce & Toppings staat LOS van dit systeem — niet in de weekplanning meenemen.
> Presikhaaf heeft (nog) geen eigen Facebook-pagina; Facebook loopt via het hoofdaccount.

## Buffer

- Organisatie: **My Organization** — `organizationId: 6a2d69cf3d34f01dcdb6401f`
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

**Restaurant (Presikhaaf), di t/m zo:** 2 reels/week (bv. wo + za), 4–5 foto-posts
verspreid, elke open dag 2–3 stories.
**Foodtruck (Quality Trukipan), do + za:** locatie vooraf aankondigen (story + post)
+ on-site foto/reel op de dag.

**Beste posttijden (NL horeca):** feed 12:00 of 18:00 · stories ±11:00/±17:00/±20:00 ·
TikTok/Reels 18:00–20:00 · Google 1x/week 's ochtends.

## Werkwijze / rolverdeling

- **Jonathan** — planning, goedkeuring, stories live op de dag.
- **Contentmaker** — maakt de reels + foto's (krijgt de shotlist uit de weekplanning).
- **Claude** — captions schrijven + als Idee in Buffer zetten en inplannen.

Stories (met poll/muziek/sticker) en Google Bedrijfsprofiel = handmatig op de dag.
Automatisch posten van reels/stories werkt alleen met een zakelijk IG-account
gekoppeld aan een Facebook-pagina.

## Status (laatst bijgewerkt: 2026-08-10)

- [x] Buffer-kanalen gekoppeld (Essentials).
- [x] Weekplanning-systeem + ideeënbank opgezet (zie `content/` en `exports/`).
- [x] Captions week 11–16 aug als **Ideeën** in Buffer gezet (11 stuks, nog zonder media).
- [ ] Foto's/video's van de contentmaker toevoegen aan de Buffer-ideeën.
- [ ] Ideeën omzetten naar ingeplande posts (dag + tijd) per kanaal.
- [ ] Google Bedrijfsprofiel-post inrichten (handmatig, los van Buffer).

## Next steps voor Claude Code

1. Nieuwe week? Kopieer `content/weekplanning.md`, vul onderwerpen uit `ideeenbank.md`.
2. Schrijf captions (stijl: warm, Nederlands, Surinaams eten, emoji spaarzaam,
   hashtags zoals `#QualityTrukipan #Presikhaaf #Arnhem #SurinaamsEten #Trukipan`).
3. Zet ze via `mcp__buffer__create_idea` klaar (org-id hierboven), met in de titel:
   `ONDERDEEL · Dag datum tijd · Kanaal · TYPE`.
4. Zodra media er is: idee → post inplannen op de juiste dag/tijd en kanaal.
