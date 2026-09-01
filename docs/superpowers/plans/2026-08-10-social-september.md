# Social media september 2026 — Uitvoeringsplan

> **Voor agentic workers:** REQUIRED SUB-SKILL: gebruik superpowers:subagent-driven-development (aanbevolen) of superpowers:executing-plans om dit plan taak voor taak uit te voeren. Stappen gebruiken checkbox-syntax (`- [ ]`).

**Doel:** De hele maand september 2026 aan social media vooraf klaarzetten — plan, captions, briefing en ingeplande posts in Buffer — zodat Jonathan alleen nog één batch hoeft goed te keuren.

**Aanpak:** Alles is markdown in deze repo, behalve de posts zelf die via de Buffer MCP-server worden aangemaakt. Eerst het kalenderplan (de bron van waarheid), dan de captions die eraan hangen, dan de ondersteunende documenten, en als laatste de Buffer-inplanning. Elke taak eindigt met een controle die te tellen of te lezen is, en een commit.

**Gereedschap:** Markdown, git, Buffer MCP-server (`mcp__314956a2-26ae-492c-a00f-a59f84a522de__*`), bash voor tellingen.

## Global Constraints

- Buffer-organisatie: **Quality empire**, `organizationId: 6a2d69cf3d34f01dcdb6401f`, tijdzone `Europe/Amsterdam`
- Kanaal-IDs (exact, nooit raden):
  - Foodtruck Instagram `6a7a27f7b2d9d577435144a4` · TikTok `6a7a2870b2d9d577435146c6` · Facebook `6a7a2926b2d9d577435149a0`
  - Restaurant Instagram `6a7a28b4b2d9d577435147db` · TikTok `6a7a246bb2d9d5774351333e`
  - Sauce Instagram `6a2d6a8c38b5579345903152` · Facebook `6a2d6b2f38b5579345903373` · TikTok `6a2d6b6338b557934590342b`
- September 2026: 1 sept = dinsdag, 30 sept = woensdag. Maandagen: 7, 14, 21, 28
- Totaal 54 contentmomenten: 30 restaurant, 16 foodtruck, 8 sauce. Een contentmoment
  dat naar twee kanalen gaat is in Buffer twee aparte `create_post`-aanroepen (twee
  posts); 29 van de 54 contentmomenten gaan naar twee kanalen, dus dat wordt
  samen 83 posts in Buffer
- Captionstijl: warm, Nederlands, emoji spaarzaam, vaste hashtagsets per merk
- Vaste hashtags restaurant: `#QualityTrukipan #Presikhaaf #Arnhem #AntilliaanseBBQ #Trukipan`
- Vaste hashtags foodtruck: `#QualityTrukipan #Foodtruck #StreetFood #AntilliaanseBBQ #Arnhem`
- Vaste hashtags sauce: `#QualitySauce #AntilliaanseBBQ #Saus #Arnhem`
- Bestandsnamen beeld: `MERK_TYPE_ONDERWERP_NR.ext`, merk is `REST`/`TRUCK`/`SAUCE`, type is `REEL`/`FOTO`/`STORY`
- Alles publiceert automatisch (`schedulingType: "automatic"`), behalve maximaal twee trending-sound reels per maand
- Niets wordt in Buffer ingepland zonder expliciete goedkeuring van Jonathan op de complete batch

## Bestandsstructuur

| Bestand | Verantwoordelijkheid |
|---|---|
| `content/september-2026.md` | Bron van waarheid: elke post met datum, tijd, kanaal, type, rubriek, onderwerp, beeldbestand |
| `content/captions-september-2026.md` | De 54 captions, gegroepeerd per week, één op één te koppelen aan het maandplan |
| `content/contentbank.md` | Index van alle beelden uit de shootdag: naam, merk, type, onderwerp, gebruikt op, status |
| `content/briefing-contentmakers.md` | Shotlist, draaiboek shootdag, deadlines, aanleverformaat, muziekregels |
| `content/maandroutine.md` | De maandcyclus, navolgbaar zonder Claude |
| `CLAUDE.md` | Bijgewerkte context: organisatienaam, nieuw systeem, nieuwe rolverdeling |
| `README.md` | Bijgewerkt: verwijst naar het nieuwe systeem in plaats van het weekritme |

---

### Taak 1: Maandplan september 2026

De kalender is de bron van waarheid; alle latere taken hangen eraan. Fouten hier planten zich voort, dus de controle is een telling per merk.

