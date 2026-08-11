# Ontwerp — Social media systeem vanaf september 2026

**Datum:** 10 augustus 2026
**Status:** goedgekeurd door Jonathan, klaar voor uitvoeringsplan

## Waarom

Het bestaande weekritme-systeem loopt vast: elke week opnieuw bedenken wát er gepost
moet worden, terwijl er geen beeldvoorraad ligt. De ideeën voor 11–16 augustus staan
sinds 10 augustus zonder media stil in Buffer.

Daarom een herstart per **1 september 2026** (een dinsdag, meteen een open dag), met een
andere motor eronder: eerst voorraad, dan pas posten.

## Doelen

In volgorde van belang:

1. Meer gasten in het restaurant, vooral op de rustige dagen
2. Meer boekingen en aanloop voor de foodtruck
3. Naamsbekendheid in Arnhem

Quality Sauce & Toppings stuurt naar de webshop én naar verkoop in de zaak en bij de truck.

## Scope

Drie merken, acht kanalen.

| Merk | Kanalen | Actief |
|---|---|---|
| Quality Trukipan Presikhaaf (restaurant) | Instagram, TikTok | di t/m zo |
| Quality Trukipan (foodtruck) | Instagram, TikTok, Facebook | do + za |
| Quality Sauce & Toppings | Instagram, TikTok, Facebook | ma + vr |

Buffer-organisatie: **Quality empire** (`6a2d69cf3d34f01dcdb6401f`), plan Essentials,
tijdzone Europe/Amsterdam. Kanaal-IDs staan in `CLAUDE.md`.

## Aanpak: voorraadmodel met vaste rubrieken

Twee keuzes vormen samen het systeem.

**Voorraad boven versheid.** Eén grote shootdag in augustus levert de beeldvoorraad voor
de hele maand. Daarna is posten een kwestie van koppelen en inplannen, niet van jagen op
content. Prijs: de beelden worden richting week vier herkenbaar. Dat weegt niet op tegen
het alternatief, dat aantoonbaar niet volgehouden wordt.

**Vaste rubriek per weekdag.** Elke dag heeft een vast onderwerp. Niemand bedenkt nog
"wat posten we vandaag" — alleen nog wélk gerecht. Dat maakt de shotlist bijna
automatisch en houdt de captions consistent.

De overwogen alternatieven — week voor week plannen (het huidige systeem) en een
maandthema of campagne — vielen af: het eerste is precies wat nu vastloopt, het tweede
past slecht bij foodtruck-locaties die per week verschillen.

## Weekritme

### Restaurant — Quality Trukipan Presikhaaf

| Dag | Tijd | Kanaal | Type | Rubriek |
|---|---|---|---|---|
| Di | 12:00 | Instagram | Foto | Bord van de week |
| Wo | 18:00 | Instagram + TikTok | Reel | In de keuken — van pan tot bord |
| Do | 17:30 | Instagram | Foto | Avondsfeer |
| Vr | 12:00 | Instagram | Foto | Pairing — drink + gerecht |
| Za | 12:30 | Instagram | Foto | De klassieker |
| Za | 18:00 | Instagram + TikTok | Reel | Zaterdagavond |
| Zo | 12:30 | Instagram | Foto | Zondagbord |

### Foodtruck — Quality Trukipan

| Dag | Tijd | Kanaal | Type | Rubriek |
|---|---|---|---|---|
| Do | 10:00 | Instagram + Facebook | Foto | Locatie-reveal |
| Do | 13:00 | Instagram + TikTok | Reel | On-site — bestseller |
| Za | 10:00 | Instagram + Facebook | Foto | Locatie-reveal |
| Za | 13:00 | Instagram | Foto | Drukte als social proof |

### Quality Sauce & Toppings

| Dag | Tijd | Kanaal | Type | Rubriek |
|---|---|---|---|---|
| Ma | 17:00 | Instagram + Facebook | Foto | Fles in beeld, link naar webshop |
| Vr | 18:00 | Instagram + TikTok | Reel | Saus in gebruik — geknipt uit de restaurant-reel van woensdag |

