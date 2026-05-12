/* Localized FAQ overrides for /stader/solcellsbesiktning-<city> pages.
   Each city gets 3 localized Q&A pairs that replace items 8, 9, 10 (the
   most generic ones) on the standard city template. Triggered per page
   based on URL pathname. */

(function () {
  var FAQ = {
    goteborg: [
      { q: 'Hur påverkar Göteborgs kustklimat min anläggning?', a: 'Saltbärande vindar från Västerhavet och Göta älv accelererar korrosion på kabelskor, monteringsskenor och växelriktarens utvändiga skydd. Vi rekommenderar besiktning vart 3:e år för anläggningar i Hisingen, Långedrag, Saltholmen och Styrsö snarare än standard 5-årsintervall.' },
      { q: 'Jobbar ni med BRF:er i Göteborgs innerstad?', a: 'Ja. Vi har besiktigat anläggningar i Vasastan, Linnéstaden och Majorna där platta tak med begränsad åtkomst är vanligt. Vi använder drönare med termografering så takpapp och tätskikt inte påverkas av onödig trafik.' },
      { q: 'Hur fort kan ni vara på plats i Göteborg?', a: 'Vi har bas i Landvetter, 20 minuter från centrum. Inom Göteborg, Mölndal, Partille och Härryda kan vi oftast komma inom en vecka. För akut brandtillbud rycker vi ut samma dag.' }
    ],
    halmstad: [
      { q: 'Är drönare alltid nödvändig för besiktning i Halmstad?', a: 'I kustnära områden som Söndrum, Tylösand och Frösakull använder vi drönare i 8 av 10 fall eftersom takstegen blir osäker vid stark sjöbris. Inåt landet (Oskarström, Eldsberga) kan vi ofta inspektera med vanlig stege.' },
      { q: 'Vad är vanligaste felet på solpaneler i Halmstad?', a: 'Lös fästbultning till följd av återkommande sydvästliga vindstötar är det vi ser oftast. Panelerna sitter kvar men montaget glappar med tiden och kan skada takpannan under.' },
      { q: 'Täcker ni hela Halland eller bara Halmstad?', a: 'Vi täcker hela kuststräckan från Båstad i söder till Onsala i norr. Halmstad, Laholm, Falkenberg och Varberg är våra mest aktiva områden — ofta kan vi kombinera flera besiktningar samma dag.' }
    ],
    malmo: [
      { q: 'Vad gäller för solceller på MKB- eller äldre Limhamn-villor?', a: 'Malmöregionen har många 1920–50-tals villor med funkis-tak där originalpapp ofta behöver bytas innan eller samtidigt med solceller. Vi kontrollerar tätskiktets ålder och kondition i besiktningsprotokollet.' },
      { q: 'Hjälper ni BRF:er i Västra Hamnen och Hyllie?', a: 'Ja. Moderna BRF:er i Västra Hamnen och Hyllie har ofta gemensam solcellsanläggning på flera fastigheter i samma styrelseansvar. Vi har specifika rutiner för delning och produktion-per-fastighetsmätare.' },
      { q: 'Vilka soltimmar har Malmö jämfört med övriga Sverige?', a: 'Malmö ligger på cirka 1 800 soltimmar/år enligt SMHI — bland de soligaste i landet. En 10 kW-anläggning här producerar i snitt 10–15 % mer per år än motsvarande i Mälardalen.' }
    ],
    boras: [
      { q: 'Påverkar Borås nederbörd hur ofta jag bör besiktiga?', a: 'Borås har bland Sveriges högsta årsnederbörd (1 000+ mm) vilket sliter på tätskikt och kabelinträngningar fortare. Vi rekommenderar besiktning vart 4:e år istället för standard 5 år.' },
      { q: 'Vad gäller för anläggningar på funkisvillor i Sjöbo och Kristineberg?', a: 'Många Boråsvillor från 1940–60-talet har papptak med ovanliga lutningar. Vi kontrollerar att infästningarna är gjorda i takstol och inte bara i råspont — vanligt installationsfel i området.' },
      { q: 'Täcker ni textilindustrins fastigheter i Borås centrum?', a: 'Ja. Vi har gjort besiktningar på Knalleland, Simonsland och flera ombyggda industrifastigheter. Större anläggningar med trefasaggregat och flera växelriktare ingår i vår normala arbetsbild.' }
    ],
    kungalv: [
      { q: 'Påverkar saltvattenexponering anläggningar i Marstrand och Tjuvkil?', a: 'Ja, kraftigt. På Marstrand, Tjuvkil och Kungälvs västkust ser vi 30–40 % snabbare korrosion på MC4-kontakter än längre inåt land. Vi rekommenderar besiktning vart 3:e år och utbyte av yttre kontakter vid 7-årsmärket.' },
      { q: 'Hjälper ni med brf-anläggningar i Kungälvs centrum?', a: 'Ja. Vi har besiktigat anläggningar på Komarken, Ytterby och Kongahälla centrum. Brf:er med gemensamma takanläggningar och flera mätarundersystem är ett område vi har stor vana av.' },
      { q: 'Vad gäller särskilt för fritidshus i Kungälvs skärgård?', a: 'Fritidshus utan vinterel kräver särskild kontroll av batterilager och frostskydd. Vi tar med oss värmekamera även i Maj/September-besiktningar för att hitta dolda fuktskador från höst- och vintersäsongen.' }
    ],
    helsingborg: [
      { q: 'Vad gäller för solceller på Helsingborgs tegeltak?', a: 'Många villor i Tågaborg, Stattena och Eskilsminne har tvåkupiga tegelpannor från 70-talet där standard-fästjärn inte passar. Vi kontrollerar att specialfäste använts och att underlagspapp inte skadats vid borrning.' },
      { q: 'Hur stor är risken för åskskador i Helsingborgsregionen?', a: 'Helsingborgsområdet har relativt få åskdagar (~10/år) men kuststräckan från Råå till Domsten är extra exponerad. Vi kontrollerar överspänningsskyddet både på AC- och DC-sidan vid varje besiktning.' },
      { q: 'Hjälper ni med besiktning av större anläggningar på Berga industri?', a: 'Ja. Vi har vana av kommersiella anläggningar 100–500 kW på Berga, Långeberga och Väla södra. För större jobb använder vi industridrönare med thermografisk kamera för totalinspektion på en arbetsdag.' }
    ],
    lund: [
      { q: 'Vad gäller för solceller på Lunds äldre BRF-fastigheter?', a: 'Centrala Lund har många BRF:er med kulturhistoriskt skyddade fasader. Vi har specifik vana av tegeltaksbesiktningar där paneler placerats med diskret infästning som inte syns från gatan. Bygglovet bestämmer ofta placering.' },
      { q: 'Påverkar närheten till MAX IV och ESS elinstallationer i Lund?', a: 'Nej, men i Brunnshög ser vi fler nyproduktioner med integrerade BIPV-paneler (byggnadsintegrerad solel) där vanlig besiktningsmetodik inte räcker. Vi har särskild rutin för dessa.' },
      { q: 'Vilka områden i Lund besiktigar ni oftast?', a: 'Lunds centrum, Tuna, Värpinge, Stångby och Dalby är våra mest aktiva. Vi täcker även Genarp, Veberöd och Södra Sandby med samma kort framförhållning. Bokning sker oftast inom 2 veckor.' }
    ],
    kristianstad: [
      { q: 'Vad gäller för solceller på lantbruksfastigheter i Kristianstad?', a: 'Vi besiktigar regelbundet stora takanläggningar på ladugårdstak i Åhus, Tollarp och Vinslöv. Lantbrukstak har ofta plåt med skarvar — vi kontrollerar att panelerna inte orsakar punktbelastning som kan ge läckage.' },
      { q: 'Påverkar saltexponering i Åhus och Yngsjö min anläggning?', a: 'Ja. Östkustens salt är något mildare än västkustens men korrosion på exponerade kontakter är fortfarande snabbare än inåt land. Besiktning vart 4:e år är lämpligt för Åhus, Yngsjö och Furuboda.' },
      { q: 'Hjälper ni BRF:er i centrala Kristianstad?', a: 'Ja. Vi har erfarenhet av takanläggningar i Vilan, Näsby och Östermalm. Centralkristianstads tätbebyggelse innebär ofta skuggning från intilliggande fastigheter — vi kontrollerar att effektoptimerare faktiskt fungerar som tänkt.' }
    ],
    ystad: [
      { q: 'Hur många soltimmar har Ystad jämfört med Sverigesnittet?', a: 'Ystad ligger på 1 850–1 900 soltimmar/år enligt SMHI — bland de absolut soligaste platserna i Sverige. En 10 kW-anläggning här producerar ofta 11 500–12 000 kWh/år, jämfört med 9 500 i Stockholm.' },
      { q: 'Påverkar saltvattenexponering anläggningar i Sandskogen och Sandhammaren?', a: 'Ja. Söderkustens läge mellan Öresund och Östersjön ger högst salthalt i luften på fastlandet. Vi rekommenderar besiktning vart 3:e år och utbyte av MC4-kontakter senast vid 8 år.' },
      { q: 'Täcker ni hela Österlen?', a: 'Ja. Ystad är vår sydligaste utgångspunkt och vi täcker hela Österlen — Simrishamn, Tomelilla, Skillinge, Hammenhög och Borrby. Vi kan oftast samordna besiktningar mellan flera grannar samma dag.' }
    ],
    trelleborg: [
      { q: 'Stämmer det att Trelleborg har Sveriges mest soltimmar?', a: 'Ja, Trelleborgsområdet och Smygehuk ligger konstant högst med 1 900–1 950 soltimmar/år enligt SMHI. En väl placerad 10 kW-anläggning kan komma upp i 12 000+ kWh/år — högsta utbytet i hela landet.' },
      { q: 'Hur påverkar närheten till Östersjön solpanelerna?', a: 'Salthalten i luften är högre här än längs västkusten på grund av sydostvindar. Vi ser ofta saltavlagringar på panelernas underkant och rekommenderar enkel rengöring 1 gång per år för att hålla produktionen uppe.' },
      { q: 'Jobbar ni med brf-anläggningar i Trelleborg centrum?', a: 'Ja. Vi har besiktigat anläggningar på Östervång, Stavstensudde och Maglarp. Plana tak på lägenhetshus kräver särskild kontroll av tätskiktet vid fästpunkterna — en av de vanligaste bristerna vi hittar.' }
    ],
    varberg: [
      { q: 'Hur påverkar Varbergs kustvindar montaget på taket?', a: 'Varbergs kuststräcka mot Apelviken och Getterön har bland Sveriges starkaste medelvindar. Vi kontrollerar att fästbultar är vridmoment-dragna enligt monteringssystemets specifikation — för låg åtdragning är det vanligaste felet.' },
      { q: 'Hjälper ni med anläggningar i kallbadhusområdet och Apelviken?', a: 'Ja. Kustnära villor i Apelviken, Solbacka och Getakärr är våra mest besökta. Salt-exponering är hög och vi rekommenderar besiktning vart 3:e år istället för 5.' },
      { q: 'Täcker ni Varberg, Falkenberg och hela Hallandskusten?', a: 'Ja. Vi kombinerar ofta uppdrag mellan Halmstad, Falkenberg och Varberg samma dag eftersom kuststräckan är så enkel att resa. Det gör att vi kan hålla nere kostnaden för flera kunder i samma område.' }
    ],
    kungsbacka: [
      { q: 'Vad gäller särskilt för Kungsbackas nya villaområden?', a: 'Vi besiktigar regelbundet i Anneberg, Kullavik, Vallda, Onsala och Voxlöv. Nya villor (2018+) har ofta bra grundinstallation men vi ser återkommande problem med felaktig dimensionering av nollkabeln vid trefasaggregat.' },
      { q: 'Hur påverkar Onsala-halvöns saltexponering?', a: 'Onsala, Vallda och Särö ligger så nära havet att salt-korrosion accelererar. Vi rekommenderar besiktning vart 3:e år och kontroll av växelriktarens utvändiga IP-klassning vart 5:e år.' },
      { q: 'Hjälper ni med pendlarvillor som inte bebos året om?', a: 'Ja. Kungsbacka har många pendlarvillor och fritidshus. Vi har specifik rutin för anläggningar som står i viloläge under vinter — bland annat kontroll av batterilagrets frostskydd och spillvärme i växelriktaren.' }
    ],
    falkenberg: [
      { q: 'Vad gäller för fritidshus och kustnära villor i Falkenberg?', a: 'Falkenbergs kuststräcka från Skrea till Glommens hamn har många fritidshus med säsongsbebodda anläggningar. Vi har specifik kontroll för installationer som står obevakade under vinter och kan ha drabbats av djurintrång eller vatten.' },
      { q: 'Påverkar Sloalt-platsens vindlast min anläggning?', a: 'Falkenberg har Sveriges första kommersiella vindkraftpark, vilket säger något om vindlasten i området. Vi kontrollerar systematiskt att fästena är vridmomentdragna och att gummibrickor inte tappat elasticitet.' },
      { q: 'Hjälper ni med större lantbruksanläggningar inåt landet?', a: 'Ja. Vi besiktigar regelbundet markmonterade och ladugårdsanläggningar i Vinberg, Sten Östra och Heberg. Anläggningar 30–100 kW på lantbruk är inom vår normala arbetsbild.' }
    ],
    alingsas: [
      { q: 'Vad gäller för Alingsås lyktstad-äldre fastigheter?', a: 'Alingsås centrum har många kulturklassade trähus där solceller måste placeras diskret. Vi kontrollerar att infästningen är gjord i takstol och inte i takpanel — kritiskt på äldre trähus där takpanelens kondition kan variera.' },
      { q: 'Påverkar Alingsås snödjup vintertid min anläggning?', a: 'Alingsås har relativt långa vintrar med 30–60 cm snödjup i normalfall. Vi kontrollerar att monteringen klarar snölast enligt SS-EN 1991-1-3 och att panelerna har snöavkastningsvinkel som faktiskt fungerar.' },
      { q: 'Täcker ni Alingsås, Lerum och Lilla Edet?', a: 'Ja. Vi har bas i Landvetter och åker regelbundet upp till Alingsås, Lerum, Floda och Lilla Edet. Kort framförhållning — oftast kan vi vara på plats inom 2 veckor.' }
    ],
    lidkoping: [
      { q: 'Påverkar Vänern och västanvindarna anläggningar i Lidköping?', a: 'Ja. Lidköpings position vid södra Vänern ger fuktig luft och regelbundna stormar. Vi kontrollerar tätskiktet vid kabelinträngningar oftare än normalt — fukt-genom-tak är ett av de vanligare felen i området.' },
      { q: 'Vad gäller särskilt för Råda-fastigheter och äldre Lidköpingsvillor?', a: 'Råda och Sannorna har många 1960–80-tals villor med betongpannor där standard-fästen ibland inte ger tillräcklig vattenavledning. Vi kontrollerar specifikt för läckagespår vid undersida.' },
      { q: 'Hjälper ni med lantbruksanläggningar i Skaraborg?', a: 'Ja. Vi besiktigar regelbundet stora ladugårdsanläggningar i Götene, Vara och Skara. För markmontage på lantbruk har vi specifik metodik kring jordningskontroll och fuktinträngning.' }
    ],
    skovde: [
      { q: 'Påverkar Skövdes inlandsklimat min anläggning?', a: 'Skövdes inlandsklimat ger stora temperaturskillnader mellan sommar och vinter — från -25°C till +30°C. Det sliter på MC4-kontakter och kabelisolering. Vi kontrollerar specifikt åldring av plast och gummi vid besiktning.' },
      { q: 'Hjälper ni med kommersiella anläggningar i Skövde industri?', a: 'Ja. Vi har besiktigat större anläggningar på Volvo Group-fastigheter, Skövde garnison och flera Skaraborgsföretag. Trefasaggregat över 30 kW och multi-MPPT-installationer är inom vår normala arbetsbild.' },
      { q: 'Täcker ni hela Skaraborg från Skövde?', a: 'Ja. Vi är aktiva från Skövde till Hjo, Tibro, Tidaholm, Karlsborg och Mariestad. Vi kombinerar ofta flera besiktningar i samma kommun samma dag för att hålla nere kostnaden.' }
    ],
    uddevalla: [
      { q: 'Påverkar Bohuskustens salt anläggningar i Uddevalla?', a: 'Ja. Uddevallas läge vid Byfjorden och kustnära orter som Rotviksbro och Lyckorna ger hög saltexponering. Vi rekommenderar besiktning vart 3:e år och utbyte av yttre MC4-kontakter senast vid 8-årsmärket.' },
      { q: 'Hjälper ni BRF:er i centrala Uddevalla?', a: 'Ja. Vi har besiktigat brf-anläggningar i Bohusgården, Kapelle och Dalaberg. Många takanläggningar i centrala Uddevalla har platta tak — vi kontrollerar tätskiktets kondition vid alla fästpunkter.' },
      { q: 'Hur snabbt kan ni vara på plats i Bohusläns skärgård?', a: 'Inom 1-2 veckor i normalfall. Vi täcker Uddevalla, Lysekil, Munkedal och Strömstad. För öbaserade fastigheter (Gullholmen, Mollösund) räknar vi extra restid med båt.' }
    ],
    trollhattan: [
      { q: 'Vad gäller för solceller på Trollhättans äldre industribyggnader?', a: 'Saab-staden har många konverterade industrifastigheter med plana tak och övergiven gammal el-installation. Vi kontrollerar att solcellsanläggningens jordning inte krockar med befintliga (eventuellt obrukade) elsystem — viktig säkerhetsfråga.' },
      { q: 'Hur påverkar Göta älv och hög luftfuktighet anläggningar i Trollhättan?', a: 'Göta älv ger förhöjd luftfuktighet året om. Det påverkar växelriktarens livslängd och vi rekommenderar att den placeras i ventilerat utrymme. Besiktning vart 4:e år är lämpligt för fuktiga miljöer.' },
      { q: 'Täcker ni Trollhättan, Vänersborg och hela Dalsland?', a: 'Ja. Vi är aktiva från Trollhättan upp till Vänersborg, Mellerud och Åmål. Två-tre besiktningar samma dag är vanligt för att hålla resekostnader nere för kunder i Dalsland.' }
    ],
    jonkoping: [
      { q: 'Påverkar Vätterns närhet anläggningar i Jönköping?', a: 'Ja. Vätterns kalla yta ger ofta dimma och kondens i Jönköpings centrum, Huskvarna och Tabergsdalen. Vi kontrollerar att växelriktarens IP-klassning och kabelinträngningar tål den höga luftfuktigheten.' },
      { q: 'Hjälper ni BRF:er i Jönköpings centrum och Huskvarna?', a: 'Ja. Vi har besiktigat anläggningar i Vätterhem, Huskvarna och Råslätt. Många 70-80-tals brf-fastigheter har platta tak med begränsad bärkraft — vi kontrollerar att solcellsanläggningens vikt inte överskrider taktypen.' },
      { q: 'Täcker ni hela Småland från Jönköping?', a: 'Ja. Vi är aktiva från Jönköping till Värnamo, Nässjö, Tranås och Eksjö. Jönköping är vår sydliga utgångspunkt och vi kombinerar ofta uppdrag mellan smålandsorter samma dag.' }
    ],
    varnamo: [
      { q: 'Vad gäller särskilt för lantbruk i Värnamo-trakten?', a: 'Värnamoregionen har många lantbruk med markmonterade anläggningar 50–200 kW. Vi har specifik metodik för markanläggningar — kontroll av jordningssystem, fuktinträngning vid kabel-genomföringar och vegetations-skuggning.' },
      { q: 'Påverkar Värnamos snödjup vintertid min anläggning?', a: 'Värnamo ligger ofta över 250 m höjd och har relativt djup snö i januari–mars. Vi kontrollerar snölastberäkningen mot SS-EN 1991-1-3 och att panelfästena är dimensionerade för 200+ kg/m² vid behov.' },
      { q: 'Hjälper ni BRF:er och mindre företag i Värnamo?', a: 'Ja. Vi besiktigar anläggningar i Bredasten, Apladalen och Värnamo centrum. För mindre företag som Bruzaholm Bruk-fastigheter, IKEA-fastigheter och liknande har vi vana av medelstora kommersiella installationer.' }
    ],
    nassjo: [
      { q: 'Påverkar Nässjös höjda läge och snödjup min anläggning?', a: 'Nässjö ligger på ca 350 m höjd med 70+ snödagar per år — bland Götalands snörikaste platser. Vi kontrollerar specifikt snölastdimensionering och att monteringsskenor inte deformerats av snötryck.' },
      { q: 'Vad gäller för solceller på Nässjös järnvägsfastigheter?', a: 'Nässjö är järnvägsknutpunkt vilket innebär att flera centrala fastigheter har lägre vibrations-tålighet på grund av tågtrafik. Vi kontrollerar att fästbultar inte börjat lossna av återkommande mikrovibration.' },
      { q: 'Täcker ni Nässjö, Eksjö och Vetlanda?', a: 'Ja. Vi besiktigar regelbundet i Nässjö, Eksjö, Vetlanda, Sävsjö och Tranås. Kombinerade dagar mellan smålandsorter är vanligt — det håller restid (och pris) nere för kunder.' }
    ],
    vaxjo: [
      { q: 'Vad gäller för solceller på Växjö trähus och äldre skogsmiljöer?', a: 'Växjös träbyggnadstradition gör att vi ofta möter villor med trätak och papp. Vi kontrollerar att infästningen är gjord i takstol och inte i takpanel — på äldre trähus är råspontens kondition kritisk.' },
      { q: 'Påverkar omgivande skog skuggning av min anläggning?', a: 'Ja, ofta. Växjös skogslandskap med Helgasjön, Trummen och kringliggande sjöar ger nästan alltid någon form av skuggning. Vi kontrollerar att effektoptimerare eller mikroinvertrar verkligen kompenserar — vanligt installationsfel.' },
      { q: 'Hjälper ni Linnéuniversitetets fastigheter och större företag?', a: 'Ja. Vi har erfarenhet av medelstora och stora kommersiella anläggningar i Hovshaga, Teleborg och Norremark. Trefasanläggningar 50–250 kW med multi-MPPT är inom vår normala arbetsbild.' }
    ],
    ljungby: [
      { q: 'Vad gäller för lantbruksanläggningar i Ljungbytrakten?', a: 'Ljungbys landsbygd har många stora lantbruksanläggningar 50–300 kW på ladugårdstak. Vi har specifik metodik för markmontage och ladugårdstak — kontroll av jordning, fuktläckage och fästintegritet i stallmiljö.' },
      { q: 'Påverkar Bolmens närhet och fuktklimatet i Ljungby?', a: 'Ja. Närheten till Bolmen och Helgeåns lopp ger förhöjd luftfuktighet året om. Vi kontrollerar att växelriktaren står i välventilerat utrymme och att kabelinträngningar tål fukt på lång sikt.' },
      { q: 'Täcker ni Ljungby, Älmhult och hela Småland?', a: 'Ja. Vi är aktiva från Ljungby till Älmhult (IKEA-staden), Markaryd och Strömsnäsbruk. För större kommersiella installationer i Älmhult kan vi oftast komma inom en arbetsvecka.' }
    ],
    stockholm: [
      { q: 'Hjälper ni BRF:er i Stockholms innerstad?', a: 'Ja, det är vår vanligaste uppdragsgivare i Stockholm. Vi besiktigar regelbundet i Östermalm, Vasastan, Söder, Norrmalm och Kungsholmen. Platta tak på flerbostadshus kräver särskild metodik för tätskikt och bärlast — vi har vana av båda.' },
      { q: 'Vad gäller för solceller på Stockholms kulturhistoriskt skyddade fastigheter?', a: 'Vi har erfarenhet av besiktningar i kulturskyddade områden som Gamla Stan, Skeppsholmen och delar av Östermalm där bygglovsmyndigheten kräver diskret panelplacering. Vi kontrollerar att installationen följer bygglovsbeslutet.' },
      { q: 'Hur snabbt kan ni vara på plats i Stockholmsregionen?', a: 'Vi har samarbetspartner i Stockholmsområdet och kan oftast vara på plats inom 1-2 veckor i Storstockholm. För kortare framförhållning prioriterar vi BRF-styrelser med tidskritiska försäkrings- eller garantärenden.' }
    ],
    uppsala: [
      { q: 'Vad gäller för solceller på Uppsalas äldre studentvillor?', a: 'Uppsalas studentstad har många 1920–60-tals villor i Luthagen, Kåbo och Sunnersta med funkis- eller eternit-tak. Vi kontrollerar att eternit-takpannor inte spruckit vid borrning — ett av de vanligaste felen vi hittar.' },
      { q: 'Hjälper ni BRF:er och mindre företag i Uppsala?', a: 'Ja. Vi besiktigar regelbundet i Gränby, Gottsunda, Stenhagen och Eriksberg. Större brf-fastigheter med plana eller låglutande tak är vår vanligaste uppdragsbild i Uppsala.' },
      { q: 'Påverkar Mälarens närhet anläggningar i Uppsala?', a: 'Indirekt — Uppsalas mälar-nära områden har högre luftfuktighet året om än inåt land. Vi rekommenderar besiktning vart 4:e år istället för 5 för fastigheter inom 2 km från Mälaren eller Fyrisåns mynning.' }
    ],
    vasteras: [
      { q: 'Påverkar Mälarens närhet anläggningar i Västerås?', a: 'Ja. Västerås Mälarstrand, Skiljebo och Skerike-områdena har förhöjd luftfuktighet och höstdimma som påverkar växelriktarens livslängd. Vi rekommenderar besiktning vart 4:e år och kontroll av växelriktarens ventilation oftare.' },
      { q: 'Hjälper ni med ABB- och industri-relaterade anläggningar i Västerås?', a: 'Ja. Vi har erfarenhet av större kommersiella anläggningar 50–500 kW i Västerås industriområden — Erikslund, Hammarby och Tillberga. Multi-MPPT och trefasaggregat är inom vår normala arbetsbild.' },
      { q: 'Vad gäller för BRF:er i Västerås centrum och Bjurhovda?', a: 'Vi besiktigar regelbundet brf-anläggningar i Centrum, Bjurhovda och Hammarby. Många 60–80-tals brf-tak har papp som närmar sig livslängdens slut — vi kontrollerar att solcellsmontaget inte påskyndar takbyte i förtid.' }
    ],
    orebro: [
      { q: 'Påverkar Örebros snödjup och vinterklimat min anläggning?', a: 'Örebro har 40-60 snödagar per år och ofta 30+ cm snödjup. Vi kontrollerar snölast-dimensionering enligt SS-EN 1991-1-3 och att panelernas avkastningsvinkel faktiskt fungerar — annars riskeras hela vinterns produktion.' },
      { q: 'Hjälper ni BRF:er i centrala Örebro och Adolfsberg?', a: 'Ja. Vi har besiktigat brf-anläggningar i Centrum, Adolfsberg, Vivalla och Hjärsta. Flerbostadshus med gemensam solcellsanläggning är en vanlig uppdragstyp.' },
      { q: 'Täcker ni Örebro, Kumla och Karlskoga?', a: 'Ja. Vi är aktiva i hela Örebroregionen — Örebro, Kumla, Karlskoga, Hallsberg och Lindesberg. Kombinerade dagar mellan orter är vanligt för att hålla restider och kostnader nere för kunder.' }
    ]
  };

  function getCitySlug() {
    var m = location.pathname.match(/\/stader\/solcellsbesiktning-([a-z]+)\/?$/);
    return m ? m[1] : null;
  }

  function applyLocalizedFAQ() {
    var slug = getCitySlug();
    if (!slug || !FAQ[slug]) return;
    var items = FAQ[slug];

    // Find question and answer elements in DOM order
    var questions = document.querySelectorAll('p.heading-small.white');
    var answers = document.querySelectorAll('div.answer > p.paragraph-5, .faq-list p.paragraph-5');

    if (questions.length < 3 || answers.length < 3) return;

    // Replace the LAST 3 items (positions length-3, length-2, length-1)
    var startIdx = questions.length - 3;
    for (var i = 0; i < 3; i++) {
      var qEl = questions[startIdx + i];
      var aEl = answers[startIdx + i];
      if (qEl && items[i]) qEl.textContent = items[i].q;
      if (aEl && items[i]) aEl.textContent = items[i].a;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLocalizedFAQ);
  } else {
    applyLocalizedFAQ();
  }
})();