**Bestanden:**
- Aanmaken: `content/september-2026.md`

**Interfaces:**
- Levert: één tabel met kolommen `Datum | Dag | Tijd | Merk | Kanaal | Type | Rubriek | Onderwerp | Beeld | Status`. Taak 2 verwijst per caption naar `Datum + Tijd + Merk`. Taak 3 vult de kolom `Beeld` met bestandsnamen. Taak 7 leest `Datum`, `Tijd`, `Kanaal` en `Type` om posts aan te maken.

- [ ] **Stap 1: Schrijf de kop en de weekindeling**

```markdown
# Maandplan september 2026

Bron van waarheid voor de maand. Captions staan in `captions-september-2026.md`,
beelden in `contentbank.md`. Status is `Gepland`, `In Buffer` of `Geplaatst`.

September 2026 begint op dinsdag 1 en eindigt op woensdag 30.
Volle weken: 1–6, 7–13, 14–20, 21–27. Slot: 28–30.

Totaal 54 contentmomenten — 30 restaurant, 16 foodtruck, 8 sauce. Daarvan gaan
er 29 naar twee kanalen (elk een eigen `create_post`-aanroep), dus in Buffer
worden dit 83 posts.
```

- [ ] **Stap 2: Vul week 1 (di 1 t/m zo 6 september)**

Elke rij volgt het weekritme uit de spec. Week 1 heeft geen maandag, dus geen sauce-foto.

```markdown
## Week 1 — di 1 t/m zo 6 september

| Datum | Dag | Tijd | Merk | Kanaal | Type | Rubriek | Onderwerp | Beeld | Status |
|---|---|---|---|---|---|---|---|---|---|
| 01-09 | di | 12:00 | Restaurant | Instagram | Foto | Bord van de week | [gerecht] | | Gepland |
| 02-09 | wo | 18:00 | Restaurant | Instagram + TikTok | Reel | In de keuken | [gerecht] van pan tot bord | | Gepland |
| 03-09 | do | 10:00 | Foodtruck | Instagram + Facebook | Foto | Locatie-reveal | [locatie] | | Gepland |
| 03-09 | do | 13:00 | Foodtruck | Instagram + TikTok | Reel | On-site bestseller | Bestseller bij de truck | | Gepland |
| 03-09 | do | 17:30 | Restaurant | Instagram | Foto | Avondsfeer | Sfeerbeeld avond | | Gepland |
| 04-09 | vr | 12:00 | Restaurant | Instagram | Foto | Pairing | [drink] + [gerecht] | | Gepland |
| 04-09 | vr | 18:00 | Sauce | Instagram + TikTok | Reel | Saus in gebruik | Uit reel van 02-09 | | Gepland |
| 05-09 | za | 10:00 | Foodtruck | Instagram + Facebook | Foto | Locatie-reveal | [locatie] | | Gepland |
| 05-09 | za | 12:30 | Restaurant | Instagram | Foto | De klassieker | [gerecht] | | Gepland |
| 05-09 | za | 13:00 | Foodtruck | Instagram | Foto | Drukte | Rij bij de truck | | Gepland |
| 05-09 | za | 18:00 | Restaurant | Instagram + TikTok | Reel | Zaterdagavond | Sfeer in de zaak | | Gepland |
| 06-09 | zo | 12:30 | Restaurant | Instagram | Foto | Zondagbord | [gerecht] | | Gepland |
```

- [ ] **Stap 3: Vul week 2 (ma 7 t/m zo 13 september)**

Volle week: begint met de sauce-foto op maandag. Zelfde rijenvolgorde als week 1, met de maandagrij erbij.