Maandag is het restaurant dicht; die dag is daarom van de saus. De vrijdag-reel is
hergebruik van woensdag, met een ander fragment en een andere caption.

### Stories

Eén kale story per open dag: beeld met tekst erin, geen muzieksticker, poll of link.
Kaal betekent dat Buffer ze automatisch publiceert.

## September 2026 in cijfers

September begint op dinsdag 1 en eindigt op woensdag 30. Vier volle weken
(1–6, 7–13, 14–20, 21–27) plus maandag 28 tot en met woensdag 30.

| Merk | Contentmomenten |
|---|---|
| Restaurant | 30 |
| Foodtruck | 16 |
| Sauce & Toppings | 8 |
| **Totaal** | **54** |

Dit zijn contentmomenten (rijen in het maandplan), geen Buffer-posts: 29 van de 54
gaan naar twee kanalen (bijvoorbeeld Instagram + TikTok), en elk kanaal krijgt een
eigen `create_post`-aanroep. In Buffer worden 54 contentmomenten dus 83 posts
(54 + 29).

Daarvan zijn 13 reels die echt gefilmd moeten worden (9 restaurant, 4 foodtruck); de
sauce-reels komen uit restaurant-materiaal.

## Shootdag

Eén dag in augustus, op een donderdag of zaterdag zodat de truck ook staat.

| Blok | Tijd | Wat | Levert |
|---|---|---|---|
| 1 · Truck op locatie | 09:00–12:00 | Opbouw-timelapse, bestseller, rij/drukte, locatiebeeld | 4 reels + 16 stills |
| 2 · Keuken | 12:30–15:30 | 8 gerechten van pan tot bord, elk 20–30 seconden | 8 reels |
| 3 · Gerechten stills | 15:30–17:00 | Diezelfde 8 gerechten, twee hoeken, daglicht | 16 stills |
| 4 · Pairing | 17:00–17:45 | Drie drinks naast een gerecht | 6 stills |
| 5 · Sfeer en team | 18:00–19:30 | Timelapse vanaf vast standpunt, rustig naar vol; gedekte zaak, avondlicht, chef, team | 10 stills + 4 reels |
| 6 · Sauce | 19:30–20:15 | Flessen los, in de hand, giet-shot op het bord | 8 stills + 1 reel |

Ruwe opbrengst: 17 reels en ongeveer 56 stills. Dat dekt de 13 nodige reels precies: 5
keukenreels en 4 zaterdagavondreels voor het restaurant (samen 9) en 4 voor de truck. De
sauce-reel uit blok 6 en de 3 extra keukenreels zijn reserve.

**Datum shootdag:** wordt vastgelegd zodra de contentmakers reageren. Uiterste datum is
zaterdag 22 augustus 2026 — later haalt de levering van 28 augustus het niet.

### Repurposeregels

Vast, zodat er per week niets te beslissen valt:

- Elke reel levert 3 losse stills (coverframe, detail, procesbeeld) en 2 stories
- Elke reel gaat ook naar TikTok, met een eigen caption en hashtags
- De restaurant-reel van woensdag levert vrijdag de sauce-versie
- Een goed lopende post mag na acht weken terugkomen

## Contentbank

Beeldbestanden staan niet in git. In de repo staat alleen de index:
`content/contentbank.md`, met per bestand de naam, het merk, het type, het onderwerp, de
datum waarop het gebruikt is en de status. Zo is in één oogopslag te zien wat nog
ongebruikt is.

Bestandsnaamconventie:

```
MERK_TYPE_ONDERWERP_NR.ext      REST_REEL_pom_01.mp4 · SAUCE_FOTO_fles_03.jpg
```

Merk is `REST`, `TRUCK` of `SAUCE`. Type is `REEL`, `FOTO` of `STORY`.

