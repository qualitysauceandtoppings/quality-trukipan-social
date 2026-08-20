# Spec — reels volautomatisch posten via de Instagram- en TikTok-API

**Status:** voor later. Niet gebouwd, niet ingepland.
**Vastgelegd:** 20 augustus 2026, tijdens het inrichten van september.

## Waarom dit er ooit moet komen

Foto's lopen al volautomatisch: het maandplan geeft een bestandsnaam, die wordt een
media-URL, en Buffer haalt het beeld daar op. Voor reels gaat dat nu niet in één keer.
De video wordt één keer met de hand in Buffer geüpload, en pas daarna post Buffer hem
vanzelf op het geplande moment.

Dat handwerk is de laatste menselijke handeling in de maandcyclus. Deze spec beschrijft
hoe die eruit gaat.

## Wat er nu al ligt

- Beeldopslag: Cloudflare R2-bucket `quality-trukipan-media`, gelezen via de
  upload-worker op `https://quality-trukipan-upload.trukipan.workers.dev/media/<maand>/<bestandsnaam>`
- Publiek leesbaar zonder wachtwoord, met `Content-Type` en `Cache-Control`
- Per maand ongeveer 13 reels, verdeeld over Instagram en TikTok

De opslag is daarmee al geschikt: beide API's hieronder halen video op via een publieke
URL, en die hebben we.

## Doel

Een reel gaat van bestandsnaam naar geplaatste post zonder dat iemand iets uploadt:

1. Het maandplan noemt een bestand
2. De worker serveert dat bestand op een publieke URL
3. Een script biedt die URL aan bij Instagram en TikTok
4. De post verschijnt op het geplande moment

## Instagram — Content Publishing API

Twee stappen via de Graph API op het Instagram-account van de zaak:

1. **Container maken** — `POST /{ig-user-id}/media` met `media_type=REELS`,
   `video_url=<media-URL>` en `caption=<tekst>`. Levert een container-ID.
2. **Publiceren** — `POST /{ig-user-id}/media_publish` met `creation_id=<container-ID>`.

Daartussen moet gewacht worden tot de container klaar is; dat is te volgen via
`GET /{container-id}?fields=status_code`.

Aandachtspunten:

- Vereist een Instagram Professional Account gekoppeld aan een Facebook-pagina, plus een
  app met de juiste rechten. Presikhaaf heeft nog geen eigen Facebook-pagina — dat moet
  eerst geregeld worden.
- Er geldt een limiet op het aantal posts per etmaal per account.
- De video moet aan Instagram's eisen voldoen: verticaal 9:16, MP4 of MOV, H.264, AAC.
- Een muzieksticker uit de app kan hier niet. Audio moet in het bestand zitten.

## TikTok — Content Posting API

Ook twee stappen:

1. **Initialiseren** — `POST /v2/post/publish/video/init/` met `source=PULL_FROM_URL` en
   `video_url=<media-URL>`. TikTok haalt de video zelf op.
2. **Status volgen** — `POST /v2/post/publish/status/fetch/` tot de post klaar is.

Aandachtspunten:

- Het domein waarvan TikTok ophaalt moet geverifieerd zijn in de developerportal. Dat is
  een eenmalige stap voor `quality-trukipan-upload.trukipan.workers.dev`.
- Een niet-geaudite app kan alleen naar privé of naar een beperkt publiek posten. Voor
  echt publiceren is een audit nodig.
- Ook hier: geen bibliotheekgeluid achteraf, audio moet in het bestand zitten.

## Wat dit niet oplost

Trending audio uit de app blijft handwerk. Wie een reel op een trending sound wil zetten,
moet dat in de app doen. Dat is geen beperking van dit ontwerp maar van de platforms zelf:
hun muziekbibliotheek is alleen in de app beschikbaar, niet via de API. Zie de afspraak van
maximaal twee zulke reels per maand.

## Wat er eerst moet gebeuren

1. Facebook-pagina voor Presikhaaf, gekoppeld aan het Instagram-account
2. Meta-app met de rechten voor content publishing, en hun review doorlopen
3. TikTok-developeraccount, domeinverificatie en de audit
4. Pas daarna: het script bouwen en naast Buffer laten draaien

Stap 1 tot en met 3 is aanvraagwerk bij de platforms en duurt weken. Zolang dat niet rond
is, blijft Buffer de route.

## Afweging

Buffer doet het meeste werk al goed en post video zonder problemen. Wat deze spec oplost
is precies één handeling per reel. Bouw dit pas als het aantal reels per maand zo groeit
dat dat handwerk gaat schuren, of als er een reden komt om van Buffer af te stappen.