```markdown
## Week 2 — ma 7 t/m zo 13 september

| Datum | Dag | Tijd | Merk | Kanaal | Type | Rubriek | Onderwerp | Beeld | Status |
|---|---|---|---|---|---|---|---|---|---|
| 07-09 | ma | 17:00 | Sauce | Instagram + Facebook | Foto | Fles in beeld | Fles + webshoplink | | Gepland |
| 08-09 | di | 12:00 | Restaurant | Instagram | Foto | Bord van de week | [gerecht] | | Gepland |
| 09-09 | wo | 18:00 | Restaurant | Instagram + TikTok | Reel | In de keuken | [gerecht] van pan tot bord | | Gepland |
| 10-09 | do | 10:00 | Foodtruck | Instagram + Facebook | Foto | Locatie-reveal | [locatie] | | Gepland |
| 10-09 | do | 13:00 | Foodtruck | Instagram + TikTok | Reel | On-site bestseller | Bestseller bij de truck | | Gepland |
| 10-09 | do | 17:30 | Restaurant | Instagram | Foto | Avondsfeer | Sfeerbeeld avond | | Gepland |
| 11-09 | vr | 12:00 | Restaurant | Instagram | Foto | Pairing | [drink] + [gerecht] | | Gepland |
| 11-09 | vr | 18:00 | Sauce | Instagram + TikTok | Reel | Saus in gebruik | Uit reel van 09-09 | | Gepland |
| 12-09 | za | 10:00 | Foodtruck | Instagram + Facebook | Foto | Locatie-reveal | [locatie] | | Gepland |
| 12-09 | za | 12:30 | Restaurant | Instagram | Foto | De klassieker | [gerecht] | | Gepland |
| 12-09 | za | 13:00 | Foodtruck | Instagram | Foto | Drukte | Rij bij de truck | | Gepland |
| 12-09 | za | 18:00 | Restaurant | Instagram + TikTok | Reel | Zaterdagavond | Sfeer in de zaak | | Gepland |
| 13-09 | zo | 12:30 | Restaurant | Instagram | Foto | Zondagbord | [gerecht] | | Gepland |
```

- [ ] **Stap 4: Vul week 3 en week 4**

Identiek aan week 2, met de datums verschoven. Week 3: ma 14, di 15, wo 16, do 17, vr 18, za 19, zo 20. Week 4: ma 21, di 22, wo 23, do 24, vr 25, za 26, zo 27. De sauce-reel op vrijdag verwijst steeds naar de restaurant-reel van de woensdag ervoor (18-09 verwijst naar 16-09, 25-09 naar 23-09).

- [ ] **Stap 5: Vul het slot (ma 28 t/m wo 30 september)**

Geen donderdag of zaterdag, dus geen foodtruck.

```markdown
## Slot — ma 28 t/m wo 30 september

| Datum | Dag | Tijd | Merk | Kanaal | Type | Rubriek | Onderwerp | Beeld | Status |
|---|---|---|---|---|---|---|---|---|---|
| 28-09 | ma | 17:00 | Sauce | Instagram + Facebook | Foto | Fles in beeld | Fles + webshoplink | | Gepland |
| 29-09 | di | 12:00 | Restaurant | Instagram | Foto | Bord van de week | [gerecht] | | Gepland |
| 30-09 | wo | 18:00 | Restaurant | Instagram + TikTok | Reel | In de keuken | [gerecht] van pan tot bord | | Gepland |
```

- [ ] **Stap 6: Voeg de storytabel toe**

Stories tellen niet mee in de 54 contentmomenten en krijgen geen eigen regel per dag. Eén vaste
tabel onderaan het bestand volstaat, want ze draaien op hergebruikte frames uit de reels.

```markdown
## Stories

Eén kale story per open dag: beeld met tekst erin, geen muzieksticker, poll of link.
Kaal betekent dat Buffer ze automatisch publiceert. Beelden komen uit de reels van die
week — per reel twee stills die als story doorgaan.

| Dag | Tijd | Merk | Bron |
|---|---|---|---|
| di | 17:00 | Restaurant | Frame uit de reel van woensdag ervoor |
| wo | 11:00 | Restaurant | Frame uit de keukenreel van die dag |
| do | 10:00 | Foodtruck | Frame uit het locatiebeeld |
| vr | 17:00 | Restaurant | Frame uit de pairingfoto |
| za | 20:00 | Restaurant | Frame uit de zaterdagavondreel |
| zo | 20:00 | Restaurant | Beste beeld van die week opnieuw |
```

- [ ] **Stap 7: Controleer de tellingen**

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && awk -F'|' '/^\| [0-9]{2}-09/ {gsub(/ /,"",$5); print $5}' content/september-2026.md | sort | uniq -c
```

Verwacht exact:
```
  16 Foodtruck
  30 Restaurant
   8 Sauce
```

Wijkt het af, dan ontbreekt of dubbelt er een rij. Vergelijk per week met het ritme uit de spec voordat je verder gaat. De storytabel telt niet mee, want die regels beginnen niet met een datum.

- [ ] **Stap 8: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/september-2026.md && git commit -m "content: maandplan september 2026 met 54 posts"
```

---

### Taak 2: Captions voor de hele maand

**Bestanden:**
- Aanmaken: `content/captions-september-2026.md`

