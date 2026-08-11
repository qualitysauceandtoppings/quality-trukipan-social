# Quality Trukipan — Social Media Systeem

Eén voorraadmodel voor het **restaurant**, de **foodtruck** en **Quality Sauce &
Toppings**, klaar om samen te beheren en per maand vooraf in te plannen via Buffer.

## Wat zit hierin

```
quality-trukipan-social/
├── README.md              ← dit bestand (start hier)
├── CLAUDE.md              ← context voor Claude Code om verder te werken
├── content/
│   ├── september-2026.md            ← het maandplan (bron van waarheid)
│   ├── captions-september-2026.md   ← alle 54 captions
│   ├── contentbank.md               ← index van al het beeldmateriaal
│   ├── briefing-contentmakers.md    ← gaat naar de contentmakers
│   ├── maandroutine.md              ← de vaste maandcyclus
│   ├── ideeenbank.md                ← contentideeën per categorie
│   ├── weekplanning.md              ← oud, alleen naslag (oude weekritme)
│   └── captions-week-2026-08-11.md  ← oud, alleen naslag (oude weekritme)
├── docs/superpowers/
│   ├── specs/                       ← het ontwerp
│   └── plans/                       ← dit uitvoeringsplan
├── buffer/
│   └── setup.md           ← accounts, kanalen, plan en werkwijze
└── exports/                         ← oud, alleen naslag (oude weekritme)
    ├── Quality Trukipan - Social Media Weeksysteem.xlsx
    └── Quality Trukipan - Social Media Weeksysteem.docx
```

## De kern in het kort

Dit werkt volgens een **voorraadmodel**, niet een weekritme:

- **Eén shootdag per maand** levert de complete beeldvoorraad voor die maand.
- Elk merk heeft een **vaste rubriek per weekdag**: restaurant di t/m zo, foodtruck
  do + za, Quality Sauce & Toppings ma (foto) + vr (reel).
- De **hele maand** wordt in één keer vooraf ingepland in **Buffer** (Essentials-plan,
  alle kanalen gekoppeld); Jonathan keurt één keer per maand de complete batch goed.
- De volledige cyclus — wie doet wat en wanneer — staat in `content/maandroutine.md`.

## Verder werken in Claude Code

Open deze map in Claude Code. Het bestand `CLAUDE.md` bevat alle context
(merken, kanalen + IDs, het systeem, rolverdeling, status) zodat je direct verder
kunt: het maandplan en de captions bijwerken, beeld koppelen en posts in Buffer
klaarzetten.

## In git zetten

Deze map is al een git-repo met een eerste commit. Om 'm online te delen:

```bash
# maak een lege repo aan op GitHub/GitLab, daarna:
git remote add origin <jouw-repo-url>
git push -u origin main
```
