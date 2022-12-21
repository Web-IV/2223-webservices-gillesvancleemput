# Voornaam Familienaam (Studentennummer)

Gilles Van Cleemput 182542gv

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak.
> Verwijder alle instructies (lijnen die starten met >)

- [x] Front-end Web Development
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-gillesvancleemput)
  - [Online versie](https://sinsinfrontend.onrender.com)
- [x] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-gillesvancleemput)
  - [Online versie](https://sinsinapi.onrender.com)

**Logingegevens**

**dit is een admin account**

- Gebruikersnaam/e-mailadres: test@gmail.com
- Wachtwoord:Server123\*

**dit is een user account**

- Gebruikersnaam/e-mailadres: user@gmail.com
- Wachtwoord:Server123\*

## Projectbeschrijving

Mijn web project gaat over een nieuwe vegan food bar in Gent genaamd SinSin. De food bar bestaat sinds de zomer van 2022 en wordt open gehouden door mijn schoonzus.
De foodbar wou zelf een website hebben waar mensen op konden bestellen. Hier door zouden ze geen ubereats of takeaway moeten betalen om hun services te kunnen gebruiken.

## Screenshots

> Voeg enkele (nuttige!) screenshots toe die tonen wat de app doet.

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
        <br />

- **routing**

  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
        <br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [ ] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [ ] gebruikt Context, useReducer, Redux… voor globale state
        <br />

- **hooks**

  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
        <br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [ ] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
        <br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
        <br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
        <br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
        <br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [ ] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?
> Ik heb mijn applicatie onderverdeeld in componenten voor elke pagina. Ik bouw dan de pagina op met zulke componenten.
> Het eerste component in een map is het hoofd component waar de rest op wordt gebouwd.

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?
> Ik heb de rest API gestructureerd zoals in de de les.
> Ik heb de rest api opgesplitst in het 3 lagen model rest, service en repository.

## Extra technologie

### Front-end Web Development

> Voor mijn front-end project heb ik de extra technologie emailjs gebruikt.
> Het is een javascript library dat help met versturen van emails door alleen client-side technologie te gebruiken.
> Het heeft geen server nodig je hoeft alleen een supported email service gebruiken zoals gmail en een van hun SDK libraries versturen de email.
> link: https://www.npmjs.com/package/emailjs

### Web Services

> De extra technologie dat ik heb gebruikt in het web services project is swagger.
> Swagger is een open-source software framework.
> Met Swagger kun je de structuur van je API's beschrijven zodat machines ze kunnen lezen.\
> link: https://www.npmjs.com/package/swagger

## Testresultaten

### Front-end Web Development

> Ik heb een test geschreven van het aanpassen van een user account.
> De test navigeert zich eerst naar de form om de user te weizigen.
> De form wordt ingevuld en bevestigd.
> Er wordt dan gekeken of de user effectief is aangepast door naar de user info pagina te navigeren.
> De tweede test is het plaatsen van een bestelling.
> De test vult eerst de winkelmand aan om dan verder te gaan de bestelling pagina.
> Op de bestelling pagina wordt de bestelling bevestigd.
> Na het bevestigen van de bestelling wordt er genavigeert naar de pagina waar de bestelling history wordt getoont en wordt er gecontroleert of de bestelling is geplaatst.

### Web Services

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen + voeg een screenshot van de coverage en uitvoering toe
> De eerste test werd geschreven over de het menu.
> De test probeert de GET, POST, PUT en DELETE van de API voor de menu tabel.
> De tweede test werd geschreven over de user tabel.
> de test probeert de checkforuser GETbyAuthId en het aanmaken van een user.

## Gekende bugs

### Front-end Web Development

> Zijn er gekende bugs?

### Web Services

> Swagger heeft enkele problemen.
> Sommige beschrijvingen in de web voorstelling van swagger willen niet uitvoeren.
> Dit is omdat de gebruiken niet is geautoriseerd voor die api calls uit te voeren.
> Ook zijn de fout codes van swagger niet goed gelinked en staat er gewoon string als uitvoer in de plaats van de gepaste melding zoald 404 niet gevonden.