**Interfaces:**
- Gebruikt: `content/september-2026.md` — elke caption hoort bij precies één rij, herkenbaar aan `Datum + Tijd + Merk`
- Levert: 54 captions onder kopjes in het vaste formaat `**DD-09 · HH:MM · MERK · KANAAL · TYPE**`, gevolgd door de captiontekst en de hashtagregel. Taak 7 kopieert deze teksten letterlijk naar Buffer.

- [ ] **Stap 1: Schrijf de kop en de stijlregels**

```markdown
# Captions september 2026

Hoort één op één bij `september-2026.md`. `[...]` wordt ingevuld met het
gerecht, de drink of de locatie van die week.

Stijl: warm, Nederlands, emoji spaarzaam. Captions eindigen op een uitnodiging
(langskomen, reserveren, bestellen), niet op een uitroepteken alleen.
```

- [ ] **Stap 2: Schrijf de zeven restaurant-rubrieken uit als sjabloon**

Per rubriek drie varianten, zodat vier weken niet identiek klinken. Voor Bord van de week:

```markdown
**Bord van de week — variant A**
> Nieuwe week, nieuw bord: [gerecht]. Vers gemaakt, precies zoals het hoort. Kom langs in Presikhaaf.
> #QualityTrukipan #Presikhaaf #Arnhem #AntilliaanseBBQ #Curacao #Trukipan

**Bord van de week — variant B**
> Dit staat deze week op je bord: [gerecht] 😋 Reserveren kan, aanschuiven mag ook.
> #QualityTrukipan #Presikhaaf #Arnhem #AntilliaanseBBQ #Curacao #Trukipan

**Bord van de week — variant C**
> [gerecht], zoals wij 'm maken. Dinsdag is een prima dag om 'm te proberen.
> #QualityTrukipan #Presikhaaf #Arnhem #AntilliaanseBBQ #Curacao #Trukipan
```

Doe hetzelfde voor: In de keuken, Avondsfeer, Pairing, De klassieker, Zaterdagavond, Zondagbord.

- [ ] **Stap 3: Schrijf de foodtruck- en sauce-rubrieken uit**

Vier foodtruck-rubrieken (Locatie-reveal donderdag, On-site bestseller, Locatie-reveal zaterdag, Drukte) en twee sauce-rubrieken (Fles in beeld, Saus in gebruik), elk drie varianten. Locatie-captions krijgen een extra variant zonder adres, voor als de locatie niet op tijd bekend is:

```markdown
**Locatie-reveal — variant zonder adres**
> Vandaag staan we op onze vaste plek 🔥 Tijden vind je in de story. Kom langs voor verse trukipan.
> #QualityTrukipan #Foodtruck #StreetFood #AntilliaanseBBQ #Curacao #Arnhem
```

- [ ] **Stap 4: Zet de captions per week uit**

Loop het maandplan af en schrijf per rij het definitieve blok. Wissel de varianten af: week 1 gebruikt A, week 2 B, week 3 C, week 4 opnieuw A. Formaat:

```markdown
## Week 1 — di 1 t/m zo 6 september

**01-09 · 12:00 · RESTAURANT · Instagram · FOTO**
> Nieuwe week, nieuw bord: [gerecht]. Vers gemaakt, precies zoals het hoort. Kom langs in Presikhaaf.
> #QualityTrukipan #Presikhaaf #Arnhem #AntilliaanseBBQ #Curacao #Trukipan
```

TikTok-captions komen als aparte regel onder de post, korter en met minder hashtags:

```markdown
> TikTok: [gerecht] van pan tot bord 🔥 #QualityTrukipan #AntilliaanseBBQ #Arnhem
```

- [ ] **Stap 5: Controleer het aantal captions**

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && grep -c '^\*\*[0-9]\{2\}-09 ·' content/captions-september-2026.md
```

Verwacht: `54`

- [ ] **Stap 6: Controleer dat elke planregel een caption heeft**

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && diff <(awk -F'|' '/^\| [0-9]{2}-09/ {gsub(/ /,"",$2); gsub(/ /,"",$4); print $2"-"$4}' content/september-2026.md | sort) <(grep '^\*\*[0-9]\{2\}-09 ·' content/captions-september-2026.md | sed 's/\*\*//g' | awk -F' · ' '{print $1"-"$2}' | sort) && echo "SLUITEND"
```

Verwacht: `SLUITEND` zonder diff-regels. Verschillen betekenen een caption zonder planregel of andersom.