**Besloten op 11 augustus 2026.** Buffer accepteert media uitsluitend via een directe
bestands-URL. Daarvoor staat een Cloudflare R2-bucket klaar, `quality-trukipan-media`,
met publieke toegang op `https://pub-45b4de13a5a44d21a27e6ebf505bfc5b.r2.dev` en één map
per maand (`2026-09/`). De bestandsnaam bepaalt de link, dus koppelen kan zonder dat er
iemand aan te pas komt.

De contentmakers krijgen geen toegang tot die bucket. Zij leveren aan via de dienst die
zij gewend zijn, met de afgesproken bestandsnamen; Claude zet de bestanden er daarna zelf
in. Zo hoeven er geen sleutels gedeeld te worden en blijft de toegang tot de opslag
beperkt tot het account van de zaak.

## Publicatie-instellingen

Beide Instagram-accounts zijn Professional Accounts en staan niet op herinneringen
(gecontroleerd op 10 augustus 2026). Feed-posts en reels publiceren dus automatisch.

- **Automatisch** — alle feed-posts, reels en kale stories, op alle acht kanalen
- **Herinnering** — alleen reels die op een trending sound uit de Instagram-app moeten;
  maximaal twee per maand
- **Muziek** — audio die al in het videobestand zit publiceert automatisch. Contentmakers
  gebruiken rechtenvrije of gelicentieerde muziek (Epidemic Sound, Artlist, CapCut-bibliotheek);
  commerciële tracks kunnen door Instagram gedempt worden of bereik kosten
- **Google Bedrijfsprofiel** — kanaal is niet gekoppeld in Buffer; blijft voorlopig buiten
  het systeem

## Rolverdeling

| Wie | Wat |
|---|---|
| Jonathan | Eén keer per maand de batch goedkeuren. Verder niets. |
| Contentmakers | Beeld leveren volgens de briefing, vóór de 28e van de maand ervoor. |
| Claude | Maandplan, captions, beeld koppelen, posts inplannen in Buffer, index bijhouden, briefing schrijven, maandevaluatie. |

De maandelijkse goedkeuring blijft staan: ingeplande posts gaan echt naar buiten onder de
naam van de zaak. De hele batch gaat in één bericht langs Jonathan voordat er iets
ingepland wordt.

## Maandcyclus

| Wanneer | Wat |
|---|---|
| 20e | Plan en captions voor de volgende maand klaar; briefing naar de contentmakers |
| 20e–27e | Contentmakers schieten en leveren |
| 28e | Alles in Buffer, batch ter goedkeuring naar Jonathan, daarna inplannen |
| 1e | De maand loopt |
| Laatste dag | Evaluatie: welke rubrieken liepen het best, welke wordt vervangen |

## Bestanden in de repo

| Bestand | Inhoud |
|---|---|
| `content/september-2026.md` | Elke dag van de maand: datum, tijd, kanaal, type, rubriek, onderwerp, beeld |
| `content/captions-september-2026.md` | Alle 54 captions, per week gegroepeerd |
| `content/contentbank.md` | Index van alle beelden |
| `content/briefing-contentmakers.md` | Shotlist, deadline, aanleverformaat, bestandsnamen |
| `content/maandroutine.md` | De maandcyclus, zodat het ook zonder Claude te volgen is |
| `CLAUDE.md` | Bijwerken: organisatienaam is Quality empire, nieuw systeem, nieuwe rolverdeling |

Bestaand: `content/weekplanning.md` en `content/ideeenbank.md` blijven staan als naslag.
`content/captions-week-2026-08-11.md` hoort bij het oude ritme en wordt niet voortgezet.

## Meten

Eén keer per maand, aan het eind: via Buffer per rubriek kijken naar bereik en opslaan.
De zwakst lopende rubriek wordt de maand erop vervangen door een idee uit `ideeenbank.md`.
Niet vaker meten — bij kleinere accounts is weekdata vooral ruis.

## Wat we niet doen

- Geen dagelijkse cijfers of dashboards
- Geen stories met polls, muzieksticker of links, behalve als iemand ze zelf plaatst
- Geen Google Bedrijfsprofiel in het systeem zolang het kanaal niet in Buffer zit
- Geen advertenties; dit ontwerp gaat alleen over organische content