- [ ] **Stap 7: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/captions-september-2026.md && git commit -m "content: 54 captions voor september 2026"
```

---

### Taak 3: Contentbank-index

**Bestanden:**
- Aanmaken: `content/contentbank.md`

**Interfaces:**
- Levert: tabel met kolommen `Bestand | Merk | Type | Onderwerp | Gebruikt op | Status`. Taak 4 verwijst naar de naamconventie hierin. Taak 7 leest de kolom `Bestand` om media aan posts te koppelen.

- [ ] **Stap 1: Schrijf de kop met de naamconventie**

```markdown
# Contentbank

Index van al het beeldmateriaal. De bestanden zelf staan niet in git.

Naamconventie: `MERK_TYPE_ONDERWERP_NR.ext`
Merk: `REST` (restaurant) · `TRUCK` (foodtruck) · `SAUCE`
Type: `REEL` · `FOTO` · `STORY`
Voorbeeld: `REST_REEL_karni_01.mp4` · `SAUCE_FOTO_fles_03.jpg`

Status: `Nieuw` (ongebruikt) · `Ingepland` · `Geplaatst` · `Afgevoerd`
```

- [ ] **Stap 2: Zet de verwachte opbrengst van de shootdag als lege rijen klaar**

Uit de spec: 14 reels en ongeveer 48 stills. Zet de rijen alvast klaar met de verwachte namen, zodat invullen na de shootdag alleen nog aanvullen is.

```markdown
| Bestand | Merk | Type | Onderwerp | Gebruikt op | Status |
|---|---|---|---|---|---|
| TRUCK_REEL_opbouw_01.mp4 | TRUCK | REEL | Opbouw-timelapse | | Nieuw |
| TRUCK_REEL_bestseller_01.mp4 | TRUCK | REEL | Bestseller close-up | | Nieuw |
| TRUCK_REEL_drukte_01.mp4 | TRUCK | REEL | Rij bij de truck | | Nieuw |
| TRUCK_REEL_locatie_01.mp4 | TRUCK | REEL | Locatiebeeld | | Nieuw |
| REST_REEL_gerecht_01.mp4 | REST | REEL | Gerecht 1 van pan tot bord | | Nieuw |
```

Vul door tot `REST_REEL_gerecht_08.mp4`, plus `REST_REEL_sfeer_01.mp4` en `SAUCE_REEL_giet_01.mp4`. Doe hetzelfde voor de stills: `REST_FOTO_gerecht_01` t/m `_16`, `REST_FOTO_pairing_01` t/m `_06`, `REST_FOTO_sfeer_01` t/m `_10`, `TRUCK_FOTO_onsite_01` t/m `_08`, `SAUCE_FOTO_fles_01` t/m `_08`.

- [ ] **Stap 3: Voeg de repurposeregels toe onderaan**

```markdown
## Repurposeregels

- Elke reel levert 3 losse stills (coverframe, detail, procesbeeld) en 2 stories
- Elke reel gaat ook naar TikTok, met een eigen caption
- De restaurant-reel van woensdag levert vrijdag de sauce-versie
- Een goed lopende post mag na acht weken terugkomen
```

- [ ] **Stap 4: Controleer het aantal rijen**

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && grep -c '^| [A-Z]\{4,5\}_' content/contentbank.md
```

Verwacht: `62` (14 reels + 48 stills)

- [ ] **Stap 5: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/contentbank.md && git commit -m "content: contentbank-index met naamconventie"
```

---

### Taak 4: Briefing voor de contentmakers

Dit is het enige document dat de deur uit gaat. Het moet los te lezen zijn, zonder de rest van de repo.

**Bestanden:**
- Aanmaken: `content/briefing-contentmakers.md`

**Interfaces:**
- Gebruikt: het draaiboek en de naamconventie uit de spec en uit `contentbank.md`
- Levert: een document dat als geheel doorgestuurd kan worden

- [ ] **Stap 1: Schrijf de kop met deadlines**

```markdown
# Briefing contentmakers — september 2026

**Shootdag:** [datum], een donderdag of zaterdag zodat de foodtruck ook staat.
Uiterste datum: zaterdag 22 augustus 2026.
**Aanleveren:** uiterlijk vrijdag 28 augustus 2026.
**Waarvoor:** de complete social media van september — 54 contentmomenten over drie
merken, samen goed voor 83 posts omdat een deel naar twee kanalen gaat.
```

- [ ] **Stap 2: Neem het draaiboek van de shootdag over**

De zes blokken uit de spec, met tijden en opbrengst per blok. Neem de tabel letterlijk over uit `docs/superpowers/specs/2026-08-10-social-september-design.md`.

- [ ] **Stap 3: Schrijf het aanleverformaat**

```markdown
## Aanleveren

- Reels: verticaal 9:16, minimaal 1080x1920, MP4
- Foto's: liefst vierkant of 4:5, minimaal 1440px op de korte zijde, JPG
- Bestandsnamen: `MERK_TYPE_ONDERWERP_NR.ext` — `REST` / `TRUCK` / `SAUCE`,
  `REEL` / `FOTO` / `STORY`. Voorbeeld: `REST_REEL_karni_01.mp4`
- Muziek: gebruik rechtenvrije of gelicentieerde audio (Epidemic Sound, Artlist,
  de gratis bibliotheek van CapCut). Muziek die al in het bestand zit is prima —
  Instagram kan commerciële tracks dempen of het bereik knijpen
- Lever geen muzieksticker of tekst-in-app aan: tekst mag ingebrand, stickers niet
```

- [ ] **Stap 4: Voeg de shotlist per rubriek toe**

Koppel de rubrieken aan wat er precies geschoten moet worden, zodat de makers weten waar elk beeld terechtkomt:

```markdown
| Rubriek | Wat we nodig hebben | Aantal |
|---|---|---|
| Bord van de week | Gerecht bovenaanzicht, daglicht, schone rand | 5 foto's |
| In de keuken | Bereiding tot bord, 20–30 sec, korte shots | 5 reels |
| Avondsfeer | Zaak bij avondlicht, mensen onherkenbaar of met toestemming | 4 foto's |
| Pairing | Drink naast gerecht in één kader | 4 foto's |
| De klassieker | Close-up plating | 4 foto's |
| Zaterdagavond | Timelapse van rustig naar vol, vast standpunt | 4 reels |
| Zondagbord | Gerecht van de dag | 4 foto's |
| Foodtruck locatie | Truck met omgeving herkenbaar | 8 foto's |
| Foodtruck on-site | Opbouw, bestseller, rij | 4 reels + 8 foto's |
| Sauce | Fles los, in de hand, giet-shot op het bord | 8 foto's + 1 reel |
```

- [ ] **Stap 5: Controleer dat het document los leesbaar is**

Lees het document van boven naar beneden alsof je de contentmaker bent. Elke verwijzing naar een ander bestand in de repo is een fout — die moet vervangen worden door de inhoud zelf.

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && grep -n '\.md\|contentbank\|september-2026' content/briefing-contentmakers.md || echo "GEEN INTERNE VERWIJZINGEN"
```

Verwacht: `GEEN INTERNE VERWIJZINGEN`

- [ ] **Stap 6: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/briefing-contentmakers.md && git commit -m "content: briefing contentmakers september"
```

---

### Taak 5: Maandroutine

**Bestanden:**
- Aanmaken: `content/maandroutine.md`

**Interfaces:**
- Levert: de herhaalbare cyclus, met verwijzingen naar de bestanden uit taak 1 t/m 4

- [ ] **Stap 1: Schrijf de cyclus uit**

```markdown
# Maandroutine

Elke maand hetzelfde. Data zijn hard: de 20e en de 28e.

| Wanneer | Wie | Wat |
|---|---|---|
| 20e | Claude | Maandplan en captions voor de volgende maand klaar; briefing naar de contentmakers |
| 20e–27e | Contentmakers | Schieten en leveren |
| 28e | Claude | Alles in Buffer, batch ter goedkeuring naar Jonathan |
| 28e | Jonathan | Eén keer akkoord op de hele batch |
| 28e | Claude | Na akkoord inplannen op dag en tijd |
| 1e | — | De maand loopt |
| Laatste dag | Claude | Evaluatie: welke rubrieken liepen het best, welke wordt vervangen |
```

- [ ] **Stap 2: Schrijf op hoe een nieuwe maand gemaakt wordt**

```markdown
## Nieuwe maand maken

1. Kopieer `september-2026.md` naar `<maand>-<jaar>.md` en schuif de datums op.
   Let op welke weekdag de 1e is en of er extra maandagen of zaterdagen bijkomen.
2. Kopieer `captions-september-2026.md` en wissel de varianten door: gebruikte
   de vorige maand A-B-C-A, begin dan met B.
3. Werk `contentbank.md` bij: alles op `Geplaatst` dat de maand ervoor gebruikt is.
4. Pas de datums in `briefing-contentmakers.md` aan en stuur 'm door.
5. Vervang de zwakst lopende rubriek door een idee uit `ideeenbank.md`.
```

- [ ] **Stap 3: Schrijf de evaluatie-instructie**

```markdown
## Evaluatie aan het eind van de maand

Haal via Buffer per post het bereik en het aantal opgeslagen items op.
Tel per rubriek op en deel door het aantal posts in die rubriek.
De laagst scorende rubriek gaat eruit, één idee uit `ideeenbank.md` komt erin.
Kijk niet vaker dan één keer per maand: bij deze accountgrootte is weekdata ruis.
```

- [ ] **Stap 4: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/maandroutine.md && git commit -m "content: maandroutine"
```

---

### Taak 6: CLAUDE.md en README bijwerken

De huidige teksten beschrijven het oude weekritme en noemen de organisatie `My Organization`. Dat is onjuist en zou een volgende sessie op het verkeerde been zetten.

**Bestanden:**
- Wijzigen: `CLAUDE.md`
- Wijzigen: `README.md`

**Interfaces:**
- Gebruikt: alle bestanden uit taak 1 t/m 5

- [ ] **Stap 1: Corrigeer de organisatienaam in CLAUDE.md**

De regel `- Organisatie: **My Organization** — ...` wordt:

```markdown
- Organisatie: **Quality empire** — `organizationId: 6a2d69cf3d34f01dcdb6401f`
```

- [ ] **Stap 2: Vervang het systeemdeel in CLAUDE.md**

De secties "Het systeem", "Werkwijze / rolverdeling", "Status" en "Next steps" gaan eruit. Daarvoor in de plaats:

```markdown
## Het systeem

Voorraadmodel met vaste weekdag-rubrieken. Volledige beschrijving staat in
`docs/superpowers/specs/2026-08-10-social-september-design.md`.

Drie merken: restaurant (di–zo), foodtruck (do + za), Sauce & Toppings (ma + vr).
Per maand 54 contentmomenten, vooraf ingepland in Buffer. Een contentmoment dat
naar twee kanalen gaat (bijvoorbeeld Instagram + TikTok) is in Buffer twee
aparte posts; 29 van de 54 contentmomenten gaan naar twee kanalen, dus dat
worden samen 83 posts.

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
```

- [ ] **Stap 3: Werk de bestandsboom in README.md bij**

Vervang het `content/`-blok door:

```markdown
├── content/
│   ├── september-2026.md            ← het maandplan (bron van waarheid)
│   ├── captions-september-2026.md   ← alle 54 captions
│   ├── contentbank.md               ← index van al het beeldmateriaal
│   ├── briefing-contentmakers.md    ← gaat naar de contentmakers
│   ├── maandroutine.md              ← de vaste maandcyclus
│   ├── weekplanning.md              ← oud sjabloon, naslag
│   └── ideeenbank.md                ← contentideeën per categorie
├── docs/superpowers/
│   ├── specs/                       ← het ontwerp
│   └── plans/                       ← dit uitvoeringsplan
```

- [ ] **Stap 4: Vervang "De kern in het kort" en "Weekritme" in README.md**

Die beschrijven het oude ritme. Vervang door een korte samenvatting van het voorraadmodel en een verwijzing naar `content/maandroutine.md`.

- [ ] **Stap 5: Controleer dat het oude systeem nergens meer als actueel staat**

Run:
```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && grep -rn "My Organization\|elke maandag" README.md CLAUDE.md || echo "SCHOON"
```

Verwacht: `SCHOON`

- [ ] **Stap 6: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add README.md CLAUDE.md && git commit -m "docs: CLAUDE.md en README bijwerken naar het voorraadmodel"
```

---

### Taak 7: September in Buffer zetten

Deze taak raakt de buitenwereld. Hij start pas als aan drie voorwaarden is voldaan: de aanleverroute voor media is bekend, het beeld is geleverd, en Jonathan heeft de batch goedgekeurd.

**Bestanden:**
- Wijzigen: `content/september-2026.md` (kolom `Status` naar `In Buffer`)
- Wijzigen: `content/contentbank.md` (kolommen `Gebruikt op` en `Status`)

**Interfaces:**
- Gebruikt: `september-2026.md` voor datum, tijd, kanaal en type; `captions-september-2026.md` voor de tekst; `contentbank.md` voor de bestandsnaam
- Levert: 83 ingeplande posts in Buffer, voor de 54 contentmomenten uit het maandplan
  (29 daarvan gaan naar twee kanalen en leveren dus elk twee posts). Post-ID's hoeven
  niet teruggeschreven te worden; de statuskolom in het maandplan volstaat.

- [ ] **Stap 1: Controleer de voorwaarden**

Alle drie moeten waar zijn. Is er één niet, dan stopt deze taak hier:

1. De aanleverroute voor media is bekend en elk bestand heeft een directe URL
2. Het beeld is geleverd en staat in `contentbank.md`
3. Jonathan heeft de complete batch goedgekeurd

- [ ] **Stap 2: Controleer de Buffer-verbinding en de tijd**

Roep `mcp__314956a2-26ae-492c-a00f-a59f84a522de__get_account` aan.

Verwacht: `organizations[0].id` is `6a2d69cf3d34f01dcdb6401f`, naam `Quality empire`, `timezone` is `Europe/Amsterdam`. Gebruik `currentTime` om te controleren dat alle geplande momenten in de toekomst liggen — Buffer weigert een `dueAt` in het verleden.

- [ ] **Stap 3: Maak één testpost aan als concept**

Begin met één post om het formaat te bevestigen voordat je de overige 82 aanmaakt
(samen 83 posts, voor de 54 contentmomenten waarvan 29 naar twee kanalen gaan). Roep
`create_post` aan met:

```json
{
  "channelId": "6a7a28b4b2d9d577435147db",
  "schedulingType": "automatic",
  "mode": "customScheduled",
  "dueAt": "2026-09-01T12:00:00+02:00",
  "saveToDraft": true,
  "text": "<caption van 01-09 uit captions-september-2026.md>",
  "assets": [{"image": {"url": "<directe URL van REST_FOTO_gerecht_01.jpg>", "metadata": {"altText": "Bord met [gerecht]"}}}],
  "metadata": {"instagram": {"type": "post", "shouldShareToFeed": true}}
}
```

Let op: september valt in de zomertijd, dus de offset is `+02:00`.

- [ ] **Stap 4: Controleer de testpost**

Roep `list_posts` aan met `organizationId: 6a2d69cf3d34f01dcdb6401f` en `status: ["draft"]`.

Verwacht: één post, met de juiste tekst, het juiste kanaal en `dueAt` op 1 september 12:00 lokale tijd. Klopt er iets niet, corrigeer dan het formaat voordat je verder gaat.

- [ ] **Stap 5: Maak de resterende 82 posts aan**

Loop `september-2026.md` van boven naar beneden af. Per rij:

- Reels: `metadata.instagram.type` is `"reel"` met `shouldShareToFeed: true`, en het asset is `{"video": {"url": "..."}}`
- Posts op twee kanalen (bijvoorbeeld Instagram + TikTok) zijn twee aparte `create_post`-aanroepen, elk met hun eigen caption
- TikTok gebruikt `metadata.tiktok.title`
- Facebook gebruikt `metadata.facebook.type: "post"`
- Trending-sound reels (maximaal twee) krijgen `schedulingType: "notification"` in plaats van `"automatic"`

- [ ] **Stap 6: Controleer het totaal in Buffer**

Roep `list_posts` aan met `dueAt.start: "2026-09-01T00:00:00+02:00"`, `dueAt.end: "2026-09-30T23:59:59+02:00"` en `first: 100`.

Verwacht: 83 posts (54 contentmomenten, waarvan 29 naar twee kanalen). Wijkt het af, zoek dan met de tellingen per merk uit taak 1 welke rij ontbreekt.

- [ ] **Stap 7: Zet de statussen in de repo bij**

Zet in `september-2026.md` de kolom `Status` op `In Buffer` voor alle 54 rijen (contentmomenten — dit is geen postentelling). Zet in `contentbank.md` per gebruikt bestand de datum in `Gebruikt op` en de status op `Ingepland`.

- [ ] **Stap 8: Commit**

```bash
cd "/Users/jonathan/Desktop/quality-trukipan-social" && git add content/september-2026.md content/contentbank.md && git commit -m "content: september ingepland in Buffer"
```

---

## Volgorde en afhankelijkheden

Taak 1 gaat eerst; taak 2 en 3 hangen eraan. Taak 4 kan naast taak 2 en 3 lopen. Taak 5 en 6 kunnen op elk moment na taak 1. Taak 7 komt als laatste en pas als de drie voorwaarden gehaald zijn.

Taak 1 t/m 6 zijn allemaal markdown in deze repo en raken niets buiten de map. Alleen taak 7 gaat naar buiten.
